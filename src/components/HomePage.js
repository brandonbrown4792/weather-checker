import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { fetchLocation } from '../apiUtilities/apiUtilities';

export function HomePage() {
    const [coordinates, setCoordinates] = useState({});

    const getLocation = function () {
        fetchLocation()
            .then(coords => setCoordinates(coords))
            .catch(err => {
                console.warn(err.message)
            });
    }

    return <>
        <Button onClick={getLocation}>Location?</Button>
        <div>Your coordinates are: </div>
        <div>Latitude: {coordinates.latitude}</div>
        <div>Latitude: {coordinates.longitude}</div>
    </>
}