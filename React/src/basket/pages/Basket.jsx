import React, {useState, useContext, useEffect} from "react";
import GraphToggle from "../components/graphToggle";
import WordCloud from "react-d3-cloud";
import BarChart from "../components/BarChart";
import http from "../../shared/components/http-common"
import { AuthContext } from '../../shared/context/authContext';
import axios from 'axios';
 
import {prepVizData, maxValue} from "../Modules/PrepVizData";

import './Basket.css';

// to-do import data function that allows props date/week/month, date_format

function Basket() {

  const auth = useContext(AuthContext);

  const [graphState, setGraphState] = useState('WORDS');
  const [isLoading, setIsLoading] = useState(true);

  const receiptSchema = {
    "_id": "627131d609fa9b1ef5cb5399",
    "date": "2017-02-22",
    "time": "22:49:09",
    "store": "Tesco",
    "item_group": "AMBIENT DRY GROCERY",
    "item_subgroup": "PASTA",
    "item_product": "DRY PASTA",
    "item_product_detail": "Tesco Value Lasagne Sheets 250g",
    "item_footprint_g_100g": 240,
    "item_kcal_100g": 360,
    "item_weight_g": 250,
    "item_unit_price_gbp": 0.29,
    "item_units": 1,
    "item_footprint_sourcenote": "NULL",
    "user": "627130cc09fa9b1ef5cb5395",
    "__v": 0,
    "id": "627131d609fa9b1ef5cb5399"
}

  const [receipts, setReceipts] = useState([receiptSchema]);

  useEffect(() => {
    const fetchReceipts = async () => {
      try{
        const responseData = await axios({
          method: 'get',
          url: "http://localhost:5000/api" + "/receipts/user/" + auth.userId,
          data: {},
          headers: {
            "Content-type": "application/json",
            Authorization: 'Bearer ' + auth.token
          }
        });  
        const response = responseData.data.receipts;
        setReceipts(response);
        setIsLoading(false);
      } catch (err) {
        console.log(err)
      }
    };
    fetchReceipts(); 
  }, [auth.userId,auth.token])


  const handleChange = (event, newGraphState) => {
    if(newGraphState !== null){setGraphState(newGraphState)}; //don't allow selected button to be unselected, aka enforce value set
  };

  return (
    <div>
    
      <GraphToggle handleChange={handleChange} graphState={graphState} /> 

      {!isLoading && <div className="graph">
        
        {graphState === "WORDS" ? 

          <WordCloud 
            data={prepVizData(receipts)}
            fontSize={(word) => Math.sqrt(word.value/maxValue(prepVizData(receipts))) *100}
            font="Fredoka"
            fontWeight="bold"
            fill={data => data.color}
            // rotate={0}
          /> :

          <BarChart data={prepVizData(receipts)} />
        }

      </div>}

    </div>
  );
}

export default Basket;
