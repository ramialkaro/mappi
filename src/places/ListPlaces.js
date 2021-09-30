import React, { useState } from 'react'
import { List, ListItem, Divider, ListItemText, Avatar, Typography, ListItemAvatar, IconButton, Fab } from '@mui/material'
import { Delete, PushPin as PushPinIcon } from '@mui/icons-material'
import Geocode from 'react-geocode'

export default function ListPlaces({data}) {

    const [state, setState] = useState(data)

    const removePlace = (id) =>{
        var deleted = window.confirm(`Do you want to unpin this locaiton?`)
        var localPlacesList = JSON.parse(localStorage.getItem("places"))
        var places = localPlacesList.filter(p => p.placeId !== id)
        deleted && localStorage.setItem("places", JSON.stringify(places)) 
        setState(places)
    }

    const clearPlaces = ()=> {
        var isClear = window.confirm("Do you want to reset?")
        isClear &&  localStorage.clear()
        setState([])
        document.location.reload()
    }
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_KEY)

    return (
        <>
        <List sx={{width:'100%', bgcolor:'background.paper'}}>
            {
                
                state && state.map(place=>{
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
