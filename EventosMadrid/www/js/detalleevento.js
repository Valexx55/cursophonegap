this.onload = dibujarPantalla;

let url_evento;

function dibujarPantalla ()
{
let evento_json = sessionStorage.getItem('evento');
console.log(evento_json);
let detalle_evento = JSON.parse(evento_json);
console.log("titulo " + detalle_evento.title);
url_evento = detalle_evento['@id'];
console.log("id /url info " +detalle_evento['@id']);
console.log("Long " +detalle_evento.location.longitude);
console.log("Lat " +detalle_evento.location.latitude);
obtenerDatosEvento (url_evento);
//dibujarMapa (detalle_evento.location.latitude, detalle_evento.location.longitude);
}
//TODO dibujar el mapa y poner esas coordenadas leaft
//FORMATO DE LA DESCRICPIÓN TEXT AREA??
//CONTROLAR EL CASO DE QUE NO HAYA DESCRIPCIÓN

//AÑADIOR LOS BOTONES DE AGENDAR
//LA OPCIÓN DE LA VALORACIÓN



function obtenerDatosEvento (url_evento)
{
    fetch(url_evento)
        .then(respuesta => respuesta.json())
        .then(info_evento => {
            console.log(info_evento);
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

function  mostrarEvento(info_evento)
{
    //console.log(info_evento['@graph'][0].title);
    mostrarTitulo(info_evento['@graph'][0].title);
    //console.log(info_evento['@graph'][0].description);
    mostrarDescripcion(info_evento['@graph'][0].description);
    //console.log(info_evento['@graph'][0].dtstart);
    mostrarHoraInicio(info_evento['@graph'][0].dtstart);
    // console.log(info_evento['@graph'][0].address.locality);
    // console.log(info_evento['@graph'][0].address['postal-code']);
    // console.log(info_evento['@graph'][0].address['street-address']);
    mostrarDireccion (info_evento['@graph'][0].address['street-address'] + " " +info_evento['@graph'][0].address['postal-code']+ " "+info_evento['@graph'][0].address.locality )
}

function mostrarDireccion (direccion)
{
    let label = document.createElement('ion-label');
    let item = document.createElement('ion-item');
    label.innerHTML = direccion;
    item.appendChild(label);
    document.getElementById("infoevento").appendChild(item);
    //document.createElement('ion-label');
}

function mostrarHoraInicio (horainicio)
{
    let label = document.createElement('ion-label');
    let item = document.createElement('ion-item');
    label.innerHTML = horainicio;
    item.appendChild(label);
    document.getElementById("infoevento").appendChild(item);
    //document.createElement('ion-label');
}



function mostrarTitulo (titulo)
{
    let label = document.createElement('ion-label');
    let item = document.createElement('ion-item');
    label.innerHTML = titulo;
    item.appendChild(label);
    document.getElementById("infoevento").appendChild(item);
    //document.createElement('ion-label');
}


function mostrarDescripcion (descripcion)
{
    let label = document.createElement('ion-label');
    let item = document.createElement('ion-item');
    label.innerHTML = descripcion;
    item.appendChild(label);
    document.getElementById("infoevento").appendChild(item);
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