import React, {useContext} from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import SettingsIcon from '@mui/icons-material/Settings';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from 'react-router-dom';
import { navContext } from '../context/navContext';

export default function SimpleBottomNavigation() {
  const [currentPage, setPage] = React.useState("basket");
  const navigate = useNavigate();

  const nav = useContext(navContext);

  return (
    <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <BottomNavigation
        showLabels
        value={nav.currentPage}
        onChange={(event, newPage) => {
            navigate("/"+newPage);        
            nav.setPage(newPage);
        }}
      >
        <BottomNavigationAction label="Purchases" value="basket" icon={<ShoppingBasketIcon />} />
        <BottomNavigationAction label="Alternatives" value="alternatives" icon={<AltRouteIcon />} />
        <BottomNavigationAction label="Add receipt" value="camera" icon={<AddCircleIcon />} />
        <BottomNavigationAction label="Stats" value="stats" icon={<SsidChartIcon />} />
        <BottomNavigationAction label="Settings" value="settings" icon={<SettingsIcon />} />
      </BottomNavigation>
    </Box>
  );
}
