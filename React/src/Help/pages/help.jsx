import React from "react";
import { Typography } from "@mui/material";
import { StyledHeader } from "../../shared/MuiStyledComponents/MuiStyledComponents";
import HelpCard from "../components/HelpCard";

import "./Help.css";

// page has title, components that contain the help for each page
// each component has an icon, title, and text
// components have subcomponents that are the help for each section of the page -- these can be expanded/collapsed

export default function Help() {
  return (
    <div>
        <StyledHeader variant="h2">Help</StyledHeader>
        <HelpCard 
            title="Help" 
            text="This is the help page. It will contain help for each page of the app."
            iconplaceholder1="A"
            iconplaceholder2="A"
        />
    </div>
  );
}