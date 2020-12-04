import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';

export function WeatherInfo({ data }) {
    const tempScales = {
        Fahrenheit: 'F',
        Celcius: 'C'
    }

    const [formattedWeatherData, setFormattedWeatherData] = useState(null)
    const [tempScale, setTempScale] = useState('F');

    useEffect(() => {
        setFormattedWeatherData({
            ...formattedWeatherData,
            cityName: data.name,
            main: {
                feels_like: convertTemp(data.main.feels_like, tempScale),
                humidity: `${data.main.humidity}%`,
                temp: convertTemp(data.main.temp, tempScale),
                temp_max: convertTemp(data.main.temp_max, tempScale),
                temp_min: convertTemp(data.main.temp_min, tempScale),
            },
            weather: data.weather.map(el => ({ ...el, description: titleCase(el.description) })),
            wind: {
                speed: `${Math.round(data.wind.speed * 2.23694)}mph`,
                direction: calculateWindDirection(data.wind.deg)
            }
        })
    }, [])

    function convertTemp(K, scale) {
        if (scale === tempScales.Celcius) {
            return `${Math.round(K - 273.15)}°`;
        } else {
            return `${Math.round((K - 273.15) * 9 / 5 + 32)}°`;
        }
    }

    function titleCase(str) {
        let splitStr = str.split(' ');
        return splitStr.map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
    }

    function calculateWindDirection(degree) {
        let value = Math.floor(degree / 45 + 0.5);
        let directions = ["North", "North East", "East", "South East", "South", "South West", "West", "North West"];
        return directions[value % 8];
    }

    return (
        <>
            {formattedWeatherData && <Card style={{ margin: '20px auto', maxWidth: '400px' }}>
                <Card.Body style={{ textAlign: 'center' }}>
                    <Row>
                        <Col><div className='mb-1'>Location: {formattedWeatherData.cityName}</div></Col>
                    </Row>
                    {formattedWeatherData.weather.map(el =>
                        <Row key={el.description}>
                            <Col><div style={{ fontSize: '2rem' }}>{el.description}</div></Col>
                        </Row>
                    )}
                    <Row className='mb-3'>
                        <Col md={5}>
                            <Card.Title style={{ fontSize: '4rem' }}>{formattedWeatherData.main.temp}</Card.Title>
                        </Col>
                        <Col md={7}>
                            <div className='mb-2'>Feels like: {formattedWeatherData.main.feels_like}</div>
                            <div>High: {formattedWeatherData.main.temp_max}</div>
                            <div>Low: {formattedWeatherData.main.temp_min}</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div>Wind: {formattedWeatherData.wind.speed} {formattedWeatherData.wind.direction}</div>
                            <div>Humidity: {formattedWeatherData.main.humidity}</div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>}
        </>
    );
}