import React, { useContext, useState, useEffect } from "react"
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
import { PlacesContext } from "../PlacesContext";
import { DateTime, GetPlaceIdFromLatLng } from "../utilts";


function Map() {
  const { listOfPlaces, setListOfPlaces } = useContext(PlacesContext)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    localStorage.setItem("places", JSON.stringify(listOfPlaces))
  }, [listOfPlaces])


  const handlePickupPlace = (event) => {
    GetPlaceIdFromLatLng(event.latLng.lat(), event.latLng.lng())
    .then(({results}) =>{
      setListOfPlaces(preState =>
        [...preState,
        {
          id: uuidv4(),
          placeId: event.placeId || results[1].place_id || null,
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
          address: results[1].formatted_address || {},
          pickupDate: DateTime(),
          rating:null,
          opening_hours:null,
          formatted_phone_number:null,
          website:null,
          
        }])
    }) 
  }

  return (
    <GoogleMap
      defaultZoom={13}
      defaultOptions={{
        styles,
        disableDefaultUI: true,
        zoomControl: true
      }}
      defaultCenter={{ lat: 60.182059, lng: 24.935831 }}
      onClick={(event) => handlePickupPlace(event)}
    >
      {
        listOfPlaces.map((marker) => (
          <Marker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => setSelected(marker)}
          />
        ))
      }
      {
        selected ? (<InfoWindow position={{ lat: selected.lat, lng: selected.lng }} onCloseClick={() => setSelected(null)}>
          <div>
            <h2><span>Address: </span> {selected.address || null}</h2>
            <p><span>Pickup date: </span> {selected.pickupDate}</p>
          </div>
        </InfoWindow>) : null
      }

    </GoogleMap>

  )
}

export const WrappedMap = withScriptjs(withGoogleMap(Map))

export default function MapView() {
  let apiKey = process.env.REACT_APP_GOOGLE_KEY
  return (
    <div className="map-container">
      <h1 className="logo"> Mappi <span role="img" aria-label="mappi">🏟️</span></h1>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${apiKey}`}
        loadingElement={<div className="h-100" />}
        containerElement={<div className="h-100" />}
        mapElement={<div className="h-100" />}
      />
    </div>
  )
}
