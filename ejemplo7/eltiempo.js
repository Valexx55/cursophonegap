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
            //actualizarIMG(infotiempo.message);

        }//final de la función

        ).catch(function(error) {
            console.log('Hubo un problema con la petición Fetch:' + error.message);
          });
}



function procesarInfoTiempo(cuerpo) {
    //ACCEDER A LA INFO DEL JSON 
}