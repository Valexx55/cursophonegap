const NUMERO = 100;
const TOTAL_INTENTOS = 5;
let numeroIntentos = 1;
let incognita = parseInt((Math.random() * NUMERO) + 1);

function cargarNumero() {
    document.getElementById("incognita").value = incognita;
}

function compruebaNumero() {
    let inputNumero = document.getElementById("numero").value;
    document.getElementById("intentos").innerText = "Número de intentos: " + numeroIntentos;

    if (numeroIntentos < TOTAL_INTENTOS) {      
        if (incognita == inputNumero) {
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

function seguir() {
    numeroIntentos = 1;
    incognita = parseInt((Math.random() * NUMERO) + 1);
    document.getElementById("intentos").innerText = "Número de intentos: " + numeroIntentos;
    cargarNumero();
}

function fallo(mensaje) {
    document.getElementById("resultado").innerText = mensaje;
    ++numeroIntentos;
}
