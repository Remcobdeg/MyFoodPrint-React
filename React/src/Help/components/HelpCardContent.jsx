import React from "react";
import { Typography } from "@mui/material";

export default function HelpCardContent(props) {
  return (
    <div>
        <Typography variant="button"  display="block" gutterBottom>
            {props.topic}
        </Typography>
        <Typography variant="body1"  display="block" gutterBottom>
            {props.text}
        </Typography>
        <br/>
    </div>
  );
}