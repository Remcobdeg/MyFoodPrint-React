import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

const helpText = 
    {
    "Tips": {
            "icon": <TipsAndUpdatesIcon />,
            "title": "Foodprint Knowledge Tips",
            "content": [
                {"topic": "What is foodprint (with a ‘d’)?",
                    "text": [
                        "Foodprint is the carbon footprint of food; the amount of greenhouse gas emissions that are produced in the production of the product.",
                        "A greenhouse gas is a term for a gas that contributes to global warming.",
                        "It is expressed in gCO2e per 100g of food. Sometimes we also mention to the ‘netto foodprint' of an item, which is the footprint of the item multiplied by the amount purchased.",
                        "g = grams",
                        "CO2 = carbon dioxide",
                        "e = equivalents",
                        "‘Equivalents’, because besides CO2, there are other greenhouse gasses that are emitted in the production and supply of an item that need to be considered. Formulae exist to express the impact of another greenhouse gasses in the equivalent quantity of CO2 that would have a similar impact on global warming. This way, the combined impact of various greenhouse gasses can be expressed as a single measure. A measure that expresses the impact of the various greenhouse gasses in equivalents of CO2. This measure is gCO2e. "                        
                    ]
                },
                {"topic": "What determines the footprint of a product?", 
                    "text": ["Mostly the processes related to the farming or the sourcing of the food. Airfreight, is another important contributor, in case it is used."],
                    "textDetail": ["Research shows, that the footprint of a product mostly comes from the farming, or sourcing, of food (about 81%). Some of the factors that that play a large role in this Deforestation, coral-reef damage, fertilizers, hothouses (e.g., for local tomatoes in March), and belching animals like cows and sheep burping methane. Post-farm processes (like transportation and packaging) have a relatively low impact on the foodprint of a product.","Exemption: post-farm processes do have a major impact when products that are airfreighted, like blueberries from Chili in December."],
                    "links": [{"url": "https://www.science.org/doi/10.1126/science.aba7357", "text": "Clarke et al., Science, 2020"}, {"url": "https://howbadarebananas.com/", "text": "Berners-Lee, How Bad Are Bananas?"}]
                },
                {"topic": "Is is better to buy local?", 
                "text": ["The answer is not straight forward.", "It depends much on the mode of transportation chosen and the farming processes used for local production. It’s certainly good to avoid airfreighted products. However, carbon intensive local farming methods may well out way the footprint impact from other transportation modes. Rather than avoiding non-local products, it may be better to avoid products that have a high production foodprint."],
                "textDetail": [
                    "Airfreight has a very high impact on the foodprint of an item. It often dominates the footprint of an item when it is used. An otherwise low-foodprint item, like blue-berries, can be classed as one of the highest footprint items, when airfreighted out of season. ",
                    "Most products are however not airfreighted.",
                    "Ships can take carry enormous amounts of products. As a result, sea-fare transportation add very little to the foodprint of an item; mostly less than 1% of the final footprint of an item. Also relatively efficient is road transport in trucks, often adding a few percent to the footprint. For example, Strawberries from Spain can be considered low footprint, as road transport is relatively efficient and adds only a few percent to the footprint. ",
                    "Footprint from transportation as balanced against the production efficiency of distantly sourced items. Non-local production processes may be more efficient than local ones. E.g., due to increased sun exposure, a distantly sourced product may well have a lower foodprint, than a local version. An apple from New Zealand can have a lower carbon footprint than a locally sourced apple. Especially when local sources means that hothouses are used, the choice for local almost certainly means that the footprint of a local alternative is higher than that of a non-local one. In other cases, there may not be a clear tilt in either direction of the balance.",
                    "In conclusion, rather than avoiding non-local produce it may be better to avoid products that have a high production footprint. For this reason, in the app we have chosen not to focus on the impact of foodmiles, except for cases where airfreight is the norm. We have also added a few example products where the impact of foodmiles is presented, even when other modes than airfreight are being used. "
                ],
                "links": [
                    {"url": "https://www.science.org/doi/10.1126/science.aaq0216", "text": "Poore and Nemecek, Science, 2018"},
                    {"url": "https://howbadarebananas.com/", "text": "Berners-Lee, How Bad Are Bananas?"},
                    {"url": "https://www.theguardian.com/environment/2008/mar/23/food.ethicalliving", "text": "How the myth of food miles hurts the planet, The Guardian, 2008"}]
            },
            {"topic": "Which products tend to be airfreighted?",
                "text": ["Fresh beans and most fresh berries off-season are the most common ones."],
                "textDetail": ["Perishable produce that is off-season in the UK, as well as the European countries that provide produce to the UK by truck, like Spain. Whereas various perishable items are in-season in Spain when they are off-season in the UK, this is not the case for fresh beans and most berries (strawberries being the exception)." ], 
            },
                {"topic": "Is is better to buy organic?", 
                    "text": ["The answer is not straight forward.",
                        "Although organic farming is generally cleaner than conventional farming, the organic label is not a label of carbon footprint. In some cases, organic produce actually has the higher carbon footprint, as the yield is lower."],
                    "textDetail": ["It’s good to keep in mind that the organic label is not a label of carbon footprint. While it informs about the type of fertilizers used and indicates a certain standard of animal welfare, it is not a label of footprint efficiency.",
                        "Like non-organic fertilizers, organic fertilizers also have a carbon footprint. Also, both methods require space for farming. Land use for farming competes with land use for forestation; with forests playing an important role in carbon absorption. Yields from organic farming are generally lower than that of non-organic farming methods. In various cases, organic products have a higher footprint than non-organic products.",
                        "Of course, some non-organic farming approaches may have a very high carbon footprint. However, the absence of an organic label does not indicate this.",
                        "Of course, there are other values in choosing organic; values not represented in this application. We certainly do not encourage against organic choices."
                    ],
                    "links": [{"url": "https://howbadarebananas.com/", "text": "Berners-Lee, How Bad Are Bananas?"}]
                },
                {"topic": "What about other aspects of environmental sustainability?", 
                    "text": "It’s good to be aware of the fact that the application provides information only on carbon footprint. There are obviously other aspects of environmental sustainability that are important that are not represented in carbon footprint. These are, e.g., water use and biodiversity. Although a high footprint may also suggest a high water use and detriment to biodiversity, this relationship is certainly not a given. It is always good to stay critical and aware of the limitations any data that you are shows.",
                    "links": [{"url": "https://www.fondazionebarilla.com/en/publications/double-pyramid-2016/", "text": "BCFN. (2016). Double Pyramid 2016"}]
                },
                {"topic": "Where does the data come from?",
                    "text": "Most of the data comes from a publication by Mike Berners-Lee and a Small-World reports, where Berners-Lee is principal consultant. This data has been amended by 1. data kindly shared by Luca Panzone, based on a footprint report by Tesco, and used in various publications that he published with colleagues, 2. Data from Scarborough et al., 2014, 3. Data printed on packaging. Details for each product can be learned from clicking the product in the alternatives page.",
                    "links": [
                        {"url": "https://howbadarebananas.com/the-author/ ", "text": "Mike Berners-Lee "}, 
                        {"url": "https://www.theguardian.com/profile/mike-berners-lee", "text": "Mike Berners-Lee in the Guardian"}, 
                        {"url": "https://howbadarebananas.com/", "text": "Berners-Lee, How Bad Are Bananas?"}, 
                        {"url": "https://www.sw-consulting.co.uk/ ", "text": "Small world consulting "}, 
                        {"url": "https://www.booths.co.uk/wp-content/themes/booths/images/Booths%20GHG%20Report%202012%20Final.pdf", "text": "A report by Small World Consulting Ltd"}, 
                        {"url": "https://www.ncl.ac.uk/globalchallenges/staff/profile/lucapanzone.html#background", "text": "Luca Panzone"},
                        {"url": "https://doi.org/10.1016/j.jeem.2018.06.002", "text": "Panzone, et al. (2018). The impact of environmental recall and carbon taxation on the carbon footprint of supermarket shopping. "},
                        {"url": "https://issuu.com/thema1/docs/tesco_product_carbon_footprint_summary_1_", "text": "Tesco. (2012). Product Carbon Footprint Summary."},
                        {"url": "https://doi.org/10.1007/s10584-014-1169-1", "text": "Scarborough, P., et al. (2014). Dietary greenhouse gas emissions of meat-eaters, fish-eaters, vegetarians and vegans in the UK."}
                    ]
                },
                {"topic": "How accurate is the data?",
                    "text": "In most cases, average foodprint values for products are used (the main exception: when there is reason to believe that airfreight or hothousing is a seasonal norm). This obviously restricts the accuracy of foodprint allocated to each individual product. It is not uncommon to have an error of 10% or even more. Due to limited transparency into details of production and processing, a higher level of accuracy seems unattainable. However, the data is accurate enough to highlight the larger differences between various products, that are most important in for pursuing a lower diet footprint.",
                    "textDetail": [
                        "Since the carbon footprint isn’t something that resides in the final product and can be measured, it must be calculated. A process called carbonfootprinting. Carbonfootprinting is extremely complex and requires various estimation. It is complex because of the many processes that underly the final product. E.g., for a bread to land in your grocery bag, grain must be harvested, it must be baked, and supplied to the supermarket. The machines to harvest the grain need be driven into the fields. Repairs on these machines are needed. The materials for each part of the machine were supplied and processed in their own unique way. The oven at the bakery needs to be build and maintained. This list can go on to infinity… Each step bearing some footprint. Information that is needed to calculate footprints is often unavailable or inaccessible. There aren’t well enforced stringent regulations that assert suppliers to capture communicate data needed to calculate precise footprints. As a result, estimations must be made, and boundaries must be put on the number of sub-processes to be considered; a method called truncation. Truncation was estimated to cause errors of 50% in some products.",
                        "Even when some specifics about the processes of producing and supplying a particular item could be retrieved, there may be limited value in translating this information into the footprint estimation of an item. As mentioned under the question of organic products and buying local, variations in the production and supply process are never isolated. While buying local can be a great thing, it is possible that transportation emissions that are saved when buying local are offset by higher emissions from more demanding farming methods. The impact of a specific process step can therefore have counter intuitive impact on the foodprint of an item. ",
                        "For this reason, the data in this application mainly uses foodprint averages for types of products (exemptions below). Even in the few cases where different footprint estimations for different brands or versions of a product are provided in our data sources, we do not incorporate this variation in the application. We believe that this variation gives a false impression of precision of footprint estimates. We also think that focussing on this variation it is not meaningful for the user of this application in the quest of reducing one’s foodprint. The use of averages limits the precision in allocating a foodprint value to a specific item. However, it also limits the chance of introducing large errors that can arise from attempting to allocate a specific foodprint value for an individual item. ",
                        "In a few cases we do consider different foodprint values for different versions of a product. Where there is an important clear impact that differentiates the footprint of one product version to the next, we have aimed to create different versions. We factor in airfreight when there is reason to believe that an item has been airfreighted, for example when a specific item is typically airfreighted in the time of the year that the purchase happened (e.g., grapes in winter). We also factor in the impact from using hothouses, when there is reason to believe that an item was produced there, like British tomatoes grown out-of-season. We also include different versions of beef, as the foodprint impact of a slice of beef from cattle farmed on deforested amazon forest is estimated to have a foodprint more than double that of the average slice of beef. In a few cases different versions of products are included even though the difference in foodprint is small, like for strawberries from Scottland or from Spain. These versions are meant to serve as examples to indicate the impact of transportation on the foodprint of an item. ",
                        "Where there is discrimination in versions of a product, there is the potential for classification error. While efforts are made to assert that a product is classified correctly, the data to assist classification can be obscure and may incidentally lead to misclassification. Where different versions are considered, origin information generally informs whether an item on a receipt should be classified as one version of the product or another. Origin information can however be hard to retrieve. Origin information is frequently absent from receipt and store website. Information about typical product origin throughout the seasons, combined with off-line store inspections to inspect the origin listed on the packaging or shelves is used to aid classification. Fluctuations in price can also indicate a change in product origin and prompt investigation. This however does not exclude the potential of errors. When such an error happens, this impacts the precision of the data that is presented back to you. ",
                        "There is also the potential of an unidentified error existing in our database. If you suspect an error of any form, please reach out (email link below).",
                        "While the cases discussed above limit the precision in the data, the data is expected accurate enough to highlight important differences between various products and enable the quest for reducing diet footprint."
                    ],
                    "links": [{"url":"mailto:myfoodprintuk@gmail.com", "text": "myfoodprintUK@gmail.com"}]      
                },
                {"topic": "Why does the app not consider the difference between brands, or versions, of a product?",
                    "text": [
                        "Discrimination between versions is made in a few cases. However, in general, we believe it is not meaningful to make this distinction. Choosing between different products is often more impactful than choosing between different versions of the same product.",
                        "Also, data to allow this distinction is not reliably available. Considering incomplete sets of version information (like packaging or food miles only) ignores other version information that farming processes that may vary because packaging or food miles are different. Because of this, incomplete version information is only used if it implies a drastic impact on the foodprint, like airfreight or hothousing. ",
                        "See also “How accurate is the data?” and “What determines the footprint of an item?”"]
                },


            ]       
        },
    "Purchases tab": {
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
    "Alternatives tab": {
        "icon": <AltRouteIcon />,
        "title": "Alternatives",
        "content": [
            {"topic": "What am I looking at?", "text": "You are viewing a list of alternatives for the selected product. Alternatives are grouped by hierarchical category (e.g., the category 'milk alternatives' and higher category of 'diary alternatives'). The selected product is written in the top of the page. The alternatives are sorted by the footprint of the product in gCO2/100g. This value is also indicated with a colored bar. To the right of the bar you see an estimation of the impact of swapping the selected product for the alternative product."}, 
            {"topic": "What is impact", "text": "The impact is relative difference in footprint between the selected product and the alternative product. The impact is shown as a positive or negative number. A positive number means that the alternative product has a lower footprint than the selected product. A negative number means that the alternative product has a higher footprint than the selected product."},
            {"topic": "What actions can I perform on this page?", "text": "(1) You can change the selected product for which alternatives are shown. (2) You click on the alternative product to see the details on the source data of the product."},
        ]
    },
    "Add": {
        "icon": <AddCircleIcon />,
        "title": "Scan Receipt Page",
        "content": [
            {"topic": "to be completed", "text": "to be completed"},
        ]
    },
    "Stats": {
        "icon": <SsidChartIcon />,
        "title": "Stats tab",
        "content": [
            {"topic": "What am I looking at?", "text": "This page shows the average footprint of your purchases over time in gCO2/100g. Each dot shows your average footprint for a specific week. The line indicates your 2-month average."},
        ]
    }
}

export default helpText;