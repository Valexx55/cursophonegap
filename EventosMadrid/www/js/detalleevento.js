let evento_json = sessionStorage.getItem('evento');
console.log(evento_json);
let detalle_evento = JSON.parse(evento_json);
console.log("titulo " + detalle_evento.title);
console.log("id /url info " +detalle_evento['@id']);
console.log("Long " +detalle_evento.location.longitude);
console.log("Lat " +detalle_evento.location.latitude);
//TODO dibujar el mapa y poner esas coordenadas leaft
//obtener la info del evento - fetch id / url info
//mostrar detalles obtenidos y título