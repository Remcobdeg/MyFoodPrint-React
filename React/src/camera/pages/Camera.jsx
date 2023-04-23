// https://blog.logrocket.com/responsive-camera-component-react-hooks/ this one is the best

// https://www.webdevdrops.com/en/how-to-access-device-cameras-with-javascript/
// https://itnext.io/accessing-the-webcam-with-javascript-and-react-33cbe92f49cb

import './Camera.css';
import React, { useState, useRef, useContext } from 'react';
import CameraIcon from '@mui/icons-material/Camera';
// import FlashOnIcon from '@mui/icons-material/FlashOn';
// import FlashOffIcon from '@mui/icons-material/FlashOff';
import CloseIcon from '@mui/icons-material/Close';
// import { useTorchLight } from '@blackbox-vision/use-torch-light';
import { Modal, IconButton, Box, Button, Typography, Container } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import commonHttp from '../../shared/components/http-common';
import { useNavigate, Link } from "react-router-dom";
import DeviceOrientation from 'react-device-orientation';
import { AuthContext } from '../../shared/context/authContext';
import HelpPages from '../../shared/components/HelpPages';
import Alert from '@mui/material/Alert';
import { trackEvent } from '../../shared/modules/googleAnalyticsModules';
import { useUserMedia } from '../../shared/hooks/useUserMedia';

const CAPTURE_OPTIONS = {
    audio: false,
    video: { facingMode: "environment" },
};

const instructionModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -80%)',
    width: '80vw',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    border: '1px solid #000',
    textAlign: 'center'
};

function dataURItoFile(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
}

function Camera(props) {

    const auth = useContext(AuthContext);
        
    const navigate = useNavigate();

    const videoRef = useRef();
    const canvasRef = useRef(null);
    // const streamRef = useRef(null);

    const mediaStream = useUserMedia(CAPTURE_OPTIONS);

    // const [on, toggle] = useTorchLight(streamRef.current);
    const [open, setOpen] = useState(true);
    const [backdropOpen, setBackdropOpen] = useState(false);
    const [imageBlob, setImageBlob] = useState(null);

    const handleClose = (event) => {
        event.stopPropagation();
        trackEvent('Camera', 'Close camera instruction');
        setOpen(false)
    };

    const handleBackdropClose = () => setBackdropOpen(false);

    if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
        videoRef.current.srcObject = mediaStream;
        // streamRef.current = mediaStream;
      }
    
    function handleCanPlay() {
        videoRef.current.play();
    }

    const takePhoto = (event) => {

        // for GA
        event.stopPropagation();
        trackEvent('Camera', 'Take Photo');

        // setBackdropOpen(true); // show the loading spinner

        let video = videoRef.current;
        let canvas = canvasRef.current;

        // to capture an image, we draw the video on the canvas (which is invisible), using the drawImage method. 
        // because the viewed video height and width are different from the actual video height and width, we need to calculate the offsets and the width and height of the cropped video. We prepare the values here. 
        const viewWidth = video.clientWidth; //the (scaled) view width of the video stream as it appears on the screen
        const viewHeight = video.clientHeight; //the scaled height as it appears on the screen
        const viewRatio = viewWidth/viewHeight; //the ratio of the scaled video
        const videoHeight = video.videoHeight; //the height of the video that is captured by the camera
        const videoWidth = video.videoWidth; //the height of the video that is captured by the camera
        const videoRatio = videoWidth/videoHeight; //the ratio of the video that is captured by the camera
        //we need to calculate the width and height of the cropped video, and  offsets of the cropped video
        let croppedVideoWidth;
        let croppedVideoHeight;
        let offsetX;
        let offsetY;
        let resUpscale; //scale to fixed width/height 1920 for saving to server
        let resUpscaleTest; //scale to fixed width/height 1920 for saving to server
        ; //scale to fixed width/height 1920 for saving to server
        if (videoRatio > viewRatio) { //if the video is wider than the view
            croppedVideoWidth = Math.round(videoHeight*viewRatio);
            croppedVideoHeight = videoHeight;
            offsetX = Math.round((videoWidth - croppedVideoWidth)/2);
            offsetY = 0;            
        } else { //if the video is taller than the view
            croppedVideoWidth = videoWidth;
            croppedVideoHeight = Math.round(videoWidth/viewRatio);
            offsetX = 0;
            offsetY = Math.round((videoHeight - croppedVideoHeight)/2);
        }

        // apply an upscale to the canvas to make the picture look better
        resUpscale = 1920 / Math.max(viewWidth, viewHeight);

        // we need to set the width and height of the canvas to the width and height of the scaled video
        canvas.width = viewWidth * resUpscale;
        canvas.height = viewHeight * resUpscale;

        let context = canvas.getContext('2d');
        context.drawImage( // this function 
            video, //the unscaled video stream --> we have to scale it to the client width and height
            offsetX, //source x
            offsetY, //source y
            croppedVideoWidth, //source width (cropped)
            croppedVideoHeight, //source height (cropped)
            0, 
            0, 
            viewWidth * resUpscale, 
            viewHeight * resUpscale
            ); //

        // prepare the image blob to be uploaded
        let dataURL = canvasRef.current.toDataURL('image/jpeg',1); //1 = full quality
        let imageFile = dataURItoFile(dataURL);
        let fd = new FormData();
        fd.append("imageFile", imageFile);

        // show the image on the screen
        canvasRef.current.toBlob(blob => setImageBlob(blob), "image/jpeg", 1); //1 = full quality

        try {
            commonHttp.post('/receipts/uploadImage/' + props.userId, fd, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + auth.token
                } //responds the name of the data
            }).then((response) => {
                setBackdropOpen(false);
                navigate('/camera/image', { state: response.data }); //later retrieved by using useLocation()
            });
        } catch (err) {
            trackEvent('Camera', 'Error in uploading picture', err);
            alert(err)
        }
    }


    return (
        <Container maxWidth="sm" sx={{padding: 0}}>
        <DeviceOrientation>
            {({ absolute, alpha, beta, gamma }) => (
                <div>                
                    {!imageBlob && (
                        <video 
                            ref={videoRef} 
                            onCanPlay={handleCanPlay} 
                            autoPlay 
                            playsInline 
                            muted
                            style={{
                                //this scales the video stream to the full height/width of the screen
                                //but doesn't actually change size of the video stream object in videoRef!
                                //the aspect ratio is maintained
                                height: window.innerHeight, 
                                width: window.innerWidth , 
                                objectFit: "cover", 
                                position: "absolute"}}
                        />
                    )}

                    {!imageBlob && (    
                        <canvas ref={canvasRef}></canvas>
                    )}

                    {imageBlob && (    
                        <img src={imageBlob} id="img" alt=""></img>
                    )}
                    
                                
                    {(beta < 4 && beta > -4 && gamma > -4 && gamma > -4) ? 
                        <IconButton onClick={takePhoto} className='camera-button'>
                            <CameraIcon sx={{ fontSize: "20vmin" }} color="primary" />
                        </IconButton>
                    
                        : <div>
                            {(open === false) &&
                                <Alert severity="info" className='hold-horizonal-alert'>To take a picture, hold your phone level</Alert>
                            }
                        </div>
                        
                    }

                    {/* <IconButton onClick={toggle} className='flash-button'>
                        {
                            on ? <FlashOffIcon sx={{ fontSize: "15vmin" }} color="primary" />
                                : <FlashOnIcon sx={{ fontSize: "15vmin" }} color="primary" />
                        }
                    </IconButton> */}

                    <IconButton className='gallery-button'>
                        <Link 
                        to="/"
                        onClick={(event) => {
                            event.stopPropagation(); 
                            trackEvent('Camera', 'Exit camera click');
                        }}
                        >
                            <CloseIcon sx={{ fontSize: "15vmin" }} color="primary" className='' />
                        </Link>
                    </IconButton>

                    {/* instruction modal */}
                    <Modal
                        open={open}
                        onClose={handleClose}
                    >
                        <Box sx={instructionModalStyle}>
                            
                            <IconButton
                                aria-label="close"
                                onClick={handleClose}
                                sx={{
                                    position: 'absolute',
                                    right: 8,
                                    top: 8,
                                    color: (theme) => theme.palette.grey[500],
                                }}
                                >
                                <CloseIcon />
                            </IconButton>

                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                With the WHOLE receipt in view, <br />
                                Press the <br />
                                <CameraIcon sx={{ fontSize: "13vmin" }} color="primary" /> <br />
                                button below
                            </Typography>

                            <Button onClick={handleClose} variant="contained" sx={{ my: 2 }}>
                                Got it!
                            </Button>

                        </Box>
                    </Modal>

                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={backdropOpen}
                        onClick={handleBackdropClose}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>

                    <HelpPages fromPage={"Camera"}/>


                </div>
            )}
        </DeviceOrientation>
        </Container>
    );
}

export default Camera;