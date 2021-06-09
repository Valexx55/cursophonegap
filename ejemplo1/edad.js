//window.alert("EJEMPLO INICIAL");//mostramos ventana emergente comentario

function comprobarMayoria() {//inicio

    // window.alert("HA TOCAO EL BOTÓN");
    console.log("HA TOCAO EL BOTÓN");//
    
    //1. OBTENER LA EDAD INTRODUCIDA POR EL USUARIO
    //declaro una variable que represente la etiqueta edad
    //var / let
    var elementoinputedad;
    elementoinputedad = document.getElementById("edad");//obtengo la caja
    //console.log(elementoinputedad.id);
    //console.log(elementoinputedad.value);
    var edad = elementoinputedad.value;
    console.log("La edad introducidad es " + edad);
    //2. COMPROBAR SI ES MAYOR DE 18, MOSTRAR EL MENSAJE  ES MAYOR DE EDAD
    //3. COMPROBAR SI ES MENOS DE 18, MOSTRAR EL MENSAJE  ES MENOR DE EDAD
    if (edad >= 18) {
        window.alert ("ERES MAYOR DE EDAD, PASA");
    } else {
        window.alert ("ERES MENOR DE EDAD, NO PASAS");
    }
  


}//fin