class View {

  constructor() {
    this.currentePositionOutput = document.querySelector('#currentHeader');
    this.currenteWeatherOutput = document.querySelector('.current-img-wrapper');

    this.choosePositionOutput = document.querySelector('#chooseHeader');
    this.chooseWeatherOutput = document.querySelector('.choose-img-wrapper');

    this.countrySelector = document.querySelector('#countrySelector');
    this.citySelector = document.querySelector('#citySelector');
  }

  ShowCurrentCard(data,currentDay) {
    const position = new Position(data.position.data[0].country,data.position.data[0].county);
    const weather = new Weather(data.weather.current.temp,data.weather.current.weather[0].icon,data.weather.current.weather[0].description);
    const positionOutput = `
        <h2 class="text-center">${position.country}</h2>
        <p class="card-text text-center">${position.county}</p>
    `;

    this.currentePositionOutput.innerHTML = positionOutput;

    const weatherOutput = `
    <p class="card-text text-center temp-text">${weather.temp}°C</p>
    <img src="http://openweathermap.org/img/wn/${weather.icon}@2x.png" alt="Weather Icon" class="img-fluid d-block mx-auto weather-icon">
    <p class="card-text text-center weather-text">${weather.description}</p>
    <p class="card-text text-center day-text">${currentDay}</p>
    `;

    this.currenteWeatherOutput.innerHTML = weatherOutput;
  }

  ShowCountries(data){
    this.countrySelector.innerHTML = '';
    data.forEach(country => {
      let option = document.createElement('option');
      option.value = `${country}`;
      option.className = 'text-center choose-header-text';
      option.innerHTML = `${country}`;
      this.countrySelector.appendChild(option);
    });
  }

  ShowCities(data){
    this.citySelector.innerHTML = '';
    data.forEach(city => {
      let option = document.createElement('option');
      option.value = `${city}`;
      option.className = 'text-center choose-header-text';
      option.innerHTML = `${city}`;
      this.citySelector.appendChild(option);
    });
  }

}