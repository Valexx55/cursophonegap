//TODO obtener la ubicación del usuario

//mejora 1 poner un gif de espera hasta que se cargue el mapa
//mejora 2 poner la tabla invisible hasta que no estén los datos del tiempo disponibles

/********AQUÍ DIBUJO EL MAPA 1 **********/

function dibujarGifEspera ()
{
    document.getElementById("imagenespera").hidden = false; //lo hacemos visible
}

function ocultarGifEspera ()
{

    document.getElementById("imagenespera").hidden = true; //lo hacemos invisible
}


function encuentrame() {
    //dibujar el gif
    dibujarGifEspera();
    console.log("el usuario quiere saber su ubicación");
    if (navigator.geolocation) {
        console.log("El navegador sí tiene la geolocalización por la IP");
        navigator.geolocation.getCurrentPosition(exito, fracaso);
    } else {
        console.log("El navegador sí tiene la geolocalización por la IP");
        fracaso();
    }

}

function dibujarMapa(latitud, longitud) {
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
    obtenerTiempo (latitud, longitud);
}

function exito(posicion) {
    console.log("Se ha podido averiguar la ubicación del usuario");
    console.log("LATITUD : " + posicion.coords.latitude + "LONGUITDU : " + posicion.coords.longitude);
    //ocultar el gif
    ocultarGifEspera();
    dibujarMapa(posicion.coords.latitude, posicion.coords.longitude);
}
function fracaso() {
    console.log("NO Se ha podido averiguar la ubicación del usuario");
    //ocultar el gif
    ocultarGifEspera();
    alert("No es posible saber su uobicación");
}

/********AQUÍ DIBUJO EL TIEMPO 2**********/

const API_WEB_OPENWEATHER = "https://api.openweathermap.org/data/2.5/weather?appid=11af6372e5b3a309ee6d413603c53656&units=metric&lang=es"; //&lat=40.229198&lon=-3.7756178&";

function obtenerTiempo (latitud, longitud)
{
    let url = API_WEB_OPENWEATHER + "&lat="+latitud+"&lon="+longitud;
    console.log("url = " + url);
    fetch(url) //PROMESAS -
        .then(response => response.json()) //funciones de flecha //anónimas -response es el cuerpo HTTP de vuelta
        .then(infotiempo => { //inicio función 
            console.log(infotiempo);
            procesarInfoTiempo(infotiempo);
        }//final de la función

        ).catch(function(error) {
            console.log('Hubo un problema con la petición Fetch:' + error.message);
          });
}

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
    document.getElementById("tablatiempo").hidden = false;
    //ACCEDER A LA INFO DEL JSON 
    let lista_tds = document.getElementsByTagName("td");
    console.log(lista_tds.length);
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



}