import React, {useState, useEffect, useContext} from 'react';
import {useHttpClient} from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/authContext';
import DateExt from '../../shared/models/dateExt';
import ChartAv100g from '../components/ChartAv100g';
import D3ZoomTest from '../components/D3ZoomTest';
import IconButton from '@mui/material/IconButton';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export default function Stats (props){

    const auth = useContext(AuthContext);
  
    const { isLoading, error, sendRequest } = useHttpClient();
    const [graphState, setGraphState] = useState('WORDS');
    const [receipts, setReceipts] = useState([{}]);
    const [period, setPeriod] = useState({minDate: new Date(), maxDate: new Date()});
  
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

          setPeriod(()=>{
                const dates = response.map(receipt => new Date(receipt.date));
                const maxDate = new Date(Math.max.apply(null,dates));
                const minDate = new Date( new Date(maxDate).setDate(maxDate.getDate()-6))
              return {minDate:minDate,maxDate:maxDate}
          })
        } catch (err) {}
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
                return({date:day, footprint: Math.round(meanFoodprint)});                
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
            console.log(newMinDate);

            let newMaxDate = new Date(prevState.maxDate);
            newMaxDate.setDate(prevState.maxDate.getDate()-2);
            newMaxDate = new Date(newMaxDate);
            console.log(newMaxDate);
            
            return {minDate: newMinDate, maxDate: newMaxDate}
        })
    }

    function forwardDate(){
        setPeriod(prevState => {
            let newMinDate = new Date(prevState.minDate);
            newMinDate.setDate(prevState.minDate.getDate()+2);
            newMinDate = new Date(newMinDate);
            console.log(newMinDate);

            let newMaxDate = new Date(prevState.maxDate);
            newMaxDate.setDate(prevState.maxDate.getDate()+2);
            newMaxDate = new Date(newMaxDate);
            console.log(newMaxDate);
            
            return {minDate: newMinDate, maxDate: newMaxDate}
        })
    }



    return(
        <React.Fragment>
            <h1>Hello Stats</h1>
            {Object.keys(receipts[0]).length !== 0 && <ChartAv100g data={aggregateForStats(receipts)} period={period}/>}
            {/* <D3ZoomTest /> */}
            {console.log(period)}
            <IconButton aria-label="back" onClick={backDate}>
                <ArrowLeftIcon />
            </IconButton>
            <IconButton aria-label="forward" onClick={forwardDate}>
                <ArrowRightIcon />
            </IconButton>
        </React.Fragment>
    )

}


// request receipt data from backend -- average  
//put it in a time graph 