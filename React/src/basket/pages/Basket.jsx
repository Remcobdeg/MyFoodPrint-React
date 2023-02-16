import React, {useState, useContext, useEffect} from "react";
import GraphToggle from "../components/graphToggle";
import PeriodToggle from "../components/periodToggle";
import WordCloud from "react-d3-cloud";
import BarChart from "../components/BarChart";
import { Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'
import { AuthContext } from '../../shared/context/authContext';
import { navContext } from "../../shared/context/navContext";
import {useHttpClient} from '../../shared/hooks/http-hook';
import { useNavigate } from 'react-router-dom';
import HelpPages from "../../shared/components/HelpPages"; 
import {prepVizData, maxValue} from "../Modules/PrepVizData";
import { StyledHeader } from '../../shared/MuiStyledComponents/MuiStyledComponents';
import Legend from "../../img/Legend.svg";

import './Basket.css';

// to-do import data function that allows props date/week/month, date_format
// approach: create 

function Basket() {

  const auth = useContext(AuthContext);
  const nav = useContext(navContext);

  // const receiptSchema = {
  //   "_id": "627131d609fa9b1ef5cb5399",
  //   "date": "2017-02-22",
  //   "time": "22:49:09",
  //   "store": "Tesco",
  //   "item_group": "AMBIENT DRY GROCERY",
  //   "item_subgroup": "PASTA",
  //   "item_product": "NO DATA YET",
  //   "item_product_detail": "Tesco Value Lasagne Sheets 250g",
  //   "item_footprint_g_100g": 240,
  //   "item_kcal_100g": 360,
  //   "item_weight_g": 250,
  //   "item_unit_price_gbp": 0.29,
  //   "item_units": 1,
  //   "item_footprint_sourcenote": "NULL",
  //   "user": "627130cc09fa9b1ef5cb5395",
  //   "__v": 0,
  //   "id": "627131d609fa9b1ef5cb5399"
  // }

  const { isLoading, error, sendRequest } = useHttpClient();
  const [graphState, setGraphState] = useState('WORDS');
  const [periodState, setPeriodState] = useState('month');
  const [dateArray, setDateArray] = useState([]);
  const [receipts, setReceipts] = useState([]);

  const navigate = useNavigate();

  const updateDateArray = () => {
    
      switch(periodState){
        case "day":
          let dates = receipts.map(receipt => {receipt.date = new Date(receipt.date.getFullYear(), receipt.date.getMonth(), receipt.date.getDate() ).toDateString()});
          dates = [...new Set(dates.map(date => date.date))];
          dates = dates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
          setDateArray(dates);
          break;

        case "year":
          let years = receipts.map(receipt => {receipt.date = new Date(receipt.date.getFullYear(), 0, 1 ).toDateString()});
          years = [...new Set(years.map(year => year.date))];
          years = years.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
          setDateArray(years);
          break;
        default:
          let months = receipts.map(receipt => {receipt.date = new Date(receipt.date.getFullYear(), receipt.date.getMonth(), 1 ).toDateString()});
          months = [...new Set(months.map(month => month.date))];
          months = months.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
          setDateArray(months);
          break;
      }
    
  }


  useEffect(() => {
    const fetchReceipts = async () => {
      try{
        const responseData = await sendRequest(
          "/receipts/user/" + auth.userId,
          'get',
          {},
          {
            "Content-type": "application/json",
            Authorization: 'Bearer ' + auth.token
          }
        )
        const response = responseData.data.receipts;
        setReceipts(response);

        updateDateArray();
        console.log(dateArray);

      } catch (err) {}
    };
    fetchReceipts(); 
  }, [auth,sendRequest])


  const handleChange = (event, newGraphState) => {
    if(newGraphState !== null){setGraphState(newGraphState)}; //don't allow selected button to be unselected, aka enforce value set
  };

  const handlePeriodChange = (event, newPeriodState) => {
    if(newPeriodState !== null){setPeriodState(newPeriodState)}; //don't allow selected button to be unselected, aka enforce value set
  };

  const handeProductClick = (event, d) => {
    nav.setPage("Alternatives");
    navigate('/Alternatives', {state: d.text.toLowerCase()})
  };

  return (
    <React.Fragment >
      <StyledHeader variant="h4">Your purchases</StyledHeader> 
      <Grid 
        container
        direction="column"
        // justifyContent="center"
        // alignItems="center"
        >
        <Grid item textAlign="left" justifyContent="left">
          <Typography variant="overline">Where does your foodprint come from?</Typography>
        </Grid>

        <Grid item textAlign="center" justifyContent="space-between" display="flex" xs={12} sx={{pb: '1em'}}>
          {/* <Box justifyContent="center" display="flex"> */}
            <GraphToggle handleChange={handleChange} graphState={graphState} /> 
            <PeriodToggle handlePeriodChange={handlePeriodChange} periodState={periodState} />

          {/* </Box> */}
        </Grid>

        <Grid item className={(graphState === "WORDS")?"wordCloudBox":""}>
          {!isLoading && <div className="graph">
            
            {graphState === "WORDS" ? 

              <Box >
                {/* <Wordcloud/> */}
                <WordCloud 
                data={prepVizData(receipts)}
                // height={window.innerHeight * 0.7} //the component uses a square layout, setting this value does not seem to change anything
                fontSize={(word) => Math.sqrt(word.value/maxValue(prepVizData(receipts))) *100}
                font="Fredoka"
                fontWeight="bold"
                fill={data => data.color}
                rotate={function() { return ~~(Math.random() * 2) * 90; }}
                onWordClick={handeProductClick}
              />
              </Box>
               :

              <BarChart data={prepVizData(receipts)} handeProductClick={handeProductClick} />
            }

          </div>}
        </Grid>

        <Grid item textAlign="center" > 
          <Box sx={{border: 1, borderColor: 'secondary.main', borderRadius: 2, display: 'inline-block', padding: '.5em', mb:'64px'}}>
            <Typography variant="overline" sx={{color: '#9E9E9E'}}>Legend</Typography>
            <img src={Legend} alt="legend" className="legend"/>
          </Box>
        </Grid>
        
      </Grid>

      {/* <HelpButton fromPage = "Basket"/> */}
      <HelpPages fromPage={0}/>



    </React.Fragment>
  );
}



export default Basket;
