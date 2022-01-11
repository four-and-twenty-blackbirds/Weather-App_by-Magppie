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
	console.log(response.data);

	let mainTemp = document.querySelector("#main-temp");
	let hiTemp = document.querySelector("#hi-temp");
	let loTemp = document.querySelector("#lo-temp");
	let conditions = document.querySelector("#conditions");
	let feelsLike = document.querySelector("#feels-like");
	let humidity = document.querySelector("#humidity");
	let windSpeed = document.querySelector("#wind-speed");

	mainTemp.innerHTML = Math.round(response.data.main.temp);
	hiTemp.innerHTML = Math.round(response.data.main.temp_max);
	loTemp.innerHTML = Math.round(response.data.main.temp_min);
	conditions.innerHTML = response.data.weather[0].main;
	feelsLike.innerHTML = Math.round(response.data.main.feels_like);
	humidity.innerHTML = response.data.main.humidity;
	windSpeed.innerHTML = Math.round(response.data.wind.speed);

	let date = document.querySelector("#date");
	date.innerHTML = formatDate(response.data.dt * 1000);
}

let city = "Tucson";
let unit = "imperial";
let apiKey = "aee115d67b5ede7133bf4a0747025512";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

axios.get(apiUrl).then(showCityWeather);

let timeNow = new Date();
console.log(timeNow);
