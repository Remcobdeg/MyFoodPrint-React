import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
// import { createTheme, ThemeProvider  } from '@mui/material/styles';

import './welcome.css'
import logo from '../img/MyFoodPrint.png'

export default function Welcome (props){

    const navigate = useNavigate();

    return(
        // <ThemeProvider theme={theme}>


            <Container maxWidth="sm" >
                {/* <CssBaseline/> */}
                <Grid container spacing = {1}>
                    <Grid item xs={12}>
                        <Box sx={{height: "40vh", display: "flex", alignItems: "justify-end"}}>
                            <img className='logoImg' src={logo} alt="My Food Print Logo" />
                        </Box>
                        <Box sx={{height: "20vh", width:"100%", textAlign: 'center'}}>
                            <h1 className='logoText2'>MyFoodPrint</h1>
                                <p>
                                    Understanding and Improving <br/>
                                    your diet carbon footprint
                                </p>
                            {/* <Typography variant="h3" gutterBottom sx={{fontWeight: 700}}>MyFoodPrint</Typography>
                            <Typography variant="subtitle1" gutterBottom >Understanding and Improving your diet carbon footprint</Typography> */}
                        </Box>
                    </Grid>
                    <Grid item xs={12}>

                    </Grid>
                    <Grid item xs={12}>
                        <Box   display="flex"  justifyContent="center"  alignItems="center" >
                            <Button variant="contained" onClick={() => navigate('/gettingstarted')}>GET STARTED</Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box   display="flex"  justifyContent="center"  alignItems="center" >
                            <Button onClick={() => navigate('/auth')}>Already registered? Skip to login</Button>
                            {/* <Button variant="text">SKIP TO LOGIN</Button> */}
                        </Box>
                    </Grid>
                </Grid>




                
            </Container>
        // </ThemeProvider>

    )

}