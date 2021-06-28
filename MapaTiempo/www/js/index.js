/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);



function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
//1 solución Elio -- tener el botón desactivado hasta que no se cargue
//REVISAR POR QUÉ NO SE EJECUTA ESTE MÉTODO
   // alert("cordova iniciado!");
   // document.getElementById("botonlocaliza").disabled = false;
}

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
   // alert("el usuario quiere saber su ubicación");
    if (navigator.geolocation) {
       // alert("El navegador sí tiene la geolocalización por la IP");
        //COMPRUEBO SI EL GPS ESTÁ ACTIVADO
        cordova.plugins.diagnostic.isGpsLocationEnabled(function(enabled){
          //  alert("GPS activado " + enabled);
            if (enabled)
            {
                navigator.geolocation.getCurrentPosition(exito, fracaso);
            } else {
                gpsDesactivado();
            }
            
        }, function(error){
          //  alert("Error al acceder al GPS _(");
           
        }); 
        
    } else {
       // alert("El navegador sí tiene la geolocalización por la IP");
        fracaso();
    }

}

function gpsDesactivado ()
{
    //alert("GPS desactivado ACTIVELO PORFAVOR :S"); 
    cordova.plugins.diagnostic.switchToLocationSettings();//LE LLEVO A AJUSTES
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
    obtenerTiempo (latitud, longitud);//VERSIÓN FETCH/JS -- PUEDE DAR CORS
    //obtenerTiempoJSONP (latitud, longitud);//VERSIÓN JSONP -- EVITAR EL CORS
}

function obtenerTiempoJSONP (latitud, longitud)
{
    //CONSUMIMOS EL API DE OPENWHEATHER POR JSONP
    //1) creo un elemento script
    //2) le seteo en el atributo src la URL con la llamada JSONP
    //3) añado ese elemento al cuerpo del HTML

    //al hacer esto, autómaticamente se ejecuta el script y se carga y se produce el callback
    let elemento_script = document.createElement("script");
    elemento_script.src = API_WEB_OPENWEATHER + "&lat="+latitud+"&lon="+longitud+"&callback=procesarInfoTiempoJSONP";
    document.body.append (elemento_script);



}

function procesarInfoTiempoJSONP (infotTJson)
{
    console.log("INFO RX JSONP");
    console.log(infotTJson);
    procesarInfoTiempo(infotTJson);
}

function exito(posicion) {
   // alert("Se ha podido averiguar la ubicación del usuario");
   // alert("LATITUD : " + posicion.coords.latitude + "LONGUITDU : " + posicion.coords.longitude);
    //ocultar el gif
    ocultarGifEspera();
    dibujarPosicion(posicion.coords.latitude, posicion.coords.longitude);
}
function fracaso() {
   // alert("NO Se ha podido averiguar la ubicación del usuario");
    //ocultar el gif
    ocultarGifEspera();
  //  alert("No es posible saber su uobicación");
}


const API_WEB_OPENWEATHER = "https://api.openweathermap.org/data/2.5/weather?appid=11af6372e5b3a309ee6d413603c53656&units=metric&lang=es"; //&lat=40.229198&lon=-3.7756178&";

//https://api.openweathermap.org/data/2.5/weather?appid=11af6372e5b3a309ee6d413603c53656&units=metric&lang=es&lat=40.229198&lon=-3.7756178&callback=eurocopa";


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

        );/*).catch(function(error) {
            console.log('Hubo un problema con la petición Fetch:' + error.message);
          });*/
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
    //document.getElementById("tablatiempo").hidden = false;
    //ACCEDER A LA INFO DEL JSON 
    console.log ("Localidad " +cuerpo.name);
    document.getElementById("textolocalidad").innerHTML = cuerpo.name + " "+ moment().format('MMMM Do YYYY, h:mm:ss a');
    let lista_cols = document.getElementsByTagName("ion-col");
    console.log(lista_cols.length);
    //mostramos el icono del tiempo
    //CORDOVA POR DEFECTO POR SEGURIDAD SÓLO PERMITE ACCEDER A URLS "SEGURAS"
    lista_cols[0].firstChild.src = "https://openweathermap.org/img/wn/"+cuerpo.weather[0].icon+"@2x.png";
    //descripcion
    lista_cols[1].innerHTML = cuerpo.weather[0].description;
    //temperatura
    lista_cols[2].innerHTML = cuerpo.main.temp + " Cº";
    //humedad
    lista_cols[3].innerHTML = cuerpo.main.humidity + " %";
    //viento
    lista_cols[4].innerHTML = cuerpo.wind.speed + " m/s";
    //amananece
    lista_cols[5].innerHTML = traducirMomento(cuerpo.sys.sunrise);
    //anocher
    lista_cols[6].innerHTML = traducirMomento(cuerpo.sys.sunset);

    //TODO añadir info de la localidad en el tiempo
    //y la hora (librería moment)


}
