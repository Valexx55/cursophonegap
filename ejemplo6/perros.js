//AQUÍ VAMOS A VER CÓMO OBTENEMOS IMAGENES DE PERROS DE UN SERVIDOR
//PASOS
/*
PASO 1: REALIZAR LA PETICIÓN AL SERVIDOR DE PERROS (DOG API) --REQUEST
PASO 2: RECIBIR LA RESPUESTA DEL SERVIDOR DE PERROS --RESPONSE
PASO 3: DIBUJAR LA INFORMACIÓN QUE TRAE LA RESPUESTA

JAVASCRIPT

    - AJAX: Javascritp asíncrono
    - FETCH: Capturar

    Con estas dos variantes lo que hacemos es enviar y recibir 
    mensajes HTTP. Accedemos a información y datos. Enviamos datos.
 */

const API_WEB_PERROS = "https://dog.ceo/api/breeds/image/random";
var http_request;//ámbito global

function pedirPerro() {
    //VAMOS A USAR AJAX PARA OBTENER LA IMAGEN DEL PERRO
    http_request = new XMLHttpRequest(); //ESTO SIRVE PARA ENVIAR Y RECIBIR LA INFO DEL SERVIDOR
    http_request.onreadystatechange = procesarRespuestaServidor;//cuando te responda el servidor, me llamas a esa función
    http_request.open('GET', API_WEB_PERROS, true);//programo la llamada
    http_request.send();//llamo

}

function procesarRespuestaServidor() {

    if (http_request.readyState == 4) {
        if (http_request.status == 200) {
            alert(http_request.responseText);//ESTO ES EL JSON QUE RECIBO
            //TODO representarlo
        } else {
            alert('Hubo problemas con la petición.');
        }
    }

}