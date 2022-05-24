import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { AuthContext } from '../../shared/context/authContext';
import {useHttpClient} from '../../shared/hooks/http-hook';

import './Auth.css'

function Auth(props){

    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest } = useHttpClient();
    const [isSignup, setIsSignup] = useState(false);

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
              email: data.get('email'),
              password: data.get('password')
            },
            {
              "Content-type": "application/json"
            }
          )
          auth.login(response.data.userId, response.data.token, response.data.isAdmin);
        } catch(err){}        
    };

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
            <p>Sign in to MyFoodPrint to see the footprint of your past purchases</p>
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isSignup ? `Sign Up` : `Sign In`}
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component="button" variant="body2" onClick={toSignup}>
                  Signup
                </Link>
              </Grid>
            </Grid>

          </Box>
        </Box>
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