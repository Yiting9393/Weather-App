// Live update of current date

let now = new Date();

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();

let liveDate = document.querySelector("#dates");
liveDate.innerHTML = `${day} ${hour}:${minutes}`; 

// ***

// Display live weather after submit search

function showTemperature(response){
    let city = response.data.name;
    let cityElement = document.querySelector(".current-city");
    cityElement.innerHTML = city;
    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector(".temperature");
    temperatureElement.innerHTML = temperature;
    let maxTemp = Math.round(response.data.main.temp_max);
    let maxTempElement = document.querySelector(".high");
    maxTempElement.innerHTML = `H:${maxTemp}°`;
    let minTemp = Math.round(response.data.main.temp_min);
    let minTempElement = document.querySelector(".low");
    minTempElement.innerHTML = `L:${minTemp}°`;
    let feelsLike = Math.round(response.data.main.feels_like);
    let feelsLikeElement = document.querySelector(".feels-like-value");
    feelsLikeElement.innerHTML = `${feelsLike}°`;
    let humidity = response.data.main.humidity;
    let humidityElement = document.querySelector("#humidity-value");
    humidityElement.innerHTML = `${humidity}%`;
    let windSpeed = response.data.wind.speed;
    let windSpeedElement = document.querySelector("#wind-value");
    windSpeedElement.innerHTML = `${windSpeed}km/h`;
}

function importWeather (event) {
    event.preventDefault();
    let city = document.querySelector("#search-input");
    let units = `metric`; 
    let apiKey = `bf2c0ac77d7ed4ba5477597b0389d74a`;
    let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather`
    let apiUrl = `${apiEndPoint}?q=${city.value}&units=${units}&appid=${apiKey}`;
    axios.get(apiUrl).then(showTemperature);
    
}

let search = document.querySelector(".search-city");
search.addEventListener("submit", importWeather);

function showPosition(position){
 let latitude = position.coords.latitude;
 let longitude = position.coords.longitude;
 let units = `metric`; 
 let apiKey = `bf2c0ac77d7ed4ba5477597b0389d74a`;
 let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather`
 let apiUrl = `${apiEndPoint}?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
 axios.get(apiUrl).then(showTemperature);
}

function retrieveCoordinates(event){
    navigator.geolocation.getCurrentPosition(showPosition);
}


let myLocationSearch = document.querySelector(".quick-search-myLocation");
myLocationSearch.addEventListener("click", retrieveCoordinates);

