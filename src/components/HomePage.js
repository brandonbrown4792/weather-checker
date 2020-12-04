import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { fetchLocation, fetchWeather } from '../services/apiUtilities';
import { WeatherInfo } from './WeatherInfo';

export function HomePage() {
    const [weatherInfo, setWeatherInfo] = useState({
        data: null
    });

    const getWeather = function () {
        getLocation()
            .then(coords => fetchWeather(coords))
            .then(info => {
                info && setWeatherInfo(info)
            })
    }

    const getLocation = function () {
        return fetchLocation()
            .then(coords => coords)
            .catch(err => {
                console.warn(err.message)
            });
    }

    return <Container className='weather-container'>
        <Button className='get-weather-button' variant='info' onClick={getWeather} block>Get Weather</Button>
        {weatherInfo.data && <WeatherInfo data={weatherInfo.data} />}
    </Container>
}