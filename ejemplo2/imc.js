//CÁCULOS DEL IMC
//ACCIONES SOBRE LA PÁGINA

function calcularIMC()
{
    console.log("calcular el imc");
    //1. OBTENER EL PESO
    let elemento_peso = document.getElementById("peso");
    let peso = elemento_peso.value;
    //2. OBTENER LA ESTATURA
    let elemento_altura = document.getElementById("estatura");
    let altura = elemento_altura.value;
    console.log("Altura y pesos = " + altura + " y " + peso);
    //3. CALCULAR IMC
    let imc = peso/(altura*altura);
    console.log("IMC = " + imc);
    //3.1 equivalencia del imc numérico al imc nominal
        
    //4. MOSTRAR EL RESULTADO/INFORMAR

}