import React, { useState, useEffect, useContext } from "react";
import commonHttp from '../../shared/components/http-common';
import { baseURL } from '../../shared/components/http-common';
import { useLocation, useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box, TextField, Table, TableHead, TableRow, TableCell, TableContainer, TableBody } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useForm } from "react-hook-form";
import './Admin.css';

function ImageDetails(props) {
    const [imgFile, setImageFile] = useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [storeName, setStoreName] = useState(null);
    const [branchName, setBranchName] = useState(null);
    const [receiptDate, setReceiptDate] = useState(null);
    const [receiptTime, setReceiptTime] = useState(null);
    const [receiptDetails, setReceiptDetails] = useState(null);
    const { state } = useLocation();

    useEffect(() => {
        let userData = JSON.parse(localStorage.getItem('userData'));
        setIsLoading(true);
        const fetchImage = async () => {
            const res = await fetch(baseURL + '/receipts/fetchImage/' + state, {
                headers: {
                    Authorization: 'Bearer ' + userData.token
                }
            });
            const imageBlob = await res.blob();
            const imageObjectURL = URL.createObjectURL(imageBlob);
            setImageFile(imageObjectURL);
            setIsLoading(false);
        }
        fetchImage();
        commonHttp.get('/receipts/fetchDetailsByImage/' + state, {
            headers: {
                Authorization: 'Bearer ' + userData.token
            }
        }).then((response) => {
            setReceiptDetails(response.data);
            if (response.data !== null && response.data.length > 0) {
                setStoreName(response.data[0].store);
                setBranchName(response.data[0].store_branche);
                setReceiptDate(response.data[0].data);
                setReceiptTime(response.data[0].time);
            }
        });
    }, []);
    const handleSubmit = (event) => {

    };
    return (
        <Grid container>
            <Grid item xs={1} >
                <img className="photo" src="/android-chrome-512x512.png" alt=""></img>
            </Grid>
            <Grid item xs={11} >
                <Typography className='headerTypo' variant='h2'>MyFoodPrint</Typography>
            </Grid>
            <Grid item xs={6} className='image-container'>
                <img className='imageCont' src={imgFile} id="img" alt=""></img>
            </Grid>
            <Grid item xs={6} >
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 0, mr: 2 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={3}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="storeName"
                                label="Store Name"
                                value={storeName}
                                onChange={(event) => setStoreName(event.target.value)}
                                name="storeName"
                                autoComplete="storeName"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="branchName"
                                label="Branch Name"
                                name="branchName"
                                value={branchName}
                                onChange={(event) => setBranchName(event.target.value)}
                                autoComplete="branchName"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="receiptDate"
                                label="Receipt Date"
                                name="receiptDate"
                                value={receiptDate}
                                onChange={(event) => setReceiptDate(event.target.value)}
                                autoComplete="receiptDate"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="receiptTime"
                                label="Receipt Time"
                                name="receiptTime"
                                value={receiptTime}
                                onChange={(event) => setReceiptTime(event.target.value)}
                                autoComplete="receiptTime"
                                autoFocus
                            />
                        </Grid>
                    </Grid>
                </Box>
                <Grid item xs={12} sx={{ mt: 0, mr: 2 }}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ borderTop: '1px solid grey' }}>
                                    <TableCell sx={{ width: '10%' }}>Quantity</TableCell>
                                    <TableCell>Name On Receipt</TableCell>
                                    <TableCell sx={{ width: '25%' }}>Product Type</TableCell>
                                    <TableCell sx={{ width: '20%' }}>Item Weight(g)/<br />Volume(ml)</TableCell>
                                    <TableCell sx={{ width: '5%' }}>g/ml</TableCell>
                                    <TableCell sx={{ width: '10%' }}>Item Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {receiptDetails !== null && receiptDetails.map((receipt) => (
                                    <TableRow sx={{ borderTop: '1px solid grey' }}>
                                        <TableCell sx={{ width: '10%' }}>
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="quantity"
                                                label="Quantity"
                                                name="quantity"
                                                value={receipt.quantity}
                                                onChange={(event) => receipt.quantity = event.target.value}
                                                autoComplete="quantity"
                                                autoFocus
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="item_receipt_desc"
                                                label="Name On Receipt"
                                                name="item_receipt_desc"
                                                value={receipt.item_receipt_desc}
                                                onChange={(event) => receipt.item_receipt_desc = event.target.value}
                                                autoComplete="item_receipt_desc"
                                                autoFocus
                                            />
                                        </TableCell>
                                        <TableCell sx={{ width: '25%' }}>
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="item_product"
                                                label="Product Type"
                                                name="item_product"
                                                value={receipt.item_product}
                                                onChange={(event) => receipt.item_product = event.target.value}
                                                autoComplete="item_product"
                                                autoFocus
                                            />
                                        </TableCell>
                                        <TableCell sx={{ width: '20%' }}>
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="item_weight_g"
                                                label="Item Weight"
                                                name="item_weight_g"
                                                value={receipt.item_weight_g}
                                                onChange={(event) => receipt.item_weight_g = event.target.value}
                                                autoComplete="item_weight_g"
                                                autoFocus
                                            />
                                        </TableCell>
                                        <TableCell sx={{ width: '5%' }}>g/ml</TableCell>
                                        <TableCell sx={{ width: '10%' }}>
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="item_unit_price_gbp"
                                                label="Item Price"
                                                name="item_unit_price_gbp"
                                                value={receipt.item_unit_price_gbp}
                                                onChange={(event) => receipt.item_unit_price_gbp = event.target.value}
                                                autoComplete="item_unit_price_gbp"
                                                autoFocus
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {receiptDetails === null &&
                                    <TableRow sx={{ borderTop: '1px solid grey' }}>
                                        <TableCell colSpan={4}> No Details Found</TableCell>
                                    </TableRow>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Grid>
    );
}

export default ImageDetails;