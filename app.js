// PositionStack API Url
// "http://api.positionstack.com/v1/reverse?access_key=b2957380f0618ef16b62f12c4857144b&query={lat},{long}"
// "http://api.positionstack.com/v1/forward?access_key=b2957380f0618ef16b62f12c4857144b&query={city}"

// OpenWeather API Url
// "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}"

const service = new Service();
const view = new View();

let weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

let currentDay = weekday[new Date().getDay()];


view.countrySelector.addEventListener('change', GetCitiesAndShowInView);
view.citySelector.addEventListener('change', GetDataAndShow);

function GetCitiesAndShowInView() {
    const selectedCountry = view.countrySelector.value;
    service.getCountryData('all-countries-and-cities-json-master/countries.json')
        .then(data => {
            console.log(data);
            Object.keys(data).forEach(country => {
                if (country === selectedCountry) {
                    view.ShowCities(data[selectedCountry]);
                }
            })
        })
        .catch(err => console.log(err));

}

function GetDataAndShow() {
    const selectedCity = view.citySelector.value;
    console.log(selectedCity);
    service.getWeatherOnly('http://api.positionstack.com/v1/forward', 'https://api.openweathermap.org/data/2.5/onecall', selectedCity)
        .then(data => {
            view.ShowChooseCard(data.weatherData, currentDay, data.isReady);
        })
        .catch(err => console.log(err));

}

function Success(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;

    service.get('http://api.positionstack.com/v1/reverse', 'https://api.openweathermap.org/data/2.5/onecall', lat, long)
        .then(data => {
            // Show Current Data Card
            view.ShowCurrentCard(data, currentDay);
        })
        .catch((err) => {
            // Alert Error
            console.log(err)
        });

}

function Err(err) {
    console.log(err)
}
service.getCountryData('../all-countries-and-cities-json-master/countries.json')
    .then(data => {
        view.ShowCountries(Object.keys(data));
    })
    .catch(err => console.log(err));

navigator.geolocation.getCurrentPosition(Success, Err);