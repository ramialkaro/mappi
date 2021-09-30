import React, { useEffect, useState } from 'react'
import ListPlaces from './ListPlaces'
import EmptyPlaces from './EmptyPlaces'

export default function Index() {

    const [places, setPlaces] = useState([])
    let localPlacesList = localStorage.getItem("places")

    useEffect(()=>{
        localPlacesList && setPlaces(JSON.parse(localPlacesList))
    }, [localPlacesList])
    
    return (
        <div >
            {
                places.length > 0? 
                <ListPlaces data={places}/> :    
                <EmptyPlaces /> 
            }
        </div>
    )
}