import React, {useState, useEffect, useContext, useRef, useCallback} from 'react';
import {useHttpClient} from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/authContext';
// import DateExt from '../../shared/models/dateExt';
import ChartAv100g from '../components/ChartAv100g';
// import D3ZoomTest from '../components/D3ZoomTest';
import IconButton from '@mui/material/IconButton';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
//import HelpIcon from '@mui/icons-material/Help';
import Help from '../components/Help'
import HelpPages from '../../shared/components/HelpPages';
import NoDataMessage from '../../shared/components/NoDataMessage';
import { StyledHeader } from '../../shared/MuiStyledComponents/MuiStyledComponents';
import { Tooltip } from '@mui/material';
import colorLegend from '../../img/color_legend_stats.png';
import { trackEvent } from '../../shared/modules/googleAnalyticsModules';




import './stats.css';





export default function Stats (props){

    const auth = useContext(AuthContext);
  
    const { isLoading, error, sendRequest } = useHttpClient();
    const [receipts, setReceipts] = useState([{}]);
    const [period, setPeriod] = useState({minDate: new Date(), maxDate: new Date(), firstDate: new Date(), lastDate: new Date()});
    const [graphWidth, setGraphWidth] = useState(null);

    const graphPaper = node => {
        if (node !== null) {
          setGraphWidth(node.getBoundingClientRect().width);
        }
      };

  
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
          const response = responseData.data.receipts.filter(receipt => isNaN(new Date(receipt.date)) === false); //only keep actual dates

          setReceipts(response);

          setPeriod(()=>{
                console.log("responsedates",response.map(receipt => (receipt.date)));
                const dates = response.map(receipt => new Date(receipt.date));
                const lastDate = new Date(Math.max.apply(null,dates));
                const firstDate = new Date(Math.min.apply(null,dates));
                const maxDate = lastDate;
                const minDate = new Date( new Date(maxDate).setDate(maxDate.getDate()-6));
                console.log("dates",dates,"minDate",minDate,"maxDate",maxDate,"firstDate",firstDate,"lastDate",lastDate)
              return {minDate:minDate,maxDate:maxDate,firstDate:firstDate,lastDate:lastDate}
          })
        } catch (err) {
            trackEvent("stats.jsx", "no receipts retrieved", err.message);
            setReceipts("no receipts");
        }
      };
      fetchReceipts(); 
    }, [auth,sendRequest])

    const aggregateForStats = (purchases, timeFrame = "day", periodStart = "2022-05-01",periodEnd = "2022-05-31") => {

        //assure .date is in date format
        purchases.forEach(purchase => {purchase.date = new Date(purchase.date)});     
 
        
        if(timeFrame === "day"){

            //harmonise purchase momements by day 
            purchases.forEach(purchase => {purchase.date = new Date(purchase.date.getFullYear(), purchase.date.getMonth(), purchase.date.getDate() ).toDateString()});

            const purchaseDays = [...new Set(purchases.map(purchase => purchase.date))];

            purchaseDays.sort((d1, d2) => new Date(d1).getTime() - new Date(d2).getTime());

            const dayAggr = purchaseDays.map(day => {
                const datePurchases = purchases.filter(purchase => purchase.date === day);
                const totalWeight = datePurchases.reduce((total, item) => total + item.item_weight_g * item.item_units,0);
                const meanFoodprint = datePurchases.reduce((total, item) => total + item.item_footprint_g_100g * item.item_weight_g/100 * item.item_units,0)/totalWeight*100;
                let color;
                if (meanFoodprint < 300) {
                    (color = "#B2EA70")
                } else if (meanFoodprint < 600) {
                    (color = "#FBD148")
                } else if (meanFoodprint < 1000) {
                    (color = "#F9975D")
                } else {
                    (color = "#C85C5C")
                }
                return({date:day, footprint: Math.round(meanFoodprint), color:color});
            })                
                

            // console.log("weight: "+purchases.map(purchase => purchase.item_weight_g*purchase.item_units))
            // console.log("footprint: "+purchases.map(purchase => purchase.item_footprint_g_100g))
            // console.log(dayAggr);
            return(dayAggr)

            // //create an array of all dates in the period
            // let dayArray = []; let day;
            // for(day = new Date(periodStart); day <= new Date(periodEnd); day.setDate(day.getDate()+1)){dayArray.push(new Date(day));}
            
            // const dayFootprint = dayArray.map(day => {
            //     const datePurchases = purchases.filter(purchase => new Date(purchase.date).getDate() === day);
            //     const totalWeight = datePurchases.reduce((total, item) => total + item.item_weight_g,0);
            //     const meanFoodprint = datePurchases.reduce((total, item) => total + item.item_footprint_g_100g,0)/totalWeight;
            //     return(meanFoodprint);                
            //     })

            //     console.log(dayFootprint);

            //we'll visualize 7 days (mon-sun). each day gets a value. if null --> 0
            //below the x-axis we will show the date range (e.g. 14-05-2022 to 20-05-2022)
        }

        // if(timeFrame === "week"){

        //     //harmonise purchase momements by day 
        //     purchases.forEach(purchase => {purchase.date = new Date(purchase.date.getFullYear(), purchase.date.getMonth(), purchase.date.getDate() ).toDateString()});

        //     const purchaseDays = [...new Set(purchases.map(purchase => purchase.date))];


        //     const dayAggr = purchaseDays.map(day => {
        //         const datePurchases = purchases.filter(purchase => purchase.date === day);
        //         const totalWeight = datePurchases.reduce((total, item) => total + item.item_weight_g * item.item_units,0);
        //         const meanFoodprint = datePurchases.reduce((total, item) => total + item.item_footprint_g_100g * item.item_weight_g/100 * item.item_units,0)/totalWeight*100;
        //         return({day:day, footprint: Math.round(meanFoodprint)});                
        //         })

        //     console.log("weight: "+purchases.map(purchase => purchase.item_weight_g*purchase.item_units))
        //     console.log("footprint: "+purchases.map(purchase => purchase.item_footprint_g_100g))
        //     console.log(dayAggr);

        //     // //create an array of all dates in the period
        //     // let dayArray = []; let day;
        //     // for(day = new Date(periodStart); day <= new Date(periodEnd); day.setDate(day.getDate()+1)){dayArray.push(new Date(day));}
            
        //     // const dayFootprint = dayArray.map(day => {
        //     //     const datePurchases = purchases.filter(purchase => new Date(purchase.date).getDate() === day);
        //     //     const totalWeight = datePurchases.reduce((total, item) => total + item.item_weight_g,0);
        //     //     const meanFoodprint = datePurchases.reduce((total, item) => total + item.item_footprint_g_100g,0)/totalWeight;
        //     //     return(meanFoodprint);                
        //     //     })

        //     //     console.log(dayFootprint);

        //     //we'll visualize 7 days (mon-sun). each day gets a value. if null --> 0
        //     //below the x-axis we will show the date range (e.g. 14-05-2022 to 20-05-2022)
        // }
        

    }

    const aggregateByPeriod = (purchases, periodStart = "2022-01-01",periodEnd = "2022-12-31") => {

        //select only purchases within the data frame
        purchases = purchases.filter(purchase => new Date(purchase.date) >=  new Date(periodStart) && new Date(purchase.date) <=  new Date(periodEnd) )

        return(purchases);
    }
  


    // Source: https://weeknumber.net/how-to/javascript

    function backDate(){
        setPeriod(prevState => {
            let newMinDate = new Date(prevState.minDate);
            newMinDate.setDate(prevState.minDate.getDate()-2);
            newMinDate = new Date(newMinDate);

            let newMaxDate = new Date(prevState.maxDate);
            newMaxDate.setDate(prevState.maxDate.getDate()-2);
            newMaxDate = new Date(newMaxDate);
            
            return {minDate: newMinDate, maxDate: newMaxDate, firstDate:prevState.firstDate,lastDate:prevState.lastDate}
        })
    }

    function forwardDate(){
        setPeriod(prevState => {
            let newMinDate = new Date(prevState.minDate);
            newMinDate.setDate(prevState.minDate.getDate()+2);
            newMinDate = new Date(newMinDate);

            let newMaxDate = new Date(prevState.maxDate);
            newMaxDate.setDate(prevState.maxDate.getDate()+2);
            newMaxDate = new Date(newMaxDate);
            
            return {minDate: newMinDate, maxDate: newMaxDate, firstDate:prevState.firstDate,lastDate:prevState.lastDate}
        })
    }



    return(
        <React.Fragment>
            <StyledHeader variant="h4">Stats</StyledHeader> 
            {receipts === "no receipts" ? <NoDataMessage/> :
            <React.Fragment>
                <Paper sx={{mx:1, mt:2}} ref={graphPaper}>
                    <Container sx={{m:0}}>
                        <Typography variant="h4" align="justify">Average Foodprint</Typography> 
                        <Typography variant="h6" align="justify">gCO<sub>2</sub>e per 100g</Typography>
                    </Container>
                    {Object.keys(receipts[0]).length !== 0 && graphWidth !== "null" &&
                        
                            <ChartAv100g data={aggregateForStats(receipts)} period={period} width={graphWidth}/>
                        

                    }
                    {/* <D3ZoomTest /> */}
                    <Container>
                        <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" >
                            
                            <Tooltip 
                                title={period.firstDate >= period.minDate ? "No older data available":""} 
                                placement="top"
                                arrow
                                PopperProps={{
                                    modifiers: [
                                        {
                                            name: "offset",
                                            options: {
                                                offset: [0, -10],
                                            },
                                        },
                                    ],
                                }}
                                
                                // disableFocusListener
                                // disableHoverListener
                                // disableTouchListener

                                >
                                <span
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        trackEvent("Stats","click",period.firstDate >= period.minDate ? "Click disabled back date button":"back date button");
                                        }
                                    }
                                >
                                    <IconButton aria-label="back" onClick={backDate} disabled={period.firstDate >= period.minDate}>
                                        <ArrowLeftIcon />
                                    </IconButton>
                                </span>
                            </Tooltip>
                            {/* <span className='dateRange'>{period.minDate.toDateString()} -- {period.maxDate.toDateString()}</span> */}
                            {/* <Paper textAlign = "center">{period.minDate.toDateString()} -- {period.maxDate.toDateString()}</Paper> */}
                            <Typography variant="body2" align="justify">{period.minDate.toDateString()} -- {period.maxDate.toDateString()}</Typography>
                            <Tooltip 
                                title={period.lastDate <= period.maxDate ? "No newer data available":""} 
                                placement="top"
                                arrow
                                PopperProps={{
                                    modifiers: [
                                        {
                                            name: "offset",
                                            options: {
                                                offset: [0, -10],
                                            },
                                        },
                                    ],
                                }}
                                // disableFocusListener
                                // disableHoverListener
                                // disableTouchListener

                                >
                                <span
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        trackEvent("Stats","click",period.lastDate <= period.maxDate ? "Click disabled forward date button":"forward date button")}
                                    }
                                >
                                    
                                <IconButton aria-label="forward" onClick={forwardDate} disabled={period.lastDate <= period.maxDate}>
                                    <ArrowRightIcon />
                                </IconButton>
                                </span>
                            </Tooltip>

                        </Stack>

                        {/* <Grid container spacing={1} justifyContent="center" alignItems="center" >
                            <Grid item xs={1} justifyContent="center">
                                <IconButton aria-label="back" onClick={backDate}>
                                    <ArrowLeftIcon />
                                </IconButton>
                            </Grid>

                            <Grid item xs={10} justifyContent="center">
                                <Typography variant="body2" align="justify">{period.minDate.toDateString()} -- {period.maxDate.toDateString()}</Typography>
                            </Grid>
                            <Grid item xs={1} justifyContent="center">
                                <Box justifyContent="center" alignItems="center">
                                    <IconButton aria-label="forward" onClick={forwardDate}>
                                        <ArrowRightIcon />
                                    </IconButton>
                                </Box>

                            </Grid>
                        </Grid> */}
                    </Container>
                </Paper> 

                 <Container sx={{justifyContent: "center", textAlign: "center", mt: 3, mb: 3}}>
                    <Typography variant="overline" sx={{color: '#9E9E9E'}}>Legend</Typography>
                    <img src={colorLegend} alt="legend" className="centerImage"/> 
                    {/* <Grid container  justifyContent="center" alignItems="flex-start" >
                        <Grid item xs={6}>
                             
                        </Grid>

                    </Grid> */}
                </Container>
                
            

                {/* <Help/> */}
            </React.Fragment>
            }
            <HelpPages fromPage={"Stats"}/>

            
        </React.Fragment>
    )

}


// request receipt data from backend -- average  
//put it in a time graph 