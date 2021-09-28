import React, {useEffect} from 'react';
import {BottomNavigation, BottomNavigationAction, Paper} from '@mui/material';
import {Favorite as FavoriteIcon, LocationOn as LocationOnIcon} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const [value, setValue] = React.useState(0);
  let path = useLocation().pathname

  useEffect(() => {
   path==="/favorites" && setValue(1)
  }, [path])

  return (

<Paper sx={{position: 'fixed', bottom:0, left:0, right:0}}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Map" component={Link} to="/" icon={<LocationOnIcon />} />
        <BottomNavigationAction label="Favorites" component={Link} to="/places" icon={<FavoriteIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
