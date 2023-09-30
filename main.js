function calcularPrecio(){
    let precio = parseFloat(prompt("Ingrese el precio de su producto"));
    let cantidad = parseInt(prompt ("Ingrese la cantidad de su producto"));
    let cuotas = parseInt(prompt("Ingrese en cuantas cuotas desea pagar. Tenemos en 1, 3, 6 y 12 cuotas"));
    precioFinal = precio * cantidad;


    while(cantidad !== 0 && precio !== 0 && cuotas !== 0){
        switch(cuotas){
            case 1:
            alert(`El valor final de tu producto/s en ${cuotas} cuota/s es de ${precioFinal}`);
            break;

            case 3:
            calculo = (precioFinal * 3)/100;
            precioFinal += calculo;
            alert(`El valor final de tu producto/s en ${cuotas} cuota/s es de ${precioFinal}`);
            break;

            case 6:
            calculo = (precioFinal * 6)/100;
            precioFinal += calculo;
            alert(`El valor final de tu producto/s en ${cuotas} cuota/s es de ${precioFinal}`);
            break;
            
            case 12: 
            calculo = (precioFinal * 12)/100;
            precioFinal += calculo;
            alert(`El valor final de tu producto/s en ${cuotas} cuota/s es de ${precioFinal}`);
            break;
        }
        precio = parseFloat(prompt("Ingrese el precio de su producto"));
        cantidad = parseInt(prompt ("Ingrese la cantidad de su producto"));
        cuotas = parseInt(prompt("Ingrese en cuantas cuotas desea pagar. Tenemos en 1, 3, 6 y 12 cuotas"));
        precioFinal = precio * cantidad;
    }
}
calcularPrecio();