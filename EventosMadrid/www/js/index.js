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
    //document.getElementById('deviceready').classList.add('ready');
}

const URL_API_EVENTOS_MADRID_POR_DISTRITO = "https://datos.madrid.es/egob/catalogo/206974-0-agenda-eventos-culturales-100.json?distrito_nombre="


let selectdistritos = document.getElementById('selectdistritos'); //Capturo el select
selectdistritos.addEventListener('ionChange', obtenerEventos);

function obtenerEventos() {
    //let selectdistritos = document.getElementById('selectdistritos'); //Capturo el select
    let distrito = selectdistritos.value;
    console.log("Distrito seleccionado = " + distrito);
    let url_get = URL_API_EVENTOS_MADRID_POR_DISTRITO + distrito;
    let url_get_normalizada = encodeURI(url_get);
    console.log(url_get_normalizada);
    //borrarlista
    borrarlista();
    fetch(url_get_normalizada)
        .then(respuesta => respuesta.json())
        .then(eventos => {
            console.log(eventos);
            mostrarEventos(eventos);
        });

}
//TODO 
//1Controlar fallos (HTTP STATUS fetch)
//2Controlar que venga vacía la lista o no hay eventos /graph es cero
//bolita del tiempo
//no haya conexión a internet
//botón hacia atrás de salir

function borrarlista ()
{
    let elementopadre_lista = document.getElementById("lista_eventos");
    elementopadre_lista.innerHTML="";
}

//console.log("Titiulo " + eventos['@graph'][0].title);// FORMA DE ACCESO POR EN EL NOMBRE DEL ATRIBUTO EN VEZ POR PUNTO BY JOSE LUIS
function mostrarEventos(eventos) {
    //TODO MOSTRAR los eventgos
    //recorriendo y creando elementos
    let elementopadre_lista = document.getElementById("lista_eventos");
    console.log("eventos recibidos = " + eventos['@graph'].length);
    //recorrer y para cada recorrido, crear un item y añadirlo

    let nuevo_item;
    let nuevo_label;
    for (let i = 0; i < eventos['@graph'].length; i++) {
        nuevo_item = document.createElement('ion-item');
        nuevo_label = document.createElement('ion-label');
        nuevo_label.innerHTML = eventos['@graph'][i].title;
        nuevo_item.appendChild(nuevo_label);
        elementopadre_lista.appendChild(nuevo_item);
    }
}
