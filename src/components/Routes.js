import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom"
import MapView from '../map'

export default function Routes(){
  return(
    <Router>
      <Switch>
        <Route exact path="/" component={MapView} />
      </Switch>
    </Router>
  )
}
