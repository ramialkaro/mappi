import React, {useEffect, useState} from "react"
import {
    GoogleMap,
    withGoogleMap,
    withScriptjs,
    Marker,
    InfoWindow,
  } from "react-google-maps"
import styles from './mapStyles'
import "../App.css"
import { v4 as uuidv4 } from 'uuid';

  function Map(){
    const [markers, setMarkers] = useState([])
    const [selected, setSelected] = useState(null)

    let localPlacesList = localStorage.getItem("places")
    

    useEffect(()=>{
      markers.length > 0 && localStorage.setItem("places", JSON.stringify(markers))
    }, [markers])

    useEffect(()=>{ 
      localPlacesList && setMarkers(JSON.parse(localPlacesList))
    }, [])
    
    
    return(
      <GoogleMap
        defaultZoom ={12}
        defaultOptions={{
          styles,
          disableDefaultUI:true,
          zoomControl:true
        }}
        defaultCenter={{lat:60.182059, lng:24.935831}}
        onClick={(event) => {
          console.log(event)
          setMarkers(preState => 
            [...preState, 
            { 
              lat: event.latLng.lat(), 
              lng: event.latLng.lng(), 
              placeId: uuidv4(),
            }])
        }}
      >
        {
          markers.map( (marker) => (
            <Marker
              key={marker.placeId}
              position={{lat:marker.lat, lng:marker.lng}}
              onClick={()=> {setSelected(marker)}}
            />
          ))
        }
        {
          selected ? (<InfoWindow position={{lat: selected.lat, lng: selected.lng}} onCloseClick={()=> {setSelected(null)}}>
            <div>
              <h2>Testing</h2>
            </div>
          </InfoWindow> ) :null
        }

      </GoogleMap>
  
    )
  }
  
 export const WrappedMap = withScriptjs(withGoogleMap(Map))

 export default function MapView(){
   let apiKey = process.env.REACT_APP_GOOGLE_KEY
   return (
    <div className="map-container">
      <h1 className="logo"> Mappi <span role="img" aria-label="mappi">🏟️</span></h1>
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
          apiKey}`}
          loadingElement={ <div className="h-100"/> }
          containerElement={ <div className="h-100"/> }
          mapElement={ <div className="h-100"/> }
        />
  </div>
   )
 }
  