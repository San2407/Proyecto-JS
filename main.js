let productos;
function guardarProductos() {
    localStorage.setItem('productos', JSON.stringify(productos));
}

function cargarProductos() {
    const productosJSON = localStorage.getItem('productos');
    return productosJSON ? JSON.parse(productosJSON): [];
}

function crearProducto(nombre, precio, cantidad, cuotas) {
    return {
        nombre,
        precio,
        cantidad,
        cuotas,
    };
}

const descuentoRecargo = {
    1: 0,
    3: 3,
    6: 6,
    12: 12
};

function calcularPrecioCuotas(producto) {
    const descuento = descuentoRecargo[producto.cuotas];
    const calculo = (producto.precio * producto.cantidad * descuento) / 100;
    return producto.precio * producto.cantidad + calculo;
}

function agregarProducto(nombre, precio, cantidad, cuotas) {
    const nuevoProducto = crearProducto(nombre, precio, cantidad, cuotas);
    productos.push(nuevoProducto);
    mostrarProductos();
    guardarProductos();
}

function mostrarProductos() {
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
        <div>Precio en cuotas: ${precioTotalCuotas}</div>
        `;
        listaProductos.appendChild(elementoPrducto);
    });
}

function buscarProducto(nombre) {
    const productoEncontrado = productos.filter(producto => producto.nombre === nombre);
    if (productoEncontrado.length > 0) {
        alert("Producto Encontrado:");
        mostrarProductos(productoEncontrado);
    } else {
        const listaProductos = document.getElementById('listaProductos');
        listaProductos.innerHTML = 'No se encontraron productos con ese nombre.';
    }
}


function onSubmit(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombreProducto').value;
    const precio = parseFloat(document.getElementById('precioProducto').value);
    const cantidad = parseInt(document.getElementById('cantidadProducto').value);
    const cuotas = parseInt(document.getElementById('cuotasProducto').value);

    agregarProducto(nombre, precio, cantidad, cuotas);
}

function CalcularPrecioClick(){
    mostrarProductos();
}

function BuscarProductoClick (){
    const busqueda = document.getElementById('nombreBusqueda').value;
    buscarProducto(busqueda);
}

document.getElementById('formularioProducto').addEventListener('submit', onSubmit);
document.getElementById('btnCalcularPrecio').addEventListener('click', CalcularPrecioClick);
document.getElementById('btnBuscarProducto').addEventListener('click', BuscarProductoClick);

productos = cargarProductos();
mostrarProductos();