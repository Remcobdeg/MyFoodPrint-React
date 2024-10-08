import React, { useState, useEffect, useContext } from "react";
import './Camera.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Modal, Box, Typography, Alert } from '@mui/material';
import commonHttp from '../../shared/components/http-common';
// import { baseURL } from '../../shared/components/http-common';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import HelpPages from '../../shared/components/HelpPages';
import { AuthContext } from '../../shared/context/authContext';
import { trackEvent } from '../../shared/modules/googleAnalyticsModules';


const popupStyle = {
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
    const [successOpen, setSuccessOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [receiptDate, setReceiptDate] = React.useState("NA");
    const [warningOpen, setWarningOpen] = React.useState(false); //refers to no data collected

    const { state } = useLocation();

    const auth = useContext(AuthContext);
    
    const navigate = useNavigate();

    const handleClose = (event) => {
        event.stopPropagation();
        trackEvent("Camera", "Close Success Message");
        setSuccessOpen(false);
        navigate('/');
    }


    useEffect(() => {

        const fetchImage = async () => { try {
            const res = await fetch(baseURL + '/receipts/fetchImage/' + state, {
                headers: {
                    Authorization: 'Bearer ' + auth.token
                }
            });
            const imageBlob = await res.blob();
            const imageObjectURL = URL.createObjectURL(imageBlob);
            setImageFile(imageObjectURL);
        } catch (err) {
            setError(true);
            setIsLoading(false);
        }};

        fetchImage();

        setIsLoading(true);

        try {
            commonHttp.get('/ocr/getDateFromImage/' + state, {
                headers: {
                    Authorization: 'Bearer ' + auth.token
                }
            }).then((response) => {
                setIsLoading(false);
                setReceiptDate(response.data);
                if (response.data === 'NA') {
                    trackEvent("Camera", "No date identified on receipt");
                    setWarningOpen(true);
                } 
            });
        } catch (err) {
            setIsLoading(false);
            setError(true);
        }

    }, [auth.token, state]);


    const removePhoto = (event) => {

        event.stopPropagation();
        trackEvent("Camera", "Remove Photo");

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

        // GA event
        event.preventDefault();
        trackEvent("Camera", "Save and Exit");

        setIsLoading(true); //display loading icon

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
                    setSuccessOpen(true); //function to display message that the data has been saved and will be processed
                    setTimeout(() => {
                        setSuccessOpen(false);
                        navigate('/');
                    }, 8000);         
                });
        } catch (err) {
            trackEvent("Camera", "Error Saving Receipt", err);
            setError(true);
            setIsLoading(false);
        }
    };


    return (
        <div className='img-container'>

            <img src={imgFile} id="img" alt="scanned receipt"></img>

            <div className="camera-button">
                <Button onClick={removePhoto} sx={{ width: '80vw', marginBottom: '1vh' }} color="error" variant="contained">Retry</Button>
                {/* <Link to="/camera"><Button sx={{width:'80vw', marginBottom:'1vh'}} color="primary" variant="contained">Next</Button></Link> */}
                <Button onClick={saveAndExit} sx={{ width: '80vw' }} color="success" variant="contained">Save & Exit</Button>
                {error && <Alert severity="error">Something went Wrong. Receipt wasn't saved!</Alert>}
            </div>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Modal
                open={warningOpen}
                onClose={() => { setWarningOpen(false); }}
            >
                <Box sx={popupStyle}>
                    <Typography style={{ color: 'red' }} variant="h6" component="h2">
                        Looks like the date of the receipt wasn't visible in the picture. If it's our error, just press save. Otherwise, please try again and capture the whole receipt, including the bottom bit with the date.
                    </Typography>
                </Box>
            </Modal>

            {/* success message */}
            <Modal
                open={successOpen}
                onClose={handleClose}
            >
                <Box sx={popupStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Thanks! Your data has been saved and will be processed. It should appear in your dashboard within 24h.
                    </Typography>
                    <Button onClick={handleClose} variant="contained" sx={{ my: 2 }}>
                        Got it!
                    </Button>
                </Box>
            </Modal>

            <HelpPages fromPage={"Camera"}/>

        </div>
    );
}

export default ImageCamera;