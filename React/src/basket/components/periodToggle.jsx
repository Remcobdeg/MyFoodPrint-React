import React from 'react';
import MuiToggleButton from '@mui/material/ToggleButton';
// import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {styled} from "@mui/material/styles";
import './graphToggle.css';

// define customized button
const ToggleButton = styled(MuiToggleButton)({
    height: '2em',
    // width: '8em',
    color: '#91C788',
    backgroundColor: '#FFFFFF',
    "&.Mui-selected, &.Mui-selected:hover": {
      color: "#FFFFFF",
      backgroundColor: '#91C788'
    }
  });

function PeriodToggle (props) {
    return(
        <div>
            <ToggleButtonGroup
                className="graphButton"
                size="medium"
                // color="primary"
                value={props.periodState}
                exclusive
                onChange={props.handlePeriodChange}
                // style={{position: 'fixed'}}
                
            >
                <ToggleButton value="day">DAY</ToggleButton>
                {/* <ToggleButton value="week">WEEK</ToggleButton> */}
                <ToggleButton value="month">MONTH</ToggleButton>
                <ToggleButton value="year">YEAR</ToggleButton>

            </ToggleButtonGroup>  
            
        </div>

    )
}

export default PeriodToggle;
