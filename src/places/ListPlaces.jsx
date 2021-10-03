import React, { useContext, useEffect} from 'react'
import { List, ListItem, Divider, ListItemText, Avatar, Typography, ListItemAvatar, IconButton, Fab } from '@mui/material'
import { Delete, PushPin as PushPinIcon } from '@mui/icons-material'
import {PlacesContext} from '../PlacesContext'
import { GetPlaceDetailsByPlaceId } from '../utilts'

export default function ListPlaces() {

    const { listOfPlaces , setListOfPlaces} = useContext(PlacesContext)

    const removePlace = (e,id) =>{
        e.preventDefault()
        var deleted = window.confirm(`Do you want to unpin this locaiton?`)
        var placesAfterFiler = listOfPlaces.filter(p => p.id !== id)
        deleted && localStorage.setItem("places", JSON.stringify(placesAfterFiler)) 
        setListOfPlaces(placesAfterFiler)
    }

    const clearPlaces = ()=> {
        var isClear = window.confirm("Do you want to reset?")
        isClear &&  localStorage.clear()
        setListOfPlaces([])
    }
   
    useEffect(() => {
        localStorage.setItem("places", JSON.stringify(listOfPlaces))
      }, [listOfPlaces])

    useEffect(() => {
        listOfPlaces.map( place => 
            GetPlaceDetailsByPlaceId(place.placeId)
            .then(details => {
                console.log(details)
                /* setListOfPlaces(prevState => 
                    [...prevState,
                    {
                        ...place,
                        rating: details?.rating || null,
                        opeing_hours: details?.opening_hours?.weekday_text || null,
                        formatted_phone_number: details?.formatted_phone_number || null,
                        website: details?.website || null,
                    }]
                ) */
            })
        ) 
        
    }, [listOfPlaces])
    
    return (
        <>
        <List sx={{width:'100%', bgcolor:'background.paper'}}>
            {
                
                listOfPlaces && listOfPlaces.map(place=>{
                   
                   return(
                <div  key={place.id}>
                    <>
                    <ListItem 
                        alignItems="flex-start"
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete" color="error" onClick={e=>removePlace(e,place.id)}>
                                <PushPinIcon />
                            </IconButton>
                        }
                    >
                        <ListItemAvatar alt="location photo">
                            <Avatar src="./place.png"/>
                            </ListItemAvatar>
                        <ListItemText 
                            primary={`Address: ${place.address}`}
                            secondary={
                                <>
                                <React.Fragment>
                                    <Typography
                                    sx={{display:'inline'}}
                                    component="span"
                                    variant="body2"
                                    color="text.primary">
                                        opens: 
                                        </Typography>
                                        {
                                           
                                        }    
                                </React.Fragment>
                                    <br/>
                                <React.Fragment>
                                    <Typography
                                    sx={{display:'inline'}}
                                    component="span"
                                    variant="body2"
                                    color="text.primary">
                                        rating: 
                                        </Typography>
                                        {
                                           place.rating
                                        }    
                                </React.Fragment>
                                    <br/>
                                <React.Fragment>
                                    <Typography
                                    sx={{display:'inline'}}
                                    component="span"
                                    variant="body2"
                                    color="text.primary">
                                        Pickup Date: 
                                        </Typography>
                                        {place.pickupDate}    
                                </React.Fragment>
                                    </>
                            } />
            
                    </ListItem>
                    <Divider variant="inset" component="li" />    
                    </>
                </div>       
                )})
            }
            </List>
            <Fab color="primary" style={{position:'absolute', right:16, bottom:65}} onClick={()=>clearPlaces()}>
                <Delete />
            </Fab>
            </>
    )
}
