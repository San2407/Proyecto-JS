function guardarProductos(){
    localStorage.setItem('productos', JSON.stringify(productos));
}

function cargarProductos(){
    const productosJSON = localStorage.getItem('producto');
    if(productosJSON){
        productos = JSON.parse(productosJSON)
    }
}

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
    const nuevoProducto = crearProducto(nombre, precio, cantidad, cuotas);
    productos.push(nuevoProducto);
    actualizarLista();
}

function mostrarProductos(){
    const listaProductos = document.getElementById('listaProductos');
    listaProductos.innerHTML = '';
    productos.forEach((producto, index) => {
        const precioTotalCuotas = calcularPrecioCuotas(producto);
        const elementoPrducto = document.createElement('div');
        elementoPrducto.innerHTML = `
        <div>Producto ${index + 1}:</div>
        <div>Nombre: ${producto.nombre}</div>
        <div>Precio: ${producto.precio}</div>
        <div>Cantidad: ${producto.cantidad}</div>
        <div>Cuotas: ${producto.cuotas}</div>
        <div>Precio en cuotas: ${precioTotalCuotas})</div>
        `;
        listaProductos.appendChild(elementoPrducto);
    });
}

function buscarProducto(nombre){
    const productoEncontrado = productos.filter(producto => producto.nombre === nombre);
    if(productoEncontrado.length > 0){
        alert("Producto Encontrado:");
        mostrarProductos(productoEncontrado);
    } else {
        const listaProductos = document.getElementById('listaProductos');
        listaProductos.innerHTML = 'No se encontraron productos con ese nombre.';
    }
}

/* function calcularPrecio(){
    while(true){
        const opcion = prompt(`Elija una opción: 
        1. Para Agregar Producto. 
        2. Para Calcular el Precio de los productos. 
        3. Para buscar un producto. 
        4. para salir.`);

        switch(opcion){
            case "1":
                agregarProducto();
                break;
            case "2":
                mostrarProductos();
                break;
            case "3":
                const busqueda = prompt("Ingrese el nombre del producto a buscar");
                buscarProducto(busqueda);
            case "4":
                return;
            default:
                alert("Opción no valida. Por favor elija una opción válida.");
        }
    }
} */
calcularPrecio();
function actualizarLista(){
    const listaProductos = document.getElementById('listaProductos')
}