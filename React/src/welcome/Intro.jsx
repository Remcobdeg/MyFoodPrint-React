import React from "react"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';

import "./Intro.css";

function Intro(props){

    return(
        <Container maxWidth = "sm">
            <h1 className="appName">MyFoodPrint</h1>
            <p>
                Our diets make up about 30% of our carbon footprint. 
                Improving diet choices is important for reducing our carbon footprint. 
                It's even crucial to achieve the COP goals of limiting global warming to +1.5° 
                (see <a href="https://www.science.org/doi/10.1126/science.aba7357" target="_blank" rel="noreferrer" >Clarke et al., Science, 2020</a>).
            </p>

            <p>
                MyFoodPrint is designed to help you understand your 'foodprint' and find alternatives. 
            </p>

            {/* button that toggles to the next getting-started screen -- button text changes */}

            <h2 className="appName">How?</h2>

            <p>By taking a picture of your grocery receipt you record the items in your app.</p>

            

        

        </Container>
    )

}

export default Intro;



