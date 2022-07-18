import React, { useState, useEffect, useContext } from "react";
import './Camera.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Modal, Box, Typography, Alert } from '@mui/material';
import commonHttp from '../../shared/components/http-common';
// import { baseURL } from '../../shared/components/http-common';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { AuthContext } from '../../shared/context/authContext';
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

const baseURL = process.env.REACT_APP_BACKEND_URL;


function ImageCamera(props) {
    const [imgFile, setImageFile] = useState(null);
    const [saveOpen, setSaveOpen] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [receiptDate, setReceiptDate] = React.useState("NA");
    const [snackdangerOpen, setSnackdangerOpen] = React.useState(false); //refers to no data collected
    const { state } = useLocation();
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchImage = async () => {
            const res = await fetch(baseURL + '/receipts/fetchImage/' + state, {
                headers: {
                    Authorization: 'Bearer ' + auth.token
                }
            });
            const imageBlob = await res.blob();
            const imageObjectURL = URL.createObjectURL(imageBlob);
            setImageFile(imageObjectURL);
        }
        fetchImage();
        setIsLoading(true);
        commonHttp.get('/ocr/getDateFromImage/' + state, {
            headers: {
                Authorization: 'Bearer ' + auth.token
            }
        }).then((response) => {
            setIsLoading(false);
            setReceiptDate(response.data);
            if (response.data === 'NA') {
                setSnackdangerOpen(true);
            }
        });
        setTimeout(() => {
            setSaveOpen(false);
        }, 1000);
    }, []);

    const removePhoto = () => {
        commonHttp.delete('/receipts/deleteImage/' + state, {
            headers: {
                Authorization: 'Bearer ' + auth.token
            }
        }).then((response) => {
            if (response.data === 'success') {
                navigate('/camera');
            }
        });
    }

    async function saveAndExit(event) {
        event.preventDefault();
        setIsLoading(true);
        try {
            commonHttp.post('/ocr/fetchDataFromImage',
                {
                    name: state,
                    date: receiptDate
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + auth.token
                    }
                })
                .then((response) => {
                    setIsLoading(false);
                    navigate('/');
                });
        } catch (err) {
            setError(true);
            setIsLoading(false);
        }
    };

    return (
        <div className='img-container'>
            <img src={imgFile} id="img" alt="/image.png"></img>
            <div className="camera-button">
                <Button onClick={removePhoto} sx={{ width: '80vw', marginBottom: '1vh' }} color="error" variant="contained">Retry</Button>
                {/* <Link to="/camera"><Button sx={{width:'80vw', marginBottom:'1vh'}} color="primary" variant="contained">Next</Button></Link> */}
                <Button onClick={saveAndExit} sx={{ width: '80vw' }} color="success" variant="contained">Save & Exit</Button>
                {error && <Alert severity="error">Something went Wrong!!! System could not process the image</Alert>}
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
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Modal
                open={snackdangerOpen}
                onClose={() => { setSnackdangerOpen(false); }}
            >
                <Box sx={style}>
                    <Typography style={{ color: 'red' }} variant="h6" component="h2">
                        Unable to fetch Date from the Image!!
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

export default ImageCamera;