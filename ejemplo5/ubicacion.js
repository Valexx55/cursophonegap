//TODO obtener la ubicación del usuario

function encuentrame() {
    console.log("el usuario quiere saber su ubicación");
    if (navigator.geolocation) {
        console.log("El navegador sí tiene la geolocalización por la IP");
        navigator.geolocation.getCurrentPosition(exito, fracaso);
    } else {
        console.log("El navegador sí tiene la geolocalización por la IP");
        fracaso();
    }

}

function dibujarPosicion(latitud, longitud) {
    var mymap = L.map('mapid').setView([latitud, longitud], 10);
    var marker = L.marker([latitud, longitud]).addTo(mymap);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(mymap);
}

function exito(posicion) {
    console.log("Se ha podido averiguar la ubicación del usuario");
    console.log("LATITUD : " + posicion.coords.latitude + "LONGUITDU : " + posicion.coords.longitude);
    dibujarPosicion(posicion.coords.latitude, posicion.coords.longitude);
}
function fracaso() {
    console.log("NO Se ha podido averiguar la ubicación del usuario");
    alert("No es posible saber su uobicación");
}