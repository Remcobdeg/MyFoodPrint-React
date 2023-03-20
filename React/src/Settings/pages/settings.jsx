import React, {useContext} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { AuthContext } from '../../shared/context/authContext';
import HelpPages from '../../shared/components/HelpPages';
import { StyledHeader } from '../../shared/MuiStyledComponents/MuiStyledComponents';
import { useNavigate } from 'react-router-dom';

function Settings(props){

    const auth = useContext(AuthContext);

    const navigate = useNavigate();

    function handlePressLogout(){
        auth.logout(); 
    }

    function handlePressReplayTutorial(){
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
              onClick={handlePressLogout}
            >
              Logout
            </Button>
        </Box>

      </React.Fragment>
    )
}

export default Settings; 