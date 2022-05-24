import React, {useState, useEffect, useContext} from 'react';
import {useHttpClient} from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/authContext';
import DateExt from '../../shared/models/dateExt';
import ChartAv100g from '../components/ChartAv100g';
import D3ZoomTest from '../components/D3ZoomTest';

export default function Stats (props){

    const auth = useContext(AuthContext);
  
    const { isLoading, error, sendRequest } = useHttpClient();
    const [graphState, setGraphState] = useState('WORDS');
    const [receipts, setReceipts] = useState([{}]);
  
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
          aggregateForStats(response);
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





    return(
        <React.Fragment>
            <h1>Hello Stats</h1>
            {Object.keys(receipts[0]).length !== 0 && <ChartAv100g data={aggregateForStats(receipts)} />}
            {/* <D3ZoomTest /> */}
        </React.Fragment>
    )

}


// request receipt data from backend -- average  
//put it in a time graph 