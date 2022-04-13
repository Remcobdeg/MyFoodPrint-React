import React, {useContext} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { AuthContext } from '../../shared/context/authContext';

function Settings(props){

    const auth = useContext(AuthContext);

    function handlePress(){
        auth.logout(); 
    }

    return(
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
    )
}

export default Settings; 