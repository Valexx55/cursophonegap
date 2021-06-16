//CÁCULOS DEL IMC
//ACCIONES SOBRE LA PÁGINA

const RUTA_FOTO_DESNUTRIDO = "https://cdna.artstation.com/p/assets/images/images/006/976/276/smaller_square/danny-kang-screenshot003.jpg?1502730528";
const RUTA_FOTO_DELGADO = "https://i.pinimg.com/736x/f7/bd/f9/f7bdf9db2294162ecb6eac62ad57e139--body-reference-male-fitness.jpg";
const RUTA_FOTO_IDEAL = "https://i.pinimg.com/736x/06/a4/af/06a4af20ef06ad24047204a69d9db589.jpg";
const RUTA_FOTO_SOBREPESO = "https://i.pinimg.com/736x/31/e2/38/31e238a81c2f11a0f9fb2b5e90094084--fat-character-design-illustrations.jpg";
const RUTA_FOTO_OBESO = "http://www.humanillnesses.com/photos/obesity-2295.jpg";

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