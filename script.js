document.getElementById('weatherForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('city').value;
    const apiKey = '5933bfceb6ace833dd2eae2fbea1fc98';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherResult = document.getElementById('weatherResult');
            if (data.cod === '404') {
                weatherResult.innerHTML = `<p>City not found</p>`;
            } else {
                weatherResult.innerHTML = `
                    <p><strong>${data.name}, ${data.sys.country}</strong></p>
                    <p>Temperature: ${data.main.temp}°C</p>
                    <p>Weather: ${data.weather[0].description}</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Wind Speed: ${data.wind.speed} m/s</p>
                `;
            }
        })
        .catch(error => {
            const weatherResult = document.getElementById('weatherResult');
            weatherResult.innerHTML = `<p>Error fetching weather data</p>`;
            console.error('Error fetching weather data:', error);
        });
});
