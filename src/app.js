function formatDate(timestamp) {
	let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

	let months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"June",
		"July",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	let newDate = new Date(timestamp);
	let hours = newDate.getHours();
	let minutes = newDate.getMinutes();
	let day = days[newDate.getDay()];
	let month = months[newDate.getMonth()];
	let date = newDate.getDate();

	if (minutes < 10) {
		minutes = `0` + minutes;
	}

	if (hours > 12) {
		hours = hours -= 12;
		minutes = minutes + "pm";
	} else if (hours === 12) {
		hours = 12;
		minutes = minutes + "am";
	} else {
		minutes = minutes + "am";
	}

	return `${hours}:${minutes}, ${day} ${month} ${date}`;
}

function formatForecastDate(timestamp) {
	let dateData = new Date(timestamp * 1000);
	let day = dateData.getDay();
	let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

	return days[day];
}

function displayForecast(response) {
	let dailyForecast = response.data.daily;
	let forecastElement = document.querySelector("#forecasts");
	let forecastHTML = `<div class="row forecast-temperatures">`;

	dailyForecast.forEach(function (forecastData, index) {
		if (index < 6) {
			forecastHTML =
				forecastHTML +
				`<div class="col-2 forecast-col">
				<div class="forecast-date">${formatForecastDate(forecastData.dt)}</div>
				<img src="http://openweathermap.org/img/wn/${
					forecastData.weather[0].icon
				}@2x.png" alt="" width="42"/>
				<div class="forecast-temps"> 
					<span class="forecast-hi"> ${Math.round(forecastData.temp.max)}°</span> 
					<div>${Math.round(forecastData.temp.min)}°</div>
				</div>
			</div>
		`;
		}
	});
	forecastHTML = forecastHTML + `</div>`;
	forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
	let apiKey = "aee115d67b5ede7133bf4a0747025512";
	let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;

	axios.get(apiUrl).then(displayForecast);
}

function showCityWeather(response) {
	let toggleFUnit = document.querySelector("#f-unit");
	toggleFUnit.setAttribute("class", `bold`);
	let toggleCUnit = document.querySelector("#c-unit");
	toggleCUnit.setAttribute("class", ``);

	let cityName = document.querySelector("#city-name");
	let mainTemp = document.querySelector("#main-temp");
	let hiTemp = document.querySelector("#hi-temp");
	let loTemp = document.querySelector("#lo-temp");
	let feelsLike = document.querySelector("#feels-like");
	let windSpeedValue = document.querySelector("#wind-speed");
	let icon = response.data.weather[0].icon;
	let iconDescript = response.data.weather[0].description;
	let currentCondIcon = document.querySelector("#current-conditions-icon");
	let conditions = document.querySelector("#conditions");
	let humidity = document.querySelector("#humidity");

	let mainUnit = document.querySelector("#main-unit");
	let hiUnit = document.querySelector("#hi-unit");
	let loUnit = document.querySelector("#lo-unit");
	let feelsUnit = document.querySelector("#feels-unit");
	let windSpeedUnit = document.querySelector("#wind-speed-unit");
	let date = document.querySelector("#date");

	mainFarTemp = response.data.main.temp;
	hiFarTemp = response.data.main.temp_max;
	loFarTemp = response.data.main.temp_min;
	feelsFarTemp = response.data.main.feels_like;
	windSpeed = response.data.wind.speed;

	cityName.innerHTML = response.data.name;
	mainTemp.innerHTML = Math.round(mainFarTemp);
	hiTemp.innerHTML = Math.round(hiFarTemp);
	loTemp.innerHTML = Math.round(loFarTemp);
	feelsLike.innerHTML = Math.round(feelsFarTemp);
	windSpeedValue.innerHTML = Math.round(windSpeed);
	currentCondIcon.setAttribute(
		"src",
		`http://openweathermap.org/img/wn/${icon}@2x.png`
	);
	currentCondIcon.setAttribute("alt", `The icon shows ${iconDescript}`);
	conditions.innerHTML = response.data.weather[0].main;
	humidity.innerHTML = response.data.main.humidity;
	mainUnit.innerHTML = "°F";
	hiUnit.innerHTML = "°F";
	loUnit.innerHTML = "°F";
	feelsUnit.innerHTML = "°F";
	windSpeedUnit.innerHTML = "mph";
	date.innerHTML = formatDate(response.data.dt * 1000);

	getForecast(response.data.coord);
}

function search(city) {
	let unit = "imperial";
	let apiKey = "aee115d67b5ede7133bf4a0747025512";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

	axios.get(apiUrl).then(showCityWeather);
}

function changeCity(event) {
	event.preventDefault();
	let cityInput = document.querySelector("#search-field");
	let cityName = document.querySelector("#city-name");
	cityName.innerHTML = cityInput.value;
	search(cityInput.value);
}

function convertC(event) {
	event.preventDefault();
	let mainTempC = Math.round(((mainFarTemp - 32) * 5) / 9);
	let hiTempC = Math.round(((hiFarTemp - 32) * 5) / 9);
	let loTempC = Math.round(((loFarTemp - 32) * 5) / 9);
	let feelsTempC = Math.round(((feelsFarTemp - 32) * 5) / 9);
	let windSpeedM = Math.round(windSpeed * 1.609);

	let changeMainTemp = document.querySelector("#main-temp");
	changeMainTemp.innerHTML = Math.round(mainTempC);
	let changeHiTemp = document.querySelector("#hi-temp");
	changeHiTemp.innerHTML = Math.round(hiTempC);
	let changeLoTemp = document.querySelector("#lo-temp");
	changeLoTemp.innerHTML = Math.round(loTempC);
	let changeFeelsLike = document.querySelector("#feels-like");
	changeFeelsLike.innerHTML = Math.round(feelsTempC);
	let changeWindSpeed = document.querySelector("#wind-speed");
	changeWindSpeed.innerHTML = windSpeedM;

	let toggleCUnit = document.querySelector("#c-unit");
	toggleCUnit.setAttribute("class", `bold`);
	let toggleFUnit = document.querySelector("#f-unit");
	toggleFUnit.setAttribute("class", ``);
	let mainUnit = document.querySelector("#main-unit");
	mainUnit.innerHTML = "°C";
	let hiUnit = document.querySelector("#hi-unit");
	hiUnit.innerHTML = "°C";
	let loUnit = document.querySelector("#lo-unit");
	loUnit.innerHTML = "°C";
	let feelsUnit = document.querySelector("#feels-unit");
	feelsUnit.innerHTML = "°C";
	let windSpeedUnit = document.querySelector("#wind-speed-unit");
	windSpeedUnit.innerHTML = "km/h";
}

function revertF(event) {
	event.preventDefault();
	let mainTempF = mainFarTemp;
	let hiTempF = hiFarTemp;
	let loTempF = loFarTemp;
	let feelsTempF = feelsFarTemp;
	let windSpeedI = windSpeed;

	let changeMainTemp = document.querySelector("#main-temp");
	changeMainTemp.innerHTML = Math.round(mainTempF);
	let changeHiTemp = document.querySelector("#hi-temp");
	changeHiTemp.innerHTML = Math.round(hiTempF);
	let changeLoTemp = document.querySelector("#lo-temp");
	changeLoTemp.innerHTML = Math.round(loTempF);
	let changeFeelsLike = document.querySelector("#feels-like");
	changeFeelsLike.innerHTML = Math.round(feelsTempF);
	let changewindSpeedI = document.querySelector("#wind-speed");
	changewindSpeedI.innerHTML = Math.round(windSpeedI);

	let toggleFUnit = document.querySelector("#f-unit");
	toggleFUnit.setAttribute("class", `bold`);
	let toggleCUnit = document.querySelector("#c-unit");
	toggleCUnit.setAttribute("class", ``);
	let mainUnit = document.querySelector("#main-unit");
	mainUnit.innerHTML = "°F";
	let hiUnit = document.querySelector("#hi-unit");
	hiUnit.innerHTML = "°F";
	let loUnit = document.querySelector("#lo-unit");
	loUnit.innerHTML = "°F";
	let feelsUnit = document.querySelector("#feels-unit");
	feelsUnit.innerHTML = "°F";
	let windSpeedUnit = document.querySelector("#wind-speed-unit");
	windSpeedUnit.innerHTML = "mph";
}

let mainFarTemp = null;
let hiFarTemp = null;
let loFarTemp = null;
let feelsFarTemp = null;
let windSpeed = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", changeCity);

let unitC = document.querySelector("#c-unit");
unitC.addEventListener("click", convertC);

let unitF = document.querySelector("#f-unit");
unitF.addEventListener("click", revertF);

search("Tucson");
