import React, { useState, useEffect } from "react";
import './Camera.css';
import { useLocation,useNavigate,Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Modal, Box, Typography } from '@mui/material';
import commonHttp from '../../shared/components/http-common';
import {baseURL} from '../../shared/components/http-common';
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

function ImageCamera(props) {
    const [imgFile, setImageFile] = useState(null);
    const [saveOpen, setSaveOpen] = React.useState(true);
    const { state } = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchImage = async () => {
            const res = await fetch(baseURL+'/receipts/fetchImage/' + state);
            const imageBlob = await res.blob();
            const imageObjectURL = URL.createObjectURL(imageBlob);
            setImageFile(imageObjectURL);
        }
        setTimeout(() => {
            setSaveOpen(false);
        }, 1000);
        fetchImage()
            .catch(console.error);
    }, []);

    const removePhoto = () => {
        commonHttp.delete('/receipts/deleteImage/' + state).then((response) => {
            if(response.data === 'success') {
                navigate('/camera');
            }
        });
    }

    const saveAndExit = () => {
        
        navigate('/');
    }

    return (
        <div className='img-container'>
            <img src={imgFile} id="img" alt="/image.png"></img>
            <div className="camera-button">
                <Button onClick={removePhoto} sx={{width:'80vw', marginBottom:'1vh'}} color="error" variant="contained">Retry</Button>
                {/* <Link to="/camera"><Button sx={{width:'80vw', marginBottom:'1vh'}} color="primary" variant="contained">Next</Button></Link> */}
                <Button onClick={saveAndExit} sx={{width:'80vw'}} color="success" variant="contained">Save & Exit</Button>
            </div>
            <Modal
                open={saveOpen}
                onClose={() => { setSaveOpen(false); }}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Image has been captured <br />
                        and saved sucessfully
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

export default ImageCamera;