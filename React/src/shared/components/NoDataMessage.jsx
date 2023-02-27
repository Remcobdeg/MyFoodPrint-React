import React from "react";

import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

export default function NoDataMessage() {
    const theme = useTheme();

    return (
        <div style={{justifyContent: "center", textAlign: "center"}}>
            <Typography align = "center" sx={{mt: 10, color: "rgba(0, 0, 0, 0.6)"}} variant="h6">
            You have no receipts yet. Add a receipt to see your foodprint.
            </Typography>
            <KeyboardDoubleArrowDownIcon sx={{fontSize: 100, color: theme.palette.primary.main, mt: 10}}/>
        </div>
    )
}