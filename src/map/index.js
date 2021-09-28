import React from 'react'
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs
} from 'react-google-maps'

function Map(){

  return(
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{
        lat: 60.1822059,
        lng: 24.953831
      }}
      defaultOptions={{
        disableDefaultUI:true,
        zoomControl:true
      }}
    />
  )
}

export const WrappedMap = withScriptjs(withGoogleMap(Map))

export default function MapView(){
  let apiKey = process.env.REACT_APP_GOOGLE_KEY

  if(!apiKey){
    return ( 
      <div className="no-map">PLZ check the Google Map API Key </div>
    )
  }

  return(
    <article className="map-container">
      <h1 className="logo" > Mappi <span role="img" aria-label="mappi">🏟️</span> </h1>
      
      <WrappedMap 
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${apiKey}`}
        loadingElement={<div className="h-100"/>}
        containerElement={<div className="h-100"/>}
        mapElement={<div className="h-100"/>}

      />

    </article>
  )
}
