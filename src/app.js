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

function showCityWeather(response) {
	let cityName = document.querySelector("#city-name");
	let mainTemp = document.querySelector("#main-temp");
	let hiTemp = document.querySelector("#hi-temp");
	let loTemp = document.querySelector("#lo-temp");
	let icon = response.data.weather[0].icon;
	let iconDescript = response.data.weather[0].description;
	let currentCondIcon = document.querySelector("#current-conditions-icon");
	let conditions = document.querySelector("#conditions");
	let feelsLike = document.querySelector("#feels-like");
	let humidity = document.querySelector("#humidity");
	let windSpeed = document.querySelector("#wind-speed");

	cityName.innerHTML = response.data.name;
	mainTemp.innerHTML = Math.round(response.data.main.temp);
	hiTemp.innerHTML = Math.round(response.data.main.temp_max);
	loTemp.innerHTML = Math.round(response.data.main.temp_min);
	currentCondIcon.setAttribute(
		"src",
		`http://openweathermap.org/img/wn/${icon}@2x.png`
	);
	currentCondIcon.setAttribute("alt", `The icon shows ${iconDescript}`);
	conditions.innerHTML = response.data.weather[0].main;
	feelsLike.innerHTML = Math.round(response.data.main.feels_like);
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

search("Tucson");

let form = document.querySelector("#search-form");
form.addEventListener("submit", changeCity);
