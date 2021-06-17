const NUMERO = 100;
const TOTAL_INTENTOS = 5;
let numeroIntentos = 1;
let incognita = parseInt((Math.random() * NUMERO) + 1);
//TODO GUARDAR EL RECORD USANDO LOCALSTORAGE

//https://developer.mozilla.org/es/docs/Web/API/Web_Storage_API 
function cargarNumero() {
    document.getElementById("incognita").value = incognita;
}

function compruebaNumero() {
    let inputNumero = document.getElementById("numero").value;
    document.getElementById("intentos").innerText = "Número de intentos: " + numeroIntentos;

    if (numeroIntentos < TOTAL_INTENTOS) {      
        if (incognita == inputNumero) {
            guardarRecord ();
            document.getElementById("resultado").innerText = "Enhorabuena, has adivinado el número";
            if (window.confirm("¿Te gustaría probar de nuevo...?")) {
                seguir();
            } else {
                document.getElementById("resultado").innerText = "Hasta pronto!!";
            }
        } else if (incognita > inputNumero) {
            fallo("Prueba otra vez, el número es mayor");
        } else if (incognita < inputNumero) {
            fallo("Prueba otra vez, el número es menor");
        }
    } else {
        document.getElementById("resultado").innerText = "Has superado el número de intentos...";
        if (window.confirm("¿Te gustaría probar de nuevo...?")) {
            seguir()
        } else {
            document.getElementById("resultado").innerText = "Hasta pronto!!";
        }
    }
}

function actualizarNuevoRecord ()
{ //DRY dont repeat yourself
    localStorage.setItem('record', numeroIntentos);
    document.getElementById("logovictoria").hidden = false;
}

function guardarRecord (){
    //SI HA TARDADO MENOS VECES QUE EL RECORD ACTUAL, 
    //TENEES QUE ACTUALIZAR/ GUARDAR EL NUEVO RECORDO
    //SI NO, NO HAGO NADA

    //1 obtener el record_actual
    //leer de la memoria 
    var record_actual = localStorage.getItem('record');
    if (record_actual==null)
    {
        console.log("No hay record guardado");
        //guardar los intentos actuales como el nuevo recordo
        actualizarNuevoRecord();
    } else {
        console.log("Sí hay record guardado");
        //2 comparo el recordo actual, con el número de intentos de esta vez
        if (numeroIntentos<record_actual)
        {
            console.log("El usuario ha mejorado la marca");
            //VISIBILIZAR EL GIF
            actualizarNuevoRecord();
        } else {
            console.log("El usuario NO ha mejorado la marca");
        }
    }
        //caso especial, que no hay record
    //2 comparo el recordo actual, con el número de intentos de esta vez
    //3 si el num intentos en menor que record, guardo numero intentos como el nuevo record
}

function seguir() {
    numeroIntentos = 1;
    incognita = parseInt((Math.random() * NUMERO) + 1);
    document.getElementById("intentos").innerText = "Número de intentos: " + numeroIntentos;
    document.getElementById("logovictoria").hidden = true;//ocultar el record
    cargarNumero();
}

function fallo(mensaje) {
    document.getElementById("resultado").innerText = mensaje;
    ++numeroIntentos;
}
