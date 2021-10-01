import { PlacesContext } from './PlacesContext'
import Routes from './components/Routes.js'
import './App.css'
import { useState } from 'react';

function App() {
  let storedPlaces = JSON.parse(localStorage.getItem("places")) || [] 
  const [ listOfPlaces, setListOfPlaces ] = useState(storedPlaces)
  return (
    <PlacesContext.Provider value={{ listOfPlaces, setListOfPlaces}}>
      <Routes />
    </PlacesContext.Provider>
  );
}

export default App;
