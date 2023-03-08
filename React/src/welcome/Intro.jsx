// to do's for this page:
// 

import React, {useRef, useEffect, useState} from "react"
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import receiptIcon from '../img/receipt-icon.png'
import searchIcon from '../img/search-db-icon.png'
import Legend from "../img/Legend.svg";
import wordcloudImage from '../img/wordcloud-example3.png'
import alternativesImage from '../img/alternatives-example.png'
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from '@mui/material/DialogContent';
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
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
    const [open, setOpen] = useState(false);

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

    const nextButtonName = ['Tell me how','Next','Next','Next','Login / Sign up']

    return(
        <Container maxWidth = "sm" sx={{height: "100vh"}} ref = { parentRef } >

            

            <Grid 
                container
                direction="column"
                justifyContent="space-between"
                alignItems="center"
                sx={(window.innerHeight>window.innerWidth)&& introPage < 4 && {height: "calc(85vh)"}}

            >
                <Box sx={introPage < 4 && {maxHeight: '85vh', overflow: 'auto'}} >
                    {introPage === 0 && 
                        <div>
                            <h1 className="appName">Welcome!</h1>
                            <Typography variant="body1" gutterBottom>
                                Welcome to MyFoodPrint, an application aimed to help you find more carbon-emission friendly grocery alternatives.
                            </Typography>

                            <Typography variant="body1" gutterBottom>
                                Our diets make up a large proportion an average person’s carbon footprint (about 30%). 
                                The choices we make in the grocery store play a big role in this. 
                                Rethinking some of our choices can have a profound impact on our individual (or family) footprint. 
                                [See <a href="https://www.science.org/doi/10.1126/science.aba7357" target="_blank" rel="noreferrer" >Clarke et al., Science, 2020</a>].
                            </Typography>

                            <Typography variant="body1" gutterBottom>
                                Unfortunately, it’s hard to know the impact of each specific choice. 
                                And it can be hard to know what meaningful changes you can realistically make. 
                                MyFoodPrint aims to help you by providing you insights about your past purchases by analysing your grocery receipts. 
                            </Typography>

                        </div>

                    }


                    {/* button that toggles to the next getting-started screen -- button text changes */}

                    {introPage === 1 &&
                        <div>
                            <h2 className="appName">How it works</h2>

                            <Typography variant="body1" gutterBottom>You take pictures of your grocery receipts.</Typography>

                            <Box sx={{display: "flex", justifyContent: 'center', padding: 2}}>
                                <img className='exampleIcon' src={receiptIcon} alt="Icon of a receipt"/>
                            </Box>

                            <Typography variant="body1" gutterBottom>
                                The app analyses the receipts... 
                            </Typography>

                            <Box sx={{display: "flex", justifyContent: 'center', padding: 2}}>
                            <   ManageSearchIcon sx={{ fontSize: 120, mx:'auto' }}/>
                            </Box>

                            <Typography variant="body1" gutterBottom>
                                ...and gives you insights about your foodprint...
                            </Typography>

                        </div>
                    }


                    {introPage === 2 &&
                        <div>
                            <h2 className="appName">How it works</h2>

                            <Typography variant="body1" gutterBottom>
                                This information is then given back to you in a graph. It shows you your opportunities for foodprint reduction. 
                            </Typography>

                            <Box onClick={() => setOpen(true)} sx={{display: "flex", justifyContent: 'center', padding: 2}}>
                                <img className='exampleImage' src={wordcloudImage} alt="Example wordcloud of products and their footprint"/>
                            </Box>

                            {/* wordcloud is shown with color legend and size legend -- Footprint per 100g; green: low (0-100gCO2/100g), yellow: moderate, orange: high, red: very high. [small word in grey: low total footprint, large word in grey: high total footprint] */}
                            
                            {/* <Typography variant="body1" gutterBottom>
                                Tap the question mark for some hints. */}
                                {/* The wordcloud shows....  Size and color suggest were to focus your efforts.  */}

                                {/* <em>Hint: by replacing large red or orange foods, you can expect most impact. 
                                Small red or orange foods have a high footprint per 100g, but you didn't buy much of it.  
                                Large green products are great choices that you seem to like and buy much of. </em>  */}

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
                            {/* </Typography> */}

                            <Alert severity="info" onClick={() => setOpen(true)}>Tap the question mark for some hints.</Alert>


                            <Dialog open={open} onClose={() => setOpen(prevState => !open)}>
                                <DialogTitle>
                                    What do the color and size mean?
                                    <IconButton
                                        aria-label="close"
                                        onClick={() => setOpen(prevState => !prevState)}
                                        sx={{
                                            position: 'absolute',
                                            right: 8,
                                            top: 8,
                                            color: (theme) => theme.palette.grey[500],
                                        }}
                                        >
                                        <CloseIcon />
                                    </IconButton>
                                    
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText>

                                        The color coding shows the footprint per 100g of the item. The size of a word reflects the combined footprint 
                                        from your purchases of this particular item (so, footprint-per-100g x weight-purchased).   
                                        {/* , similar to the color coded nutrition lables on food packages that signal fat and sugar concentrations */}

                                        <img src={Legend} alt="legend" className="exampleLegend" />

                                        {/* With size and color, the app shows you where changes can have the largest impact. 
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

                                        This way, the graph uses size and color suggest were to focus your efforts.                                         
                                        By replacing large red or orange foods, you can expect most impact. 
                                        Small red or orange foods have a high footprint per 100g, but you didn't buy much of it.  
                                        Large green products are great choices that you seem to like and buy much of. 
                                        These can be great alternatives for the red and orange foods.

                                        {/* With size and color, the app shows you where changes can have the largest impact. 
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
                                        </DialogContentText>
                                </DialogContent>              
                            </Dialog>

                        </div>
                    }

                    {introPage === 3 &&
                        <div>
                            <h2 className="appName">
                                Finding replacements
                            </h2>

                            <Typography variant="body1" gutterBottom>
                                By clicking a word, the app shows you a list of alternatives for this type of food.
                            </Typography>
                            
                            <Box sx={{display: "flex", justifyContent: 'center', padding: 2}}>
                                <img className='exampleIcon' src={alternativesImage} alt="Icon of a receipt"/>
                            </Box>

                        </div>
                    }

                    {introPage === 4 &&
                        <div>
                            <h2 className="appName">
                                Good to know!
                            </h2>

                            <Typography variant="body1" component='div' className="FAQtext">
                                Before you get started, there is some general knowledge about <Box onClick={() => setOpen(true)} color='primary.main' fontWeight='fontWeightMedium' display='inline'>foodprint </Box> 
                                that is good to know. The information can help you when considering specific items to purchase. 
                                And it helps you understand why the data in this application is shown in the way that it is. 
                            </Typography>
                            
                            <Dialog open={open} onClose={() => setOpen(prevState => !open)}>
                                <DialogTitle>
                                    What is foodprint?
                                    <IconButton
                                        aria-label="close"
                                        onClick={() => setOpen(prevState => !prevState)}
                                        sx={{
                                            position: 'absolute',
                                            right: 8,
                                            top: 8,
                                            color: (theme) => theme.palette.grey[500],
                                        }}
                                        >
                                        <CloseIcon />
                                    </IconButton>
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Foodprint is the carbon footprint of food; the environmental impact of the food we eat.

                                        It is expressed in gCO<sub>2</sub>e per 100g of food. Sometimes we also mention to the 'combined foodprint' of an item, which is the footprint of the item multiplied by the amount you bought.

                                        <span className='help'>g = grams</span>
                                        <span className='help'>gCO<sub>2</sub> = carbon dioxide</span>
                                        <span className='help'>e = equivalents</span>
                                        
                                        "Equivalents", because besides CO2, there are other greenhouse gasses that contribute to global warming and have to be accounted for. To harmonise their effect into a single measure, gCO2 equivalents is used.
                                    </DialogContentText>
                                </DialogContent>
                            </Dialog>

                            <Typography variant="overline" className="FAQheader" gutterBottom>
                                1. What determines the footprint of a product?
                            </Typography>

                            <Typography variant="body1">
                                Research shows, that the footprint of a product mostly comes from the farming, or sourcing, of food (about 81%). 
                                Some of the factors that that play a large role in this Deforestation, coral-reef damage, fertilizers, hothouses 
                                (e.g., for local tomatoes in March), and belching animals like cows and sheep burping methane. 
                                Post-farm processes have a relatively low impact on the foodprint of a product. 
                                Exemptions are, e.g., products that are airfreighted, like blueberries from Chili in December. 
                                In contrast, Strawberries from Spain can be considered low footprint, as road transport is relatively efficient and adds 
                                only a few percent to the footprint. Because production processes may be more efficient, e.g., due to increased sun exposure, 
                                a distantly sourced product may well have a lower foodprint, than a local version. 
                                <br/>

                                References: <a href="https://www.science.org/doi/10.1126/science.aba7357" target="_blank" rel="noreferrer" >Clarke et al., Science, 2020</a> and <a href="https://howbadarebananas.com/" target="_blank" rel="noreferrer" >Berners-Lee, How Bad Are Bananas?</a>

                            </Typography>

                            <Typography variant="overline" className="FAQheader" gutterBottom>
                                2. Why does the app not consider the difference between brands, or versions, of a product?

                            </Typography>

                            <Typography variant="body1">
                                In short, the information to do so is not readily available. Importantly however, choosing between different products 
                                is often more impactful than choosing between different versions of the same product. 
                                Therefore, we make no distinction between different origins or brands of the same product, 
                                but provide the average footprints of a specific product. 

                                <br/>

                                Exemptions are products that are airfreighted. Airfreight is often used when perishable produce (mostly berries and fresh beans) 
                                is off-season in the UK, as well as the European countries that provide produce to the UK by truck, like Spain. Another exemption 
                                is produce grown in hothouses, like British tomatoes grown out-of-season. Where there is an important clear impact that differentiates 
                                the footprint of one product version to the next, we have aimed to create different versions. In a few cases, we also include different 
                                versions as an example to show the estimated impact of e.g., transporting a strawberry from Spain.  

                                <br/>

                                References: <a href="https://www.science.org/doi/10.1126/science.aaq0216" target="_blank" rel="noreferrer" >Poore and Nemecek, Science, 2018</a> and <a href="https://howbadarebananas.com/" target="_blank" rel="noreferrer" >Berners-Lee, How Bad Are Bananas?</a>

                            </Typography>

                            <Typography variant="overline" className="FAQheader" gutterBottom>
                                3. Is is better to buy organic?

                            </Typography>

                            <Typography variant="body1">
                                Organic choices are not necessarily better from a footprint perspective, as reduced yield can outweigh the benefits from 
                                cleaner production processes. In general, relating variations in farming processes to the foodprint of a product is a complex 
                                matter. Just like for organic produce, the impact of a specific farming approach may have a counter-intuitive influence on the 
                                net foodprint of a product.
 

                                <br/>

                                References: <a href="https://howbadarebananas.com/" target="_blank" rel="noreferrer" >Berners-Lee, How Bad Are Bananas?</a>

                            </Typography>

                            <Typography variant="overline" className="FAQheader" gutterBottom>
                                4. What else should I be aware of?

                            </Typography>

                            <Typography variant="body1">
                                The application provides information on carbon footprint. There are obviously other aspects of environmental sustainability 
                                that are important that are not represented in carbon footprint. These are water use and biodiversity. Although we can expect 
                                that high footprint indicates also high water use and detriment to biodiversity, this relationship is not a given. It is  
                                always good to stay critical and aware of the limitations any data that you are shows.

                                <br/>   

                                While have done an effort to provide data that is accurate, cannot guarantee absence of mistakes. 
                                If you find any, please let us know.
                            </Typography>










                            <Typography variant="body1" align="center" gutterBottom sx={{my: 2}}>
                                <strong>Now let's login and go and explore!</strong>
                            </Typography>
                        </div>
                    }
                </Box>

                {/* <Grid item>
                    <Typography variant="body1" gutterBottom>test</Typography> */}

                {/* </Grid> */}




            </Grid>

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



