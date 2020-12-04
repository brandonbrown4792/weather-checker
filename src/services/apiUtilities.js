const DEV_URL = 'http://localhost:3000'
const PROD_URL = 'https://weather-checker-api.herokuapp.com/'
const API_ROOT = process.env.NODE_ENV === 'development' ? DEV_URL : PROD_URL

export function fetchLocation() {
    const options = {
        timeout: 5000
    }

    function success(pos) {
        return {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
        }
    }

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            pos => resolve(success(pos)),
            err => reject(err),
            options
        )
    })
}

export function fetchWeather(coords) {
    const weatherObj = {
        coords: { ...coords }
    }

    const fetchObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(weatherObj)
    }

    return fetch(`${API_ROOT}/api/v1/get-weather`, fetchObj)
        .then(res => {
            if (res.status === 200) {
                return res.json()
            } else {
                throw Error()
            }
        })
        .then(data => ({ data: data }))
        .catch(err => {
            alert('Could not retrieve weather data');
        });
}