//AQUÍ VAMOS A VER CÓMO OBTENEMOS IMAGENES DE PERROS DE UN SERVIDOR
//PASOS
/*
PASO 1: REALIZAR LA PETICIÓN AL SERVIDOR DE PERROS (DOG API) --REQUEST
PASO 2: RECIBIR LA RESPUESTA DEL SERVIDOR DE PERROS --RESPONSE
PASO 3: DIBUJAR LA INFORMACIÓN QUE TRAE LA RESPUESTA

JAVASCRIPT

    - AJAX: Javascritp asíncrono XMLHttpRequest
    - FETCH: Capturar

    Con estas dos variantes lo que hacemos es enviar y recibir 
    mensajes HTTP. Accedemos a información y datos. Enviamos datos.
 */

const API_WEB_PERROS = "https://dog.ceo/api/breeds/image/random";
var http_request;//ámbito global

function actualizarIMG (url_perro)
{
    let elemento_img_perro = document.getElementById("imgperro");
    elemento_img_perro.src = url_perro;
    elemento_img_perro.hidden = false;
}

function pedirTiempoFetch() {
    fetch(API_WEB_PERROS) //PROMESAS -
        .then(response => response.json()) //funciones de flecha //anónimas -response es el cuerpo HTTP de vuelta
        .then(infoperro => { //inicio función 
            console.log(infoperro);
            actualizarIMG(infoperro.message);

        }//final de la función

        ).catch(function(error) {
            console.log('Hubo un problema con la petición Fetch:' + error.message);
          });
}

function pedirPerroAjax() {
    //VAMOS A USAR AJAX PARA OBTENER LA IMAGEN DEL PERRO
    http_request = new XMLHttpRequest(); //ESTO SIRVE PARA ENVIAR Y RECIBIR LA INFO DEL SERVIDOR
    http_request.onreadystatechange = procesarRespuestaServidor;//cuando te responda el servidor, me llamas a esa función
    http_request.open('GET', API_WEB_PERROS, true);//programo la llamada
    http_request.send();//llamo

}

function procesarRespuestaServidor() {

    if (http_request.readyState == 4) //la comunicación se ha completado
    {

        if (http_request.status == 200) { //la cosa ha ido bien
            console.log(http_request.responseText);//ESTO ES EL JSON QUE RECIBO
            procesarCuerpo(http_request.responseText);
        } else {
            alert('Hubo problemas con la petición.');
        }
    }

}

function procesarCuerpo(cuerpo) {
    //TODO representarlo 
    //recibiendo texto json y lo tengo que pasar a variable --> DESERILIZAR
    //SERIALIZAR // DESERIALIZAR
    let info_perro = JSON.parse(cuerpo);//paso de texto a variable
    // {
    //     "message": "https://images.dog.ceo/breeds/terrier-bedlington/n02093647_529.jpg",
    //     "status": "success"
    // }
    console.log(" RUTA FOTO PERRO " + info_perro.message);
    console.log(" ESTATUS " + info_perro.status);
    //obtengo el elmento imagen
    actualizarIMG(info_perro.message);
}