import { useEffect, useContext } from "react";
import { PlacesContext } from './PlacesContext'

export const DateTime = () => {
    let today = new Date();
    let date = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return ` ${date}, ${time}`;
}

export const GetPlaceIdFromLatLng = async (lat, lng) => {
    return await new window.google
        .maps
        .Geocoder()
        .geocode({ 'location': { lat, lng } }, (results, status) => results);
}

export const GetPlaceDetailsByPlaceId = () => {
    let apiKey = process.env.REACT_APP_GOOGLE_KEY
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const { listOfPlaces} = useContext(PlacesContext)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    let myList = []

    useEffect(() => {
        async function fetchPlaceDetails(place) {
            const detailsURL = `${proxyurl}https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.placeId}&key=${apiKey}`
            const response = await fetch(detailsURL)
            const json = await response.json()
             
            if(place.placeId === json.result.place_id){
                myList.push({
                    id: place.id,
                    placeId: place.placeId,
                    lat: place.lat,
                    lng: place.lng,
                    address: place.address,
                    pickupDate: place.pickupDate,
                    rating: json.result.rating || null,
                    opening_hours: {
                        open_now: json.result.opening_hours? json.result.opening_hours.open_now :null,
                        weekday_text: json.result?.opening_hours?.weekday_text || null,
                    },
                    formatted_phone_number: json.result.formatted_phone_number || null,
                    website: json.result.formatted_phone_number || null,
                })
            }
             
            localStorage.setItem("places",JSON.stringify(myList))
        }
        listOfPlaces.map(place =>  fetchPlaceDetails(place))
        
    }, [apiKey, listOfPlaces, myList])



}