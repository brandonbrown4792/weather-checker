import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { fetchLocation, fetchWeather } from '../services/apiUtilities';

export function HomePage() {
    const [weatherInfo, setWeatherInfo] = useState({});

    const getWeather = function () {
        getLocation()
            .then(coords => fetchWeather(coords))
    }

    const getLocation = function () {
        return fetchLocation()
            .then(coords => coords)
            .catch(err => {
                console.warn(err.message)
            });
    }

    return <>
        <Button onClick={getWeather}>Get Weather</Button>
        <div>Your weather info is: </div>
        {/* <div>Latitude: {coordinates.latitude}</div> */}
    </>
}