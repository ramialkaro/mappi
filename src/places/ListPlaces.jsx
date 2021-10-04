import React, { useContext } from 'react'
import { List, ListItem, Divider, ListItemText, Avatar, Typography, ListItemAvatar, IconButton, Fab } from '@mui/material'
import { Delete, PushPin as PushPinIcon } from '@mui/icons-material'
import { PlacesContext } from '../PlacesContext'
import { GetPlaceDetailsByPlaceId } from '../utilts'

export default function ListPlaces() {

    const { listOfPlaces, setListOfPlaces } = useContext(PlacesContext)

    const removePlace = (e, id) => {
        e.preventDefault()
        var deleted = window.confirm(`Do you want to unpin this locaiton?`)
        var placesAfterFiler = listOfPlaces.filter(p => p.id !== id)
        deleted && localStorage.setItem("places", JSON.stringify(placesAfterFiler))
        setListOfPlaces(placesAfterFiler)
    }

    const clearPlaces = () => {
        var isClear = window.confirm("Do you want to reset?")
        isClear && localStorage.clear()
        setListOfPlaces([])
    }

    GetPlaceDetailsByPlaceId()

    /*     useEffect(() => {
            let storedPlaces = JSON.parse(localStorage.getItem("places")) || [] 
            storedPlaces.map(place => {
                place.placeId && GetPlaceDetailsByPlaceId(place.placeId)
                    .then(details => {
                        setListOfPlaces(prevState => 
                            [...prevState,
                            {
                                formatted_phone_number: details.formatted_phone_number || null,
                            }]
                        )
                    })
            })
        }, []) */


    return (
        <>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {

                    listOfPlaces && listOfPlaces.map(place => {

                        return (
                            <div key={place.id}>
                                <>
                                    <ListItem
                                        alignItems="flex-start"
                                        secondaryAction={
                                            <IconButton edge="end" aria-label="delete" color="error" onClick={e => removePlace(e, place.id)}>
                                                <PushPinIcon />
                                            </IconButton>
                                        }
                                    >
                                        <ListItemAvatar alt="location photo">
                                            <Avatar src="./place.png" />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={`Address: ${place.address}`}
                                            secondary={
                                                <>
                                                    {
                                                        place.rating ?

                                                            <>
                                                                <Typography
                                                                    sx={{ display: 'inline' }}
                                                                    component="span"
                                                                    variant="body2"
                                                                    color="text.primary">
                                                                    rating:
                                                                </Typography>
                                                                {
                                                                    place.rating
                                                                }
                                                                <br />
                                                            </> : null
                                                    }
                                                    {
                                                        place.opening_hours?.open_now ?

                                                            <>
                                                                <Typography
                                                                    sx={{ display: 'inline' }}
                                                                    component="span"
                                                                    variant="body2"
                                                                    color="text.primary">
                                                                    open days:
                                                                </Typography>
                                                                {
                                                                    place.opening_hours?.weekday_text.map(day =>
                                                                        <p>{day}</p>
                                                                    )
                                                                }
                                                                <br />
                                                            </> : null
                                                    }
                                                    {
                                                        place.formatted_phone_number ? <>
                                                            <Typography
                                                                sx={{ display: 'inline' }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary">
                                                                phone number:
                                                            </Typography>
                                                            {
                                                                place.formatted_phone_number || null
                                                            }
                                                            <br />
                                                        </> : null
                                                    }

                                                    <React.Fragment>
                                                        <Typography
                                                            sx={{ display: 'inline' }}
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
                        )
                    })
                }
            </List>
            <Fab color="primary" style={{ position: 'fixed', right: 16, bottom: 65 }} onClick={() => clearPlaces()}>
                <Delete />
            </Fab>
        </>
    )
}
