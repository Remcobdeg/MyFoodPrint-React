import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, Checkbox, FormControlLabel } from "@mui/material";
import { trackEvent } from '../shared/modules/googleAnalyticsModules';
import { Typography } from '@mui/material';
import { AuthContext } from '../shared/context/authContext';
// import { createTheme, ThemeProvider  } from '@mui/material/styles';

import './welcome.css'
import logo from '../img/MyFoodPrint.png'

export default function Welcome (props){

    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);
    const [signed, setSigned] = React.useState(false);
    const [invited, setInvited] = React.useState(false);

    const handleSigned = (event) => {
        event.stopPropagation();
        trackEvent("Welcome", 'check consent signed',event.target.checked);
        setSigned(event.target.checked);
    };

    const handleInvited = (event) => {
        event.stopPropagation();
        trackEvent("Welcome", 'check invited',event.target.checked);
        setInvited(event.target.checked);
    };

    const handleClose = (event) => {
        event.stopPropagation();
        trackEvent("Welcome", 'click',"Confirm and continue");
        localStorage.setItem(
            'acceptedTerms',
            JSON.stringify({
              consent: true
            }));
        setOpen(false);
    };

    //suppress consent dialog if already accepted
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('acceptedTerms'));
        if (
            !storedData || (storedData && !!!storedData.consent)
        ) {
            setOpen(true);
        }
    }, []);

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


                <Dialog
                    open={open}                    
                >
                    <DialogTitle>
                        For research purposes only
                    </DialogTitle>
                    <DialogContent>
                        <Typography>
                            This application is for research purposes only.
                            You may only use it if you have a valid written invitation by the main researcher,
                            Remco Benthem de Grave, and have signed the consent form.
                            {/* <br/>
                            <br/> */}
                        </Typography>
                        <Box sx={{m: "1em"}}>
                            <FormControlLabel className='consent'
                                control={
                                    <Checkbox 
                                    checked={signed} 
                                    onChange={handleSigned} 
                                    />} 
                                label={
                                    <Typography> 
                                        I have signed and returned the consent form. 
                                    </Typography>
                                }/>
                            <FormControlLabel className='consent'
                                control={
                                    <Checkbox 
                                    checked={invited} 
                                    onChange={handleInvited} 
                                    />} 
                                label={
                                    <Typography> 
                                        I have received an invitation to use this application by Remco Benthem de Grave. 
                                    </Typography>
                                }/>
                        </Box>
                        <Typography>
                            If this is not the case, please close the application by closing the browser tab, or by clicking the back button in your browser.
                        </Typography>
                        

                    </DialogContent>
                    <DialogActions>
                        <Button 
                            onClick={handleClose}
                            disabled={!signed || !invited}
                        >
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>




                
            </Container>
        // </ThemeProvider>

    )

}