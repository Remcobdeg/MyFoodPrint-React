import React, {useContext} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import { AuthContext } from '../../shared/context/authContext';
import HelpPages from '../../shared/components/HelpPages';
import { StyledHeader } from '../../shared/MuiStyledComponents/MuiStyledComponents';
import { useNavigate } from 'react-router-dom';
import { trackEvent } from '../../shared/modules/googleAnalyticsModules';

function Settings(props){

    const auth = useContext(AuthContext);

    const navigate = useNavigate();

    function handlePressLogout(event){
      event.stopPropagation();
      trackEvent("settings", "click", "logout button clicked");
      auth.logout(); 
    }

    function handlePressReplayTutorial(event){
        event.stopPropagation();
        trackEvent("settings", "click", "replay tutorial button clicked");
        navigate('/gettingstarted');
    }

    function handlePressAdmin(event){
        event.stopPropagation();
        trackEvent("settings", "click", "admin button clicked");
        navigate('/admin');
    }

    // const isAdmin = true; //auth.isAdmin;


    return(
      <Container maxWidth="sm" sx={{px: "1em", pb: "64px"}} >
        <StyledHeader variant="h4">Settings</StyledHeader> 

        <Box
          sx={{
            margin: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            
          }}
        >
        <HelpPages/>
        <Button
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handlePressReplayTutorial}
        >
          Replay intro tutorial
        </Button>

        <Button
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          href="mailto:myfoodprintuk@gmail.com"
          onClick={(event) => {
            event.stopPropagation();
            trackEvent("settings", "click", "contact us button clicked");
            // window.location.href = "mailto:
          }}
        >
          Contact us
        </Button>

        {!!props.isAdmin && <Button
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handlePressAdmin}
        >
          Admin
        </Button>}

        {!!props.isAdmin && <Button
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={(event) => {navigate('/testcam');}}
        >
          Test camera
        </Button>}

        <Button
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handlePressLogout}
        >
          Logout
        </Button>
      </Box>

      </Container>
    )
}

export default Settings; 