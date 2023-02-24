import React, {useContext} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { AuthContext } from '../../shared/context/authContext';
import HelpPages from '../../shared/components/HelpPages';
import { StyledHeader } from '../../shared/MuiStyledComponents/MuiStyledComponents';

function Settings(props){

    const auth = useContext(AuthContext);

    function handlePress(){
        auth.logout(); 
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
        <Button
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handlePress}
            >
              Logout
            </Button>
        </Box>
        <HelpPages fromPage={1}/>
      </React.Fragment>
    )
}

export default Settings; 