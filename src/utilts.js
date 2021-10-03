export const DateTime = () => {
    let today = new Date();
    let date = today.getDate()+ '.' + (today.getMonth() + 1) + '.' +today.getFullYear() ;
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return ` ${date}, ${time}`;
}

export const GetPlaceIdFromLatLng = async (lat, lng) => {
    return await new window.google
        .maps
        .Geocoder()
        .geocode({ 'location': { lat, lng } }, (results, status) => results);
}

export const GetPlaceDetailsByPlaceId = (placeId) => {
    let apiKey = process.env.REACT_APP_GOOGLE_KRY || ""
    //const proxyurl = "https://cors-anywhere.herokuapp.com/";
    let detailsURL = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`
    const headers = {
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Method":"GET",
        "Access-Control-Allow-Credentials":true,
    }
    return fetch(detailsURL, {headers})
    .then(response => response.json())
    .then(contents => contents.result)
    .catch(() => console.log("Can’t access " + detailsURL + " response. Blocked by browser?"))
    
}