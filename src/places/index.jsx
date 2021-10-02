import React, { useContext} from 'react'
import ListPlaces from './ListPlaces'
import EmptyPlaces from './EmptyPlaces'
import { PlacesContext } from '../PlacesContext'

export default function Index() {
    const { listOfPlaces } = useContext(PlacesContext)
    
    return (
        <div >
            {
                listOfPlaces.length > 0? 
                <ListPlaces /> :    
                <EmptyPlaces /> 
            }
        </div>
    )
}