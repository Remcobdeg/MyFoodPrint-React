// import shopperData from "../data/twentyShoppers.json"
import shopperData from "../data/fiveWeeklittleMeatEaters.json"

// list of basket ids in the data
const allBaskets = Array.from(new Set(shopperData.map(entry => entry.basket_ID)));

function prepVizData(uidIndex = 7143,format = "gCO2") {
    
    // get data from the selected shopper  
    const purchaseData = shopperData.filter(entry => entry.uid === uidIndex); // later change basket_ID to uid and aggregate over baskets    

    const aggregateProducts = function(data){
        //the function creates one object for each article

        //find unique articles
        const uniqueItems = Array.from(new Set(data.map(entry => entry.subgroup_desc)));
        
        //calculate totals
        data.forEach(d => {
            d.gCO2Total = d.gco2 * d.quantity;
            d.weightTotal = d.weightkg * d.quantity;
            d.kcalTotal = d.kcal * d.quantity;
        });

        // // convert to % London Berlin flight equivalents (.209tCO2e from myclimate.org) --- make explicit later!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // data.forEach(d => {d.gCO2Total = d.gCO2Total / (.209 * 1000000) * 100});

        // // aggregate items with same category name like in https://stackoverflow.com/questions/58435806/aggregate-an-array-of-objects-in-javascript -- issues
        // const aggregateData = uniqueItems.map(pName => { 
        //     const dataSubset = data.filter(item => item.subgroup_desc === pName);
        //     return(
        //         dataSubset.reduce((acc,val) => ({
        //             text: val.subgroup_desc,
        //             gCO2Total: acc.gCO2Total + val.gCO2Total,
        //             weightTotal: acc.weightTotal + val.weightTotal,
        //             kcalTotal: acc.kcalTotal + val.kcalTotal,
        //             quantity: acc.quantity + val.quantity
        //         }))
        //     )
        // });

        // this does practically the same thing
        const aggregateData = uniqueItems.map(pName => { 
            return ({
                text: pName,
                gCO2Total: data.map(item => item.subgroup_desc === pName && item.gCO2Total)
                .reduce((accummulator, value) => accummulator + value), //sum the values in the array 
                weightTotal: data.map(item => item.subgroup_desc === pName && item.weightTotal)
                .reduce((accummulator, value) => accummulator + value), //sum the values in the array 
                kcalTotal: data.map(item => item.subgroup_desc === pName && item.kcalTotal)
                .reduce((accummulator, value) => accummulator + value), //sum the values in the array
                quantity: data.map(item => item.subgroup_desc === pName && item.quantity)
                .reduce((accummulator, value) => accummulator + value) //sum the values in the array
            })  
        });

        aggregateData.forEach(d => {
            d.gCO2100gAverage = d.gCO2Total/d.weightTotal;
            d.gCO2kCalAverage = d.kcalTotal > 0 ? d.gCO2Total/d.kcalTotal : 0;
        });

        aggregateData.forEach(d => {
            if (d.gCO2kCalAverage < .300) {
                d.color = "#B2EA70"
            } else if (d.gCO2kCalAverage < .600) {
                d.color = "#FBD148"
            } else if (d.gCO2kCalAverage < 1.000) {
                d.color = "#F9975D"
            } else {
                d.color = "#C85C5C"
            }
        });

        // eslint-disable-next-line default-case
        switch (format){
            case "gCO2":
                aggregateData.forEach(d => d.value = d.gCO2Total)
                break;
            case "gCO2100g":
                aggregateData.forEach(d => d.value = d.gCO2100gAverage)
                break;
            case "gCO2kcal":
                aggregateData.forEach(d => d.value = d.gCO2kCalAverage)
                break;

        }

        aggregateData.forEach(entry => {if(entry.text === "PREPARED MEALS"){entry.text = "MEALS";}})

        return aggregateData;
    };

    //returns the aggregated data of the particular shopper
    return aggregateProducts(purchaseData);

};

function maxValue(data){    
    return (Math.max(...data.map(entry => entry.value)));
}

export {prepVizData, allBaskets, maxValue}; 