//TODO obtener la ubicación del usuario

function encuentrame()
{
    console.log("el usuario quiere saber su ubicación");
    if (navigator.geolocation)
    {
        console.log("El navegador sí tiene la geolocalización por la IP");
        navigator.geolocation.getCurrentPosition(exito, fracaso);
    } else {
        console.log("El navegador sí tiene la geolocalización por la IP");
        fracaso();
    }
    
}

function exito (posicion)
{
console.log("Se ha podido averiguar la ubicación del usuario");
console.log("LATITUD : " +  posicion.coords.latitude+ "LONGUITDU : " + posicion.coords.longitude);
}
function fracaso ()
{
    console.log("NO Se ha podido averiguar la ubicación del usuario");
    alert("No es posible saber su uobicación");
}