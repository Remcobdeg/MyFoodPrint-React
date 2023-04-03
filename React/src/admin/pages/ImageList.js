import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import './Admin.css';
import commonHttp from '../../shared/components/http-common';
import { Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function ImageList() {
    const [imageList, setImageList] = React.useState(null);
    const [arrayList, setArrayList] = React.useState([]);
    const [sortBy, setSortBy] = React.useState(1);
    const navigate = useNavigate();
    const handleSortByChange = (event) => {
        setSortBy(event.target.value);
        filterImageList(event.target.value);
    };
    const filterImageList = (sortBy) => {
        if (sortBy === 1)
            setArrayList(imageList);
        else if (sortBy === 2)
            setArrayList(imageList.filter(({ isChecked }) => isChecked === true));
        else if (sortBy === 3)
            setArrayList(imageList.filter(({ isChecked }) => isChecked === false));
    };

    const goToDetails = (fileName) => {
        navigate('/admin/imageDetails', { state: fileName });
    };

    React.useEffect(() => {
        let userData = JSON.parse(localStorage.getItem('userData'));
        const fetchImage = async () => { try {
            commonHttp.get('/receipts/fetch/ImageList', {
                headers: {
                    Authorization: 'Bearer ' + userData.token
                }
            }).then((response) => {
                setImageList(response.data);
                setArrayList(response.data);
            });
        } catch (error) {
            console.log(error);
        }
    }

        fetchImage()
            .catch(console.error);
    }, []);

    return (
        <div>
            <Grid container className="grid-container">
                <Grid item xs={1} >
                    <img className="photo" src="/android-chrome-512x512.png" alt=""></img>
                </Grid>
                <Grid item xs={7} >
                    <Typography className='headerTypo' variant='h2'>MyFoodPrint</Typography>
                </Grid>
                <Grid item xs={4}>
                    <FormControl className='selectChecked'>
                        <InputLabel id="sortBy">Sort By</InputLabel>
                        <Select
                            labelId="sortBy"
                            id="sortBy"
                            value={sortBy}
                            label="Sort By"
                            onChange={handleSortByChange}
                        >
                            <MenuItem value={1}>All</MenuItem>
                            <MenuItem value={2}>Checked Images</MenuItem>
                            <MenuItem value={3}>Unchecked Images</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <TableContainer component={Paper} sx={{ width: '98%', marginLeft: '1%', marginTop: '1%' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell sx={{ width: '70%' }}>Image Name</StyledTableCell>
                            <StyledTableCell sx={{ width: '15%' }} align="center">Date Uploaded</StyledTableCell>
                            <StyledTableCell sx={{ width: '15%' }} align="center">Uploaded By</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {arrayList !== null && arrayList.map((image) => (
                            <StyledTableRow key={image.fileName} style={image.isChecked ? { backgroundColor: 'lightgreen' } : { backgroundColor: 'lightpink' }}>
                                <StyledTableCell style={{color:'blue', cursor:'pointer'}} onClick={() => { goToDetails(image.fileName) }} component="th" scope="row">
                                    {image.fileName}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {image.date}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {image.userName}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}