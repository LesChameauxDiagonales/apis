const API_5JOURS_URL = "http://api.openweathermap.org/data/2.5/forecast?appid=7123a8f6f0f54acec903488841c85dd9&units=metric&lang=fr"

function updateWeather2() {
    let jours5 = $('#meteo')
    jours5.empty()
    jours5.append($('<p/>').text('Chargement...'))
    $.getJSON(
        API_5JOURS_URL + "&lat=" + position[0] + "&lon=" + position[1],
        function (data) {
            jours5.empty()
            for (const line of data.list) {
                let weather = line.weather[0]
                jours5.append(
                    $('<div/>').append(
                        $('<h4/>').text(line.dt_txt), //line.dt pour le temps unix

                        $('<div/>').append(
                            $('<h5/>').text('Ciel'),
                            $('<p/>').text(weather.description),
                            $('<img/>').attr('src', ICON_URL + weather.icon + '.png')
                        ),

                        $('<div/>').append(
                            $('<h5/>').text('Temperature: ' + line.main.temp + '°C'),
                            $('<p/>').text('Min: ' + line.main.temp_min + '°C - Max: ' + line.main.temp_max + '°C')
                        ),

                        $('<div/>').append(
                            $('<p/>').text('Humidité: ' + line.main.humidity + '%')
                        ),

                        $('<div/>').append(
                            $('<p/>').text('Pression: ' + line.main.pressure + 'hPa')
                        ),

                        $('<div/>').append(
                            $('<p/>').text('Vent: ' + line.wind.speed + 'm/s ' + line.wind.deg + '°')
                        ),

                        $('<div/>').append(
                            $('<p/>').text('Nuages: ' + line.clouds.all + '%'),
                            $('<p/>').text('Pluie: ' + (line.rain == undefined ? 'Non' : 'Oui?'))
                        )
                    )
                )
            }
        }
    )
}

$(function () {
    updateWeather2()
})