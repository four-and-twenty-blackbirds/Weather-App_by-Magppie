function showCityWeather(response) {
	console.log(response.data);

	let mainTemp = document.querySelector("#main-temp");
	mainTemp.innerHTML = Math.round(response.data.main.temp);

	let hiTemp = document.querySelector("#hi-temp");
	hiTemp.innerHTML = Math.round(response.data.main.temp_max);

	let loTemp = document.querySelector("#lo-temp");
	loTemp.innerHTML = Math.round(response.data.main.temp_min);

	let conditions = document.querySelector("#conditions");
	conditions.innerHTML = response.data.weather[0].main;

	let feelsLike = document.querySelector("#feels-like");
	feelsLike.innerHTML = Math.round(response.data.main.feels_like);

	let humidity = document.querySelector("#humidity");
	humidity.innerHTML = response.data.main.humidity;

	let windSpeed = document.querySelector("#wind-speed");
	windSpeed.innerHTML = Math.round(response.data.wind.speed);
}

let city = "Tucson";
let unit = "imperial";
let apiKey = "aee115d67b5ede7133bf4a0747025512";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

axios.get(apiUrl).then(showCityWeather);
