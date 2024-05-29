// script.js
async function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = '5933bfceb6ace833dd2eae2fbea1fc98';
    const currentWeatherUrl = `https://openweathermap.org/`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const currentWeatherResponse = await fetch(currentWeatherUrl);
        const currentWeatherData = await currentWeatherResponse.json();
        displayCurrentWeather(currentWeatherData);

        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();
        displayForecast(forecastData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayCurrentWeather(data) {
    const currentWeatherDetails = document.getElementById('current-weather-details');
    currentWeatherDetails.innerHTML = `
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind: ${data.wind.speed} m/s</p>
    `;
}

function displayForecast(data) {
    const forecastDetails = document.getElementById('forecast-details');
    forecastDetails.innerHTML = '';

    data.list.forEach((forecast, index) => {
        if (index % 8 === 0) { // Display one forecast per day
            forecastDetails.innerHTML += `
                <div class="forecast-item">
                    <p>${new Date(forecast.dt * 1000).toDateString()}</p>
                    <p>Temp: ${forecast.main.temp} °C</p>
                    <p>${forecast.weather[0].description}</p>
                </div>
            `;
        }
    });
}
