import React, {useState} from "react";
import WordCloud from "react-d3-cloud";
import MuiToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled } from "@mui/material/styles";

import {prepVizData, allBaskets, maxValue} from "../../Modules/PrepVizData";

import './Basket.css';

const ToggleButton = styled(MuiToggleButton)({
  color: '#91C788',
  backgroundColor: '#F1F1F1',
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "#FFFFFF",
    backgroundColor: '#91C788'
  }
});

// to-do import data function that allows props date/week/month, date_format

function Basket() {
  const [graphState, setGraphState] = React.useState('WORDS');

  const handleChange = (event, newGraphState) => {
    setGraphState(newGraphState);
  };

  return (
    <div>
      <ToggleButtonGroup
        className="graphButton"
        size="small"
        color="primary"
        value={graphState}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="WORDS">WORDS</ToggleButton>
        <ToggleButton value="CHART">CHART</ToggleButton>
      </ToggleButtonGroup>

      <WordCloud 
        data={prepVizData()}
        fontSize={(word) => Math.sqrt(word.value/maxValue(prepVizData())) *100}
        font="Fredoka"
        fontWeight="bold"
        fill={data => data.color}
        // rotate={0}
      />
    </div>
  );
}

export default Basket;
