this.onload = dibujarPantalla;

let url_evento;
let detalle_evento;

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
    //console.log(info_evento['@graph'][0].title);
    mostrarTitulo(info_evento['@graph'][0].title);
    //console.log(info_evento['@graph'][0].description);

    //console.log(info_evento['@graph'][0].dtstart);
    mostrarHoraInicio(info_evento['@graph'][0].dtstart);
    // console.log(info_evento['@graph'][0].address.locality);
    // console.log(info_evento['@graph'][0].address['postal-code']);
    // console.log(info_evento['@graph'][0].address['street-address']);
    mostrarDireccion(info_evento['@graph'][0].address['street-address'] + "<br>" + info_evento['@graph'][0].address['postal-code'] + " " + info_evento['@graph'][0].address.locality)
    mostrarDescripcion(info_evento['@graph'][0].description);
    infocomollegar (detalle_evento.location.latitude, detalle_evento.location.longitude);
}

function infocomollegar (lat, long)
{
    document.getElementById("enlacecll").href = "https://www.google.com/maps/search/?api=1&query="+lat+"%2C"+long;
}

function agendar ()
{
    var startDate = new Date(2021,6,7,18,30,0,0,0); // beware: month 0 = january, 11 = december
    var endDate = new Date(2021,6,7,19,30,0,0,0);
    var title = "My nice event";
    var eventLocation = "Home";
    var notes = "Some notes about this event.";
    var success = function(message) { alert("Success: " + JSON.stringify(message)); };
    var error = function(message) { alert("Error: " + message); };
  
  
   // window.plugins.calendar.createEventInteractively(title,eventLocation,notes,startDate,endDate,success,error);
  
    // create a calendar (iOS only for now)
    //window.plugins.calendar.createCalendar(calendarName,success,error);
    // if you want to create a calendar with a specific color, pass in a JS object like this:
   /* var createCalOptions = window.plugins.calendar.getCreateCalendarOptions();
    createCalOptions.calendarName = "My Cal Name";
    createCalOptions.calendarColor = "#FF0000"; // an optional hex color (with the # char), default is null, so the OS picks a color
    window.plugins.calendar.createCalendar(createCalOptions,success,error);*/
  
    // delete a calendar
   // window.plugins.calendar.deleteCalendar(calendarName,success,error);
  
    // create an event silently (on Android < 4 an interactive dialog is shown)
  
    let id_evento = window.plugins.calendar.createEvent(title,eventLocation,notes,startDate,endDate,success,error);
    alert ("ID EVENTO = "+ id_evento);
    //MÉTODO QUE BUSCA EVENTOS Y DEVUELVE JSON CON LA INFO
    window.plugins.calendar.findEvent(title,eventLocation,notes,startDate,endDate,success,error);
  
    //MÉTODO QUE ABRE EL CALENDARIO EN UNA FECHA CONCRETA
    var d = new Date(new Date().getTime() + 3*24*60*60*1000);
    window.plugins.calendar.openCalendar(d, success, error); // callbacks are optional 
}

function mostrarDireccion(direccion) {
    let label = document.createElement('ion-label');
    // let label = document.createElement('ion-textarea');
    //label.setAttribute("rows", '2'); //<ion-icon name="location-outline"></ion-icon>
    let icono = document.createElement('ion-icon');
    icono.setAttribute('name','location-outline');

    let item = document.createElement('ion-item');
    label.innerHTML = direccion;
    item.appendChild(icono);
    item.appendChild(label);
    document.getElementById("infoevento").appendChild(item);
    //document.createElement('ion-label');
}

function mostrarHoraInicio(horainicio) {
    let label = document.createElement('ion-label');
    let item = document.createElement('ion-item');
    let icono = document.createElement('ion-icon');
    icono.setAttribute('name','calendar-outline');//<ion-icon name="calendar-outline"></ion-icon>
    label.innerHTML = horainicio.slice (0, horainicio.length-5);
    item.appendChild(icono);
    item.appendChild(label);
    document.getElementById("infoevento").appendChild(item);
    //document.createElement('ion-label');
}



function mostrarTitulo(titulo) {
    let label = document.createElement('ion-label');
    let item = document.createElement('ion-item');
    let icono = document.createElement('ion-icon');   //<ion-icon name="accessibility-outline"></ion-icon>
    icono.setAttribute("name", 'accessibility-outline');
    label.innerHTML = titulo;
    item.appendChild(icono);
    item.appendChild(label);

    document.getElementById("infoevento").appendChild(item);
    //document.createElement('ion-label');
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