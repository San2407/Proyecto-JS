function crearProducto(nombre, precio, cantidad, cuotas) {
    return {
    nombre,
    precio,
    cantidad,
    cuotas,
    };
}

const productos = [];
const descuentoRecargo = {
    1: 0,
    3: 3,
    6: 6,
    12: 12
};

function calcularPrecioCuotas(producto){
    const descuento = descuentoRecargo[producto.cuotas];
    const calculo = (producto.precio * producto.cantidad * descuento) / 100;
    return producto.precio * producto.cantidad + calculo;
}

function agregarProducto(){
    const nombre = prompt("Ingrese el nombre del producto");
    const precio = parseFloat(prompt("Ingrese el precio del producto"));
    const cantidad = parseInt(prompt("Ingrese la cantidad"));
    const cuotas = parseInt(prompt("Ingrese en cuantas cuotas desea pagar"));

    const nuevoProducto = crearProducto(nombre, precio, cantidad, cuotas);
    productos.push(nuevoProducto);
}

function mostrarProductos(){
    productos.forEach((producto, index) => {
        const precioTotalCuotas = calcularPrecioCuotas(producto);
        alert(`Producto ${index + 1}:
        Nombre: ${producto.nombre}
        Precio: ${producto.precio}
        Cantidad: ${producto.cantidad}
        Cuotas: ${producto.cuotas}
        Precio en cuotas: ${precioTotalCuotas}`);
    });
}


function calcularPrecio(){
    while(true){
        const opcion = prompt("Elija una opción: Escriba 1 para Agregar Producto. Escriba 2 para Calcular el Precio de los productos o Escriba 3 para salir");

        switch(opcion){
            case "1":
                agregarProducto();
                break;
            case "2":
                mostrarProductos();
                break;
            case "3":
                return;
            default:
                alert("Opción no valida. Por favor elija una opción válida.");
        }
    }
}
calcularPrecio();