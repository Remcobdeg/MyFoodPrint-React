

function prepVizData(purchases, periodStart = "01012022",periodEnd = "31123022", groupingLevel = "item_product", format = "gCO2") {
    
    // filter by period
    //LATER

    const aggregateProducts = function(purchases){
        //the function creates one object for each article

        //find unique articles
        const uniqueTypes = Array.from(new Set(purchases.map(purchase => purchase[groupingLevel])));
        
        //calculate totals
        purchases.forEach(d => {
            d.items_gCO2 = d.item_footprint_g_100g * d.item_weight_g* d.item_units;
            d.items_weight_g = d.item_weight_g * d.item_units;
            // d.kcalTotal = d.kcal * d.quantity; //could consider this later; requires selecting only those items that have kcal attached
        });

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

        // aggregate by type
        const aggregateData = uniqueTypes.map(type => { 
            return ({
                text: type,
                //filter by type and create an array of item_purchases total foodprint, then reduce the array to a number
                type_CO2_Total: purchases.map(purchase => purchase[groupingLevel] === type && purchase.item_footprint_g_100g * purchase.item_weight_g* purchase.item_units)
                .reduce((accummulator, value) => accummulator + value), //sum the values in the array 
                type_weight_Total: purchases.map(purchase => purchase[groupingLevel] === type && purchase.item_weight_g* purchase.item_units)
                .reduce((accummulator, value) => accummulator + value) //sum the values in the array 
            })  
        });

        // calculate an average footprint per 100g of type
        aggregateData.forEach(d => {
            d.type_CO2_100g = d.type_CO2_Total/d.type_weight_Total;
            // d.gCO2kCalAverage = d.kcalTotal > 0 ? d.gCO2Total/d.kcalTotal : 0;
        });

        // eslint-disable-next-line default-case
        switch (format){
            case "gCO2":
                aggregateData.forEach(d => d.value = d.type_CO2_Total)
                break;
            case "gCO2_100g":
                aggregateData.forEach(d => d.value = d.type_CO2_100g)
                break;
            // case "gCO2_kcal":
            //     aggregateData.forEach(d => d.value = d.gCO2kCalAverage)
            //     break;

        }

        aggregateData.forEach(d => {
            if (d.type_CO2_100g < 300) {
                d.color = "#B2EA70"
            } else if (d.type_CO2_100g < 600) {
                d.color = "#FBD148"
            } else if (d.type_CO2_100g < 1000) {
                d.color = "#F9975D"
            } else {
                d.color = "#C85C5C"
            }
        });

        //sort descending for barchart to turn out nicely
        aggregateData.sort((a,b) => {return b.value - a.value;})

        // aggregateData.forEach(entry => {if(entry.text === "PREPARED MEALS"){entry.text = "MEALS";}})

        return aggregateData;
    };

    //returns the aggregated data of the particular shopper
    return aggregateProducts(purchases);

};

function maxValue(data){    
    return (Math.max(...data.map(entry => entry.value)));
}

export {prepVizData, maxValue}; 