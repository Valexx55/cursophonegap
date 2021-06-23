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
    alert("el usuario quiere saber su ubicación");
    if (navigator.geolocation) {
        alert("El navegador sí tiene la geolocalización por la IP");
        navigator.geolocation.getCurrentPosition(exito, fracaso);
    } else {
        alert("El navegador sí tiene la geolocalización por la IP");
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
    obtenerTiempo (latitud, longitud);
}

function exito(posicion) {
    alert("Se ha podido averiguar la ubicación del usuario");
    alert("LATITUD : " + posicion.coords.latitude + "LONGUITDU : " + posicion.coords.longitude);
    //ocultar el gif
    ocultarGifEspera();
    dibujarPosicion(posicion.coords.latitude, posicion.coords.longitude);
}
function fracaso() {
    alert("NO Se ha podido averiguar la ubicación del usuario");
    //ocultar el gif
    ocultarGifEspera();
    alert("No es posible saber su uobicación");
}
