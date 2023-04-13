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
import { Modal, IconButton, Box, Button, Typography } from '@mui/material';
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
import { useCameraRatio } from '../../shared/hooks/useCameraRatio';
import { useOffsets } from '../../shared/hooks/useOffsets';
import Measure from 'react-measure';

const CAPTURE_OPTIONS = {
    audio: false,
    video: { facingMode: "environment" },
    // width: { ideal: 1920 }, 
    // height: { ideal: 1080 }
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
    const photoRef = useRef(null);
    // const streamRef = useRef(null);

    const mediaStream = useUserMedia(CAPTURE_OPTIONS);

    // const [on, toggle] = useTorchLight(streamRef.current);
    const [open, setOpen] = useState(true);
    const [backdropOpen, setBackdropOpen] = useState(false);
    const [container, setContainer] = useState({ width: 0 });
    const [aspectRatio, calculateRatio] = useCameraRatio(9/16); // default portrait ratio
    const offsets = useOffsets(
        videoRef.current && videoRef.current.videoWidth,
        videoRef.current && videoRef.current.videoHeight,
        container.width,
        container.height
      );


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

    function handleResize(contentRect) {
        console.log("resizing")
        console.log("contentRect = ",contentRect)
        console.log("videoHeight = ",videoRef.current.videoHeight, " and videoWidth = ",videoRef.current.videoWidth)
        console.log("contentRect.bounds.height = ",contentRect.bounds.height, " and contentRect.bounds.width = ",contentRect.bounds.width)
        console.log("aspectRatio = ",aspectRatio)
        console.log("Math.round(contentRect.bounds.height * aspectRatio) = ",Math.round(contentRect.bounds.height * aspectRatio))

        setContainer({
            width: Math.round(contentRect.bounds.height * aspectRatio)
        });
    }
    
    function handleCanPlay() {
        console.log("can play")
        console.log("videoHeight = ",videoRef.current.videoHeight, " and videoWidth = ",videoRef.current.videoWidth)
        calculateRatio(videoRef.current.videoHeight, videoRef.current.videoWidth);
        videoRef.current.play();
    }

    const takePhoto = (event) => {

        event.stopPropagation();
        trackEvent('Camera', 'Take Photo');

        setBackdropOpen(true);

        let video = videoRef.current;
        let photo = photoRef.current;

        const width = 1080;
        const height = 1920;
        photo.width = width;
        photo.height = height;

        let ctx = photo.getContext('2d');
        ctx.drawImage(video, 0, 0, width, height);
        let dataURL = photoRef.current.toDataURL('image/jpeg');
        let imageFile = dataURItoFile(dataURL);
        let fd = new FormData();
        fd.append("imageFile", imageFile);

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
        
        <DeviceOrientation>
            {({ absolute, alpha, beta, gamma }) => (
                <div>

                    <Measure bounds onResize={handleResize}>
                        {({ measureRef }) => (
                        
                            <div ref={measureRef} style={{ width: `${container.width}px`, overflow: "hidden"}} > 
                                {/*  className='video-container'*/}

                                <video 
                                    ref={videoRef} 
                                    onCanPlay={handleCanPlay} 
                                    autoPlay 
                                    playsInline 
                                    muted
                                    style={{ top: `-${offsets.y}px`, left: `-${offsets.x}px`, position: "absolute" }}                                    
                                />

                            </div>
                        )}
                    </Measure>
                                
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

                    <canvas ref={photoRef}></canvas>

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

    );
}

export default Camera;