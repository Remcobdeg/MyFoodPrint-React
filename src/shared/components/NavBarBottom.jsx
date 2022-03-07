import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState("Basket");
  const navigate = useNavigate();

  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
            navigate("/"+newValue);        
            setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Recents" value="Basket" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" value="Alternatives" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Nearby" value="Stats" icon={<LocationOnIcon />} />
      </BottomNavigation>
    </Box>
  );
}
