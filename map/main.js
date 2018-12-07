$(function () {
    var position = ['-24.75', '15.55']

    var mymap = L.map('mapid').setView(position, 10);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Clem Bois 2018 - Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoibnVpdC1kZS1sLWluZm8iLCJhIjoiY2pwZDR5d2hhMDA5cDN3cGNnMHU2OXM5diJ9.Wp1-EvYPczcD_5SZ377juw'
    }).addTo(mymap);

    L.control.scale({
        imperial: false
    }).addTo(mymap);

    var marker = L.marker(position).addTo(mymap);
    marker.bindPopup("<b>Votre position</b><br>" + position).openPopup();
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (data) {
            console.log(data)
            marker.setLatLng([data.coords.latitude, data.coords.longitude])
        });
    }

    var campement = ['-24.73', '15.29']
    var campement_marker = L.marker(campement, {
        icon: L.icon({
            iconUrl: 'images/campement-icon.png'
        })
    }).addTo(mymap);
    campement_marker.bindPopup("<b>Le campement</b><br>" + campement);

    var target = ['-24.92', '15.38']
    var target_marker = L.marker(target, {
        icon: L.icon({
            iconUrl: 'images/target-icon.png',
            draggable: true
        })
    }).addTo(mymap);
    target_marker.bindPopup("<b>Objectif</b><br>" + target);

    function onMapClick(data) {
        L.marker(data.latlng).addTo(mymap)
        L.polygon([
            position,
            data.latlng
        ]).addTo(mymap);
    }
    mymap.on('click', onMapClick);
})