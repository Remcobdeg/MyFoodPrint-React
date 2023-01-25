import React from "react";
import { Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";


export default function HelpCard(props) {
  return (
    <Paper
      elevation={1}
      className="help-card"
      variant="outlined"
      style={{ backgroundColor: props.color }}
    >
        {/* add an icon in front of text */}
        <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={1}>
                <Typography variant="h6">{props.iconplaceholder1}</Typography>
            </Grid>
            <Grid item xs={10}>
                <Typography variant="h6">{props.title}</Typography>
            </Grid>
            <Grid item xs={1}>
                <Typography variant="h6">{props.iconplaceholder2}</Typography>
            </Grid>
        </Grid>
      <Typography variant="h5">{props.title}</Typography>
      <Typography variant="body1">{props.text}</Typography>
    </Paper>
  );
}