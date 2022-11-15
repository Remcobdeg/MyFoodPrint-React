// to do's for this page:
// 

import React, {useRef, useEffect, useState} from "react"
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';

import receiptIcon from '../img/receipt-icon.png'
import searchIcon from '../img/search-db-icon.png'
import wordcloudImage from '../img/wordcloud-example3.png'
import alternativesImage from '../img/alternatives-example.png'
import "./Intro.css";

function Intro(props){

    const navigate = useNavigate();

    const parentRef   = useRef(null);

    useEffect ( () => {
        
        if(parentRef.current){
            
            let parentWidth  = parentRef.current.offsetWidth;
            
        }
        
    }, [parentRef]);

    const [introPage, setIntroPage] = useState(0);

    const buttonNext = () => {
        if(introPage === 4){
            navigate('/auth')
        } else {
            setIntroPage(prevState => prevState+1)
        }
    }

    const buttonBack = () => {
        if(introPage === 0){
            navigate('/welcome')
        } else {
            setIntroPage(prevState => prevState-1)
        }
        
    }

    const nextButtonName = ['Tell me how','Next','Next','Next','Login']

    return(
        <Container maxWidth = "sm" sx={{height: "100vh"}} ref = { parentRef } >

            

            <Grid 
                container
                direction="column"
                justifyContent="space-between"
                alignItems="center"
                sx={{height: "90%"}}

            >
                <Grid item>
                    {introPage === 0 && 
                        <div>
                            <h1 className="appName">MyFoodPrint</h1>
                            <p>
                                Our diets make up about 30% of our carbon footprint. 
                                Improving diet choices is important for reducing our carbon footprint. 
                                It's even crucial to achieve the COP goals of limiting global warming to +1.5° 
                                (see <a href="https://www.science.org/doi/10.1126/science.aba7357" target="_blank" rel="noreferrer" >Clarke et al., Science, 2020</a>).
                            </p>

                            <p>
                                But it can be hard to know what meaningful changes <em>you</em> can realistically make. 
                                {/* You would need to know what your footprint looks like now. 
                                But what meaningful changes can <em>you</em> make? It is not always that clear Does it really make that much of a difference to swap that beef for tofu? 
                                Is hard to know the impact of each choice that you make in the supermarket on your total foodprint. And what to choose instead? Does it fit your prefences? */}
                            </p>

                            <p>
                                MyFoodPrint is designed to help you understand your 'foodprint' and find changes that you can make that are both effective and acceptable to you. 
                            </p>
                        </div>

                    }


                    {/* button that toggles to the next getting-started screen -- button text changes */}

                    {introPage === 1 &&
                        <div>
                            <h2 className="appName">How it works</h2>

                            <p>By taking a picture of your grocery receipt you record the items in your app.</p>

                            <Box sx={{display: "flex", justifyContent: 'center', padding: 2}}>
                                <img className='exampleIcon' src={receiptIcon} alt="Icon of a receipt"/>
                            </Box>
                        </div>
                    }

                    {introPage === 2 &&
                        <div>
                            <h2 className="appName">How it works</h2>

                            <p>
                                The app then searches for information that it has stored about the products on your receipt, 
                                like the foodprint per 100g, the weight of the product and the product category that it belongs to. 
                            </p>

                            <Box sx={{display: "flex", justifyContent: 'center', padding: 2}}>
                                <img className='exampleIcon' src={searchIcon} alt="Icon representing database search"/>
                            </Box>
                        </div>
                    }

                    {introPage === 3 &&
                        <div>
                            <h2 className="appName">How it works</h2>

                            <p>
                                This information is then given back to you in a wordcloud. It shows you your opportunities for foodprint reduction. 
                            </p>

                            <Box sx={{display: "flex", justifyContent: 'center', padding: 2}}>
                                <img className='exampleImage' src={wordcloudImage} alt="Example wordcloud of products and their footprint"/>
                            </Box>

                            {/* wordcloud is shown with color legend and size legend -- Footprint per 100g; green: low (0-100gCO2/100g), yellow: moderate, orange: high, red: very high. [small word in grey: low total footprint, large word in grey: high total footprint] */}
                            
                            <p>
                                {/* The wordcloud shows....  Size and color suggest were to focus your efforts.  */}

                                <em>Hint: by replacing large red or orange foods, you can expect most impact. 
                                Small red or orange foods have a high footprint per 100g, but you didn't buy much of it. Replacing those will have a smaller impact.  
                                Large green products are great choices that you seem to like and buy much of. </em> 

                                {/* These can be great alternatives for the red and orange foods -- if that works for your ) 
                                With size and color, the app shows you where changes can have the largest impact. 
                                Looking at the size and color, you can see where the most gain can be made for reducing your foodprint. 
                                Each word represents a type of food/drink, like <em>apples</em>. 
                                The larger the word, the higher the total foodprint from the amount of products you bought from that category. 
                                The app then uses that information to show you the relative footprint of your choices. <br/>
                                A database is then searched for information on the products. <br/>
                                The app uses that information to create a wordcloud that reflects the foodprint of the items on your scanned receipt. <br/>

                                Each word represents a type of food on your receipt (e.g. peanut butter). Traffic light color coding signals the foodprint per 100g of the product, similar to the color coding on food packages signalling fat and sugar concentrations. Dark red signals the highest concentration of foodprint per 100g. 
                                The size of a word reflects the relative impact of this product on your footprint. The larger the word, the bigger the impact 
                                There are two ways that a word can 
                                Buying a lot of a product something that has a high foodprint(?) per 100g or buying lots of a product both contribute to the foodprint of this product in this overview.
                                */}
                            </p>
                        </div>
                    }

                    {introPage === 4 &&
                        <div>
                            <h2>
                                Finding replacements
                            </h2>

                            <p>
                                By clicking a word, the app shows you a list of alternatives for this type of food.
                            </p>
                            
                            <Box sx={{display: "flex", justifyContent: 'center', padding: 2}}>
                                <img className='exampleIcon' src={alternativesImage} alt="Icon of a receipt"/>
                            </Box>

                            <p>
                                There is more, <em>login and go and explore!</em>
                            </p>
                        </div>
                    }
                </Grid>

                {/* <Grid item>
                    <p>test</p> */}
                    <Grid 
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="baseline"
                            rowSpacing={{xs: 1}}
                    >
                        <Grid item xs={12}>
                            <Button variant="contained" sx={{width: "100%"}} onClick={buttonNext}>{nextButtonName[introPage]}</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="text" size="small" onClick={buttonBack}>back</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="text" size="small" onClick={() => navigate('/auth')}>skip to login</Button>
                        </Grid>
                    </Grid>
                {/* </Grid> */}




            </Grid>

            <Box>

            </Box>

            
     




            {/* <Button 
                variant="contained" 
                // sx={{width: "200px", position: 'absolute', top: "80%", left: "50%", ml: "-100px" }}
                sx={{position: 'absolute', top: "80%"}}
                onClick={buttonClick}
                >Tell me how</Button> */}
        </Container>
    )

}

export default Intro;



