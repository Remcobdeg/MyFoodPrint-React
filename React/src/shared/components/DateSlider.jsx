import React from "react";
import Fab from '@mui/material/Fab';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Typography from '@mui/material/Typography';
import { Grid } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

export default function DateSlider(props) {

    const styleDisplayDate = () => {
    
        let displayDate;
    
        switch(props.periodState){
          case "day":
            displayDate = new Date(props.viewDate).toDateString();
            break;
          case "year":
            displayDate = new Date(props.viewDate).getFullYear();
            break;
          default:
            displayDate = new Date(props.viewDate).toLocaleString('default', { month: 'long' }) + " " + new Date(props.viewDate).getFullYear();
            break;
        }
    
        return displayDate;
      }

    const clickPrevious = () => {
        if (props.dateIndex < props.dateArray.length - 1){
            props.setDateIndex(props.dateIndex + 1);
            props.setViewDate(props.dateArray[props.dateIndex + 1]);
        } else {
            props.setDateIndex(0);
            props.setViewDate(props.dateArray[0]);
        }
    }

    const clickNext = () => {
        if (props.dateIndex > 0){
            props.setDateIndex(props.dateIndex - 1);
            props.setViewDate(props.dateArray[props.dateIndex - 1]);
        } else {
            props.setDateIndex(props.dateArray.length - 1);
            props.setViewDate(props.dateArray[props.dateArray.length - 1]);
        }
    }

    const backDisabled = props.dateIndex === props.dateArray.length - 1;
    const forwardDisabled = props.dateIndex === 0;

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={3} textAlign="right" justifyContent="right">
                    <Tooltip title={backDisabled?"No older data available":""}>
                        <span>
                            <Fab 
                            onClick={clickPrevious}
                            disabled={backDisabled}
                            size="small" 
                            color="primary" 
                            aria-label="previous">
                                <ArrowBackIosIcon/>
                            </Fab>
                        </span>
                    </Tooltip>
                </Grid>
                <Grid item xs={6} textAlign="center" justifyContent="space-between" >
                    <Typography variant="overline">{styleDisplayDate()}</Typography>
                </Grid>
                <Grid item xs={3} textAlign="left" justifyContent="left">
                    <Tooltip title={forwardDisabled?"No newer data available":""}>
                        <span>
                            <Fab 
                            onClick={clickNext}
                            disabled={forwardDisabled}
                            // variant="extended" 
                            size="small" 
                            color="primary" 
                            aria-label="next">
                                <ArrowForwardIosIcon/>
                            </Fab>
                        </span>
                    </Tooltip>

                </Grid>
            </Grid>
        </div>
    );
}