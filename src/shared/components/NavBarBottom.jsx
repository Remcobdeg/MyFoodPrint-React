import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import SettingsIcon from '@mui/icons-material/Settings';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import { useNavigate } from 'react-router-dom';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState("Basket");
  const navigate = useNavigate();

  return (
    <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
            navigate("/"+newValue);        
            setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Purchases" value="Basket" icon={<ShoppingBasketIcon />} />
        <BottomNavigationAction label="Alternatives" value="Alternatives" icon={<AltRouteIcon />} />
        <BottomNavigationAction label="Stats" value="Stats" icon={<SsidChartIcon />} />
        <BottomNavigationAction label="Settings" value="Settings" icon={<SettingsIcon />} />
      </BottomNavigation>
    </Box>
  );
}
