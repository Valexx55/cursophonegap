//TODO OBTENER POR AJAX O FETCH EL JSON DEL API OPENWEATHER
//https://openweathermap.org/current
//HAGAIS UN CONSOLE .LOG CON EL JSON RECIBIDO

//api.openweathermap.org/data/2.5/weather?lat=40.229198&lon=-3.7756178&appid=11af6372e5b3a309ee6d413603c53656&units=metric&lang=es
const API_WEB_OPENWEATHER = "https://api.openweathermap.org/data/2.5/weather?lat=40.229198&lon=-3.7756178&appid=11af6372e5b3a309ee6d413603c53656&units=metric&lang=es";
var http_request;//ámbito global

this.onload = pedirTiempoFetch; //programo el evento para que llame automáticamente al js


function pedirTiempoFetch() {
    fetch(API_WEB_OPENWEATHER) //PROMESAS -
        .then(response => response.json()) //funciones de flecha //anónimas -response es el cuerpo HTTP de vuelta
        .then(infotiempo => { //inicio función 
            console.log(infotiempo);
            procesarInfoTiempo(infotiempo);
            //actualizarIMG(infotiempo.message);

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
        moment.locale('es');
        console.log("día de la semana " + moment().format('dddd'));

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