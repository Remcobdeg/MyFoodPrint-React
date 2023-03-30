import React, {useContext} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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


    return(
      <React.Fragment>
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
        
        <Button
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handlePressLogout}
            >
              Logout
            </Button>
        </Box>

      </React.Fragment>
    )
}

export default Settings; 