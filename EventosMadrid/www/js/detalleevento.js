this.onload = dibujarPantalla;

let url_evento;
let detalle_evento;//info inicial pasada por session storage
let detalle2_evento;//info obtenida tras nueva petición 

function dibujarPantalla() {
    let evento_json = sessionStorage.getItem('evento');
    console.log(evento_json);
    detalle_evento = JSON.parse(evento_json);
    console.log("titulo " + detalle_evento.title);
    url_evento = detalle_evento['@id'];
    console.log("id /url info " + detalle_evento['@id']);
    console.log("Long " + detalle_evento.location.longitude);
    console.log("Lat " + detalle_evento.location.latitude);
    obtenerDatosEvento(url_evento);

}
//<ion-datetime value="2019-10-01T15:43:40.394Z" display-timezone="utc"></ion-datetime>
//https://www.google.com/maps/search/?api=1&query=47.5951518%2C-122.3316393&query_place_id=ChIJKxjxuaNqkFQR3CK6O1HNNqY
//TODO dibujar el mapa y poner esas coordenadas leaft



//AÑADIR LOS BOTONES DE AGENDAR
//LA OPCIÓN DE LA VALORACIÓN
//COMPARTIR EVENTO / COMPARTIR APP //https://www.npmjs.com/package/cordova-plugin-codeplay-share-app-link





function obtenerDatosEvento(url_evento) {
    fetch(url_evento)
        .then(respuesta => respuesta.json())
        .then(info_evento => {
            console.log(info_evento);
            dibujarMapa(detalle_evento.location.latitude, detalle_evento.location.longitude);
            mostrarEvento(info_evento);
            detalle2_evento = info_evento;
            //lc.dismiss();//quitamos el circulito de espera
        }).catch(error => {
            //lc.dismiss();
            console.log("error " + error);
            //alert ("error " + error);
            mostrarAvisoFallo();
        });

}


/**
 * 
 * @param {*} info_evento 
 */

function mostrarEvento(info_evento) {
    mostrarTitulo(info_evento['@graph'][0].title);
    mostrarHoraInicio(info_evento['@graph'][0].dtstart);
    mostrarDireccion(info_evento['@graph'][0]['event-location'] + "<br>" + info_evento['@graph'][0].address['street-address'] + "<br>" + info_evento['@graph'][0].address['postal-code'] + " " + info_evento['@graph'][0].address.locality)
    mostrarDescripcion(info_evento['@graph'][0].description);
    mostrarEnlaceExterno(info_evento['@graph'][0].link);

    infocomollegar(detalle_evento.location.latitude, detalle_evento.location.longitude);
}

function infocomollegar(lat, long) {
    document.getElementById("enlacecll").href = "https://www.google.com/maps/search/?api=1&query=" + lat + "%2C" + long;
}


function obtenerAnio(fecha) {
    let anio;

    anio = fecha.slice(0, fecha.length - 17);

    return anio;
}

function obtenerMes(fecha) {
    let mes;

    mes = fecha.slice(5, fecha.length - 14);
    mes--;

    return mes;
}

function obtenerDia(fecha) {
    let dia;

    dia = fecha.slice(8, fecha.length - 11);

    return dia;

}

function obtenerHora(fecha) {
    let hora;

    hora = fecha.slice(11, fecha.length - 8);

    return hora;
}

function obtenerMinutos(fecha) {
    let minutos;

    minutos = fecha.slice(14, fecha.length - 5);

    return minutos;
}


async function infoExitoAgenda() {
    const toast = document.createElement('ion-toast');
    toast.message = 'EVENTO AGENDADO CORRECTAMENTE EN SU CALENDARIO';
    toast.duration = 5000;
    toast.color = "success";
    toast.position = "middle";

    document.body.appendChild(toast);

    //todo GUARDAR LA INFO DEL EVENTO AGENDADO
    //serilizar un array en localStorage de detalleevento2
    //y luego recuperarlo la pantalla de mostrar favoritos o agendados

    return toast.present();
}

async function infoFalloAgenda() {
    const toast = document.createElement('ion-toast');
    toast.message = 'NO PUDO AGENDARSE EL EVENTO EN SU CALENDARIO';
    toast.duration = 5000;
    toast.color = "danger";
    toast.position = "middle";

    document.body.appendChild(toast);
    return toast.present();
}



function agendar() {

    console.log(" AÑO " + obtenerAnio(detalle2_evento['@graph'][0].dtstart));
    console.log(" MES " + obtenerMes(detalle2_evento['@graph'][0].dtstart));
    console.log(" DIA " + obtenerDia(detalle2_evento['@graph'][0].dtstart));
    console.log(" HORA " + obtenerHora(detalle2_evento['@graph'][0].dtstart));
    console.log(" MINUTOS " + obtenerMinutos(detalle2_evento['@graph'][0].dtstart));


    var startDate = new Date(obtenerAnio(detalle2_evento['@graph'][0].dtstart), obtenerMes(detalle2_evento['@graph'][0].dtstart), obtenerDia(detalle2_evento['@graph'][0].dtstart), obtenerHora(detalle2_evento['@graph'][0].dtstart), obtenerMinutos(detalle2_evento['@graph'][0].dtstart), 0, 0, 0); // beware: month 0 = january, 11 = december
    var endDate = new Date(obtenerAnio(detalle2_evento['@graph'][0].dtend), obtenerMes(detalle2_evento['@graph'][0].dtend), obtenerDia(detalle2_evento['@graph'][0].dtend), obtenerHora(detalle2_evento['@graph'][0].dtend), obtenerMinutos(detalle2_evento['@graph'][0].dtend), 0, 0, 0);;
    var title = detalle2_evento['@graph'][0].title;

    var eventLocation = detalle2_evento['@graph'][0]['event-location'] + " " + detalle2_evento['@graph'][0].address['street-address'] + " " + detalle2_evento['@graph'][0].address['postal-code'] + " " + detalle2_evento['@graph'][0].address.locality;
    var notes = detalle2_evento['@graph'][0].description;
    var success = function (message) { infoExitoAgenda(); };
    var error = function (message) { infoFalloAgenda(); }

 

    //EL QUE APUNTA EL CALNDARIO REALMENTE

    window.plugins.calendar.createEvent(title, eventLocation, notes, startDate, endDate, success, error);


}

function mostrarDireccion(direccion) {
    let label = document.createElement('ion-label');
   
    let icono = document.createElement('ion-icon');
    icono.setAttribute('name', 'location-outline');

    let item = document.createElement('ion-item');
    label.innerHTML = direccion;
    item.appendChild(icono);
    item.appendChild(label);
    document.getElementById("infoevento").appendChild(item);
   
}

function mostrarHoraInicio(horainicio) {
    let label = document.createElement('ion-label');
    let item = document.createElement('ion-item');
    let icono = document.createElement('ion-icon');
    icono.setAttribute('name', 'calendar-outline');//<ion-icon name="calendar-outline"></ion-icon>
    label.innerHTML = horainicio.slice(0, horainicio.length - 5);
    item.appendChild(icono);
    item.appendChild(label);
    document.getElementById("infoevento").appendChild(item);
    //document.createElement('ion-label');
}



function mostrarTitulo(titulo) {
    let label = document.createElement('ion-label');
    let item = document.createElement('ion-item');
    let icono = document.createElement('ion-icon');   
    icono.setAttribute("name", 'accessibility-outline');
    label.innerHTML = titulo;
    item.appendChild(icono);
    item.appendChild(label);

    document.getElementById("infoevento").appendChild(item);
   
}


function mostrarDescripcion(descripcion) {
    if (descripcion && descripcion.length > 0) {
        //<ion-icon name="information-circle-outline"></ion-icon>
        let label = document.createElement('ion-textarea');
        label.setAttribute('disabled', true);
        let icono = document.createElement('ion-icon');   //<ion-icon name="accessibility-outline"></ion-icon>
        icono.setAttribute("name", 'information-circle-outline');
        let item = document.createElement('ion-item');
        label.innerHTML = descripcion;

        item.appendChild(icono);
        item.appendChild(label);
        document.getElementById("infoevento").appendChild(item);
    }
    //document.createElement('ion-label');
}

function compartir()
{
    // this is the complete list of currently supported params you can pass to the plugin (all optional)
var options = {
    message: '¿Te apuntas?', // not supported on some apps (Facebook, Instagram)
    subject: 'Evento en Madrid', // fi. for email
    //files: ['', ''], // an array of filenames either locally or remotely
    //url: 'https://www.website.com/foo/#bar?a=b',
    url: detalle2_evento['@graph'][0].link,
    chooserTitle: 'Elije ...' // Android only, you can override the default share sheet title
    //appPackageName: 'com.apple.social.facebook', // Android only, you can provide id of the App you want to share with
    //iPadCoordinates: '0,0,0,0' //IOS only iPadCoordinates for where the popover should be point.  Format with x,y,width,height
  };
  
  var onSuccess = function(result) {
    console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
    console.log("Shared to app: " + result.app); // On Android result.app since plugin version 5.4.0 this is no longer empty. On iOS it's empty when sharing is cancelled (result.completed=false)
  };
  
  var onError = function(msg) {
    console.log("Sharing failed with message: " + msg);
  };
  
  window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
}

function mostrarEnlaceExterno(link) {


    let boton = document.createElement('ion-button');
    boton.setAttribute('href', link);
    boton.innerHTML = "MÁS INFO";
    boton.color = 'secondary';
    let icono = document.createElement('ion-icon');
    icono.setAttribute("name", 'arrow-redo-outline');

    let item = document.createElement('ion-item');

    item.appendChild(icono);
    item.appendChild(boton);
    document.getElementById("infoevento").appendChild(item);

    //document.createElement('ion-label');
}

//compartir por whatsapp el evento o para compartir más en general??




async function mostrarAvisoFallo() {
    const toast = document.createElement('ion-toast');
    toast.message = 'NO SE HA PODIDO RECUPERAR LOS DATOS';
    toast.duration = 5000;
    toast.color = "danger";
    toast.position = "middle";

    document.body.appendChild(toast);
    return toast.present();
}



function dibujarMapa(latitud, longitud) {
    var mymap = L.map('mapid').setView([latitud, longitud], 12);
    var marker = L.marker([latitud, longitud]).addTo(mymap);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        /*attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',*/
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(mymap);
    // obtenerTiempo (latitud, longitud);
}