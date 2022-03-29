import React, {useState} from "react";
import GraphToggle from "../components/graphToggle";
import WordCloud from "react-d3-cloud";
import BarChart from "../components/BarChart";

import {prepVizData, allBaskets, maxValue} from "../../Modules/PrepVizData";

import './Basket.css';

// to-do import data function that allows props date/week/month, date_format

function Basket() {
  const [graphState, setGraphState] = useState('WORDS');

  const handleChange = (event, newGraphState) => {
    if(newGraphState !== null){setGraphState(newGraphState)}; //don't allow selected button to be unselected, aka enforce value set
  };

  return (
    <div>
    
      <GraphToggle handleChange={handleChange} graphState={graphState} /> 

      <div className="graph">
        
        {graphState === "WORDS" ? 

          <WordCloud 
            data={prepVizData()}
            fontSize={(word) => Math.sqrt(word.value/maxValue(prepVizData())) *100}
            font="Fredoka"
            fontWeight="bold"
            fill={data => data.color}
            // rotate={0}
          /> :

          <BarChart data={prepVizData()} />
        }

      </div>

    </div>
  );
}

export default Basket;
