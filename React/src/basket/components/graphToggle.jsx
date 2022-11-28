import React from 'react';
import MuiToggleButton from '@mui/material/ToggleButton';
// import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {styled} from "@mui/material/styles";
import './graphToggle.css';

import FixedContainer from './FixedContainer';

// define customized button
const ToggleButton = styled(MuiToggleButton)({
    height: '2em',
    width: '8em',
    color: '#91C788',
    backgroundColor: '#FFFFFF',
    "&.Mui-selected, &.Mui-selected:hover": {
      color: "#FFFFFF",
      backgroundColor: '#91C788'
    }
  });

function GraphToggle (props) {
    return(
        <div>
            <ToggleButtonGroup
                className="graphButton"
                size="medium"
                // color="primary"
                value={props.graphState}
                exclusive
                onChange={props.handleChange}
                // style={{position: 'fixed'}}
                
            >
                <ToggleButton value="WORDS">WORDS</ToggleButton>
                <ToggleButton value="CHART">CHART</ToggleButton>
            </ToggleButtonGroup>  
            
        </div>

    )
}

export default GraphToggle;
