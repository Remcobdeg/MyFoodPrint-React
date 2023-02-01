import React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import SettingsIcon from '@mui/icons-material/Settings';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from 'react-router-dom';

export default function SimpleBottomNavigation() {
  const [currentPage, setPage] = React.useState("Basket");
  const navigate = useNavigate();

  return (
    <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <BottomNavigation
        showLabels
        value={currentPage}
        onChange={(event, newPage) => {
            navigate("/"+newPage);        
            setPage(newPage);
        }}
      >
        <BottomNavigationAction label="Purchases" value="Basket" icon={<ShoppingBasketIcon />} />
        <BottomNavigationAction label="Alternatives" value="Alternatives" icon={<AltRouteIcon />} />
        <BottomNavigationAction label="Add receipt" value="Camera" icon={<AddCircleIcon />} />
        <BottomNavigationAction label="Stats" value="Stats" icon={<SsidChartIcon />} />
        <BottomNavigationAction label="Settings" value="Settings" icon={<SettingsIcon />} />
      </BottomNavigation>
    </Box>
  );
}
