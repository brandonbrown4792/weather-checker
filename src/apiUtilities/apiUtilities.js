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