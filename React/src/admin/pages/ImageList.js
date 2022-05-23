import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Admin.css';
import {baseURL} from '../../shared/components/http-common';

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

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function ImageList() {
    const [imageList, setImageList] = React.useState(null);
    React.useEffect(() => {
        const fetchImage = async () => {
            const res = await fetch(baseURL+'/receipts/fetchImage');
            const imageBlob = await res.blob();
            const imageObjectURL = URL.createObjectURL(imageBlob);
            setImageList(imageObjectURL);
        }
        
        fetchImage()
            .catch(console.error);
    }, []);
    return (
        <div>
            <img className="photo" src="/admin_logo.png" alt=""></img>
            <TableContainer component={Paper} sx={{width:'98%', marginLeft:'1%'}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell sx={{width:'70%'}}>Image Name</StyledTableCell>
                            <StyledTableCell sx={{width:'15%'}} align="center">Date Uploaded</StyledTableCell>
                            <StyledTableCell sx={{width:'15%'}} align="center">Uploaded By</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.calories}</StyledTableCell>
                                <StyledTableCell align="center">{row.fat}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}