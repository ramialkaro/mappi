import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import {Box} from '@mui/material'
import MapView from '../map'
import PlacesView from '../places'
import BottomNav from './BottomNav'

export default function Routes(){
  return(
    <Router>
      <Switch>
        <Box sx={{pb:7}}>
          <>
          <Route exact path="/" component={MapView} />
          <Route path="/places" component={PlacesView} />
          </>
        <BottomNav /> 
        </Box>
      </Switch>
    </Router>
  )
}
