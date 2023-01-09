import React, {useState, useContext, useEffect} from "react";
import GraphToggle from "../components/graphToggle";
import WordCloud from "react-d3-cloud";
import BarChart from "../components/BarChart";
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Button, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'
import { AuthContext } from '../../shared/context/authContext';
import {useHttpClient} from '../../shared/hooks/http-hook';
import { useNavigate } from 'react-router-dom';
 
import {prepVizData, maxValue} from "../Modules/PrepVizData";

import './Basket.css';

// to-do import data function that allows props date/week/month, date_format

function Basket() {

  const auth = useContext(AuthContext);

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
  const [receipts, setReceipts] = useState([]);

  const navigate = useNavigate();

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
      } catch (err) {}
    };
    fetchReceipts(); 
  }, [auth,sendRequest])


  const handleChange = (event, newGraphState) => {
    if(newGraphState !== null){setGraphState(newGraphState)}; //don't allow selected button to be unselected, aka enforce value set
  };

  const handeProductClick = (event, d) => {
    navigate('/Alternatives', {state: d.text.toLowerCase()})
  };

  return (
    <Container sx={{pb:7}}>
      <Grid 
        container
        direction="column"
        // justifyContent="center"
        // alignItems="center"
        >
        
        <Grid item textAlign="center" justifyContent="center" display="flex" xs={12}>
          {/* <Box justifyContent="center" display="flex"> */}
            <GraphToggle handleChange={handleChange} graphState={graphState} /> 
          {/* </Box> */}
        </Grid>

        <Grid item textAlign="center" justifyContent="center">
          <Typography variant="overline">Where does your foodprint come from?</Typography>
        </Grid>

        <Grid item>
          {!isLoading && <div className="graph">
            
            {graphState === "WORDS" ? 

              <Box sx={{height: "50vh"}}>
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

        {/* <Grid item> 
          <Box sx={{border: 1, borderColor: 'secondary.main', borderRadius: 2}}>
            <p>temp</p>
          </Box>
        </Grid> */}
        
      </Grid>

      <Fab color="primary" aria-label="help" 
        style={{
          margin: 0,
          top: 'auto',
          right: 20,
          bottom: '10vh',
          left: 'auto',
          position: 'fixed'
        }}
        > 
        <QuestionMarkIcon />
      </Fab>




    </Container>
  );
}



export default Basket;
