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

function displayForecast() {
	let forecastElement = document.querySelector("#forecasts");

	let forecastHTML = `<div class="row forecast-temperatures">`;
	let days = ["Fri", "Sat", "Sun", "Mon", "Tue"];
	days.forEach(function (day) {
		forecastHTML =
			forecastHTML +
			`<div class="col-2 forecast-col">
				<div class="forecast-date">${day}</div>
				<img src="http://openweathermap.org/img/wn/01n@2x.png" alt="" width="42"/>
				<div class="forecast-temps">
					<span class="forecast-hi"> 30°</span> 18°
				</div>
			</div>
		`;
	});
	forecastHTML = forecastHTML + `</div>`;
	forecastElement.innerHTML = forecastHTML;

	//<div class="row forecast-temperatures">
	//	<div class="col-2 forecast-col">
	//		<div class="forecast-date">${day}
	//		</div>
	//		<img
	//			src="http://openweathermap.org/img/wn/01n@2x.png"
	//			alt=""
	//			width="42"
	//		/>
	//		<div class="forecast-temps">
	//			<span class="forecast-hi"> 30°</span> 18°
	//		</div>
	//	</div>
	//</div>
}

function showCityWeather(response) {
	let cityName = document.querySelector("#city-name");
	let mainTemp = document.querySelector("#main-temp");
	let hiTemp = document.querySelector("#hi-temp");
	let loTemp = document.querySelector("#lo-temp");
	let feelsLike = document.querySelector("#feels-like");
	let icon = response.data.weather[0].icon;
	let iconDescript = response.data.weather[0].description;
	let currentCondIcon = document.querySelector("#current-conditions-icon");
	let conditions = document.querySelector("#conditions");

	let humidity = document.querySelector("#humidity");
	let windSpeed = document.querySelector("#wind-speed");

	let mainUnit = document.querySelector("#main-unit");
	mainUnit.innerHTML = "°F";
	let hiUnit = document.querySelector("#hi-unit");
	hiUnit.innerHTML = "°F";
	let loUnit = document.querySelector("#lo-unit");
	loUnit.innerHTML = "°F";
	let feelsUnit = document.querySelector("#feels-unit");
	feelsUnit.innerHTML = "°F";

	mainFarTemp = response.data.main.temp;
	hiFarTemp = response.data.main.temp_max;
	loFarTemp = response.data.main.temp_min;
	feelsFarTemp = response.data.main.feels_like;

	cityName.innerHTML = response.data.name;
	mainTemp.innerHTML = Math.round(mainFarTemp);
	hiTemp.innerHTML = Math.round(hiFarTemp);
	loTemp.innerHTML = Math.round(loFarTemp);
	feelsLike.innerHTML = Math.round(feelsFarTemp);

	currentCondIcon.setAttribute(
		"src",
		`http://openweathermap.org/img/wn/${icon}@2x.png`
	);
	currentCondIcon.setAttribute("alt", `The icon shows ${iconDescript}`);
	conditions.innerHTML = response.data.weather[0].main;
	humidity.innerHTML = response.data.main.humidity;
	windSpeed.innerHTML = Math.round(response.data.wind.speed);

	let date = document.querySelector("#date");
	date.innerHTML = formatDate(response.data.dt * 1000);
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

	let changeMainTemp = document.querySelector("#main-temp");
	changeMainTemp.innerHTML = Math.round(mainTempC);
	let changeHiTemp = document.querySelector("#hi-temp");
	changeHiTemp.innerHTML = Math.round(hiTempC);
	let changeLoTemp = document.querySelector("#lo-temp");
	changeLoTemp.innerHTML = Math.round(loTempC);
	let changeFeelsLike = document.querySelector("#feels-like");
	changeFeelsLike.innerHTML = Math.round(feelsTempC);

	let mainUnit = document.querySelector("#main-unit");
	mainUnit.innerHTML = "°C";
	let hiUnit = document.querySelector("#hi-unit");
	hiUnit.innerHTML = "°C";
	let loUnit = document.querySelector("#lo-unit");
	loUnit.innerHTML = "°C";
	let feelsUnit = document.querySelector("#feels-unit");
	feelsUnit.innerHTML = "°C";
}

function revertF(event) {
	event.preventDefault();
	let mainTempF = mainFarTemp;
	let hiTempF = hiFarTemp;
	let loTempF = loFarTemp;
	let feelsTempF = feelsFarTemp;

	let changeMainTemp = document.querySelector("#main-temp");
	changeMainTemp.innerHTML = Math.round(mainTempF);
	let changeHiTemp = document.querySelector("#hi-temp");
	changeHiTemp.innerHTML = Math.round(hiTempF);
	let changeLoTemp = document.querySelector("#lo-temp");
	changeLoTemp.innerHTML = Math.round(loTempF);
	let changeFeelsLike = document.querySelector("#feels-like");
	changeFeelsLike.innerHTML = Math.round(feelsTempF);

	let mainUnit = document.querySelector("#main-unit");
	mainUnit.innerHTML = "°F";
	let hiUnit = document.querySelector("#hi-unit");
	hiUnit.innerHTML = "°F";
	let loUnit = document.querySelector("#lo-unit");
	loUnit.innerHTML = "°F";
	let feelsUnit = document.querySelector("#feels-unit");
	feelsUnit.innerHTML = "°F";
}

let mainFarTemp = null;
let hiFarTemp = null;
let loFarTemp = null;
let feelsFarTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", changeCity);

let unitC = document.querySelector("#c-unit");
unitC.addEventListener("click", convertC);

let unitF = document.querySelector("#f-unit");
unitF.addEventListener("click", revertF);

search("Tucson");

displayForecast();
