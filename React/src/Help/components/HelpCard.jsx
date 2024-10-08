import React, {useState} from "react";
import { Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpCardContent from "./HelpCardContent";

import "./HelpCard.css";

export const HelpCard = React.forwardRef((props, ref) => {
    const [expanded, setExpanded] = useState(true);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

  return (
    <Paper
      elevation={0}
      className="help-card"
      variant="outlined"
      style={{ backgroundColor: props.color }}
      ref={ref}
    >
        {/* add an icon in front of text */}
        {/* <div className="help-card-header">
            <Icon className="help-card-icon">{props.icon}</Icon>
            <Typography variant="h6" >{props.title}</Typography>

        </div> */}
        <Grid container direction="row" className="help-card-header" justifyContent="center" alignItems="center" onClick={handleExpandClick}>
            <Grid item xs={2} textAlign= "center" >
                <Icon color="primary">{props.icon}</Icon>
            </Grid>
            <Grid item xs={8}>
                <Typography variant="h6" >{props.title}</Typography>
                {/* {expanded && <HelpCardContent />} */}
            </Grid>
            <Grid item xs={2} textAlign= "center">
                {expanded ? <ExpandMoreIcon sx={{transform: "rotate(0deg)"}}/> : <ExpandMoreIcon sx={{transform: "rotate(-90deg)"}}/>}
            </Grid>
        </Grid>
        <Grid container direction="row" className="help-card-content-container" justifyContent="center" alignItems="center">
            <Grid item xs={2}>
            </Grid>
            <Grid item xs={10}>
                {expanded && props.content.map((item, index) => {return <HelpCardContent key={index} topic={item.topic} text={item.text} textDetail={item.textDetail} links={item.links}/>})}
            </Grid>
        </Grid>
        {/* {expanded && <Typography variant="body1">{props.text}</Typography>} */}
        

    </Paper>
  );
})