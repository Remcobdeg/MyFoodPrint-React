import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { fontWeight } from '@mui/system';

export default function AlternativesTable(props) {
    const data = props.data; 
    const maxfoodprint = Math.max(...data.map(item => item.value));

    const colorPercentage = (value) => {
        if(value>0){return("#2e7d32")}
        else if(value<0){return("#d32f2f")}
        else{return(null)}
    }

    const boldRow = (item) => {
        if(item === props.product){return(500)}
        else{return(null)}
    }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 350 }} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="left">gCO<sub>2</sub>e per 100g</TableCell>
            <TableCell align="right">Lower</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.text}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
            >
              <TableCell component="th" scope="row" sx={{fontWeight:boldRow(row.text)}}>
                {row.text}
              </TableCell>
              <TableCell sx={{m:0}} align="left" padding="none">
                <div style={{position: "relative", padding: 0, width:"180px", height:"25px"}}>
                    <svg width="180px" height="25px" style={{padding: 0}}>
                        <rect width={`${(row.value/maxfoodprint*180)}px`} height="25px" style={{fill: row.color}}/>
                        {/* <text fill="#000000de" font-size="1rem" font-family="Roboto" x="4" y="16">{row.value}</text> */}
                    </svg>
                    <div style={{position: "absolute", top:"0px", left:"0px", fontWeight:boldRow(row.text)}}>{row.value}</div>
                </div>
                </TableCell>
                <TableCell sx={{color: colorPercentage(row.lower), fontWeight:boldRow(row.text)}} align="right">{`${row.lower}%`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
