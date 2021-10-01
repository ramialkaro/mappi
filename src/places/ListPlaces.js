import React, { useContext} from 'react'
import { List, ListItem, Divider, ListItemText, Avatar, Typography, ListItemAvatar, IconButton, Fab } from '@mui/material'
import { Delete, PushPin as PushPinIcon } from '@mui/icons-material'
import Geocode from 'react-geocode'
import {PlacesContext} from '../PlacesContext'

export default function ListPlaces() {

    const { listOfPlaces , setListOfPlaces} = useContext(PlacesContext)

    const removePlace = (id) =>{
        var deleted = window.confirm(`Do you want to unpin this locaiton?`)
        var placesAfterFiler = listOfPlaces.filter(p => p.placeId !== id)
        deleted && localStorage.setItem("places", JSON.stringify(placesAfterFiler)) 
        setListOfPlaces(placesAfterFiler)
    }

    const clearPlaces = ()=> {
        var isClear = window.confirm("Do you want to reset?")
        isClear &&  localStorage.clear()
        setListOfPlaces([])
    }
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_KEY)

    return (
        <>
        <List sx={{width:'100%', bgcolor:'background.paper'}}>
            {
                
                listOfPlaces && listOfPlaces.map(place=>{
                   return(
                <div  key={place.placeId}>
                    <>
                    <ListItem 
                        alignItems="flex-start"
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete" color="error" onClick={e=>removePlace(place.placeId)}>
                                <PushPinIcon />
                            </IconButton>
                        }
                    >
                        <ListItemAvatar alt="location photo">
                            <Avatar src="./place.png"/>
                            </ListItemAvatar>
                        <ListItemText 
                            primary={place.placeId}
                            secondary={
                                <>
                                <React.Fragment>
                                    <Typography
                                    sx={{display:'inline'}}
                                    component="span"
                                    variant="body2"
                                    color="text.primary">
                                        address: 
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
                                        details: 
                                        </Typography>
                                        {}    
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
            <Fab color="primary" style={{position:'absolute', right:16, bottom:65}} onClick={clearPlaces}>
                <Delete />
            </Fab>
            </>
    )
}
