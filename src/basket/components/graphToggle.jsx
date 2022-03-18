import React from 'react';
import MuiToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {styled} from "@mui/material/styles";

// define customized button
const ToggleButton = styled(MuiToggleButton)({
    height: '2em',
    color: '#91C788',
    backgroundColor: '#F1F1F1',
    "&.Mui-selected, &.Mui-selected:hover": {
      color: "#FFFFFF",
      backgroundColor: '#91C788'
    }
  });

function GraphToggle (props) {
    return(
        <ToggleButtonGroup
            className="graphButton"
            size="large"
            color="primary"
            value={props.graphState}
            exclusive
            onChange={props.handleChange}
        >
            <ToggleButton value="WORDS">WORDS</ToggleButton>
            <ToggleButton value="CHART">CHART</ToggleButton>
        </ToggleButtonGroup>  
    )
}

export default GraphToggle;
