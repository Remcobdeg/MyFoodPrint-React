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
import {aggregateProducts, maxValue} from "../Modules/PrepVizData";
import { StyledHeader } from '../../shared/MuiStyledComponents/MuiStyledComponents';
import Legend from "../../img/Legend.svg";
import DateSlider from "../../shared/components/DateSlider";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { useTheme } from "@mui/material/styles";
import NoDataMessage from "../../shared/components/NoDataMessage";

import './Basket.css';

// to-do import data function that allows props date/week/month, date_format
// approach: create 

function Basket() {

  const auth = useContext(AuthContext);
  const nav = useContext(navContext);

  const theme = useTheme();

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
  const [dateIndex, setDateIndex] = useState(0);
  const [receipts, setReceipts] = useState([]);
  const [viewDate, setViewDate] = useState(new Date().toDateString());
  // const [vizData, setVizData] = useState([]);

  const navigate = useNavigate();

  const updateDateArray = (receiptsLocal = receipts, periodStateLocal = periodState) => {
    
      let dates;

      switch(periodStateLocal){
        case "day":
          dates = receiptsLocal.map(receipt => new Date(receipt.date.getFullYear(), receipt.date.getMonth(), receipt.date.getDate() ).toDateString());
          break;
        case "year":
          dates = receiptsLocal.map(receipt => new Date(receipt.date.getFullYear(), 0, 1 ).toDateString());
          break;
        default:
          dates = receiptsLocal.map(receipt => new Date(receipt.date.getFullYear(), receipt.date.getMonth(), 1 ).toDateString());
          break;
      }

      dates = [...new Set(dates)];
      // sort dates from most recent to oldest, because we want to display the most recent date by default
      dates = dates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
      setDateArray(dates);
      setDateIndex(0);
      setViewDate(dates[0])
    
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

        //assure .date is in date format
        response.forEach(receipt => {receipt.date = new Date(receipt.date)}); 

        setReceipts(response);

        updateDateArray(response);

        // setVizData(aggregateProducts(response, viewDate, periodState));

      } catch (err) {setReceipts("no receipts")}
    };
    fetchReceipts(); 
  }, [auth,sendRequest])

  // useEffect(() => {


  const handleChange = (event, newGraphState) => {
    if(newGraphState !== null){setGraphState(newGraphState)}; //don't allow selected button to be unselected, aka enforce value set
  };

  const handlePeriodChange = (event, newPeriodState) => {
    if(newPeriodState !== null){setPeriodState(newPeriodState)}; //don't allow selected button to be unselected, aka enforce value set
    updateDateArray(receipts, newPeriodState);
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

        {/* now the toggle buttons */}
        <Grid item textAlign="center" justifyContent="space-between" display="flex" xs={12} sx={{pb: '1em'}}>
          {/* <Box justifyContent="center" display="flex"> */}
            <GraphToggle handleChange={handleChange} graphState={graphState} /> 
            <PeriodToggle handlePeriodChange={handlePeriodChange} periodState={periodState}/>

          {/* </Box> */}
        </Grid>

        {receipts !== "no receipts" && 
          <Grid item>
            {/* <Typography variant="overline">{styleDisplayDate()}</Typography> */}
            <DateSlider 
              dateArray={dateArray} 
              dateIndex={dateIndex} 
              setDateIndex={setDateIndex} 
              viewDate={viewDate} 
              setViewDate={setViewDate} 
              periodState={periodState}/>
          </Grid>
        }

        {receipts !== "no receipts" && 
          <Grid item textAlign="center" className={(graphState === "WORDS")?"wordCloudBox":""} >
            {!isLoading && viewDate !== null && <Box sx={{border: 2, borderColor: 'primary.main', borderRadius: 2, display: "block"}}>
            
              <Typography variant="overline">Click an item to view alternatives.</Typography>

              
              {graphState === "WORDS" ? 

                <Box >
                  {/* <Wordcloud/> */}
                  <WordCloud 
                  data={aggregateProducts(receipts, periodState, viewDate)}
                  width={700}
                  // height={window.innerHeight * 0.7} //the component uses a square layout, setting this value does not seem to change anything
                  fontSize={(word) => Math.sqrt(word.value/maxValue(aggregateProducts(receipts, periodState, viewDate))) *80}
                  font="Fredoka"
                  fontWeight="bold"
                  fill={data => data.color}
                  rotate={function() { return ~~(Math.random() * 2) * 90; }}
                  onWordClick={handeProductClick}
                  padding={1}
                />
                </Box>
                :

                <BarChart data={aggregateProducts(receipts, periodState, viewDate)} handeProductClick={handeProductClick} />
              }

            <Box 
              sx={{display: 'inline-block', padding: '.5em'}} //, border: 1, borderColor: 'secondary.main', borderRadius: 2, mb:'64px'
              >
              <Typography variant="overline" sx={{color: '#9E9E9E'}}>Legend</Typography>
              <img src={Legend} alt="legend" className="legend"/>
            </Box>

            </Box>}
          </Grid>
        }
        
      </Grid>

      {/* <HelpButton fromPage = "Basket"/> */}
      <HelpPages fromPage={0}/>

      {receipts === "no receipts" && 
        <NoDataMessage/>
      }


    </React.Fragment>
  );
}



export default Basket;
