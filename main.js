const API_REAL_URL = "http://api.openweathermap.org/data/2.5/weather?appid=7123a8f6f0f54acec903488841c85dd9&units=metric&lang=fr"
const ICON_URL = "http://openweathermap.org/img/w/" //icon.png

/* position par défaut = Windhoek, Namibie */
let position = [-22.5608807, 17.0657549];

function updateWeather() {
	let temp = $('#temp')
	temp.text('...')

	let wind = $('#wind_text')
	wind.text('...')

	let main = $('#days_left')
	main.empty()

	$.getJSON(
		API_REAL_URL + "&lat=" + position[0] + "&lon=" + position[1],
		function (data) {
			let weather = data.weather[0]
			temp.text(data.main.temp + '°C')
			wind.text(data.wind.speed + 'm/s ' + data.wind.deg + '°')

			main.append(
				$('<p/>').text(weather.description),
				$('<img/>').attr('src', ICON_URL + weather.icon + '.png')
			)
		}
	)
}

$(function () {
	console.log('RAGE !!!')
	//Time
	let hour = $('#hour_text')
	setInterval(function () {
		let currentdate = new Date()
		hour.text(
			(currentdate.getHours() < 10 ? '0' : '') + currentdate.getHours() + ':' +
			(currentdate.getMinutes() < 10 ? '0' : '') + currentdate.getMinutes() + ':' +
			(currentdate.getSeconds() < 10 ? '0' : '') + currentdate.getSeconds())
	}, 500)

	//Meteo
	updateWeather()
	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(function (data) {
			position = [data.coords.latitude, data.coords.longitude]

			updateWeather()
		});
	}
})






