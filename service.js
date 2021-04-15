// OpenWeather API Key
// bbf00de54183ca5ee1df8e94b4dcec01

// PositionStack API Key
// b2957380f0618ef16b62f12c4857144b

class Service {
    constructor(lat, long) {
        this.appid = 'bbf00de54183ca5ee1df8e94b4dcec01';
        this.access_key = 'b2957380f0618ef16b62f12c4857144b';
        // this.tal = lat;
        // this.long = long;
    }

    async get(positionURL, weatherURL, lat, long) {
        const positionResponse = await fetch(positionURL + `?access_key=${this.access_key}&query=${lat},${long}`);
        const positionData = await positionResponse.json();

        const weatherResponse = await fetch(weatherURL + `?lat=${lat}&lon=${long}&units=metric&appid=${this.appid}`);
        const weatherData = await weatherResponse.json();

        return {
            position: positionData,
            weather: weatherData
        };
    }

    async getCountryData(url) {
        const response = await fetch(url);
        const responseData = await response.json();

        return responseData;
    }

    async getWeatherOnly(positionURL, weatherURL, cityName) {
        const positionResponse = await fetch(positionURL + `?access_key=${this.access_key}&query=${cityName}`);
        const positionData = await positionResponse.json();
        console.log(positionData);

        const weatherResponse = await fetch(weatherURL + `?lat=${positionData.data[0].latitude}&lon=${positionData.data[0].longitude}&units=metric&appid=${this.appid}`);
        const weatherData = await weatherResponse.json();

        weatherResponse.ok
        return {
            weatherData: weatherData,
            isReady: weatherResponse.ok
        };
    }

}