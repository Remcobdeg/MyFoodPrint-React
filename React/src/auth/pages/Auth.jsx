import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import { Checkbox, Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { AuthContext } from '../../shared/context/authContext';
import {useHttpClient} from '../../shared/hooks/http-hook';
import DefaultDialog from '../../shared/components/defaultDialog';
import DefaultListItem from '../components/DefaultList';
import { List } from '@mui/material';
import ReactGA from "react-ga4";


import './Auth.css'

function Auth(props){

    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest } = useHttpClient();
    const [isSignup, setIsSignup] = useState(false);
    const [termsAgreed, setTermsAgreed] = useState(false);
    const [open, setOpen] = useState(false);

    function toSignup(event){
      event.preventDefault();
      console.log("signup button clicked")
      setIsSignup(prevState => !prevState);
    }

    async function handleSubmit(event){
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        try{
          const response = await sendRequest(
            "/users/" + (isSignup ? "signup" : "login"),
            'post',
            {
              name: data.get('userName'),
              email: data.get('email').toLowerCase(),
              password: data.get('password'),
              termsAgreed: termsAgreed
            },
            {
              "Content-type": "application/json"
            }
          )
          ReactGA.set({ user_id: response.data.userId });
          console.log("set userid to:",response.data.userId);
          auth.login(response.data.userId, response.data.token);
        } catch(err){}        
    };

    //go back button
    const navigate = useNavigate();

    const clickBack = (event) => {
      event.preventDefault();
      navigate(-1);
    }


    return(
      <div>
        <Box
          sx={{
            margin: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            
          }}
        >
            <h1>Sign in</h1>
            <Typography>Sign in to MyFoodPrint to see the footprint of your past purchases</Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {isSignup && <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="Your name"
              name="userName"
              autoFocus
            />}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              inputProps={{ style: { textTransform: "lowercase" } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {error && <Alert severity="error">{`${error}`}</Alert>}

            <FormControlLabel 
              control={
                <Checkbox 
                  checked={termsAgreed} 
                  onChange={(event) => setTermsAgreed(event.target.checked)} 
                  />} 
              label={
                <Typography> 
                  I agree to the <Link onClick={(e) => {e.preventDefault(); setOpen(true);}}>Terms of Service</Link>
                </Typography>
            }/>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!termsAgreed}
              sx={{ mt: 3, mb: 2 }}
            >
              {isSignup ? `Sign Up` : `Sign In`}
            </Button>

            <Grid container justifyContent="space-between">
              <Grid item>
                <Link component="button" variant="body2" onClick={clickBack}>
                  Back
                </Link>
              </Grid>
              <Grid item>
                <Link component="button" variant="body2" onClick={toSignup}>
                  Signup
                </Link>
              </Grid>
            </Grid>

          </Box>
        </Box>

        <DefaultDialog open={open} setOpen={setOpen} title="Terms of Service">
          This application is a research prototype. This has various implications:
          
          <List>
            <DefaultListItem text="It is not intended for commercial use." />
            <DefaultListItem text="You agree to use the application only after signing the consent form." />
            <DefaultListItem text="You agree to treat the content as confidential." />
            <DefaultListItem text="You accepts faults in the data may exist." />            
          </List>
        </DefaultDialog>

        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
          // onClick={() => setIsLoading(false)}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    )
        

};

export default Auth;