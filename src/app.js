function showCurrentTemp(response) {
	console.log(response.data);
}

let city = "Tucson";
let unit = "imperial";
let apiKey = "aee115d67b5ede7133bf4a0747025512";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

console.log(apiUrl);

axios.get(`${apiUrl}`).then(showCurrentTemp);
