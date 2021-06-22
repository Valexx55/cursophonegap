//TODO OBTENER POR AJAX O FETCH EL JSON DEL API OPENWEATHER
//https://openweathermap.org/current
//HAGAIS UN CONSOLE .LOG CON EL JSON RECIBIDO

//api.openweathermap.org/data/2.5/weather?lat=40.229198&lon=-3.7756178&appid=11af6372e5b3a309ee6d413603c53656&units=metric&lang=es

    //----------------Option----------------
const units = "metric";
const language = "es"
const APIKey = "d90479fb4df4b57559501aa0ec9fb0e6";
    //-------------------------------------------

let API_WEB_OPENWEATHER;

this.onload = encuentrame(); //programo el evento para que llame automáticamente al js

//Ubicacion

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

function exito(posicion) {
    console.log("LATITUD : " + posicion.coords.latitude + "LONGUITUD : " + posicion.coords.longitude);
    API_WEB_OPENWEATHER = "https://api.openweathermap.org/data/2.5/weather?lat="+posicion.coords.latitude+"&lon="+posicion.coords.longitude+"&appid="+APIKey+"&units="+units+"&lang="+language+"";
    console.log(API_WEB_OPENWEATHER);
    pedirTiempoFetch();
    dibujarPosicion(posicion.coords.latitude, posicion.coords.longitude);
}
function fracaso() {
    //console.log("NO Se ha podido averiguar la ubicación del usuario");
    alert("No es posible saber su uobicación");
}

//---pedira el tiempo luego de obtener la ubicación


function pedirTiempoFetch() {
    fetch(API_WEB_OPENWEATHER) //PROMESAS -
        .then(response => response.json()) //funciones de flecha //anónimas -response es el cuerpo HTTP de vuelta
        .then(infotiempo => { //inicio función 
            console.log(infotiempo);
            procesarInfoTiempo(infotiempo);

        }//final de la función

        ).catch(function(error) {
            console.log('Hubo un problema con la petición Fetch:' + error.message);
          });
}

/***
 * 
 * let unix_timestamp = 1549312452
// Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
var date = new Date(unix_timestamp * 1000);
// Hours part from the timestamp
var hours = date.getHours();
// Minutes part from the timestamp
var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

console.log(formattedTime);

 */

function traducirMomento (tiempoms)
{
    let momentohhmmss;

        var date = new Date(tiempoms * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        
        // Will display time in 10:30:23 format
        momentohhmmss = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    
    return momentohhmmss;
}

function procesarInfoTiempo(cuerpo) {
    //ACCEDER A LA INFO DEL JSON 
    console.log("Longuitud " + cuerpo.coord.lon);
    console.log("Latitud " + cuerpo.coord.lat);
    console.log("Descripción " + cuerpo.weather[0].description);//cuerpo['weather'][0].description

    let lista_tds = document.getElementsByTagName("td");
    console.log(lista_tds.length);
    //http://openweathermap.org/img/wn/10d@2x.png
    //mostramos el icono del tiempo
    lista_tds[0].firstChild.src = "http://openweathermap.org/img/wn/"+cuerpo.weather[0].icon+"@2x.png";
    //descripcion
    lista_tds[1].innerHTML = cuerpo.weather[0].description;
    //temperatura
    lista_tds[2].innerHTML = cuerpo.main.temp + " Cº";
    //humedad
    lista_tds[3].innerHTML = cuerpo.main.humidity + " %";
    //viento
    lista_tds[4].innerHTML = cuerpo.wind.speed + " m/s";
    //amananece
    lista_tds[5].innerHTML = traducirMomento(cuerpo.sys.sunrise);
    //anocher
    lista_tds[6].innerHTML = traducirMomento(cuerpo.sys.sunset);

     //console.log("amanenece " + traducirMomento(cuerpo.sys.sunrise));

    //ATRIBUTOS DE INTERÉS
    /**
     * 
     * nombre weather[0].description
     * temperatura main.temp 
     * humedad  humidity
     * icono weather[0].icon
     * viento main.speed
     * salida del sol sys.sunrise
     * puesta sys.sunset
     * 
    */
}

//dibujar mapa

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