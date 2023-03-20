// import { useContext } from 'react';
// import { useAuth } from '../../shared/hooks/authHook'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

// const { token, login, logout, userId } = useAuth();

const helpText = {
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
                    "text": ["The graph shows the foodprint of the items that were identified from your receipt(s).",
                    "Multiple purchases of the same product type are combined in one item on the chart."]
                },
                {"topic": "What do the sizes and colours mean?", 
                    "text": [
                        "The size of the word reflects the netto footprint, which is the product footprint multiplied by the weight that was purchased.",
                        "The bigger the word, the bigger the relative impact that this product had on your foodprint. Buying something that has a high foodprint (high gCO2e per 100g) or buying lots of a product both contribute to the foodprint of this product in this overview.",
                        "The color indicates the foodprint per 100g. Green means low, red means very high.",
                        "A legend is available below the chart."]
                },
                {"topic": "What actions can I perform on this page?", 
                    "text": [
                        "(1) Click on the word to see alternatives for that product.",
                        "(2) You can click on the style button to change the style to wordcloud, barchart, or a list your receipts.",
                        "(3) You can click on the ‘day’, ‘month’, ‘year’ buttons. When month is selected, the graph combines all the receipts from the selected month.", 
                        "(4) You can click the buttons next to the displayed date to look at the overview for the previous or next day/ month/year."
                    ]
                },
                {"topic": "How are the items on my receipt classified? ",
                    "text": [
                        "Items on your receipt are matched with more general product descriptions of which foodprint values are available. ‘Quaker Porridge Oats 1kg’ becomes ‘oats’. ‘Bordeaux Merlot’ becomes ‘wine’.",
                        "The store website is consulted to determine the weight of the item, in the case that this is not evident from the description on the receipt. The price is used to verify that the correct package size is identified. In case of produce sold by quantity, average item for the product is used.",
                        "In case multiple versions of a product exist in our database, like for berries that are airfreighted out of season, additional data is collected to determine the version. Data about default product origin for the specific time of the year is used to determine whether a product is airfreighted. This data is backed-up by off-line visits to stores to verify product origin from packaging. A shift in product price is used as an indicator that a switch between airfreight (e.g., grapes from South Africa) and other transportation modes (Grapes from Kent or from France) has likely happened, and store investigation is required.",
                        "While the above efforts are made to minimize the risk of misclassification, accidental misclassification may happen. Please reach out if you suspect a misclassification."],
                    "links": [{"url":"mailto:myfoodprintuk@gmail.com?subject=Misclassifation", "text": "Contact us"}]
                },
                {"topic": "Another questions", 
                    "text": "Check the general Help pages or contact us.",
                    "links": [{"url":"mailto:myfoodprintuk@gmail.com?subject=Other%20question", "text": "Contact us"}]
                }
            ]
        },
        "Alternatives tab": {
            "icon": <AltRouteIcon />,
            "title": "Alternatives",
            "content": [
                {
                    "topic": "What am I looking at?", 
                    "text": [
                        "You are viewing a list of alternatives for a product that you selected.",
                        "You selected it by clicking an item on the chart in the purchases page, or by selecting a product in the dropdown on the top of this page. The selected product is shown in the dropdown menu field at the top of the page.",
                        "Alternatives are grouped by hierarchical category (e.g., the category 'milk alternatives' and higher category of 'diary alternatives'). ",
                        "The alternatives are sorted by the footprint of the product in gCO2/100g. This value is also indicated with a coloured bar. ",
                        "To the right of the bar you see an estimation of the impact of swapping the selected product for the alternative product. The value here shows how much lower the foodprint of the alternative product is (with negative numbers indicating a higher foodprint)."
                    ],
                },
                {
                    "topic": "What do the colours mean?", 
                    "text": [
                        "The colour of the bar indicates the foodprint per 100g. Green means low, red means very high. ",
                        "The red or green color of the percentage value to the right indicate whether an alternative has a higher or lower foodprint. Green implies a lower foodprint, whereas red implies a higher foodprint. ",
                        "A legend is available on the bottom of the page."
                    ]
                },
                {
                    "topic": "I don’t like the alternatives…",
                    "text": [
                        "We’re sorry to hear that. ",
                        "If you have a suggestion for an alternative that you would like to see in the list, please let us know (email link below). We will add it to the database and it will be available for other users as well. ",
                        "Also, we intend to investigate better algorithms for the suggestion of alternatives in the future.",
                        "For the time being, we have categorized and ordered the known products to help you find at least some suitable alternatives. In some cases, there may be no alternatives with a lower foodprint, or the alternatives may be found only in a completely different category (e.g., when you would consider olives as an alternative for feta as both provide a salty and sour taste).",
                        "You could open the drop-down menu at the top and select an item from a different category to see other alternatives. Unfortunately, you won’t see a direct comparison in this case, so it’s good to remember the colour (and maybe also the foodprint value) of the item you were initially searching an alternative for. ",
                        "If you’re displeased by items that don’t fit your diet, like meat suggestions, this is something for which a future improvement is intended. Please excuse us for listing these in the meantime.",
                        "If you find that there are too many irrelevant alternatives. This is also something that we intend to address in the future. Please excuse us for the long list in the meantime.",
                        "Other comments/recommendations, please write us:",
                    ],
                    "links": [{"url":"mailto:myfoodprintUK@gmail.com", "text": "Contact us"}]
                },
                {
                    "topic": "What actions can I perform on this page?", 
                    "text": [
                        "You can change the selected product for which alternatives are shown.",
                        // "(2) You click on the alternative product to see the details on the source data of the product.",
                    ],
                },
            ]
        },
        "Add": {
            "icon": <AddCircleIcon />,
            "title": "Scan Receipt Page",
            "content": [
                {
                    "topic": "What is this page for?", 
                    "text": "You are on a page that allows you to scan your grocery receipts."
                },
                {
                    "topic": "How do I add online grocery purchases?",
                    "text": "Please forward the email with the order to:",
                    "links": [{"url":"mailto:myfoodprintUK@gmail.com", "text": "myfoodprintUK@gmail.com"}],
                },
                {
                    "topic": "I can’t see the camera view, now what?",
                    "text": [
                        "There may be an issues with the communication with your camera. ",
                        "Try pressing the button to take a picture.",
                        "We have seen occasions where taking pictures works, but you can’t see the camera view before taking the picture. With a little bit of practise, it’s often possible to scan the receipt all the same. ",
                        "If that doesn't work. Please check that you have allowed the website to use your camera. We can guide you through the process if you are unsure how to do this. Just contact us (link below).",
                        "In the meantime, you can also take a picture of the receipt using your default camera app and forward the picture to:"
                    ],
                    "links": [{"url":"mailto:myfoodprintUK@gmail.com?subject=Please%20add%20receipt", "text": "myfoodprintUK@gmail.com"}],
                },
                {
                    "topic": "What do the buttons do?",
                    "text": [
                        "The circular button in the middle towards the bottom of the screen takes the picture. (Can't see it, read the next FAQ).",
                        "The button to the lightning-bolt-shaped button to the right of the middle turns on the flashlight. Use it in case you think you scan would benefit from better lighting. ",
                        "The cross button to the left of the middle lets you leave the camera mode. ",
                    ],
                },
                {
                    "topic": "I can’t see the button to take a picture, now what?",
                    "text": [
                        "This button only appears if your phone is level with the ground. Please change the tilt of the phone so that it is level with the ground. ",
                        "If you still have issues, you can also take a picture of the receipt using your default camera app and forward the picture to: "
                    ],
                    "links": [{"url":"mailto:myfoodprintUK@gmail.com?subject=Camera%20issues", "text": "myfoodprintUK@gmail.com"}],
                },
                {
                    "topic": "My receipt is too long, now what?",
                    "text": [
                        "The algorithm is able to handle pretty long receipts, so maybe give it a try anyways. ",
                        "Otherwise, you can decide to skip the bottom bit of the receipt with the date and ignore the warning message the follows about missing the date on the bottom. ",
                        "You can also scan the receipts in parts, again ignoring the warning message about missing the date on the bottom of the receipt. ",
                        "You can also take a picture of the receipt using your default camera app and forward the picture to us. ",
                    ],
                    "links": [{"url":"mailto:myfoodprintUK@gmail.com?subject=Please%20add%20long%20receipt", "text": "Contact us."}],
                },
                {
                    "topic": "I am seeing an error/warning message. Now what?",
                    "text": [
                        "Did the message say that the date wasn’t found on the receipt? ",
                        "You can click the button to try scanning the receipt again. Make sure that the bottom bit with the date on is captured also. " ,
                        "If there’s no date on the receipt, or there is another reason withholding you from adding the date part, don’t worry. As long as the part with the items and prices is scanned clearly, your receipt can be analysed. The date at which the receipt was scanned will be used instead. You can also contact us to share missing information (link below).",
                        "Is the error of a different sort? ",
                        "Please make a screenshot, if you can, and contact us (link below). ",
                        "You can also take a picture of the receipt using your default camera app and forward the picture to us (email link below). You may also write the product information in the email if you prefer.",
                    ],
                    "links": [{"url":"mailto:myfoodprintUK@gmail.com", "text": "Contact us."}],
                },
                {
                    "topic": "I want to exclude some items from the receipt. How do I do that?",
                    "text": [
                        "If it’s because some items are not food or drink, don’t worry, those will be ignored. ",
                        "Otherwise, there are several options to go about this: ",
                        "1.	You can cross out these items using a black marker. Make sure they are clearly crossed out. A thin line may not be enough to pick up on it. ",
                        "2.	You can also take a picture using your default camera app and cross out the item digitally and forward the edited picture to us (email link below).",
                        "3.	You can write us which items to remove the items form your record manually.",
                        "4.	You can write us which items you DO want to include and not scan the receipt. Please hold on to the receipt in case we need some additional data to identify and quantify the items correctly.",
                    ],
                    "links": [{"url":"mailto:myfoodprintUK@gmail.com", "text": "Contact us."}],
                },      
            ]
        },
        "Stats": {
            "icon": <SsidChartIcon />,
            "title": "Stats tab",
            "content": [
                {
                    "topic": "What am I looking at?", 
                    "text": "This page shows the average foodprint of your purchases over time. "
                },
                {
                    "topic": "What does the value next to the coloured dot mean? ",
                    "text": [
                        "The value next to the coloured dot is the average foodprint of your purchases on the day the dot represents. ",
                        "Foodprint is the carbon footprint of dietary products, is expressed in gCO2e/100g. "
                    ],
                },
                {
                    "topic": "What does the colour of the dot mean?",
                    "text": [
                        "The colour indicates the foodprint per 100g. Green means low, red means very high. ",
                        "A legend is available on the bottom of the page. ",
                    ],
                },
                {
                    "topic": "What is gCO2e?",
                    "text": [
                        "gCO2e stands for grams of carbon dioxide equivalent. ",
                        "Foodprint, the carbon footprint of food, is expressed in gCO2e per 100g of food.",
                        "g = grams",
                        "CO2 = carbon dioxide",
                        "e = equivalents",
                        "‘Equivalents’, because besides CO2, there are other greenhouse gasses that are emitted in the production and supply of an item that need to be considered. Formulae exist to express the impact of another greenhouse gasses in the equivalent quantity of CO2 that would have a similar impact on global warming. This way, the combined impact of various greenhouse gasses can be expressed as a single measure. A measure that expresses the impact of the various greenhouse gasses in equivalents of CO2. This measure is gCO2e.",
                    ],
                },                
                {
                    "topic": "What actions can I perform on this page?",
                    "text": [
                        "You can press the arrows below the graph, on both sides of the date, to move the view forward or backward in time. ",
                    ],
                },

            ]
        },
        "Contact":{
            "icon": <AlternateEmailIcon />,
            "title": "Contact us",
            "content": [
                {
                    "topic": "How can I contact you?",
                    "text": [
                        "You can contact us by email: ",
                    ],
                    "links": [{"url":"mailto:myfoodprintUK@gamil.com", "text": "myfoodprintUK@gamil.com"}],
                },
            ]
        }
    }




export default helpText;