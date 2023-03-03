import './Camera.css';
import React, { useEffect, useRef, useContext } from 'react';
import CameraIcon from '@mui/icons-material/Camera';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import FlashOffIcon from '@mui/icons-material/FlashOff';
import CloseIcon from '@mui/icons-material/Close';
import { useTorchLight } from '@blackbox-vision/use-torch-light';
import { Modal, IconButton, Box, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import commonHttp from '../../shared/components/http-common';
import { useNavigate, Link } from "react-router-dom";
import DeviceOrientation from 'react-device-orientation';
import { AuthContext } from '../../shared/context/authContext';
import Alert from '@mui/material/Alert';

const style = {
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
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const streamRef = useRef(null);
    const [on, toggle] = useTorchLight(streamRef.current);
    const [open, setOpen] = React.useState(true);
    const [backdropOpen, setBackdropOpen] = React.useState(false);
    // const [cameraDirection, setCameraDirection]
    const auth = useContext(AuthContext);
    const handleClose = () => setOpen(false);
    const handleBackdropClose = () => setBackdropOpen(false);
    const navigate = useNavigate();
    const getVideo = () => {
        navigator.mediaDevices
            .getUserMedia({
                video: { width: { ideal: 1920 }, height: { ideal: 1080 }, facingMode: {ideal: 'environment'}} //change to user on laptop, environment on phone
            })
            .then(stream => {
                let video = videoRef.current;
                video.srcObject = stream;
                streamRef.current = stream;
                video.play();
            })
    }

    const takePhoto = () => {
        setBackdropOpen(true);
        const width = 1080;
        const height = 1920;
        let video = videoRef.current;
        let photo = photoRef.current;
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
            alert(err)
        }
    }

    useEffect(() => {
        getVideo();
        setTimeout(() => {
            handleClose();
        }, 2000);
    }, [videoRef, streamRef]);

    return (
        <DeviceOrientation>
            {({ absolute, alpha, beta, gamma }) => (
                <div className='video-container'>
                    <video ref={videoRef}></video>
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
  
                    <IconButton onClick={toggle} className='flash-button'>
                        {
                            on ? <FlashOffIcon sx={{ fontSize: "15vmin" }} color="primary" />
                                : <FlashOnIcon sx={{ fontSize: "15vmin" }} color="primary" />
                        }
                    </IconButton>
                    <IconButton className='gallery-button'>
                        <Link to="/"><CloseIcon sx={{ fontSize: "15vmin" }} color="primary" className='' /></Link>
                    </IconButton>
                    <canvas ref={photoRef}></canvas>
                    <Modal
                        open={open}
                        onClose={handleClose}
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                With the WHOLE receipt in view, <br />
                                Press the <br />
                                <CameraIcon sx={{ fontSize: "13vmin" }} color="primary" /> <br />
                                button below
                            </Typography>
                        </Box>
                    </Modal>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={backdropOpen}
                        onClick={handleBackdropClose}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </div>
            )}
        </DeviceOrientation>
    );
}

export default Camera;