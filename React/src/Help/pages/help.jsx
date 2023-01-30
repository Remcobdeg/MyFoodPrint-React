import React from "react";
import { StyledHeader } from "../../shared/MuiStyledComponents/MuiStyledComponents";
import HelpCard from "../components/HelpCard";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SsidChartIcon from '@mui/icons-material/SsidChart';


import "./Help.css";

// page has title, components that contain the help for each page
// each component has an icon, title, and text
// components have subcomponents that are the help for each section of the page -- these can be expanded/collapsed

const HelpPageContent = 
    {"Purchases": {
        "icon": <ShoppingBasketIcon />,
        "title": "Purchases",
        "content": [
            {"topic": "What does the graph mean?", 
                "text": "The graph shows the footprint of the dietary products that were identified from your receipt(s). The footprint is the amount of greenhouse gas emissions that are produced in the production of the product. The footprint is measured in grams CO2e per 100 grams of product. The color of the word reflects whether the footprint is high or low. Green means low, red means high. The size of the word reflects the netto footprint, which is the product footprint multiplied by the weight that was purchased. "},
            {"topic": "What do the sizes and colours mean?", 
                "text": "The bigger the word, the bigger the netto share that this product had on your foodprint. Buying something that has a high foodprint (high gCO2e per 100g) or buying lots of a product both contribute to the foodprint of this product in this overview."},
            {"topic": "What actions can I perform on this page?", 
                "text": "(1) Click on the word to see alternatives for that product. (2) You can click on the style button to change the style to wordcloud, barchart, or a list your receipts. (3) In the receipts overview you can edit the receipt. You can change the date, remove or add products, and change quantities purchased. (4) You can click on the period button to select whether you want to include all the receipts scanned within a day/week/month/year period. (5) You can click the buttons next to the displayed date to look at the overview for the previous/next day/week/month/year."},
            {"topic": "Related topics", 
                "text": "What is foodprint? What determines the foodprint of a product? Where does the data come from? How accurate is the data? Why don’t I see foodprint values for different versions of a product? Is is better to buy organic?"},
        ]
    },
    "Alternatives": {
        "icon": <AltRouteIcon />,
        "title": "Alternatives",
        "content": [
            {"topic": "What am I looking at?", "text": "You are viewing a list of alternatives for the selected product. Alternatives are grouped by hierarchical category (e.g., the category 'milk alternatives' and higher category of 'diary alternatives'). The selected product is written in the top of the page. The alternatives are sorted by the footprint of the product in gCO2/100g. This value is also indicated with a colored bar. To the right of the bar you see an estimation of the impact of swapping the selected product for the alternative product."}, 
            {"topic": "What is <em>impact</em>", "text": "The impact is relative difference in footprint between the selected product and the alternative product. The impact is shown as a positive or negative number. A positive number means that the alternative product has a lower footprint than the selected product. A negative number means that the alternative product has a higher footprint than the selected product."},
            {"topic": "What actions can I perform on this page?", "text": "(1) You can change the selected product for which alternatives are shown. (2) You click on the alternative product to see the details on the source data of the product."},
        ]
    },
    "Add": {
        "icon": <AddCircleIcon />,
        "title": "Add Receipt",
        "content": [
            {"topic": "to be completed", "text": "to be completed"},
        ]
    },
    "Stats": {
        "icon": <SsidChartIcon />,
        "title": "Stats",
        "content": [
            {"topic": "What am I looking at?", "text": "This page shows the average footprint of your purchases over time in gCO2/100g. Each dot shows your average footprint for a specific week. The line indicates your 2-month average."},
        ]
    }
}


export default function Help() {
  return (
    <div>
        <StyledHeader variant="h2">Help</StyledHeader>
        {Object.keys(HelpPageContent).map((page) => {
            return <HelpCard 
                page={page} 
                icon={HelpPageContent[page].icon} 
                title={HelpPageContent[page].title} 
                content={HelpPageContent[page].content} />
        })}
    </div>
  );
}