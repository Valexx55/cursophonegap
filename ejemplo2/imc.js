//CÁCULOS DEL IMC
//ACCIONES SOBRE LA PÁGINA

const RUTA_FOTO_DESNUTRIDO = "https://c8.alamy.com/compes/hba10h/hombre-flaco-de-dibujos-animados-hba10h.jpg";
const RUTA_FOTO_DELGADO = "https://c8.alamy.com/compes/hba10h/hombre-flaco-de-dibujos-animados-hba10h.jpg";
const RUTA_FOTO_IDEAL = "https://c8.alamy.com/compes/hba10h/hombre-flaco-de-dibujos-animados-hba10h.jpg";
const RUTA_FOTO_SOBREPESO = "https://c8.alamy.com/compes/hba10h/hombre-flaco-de-dibujos-animados-hba10h.jpg";
const RUTA_FOTO_OBESO = "https://c8.alamy.com/compes/hba10h/hombre-flaco-de-dibujos-animados-hba10h.jpg";

function calcularIMC() {
    console.log("calcular el imc");
    //1. OBTENER EL PESO
    let elemento_peso = document.getElementById("peso");
    let peso = elemento_peso.value;
    //2. OBTENER LA ESTATURA
    let elemento_altura = document.getElementById("estatura");
    let altura = elemento_altura.value;
    console.log("Altura y pesos = " + altura + " y " + peso);
    //3. CALCULAR IMC
    let imc = peso / (altura * altura);
    console.log("IMC = " + imc);
    //3.1 equivalencia del imc numérico al imc nominal
    //TODO 
    let elemento_imagen = document.getElementById("imagenimc");
    if (imc < 16) {
        window.alert("DESNUTRIDO");
        elemento_imagen.src = RUTA_FOTO_DESNUTRIDO;
    }else if (imc >= 16 && imc < 18) {
        window.alert("DELGADO");
        elemento_imagen.src = RUTA_FOTO_DELGADO;
    } else if (imc >= 18 && imc < 25) {
        window.alert("IDEAL");
        elemento_imagen.src = RUTA_FOTO_IDEAL;
    } else if (imc >= 25 && imc < 30) {
        window.alert("SOBREPESO");
        elemento_imagen.src = RUTA_FOTO_SOBREPESO;
    } else if (imc >= 30) {
        window.alert("OBESIDAD");
        elemento_imagen.src = RUTA_FOTO_OBESO;
    }

    //4. MOSTRAR EL RESULTADO/INFORMAR

}