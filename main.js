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
    index = productos.length + 1;
    productos.push(nuevoProducto);
    mostrarProductos();
    guardarProductos();
}

const listaProductos = document.getElementById('listaProductos');
function mostrarProductos() {
    listaProductos.innerHTML = '';

    productos.forEach((producto, index) => {
        producto.index = index + 1;
        const precioTotalCuotas = calcularPrecioCuotas(producto);
        const elementoProducto = document.createElement('tr');
        elementoProducto.innerHTML = `
        <th scope="row">${producto.index}</th>
        <td>${producto.nombre}</td>
        <td>${producto.precio}</td>
        <td>${producto.cantidad}</td>
        <td>${producto.cuotas}</td>
        <td>${precioTotalCuotas}</td>
        <td><button href=# class="eliminar"><span><i class="bi bi-x-circle-fill text-danger"></i></span></button></td>   
        `;
        listaProductos.appendChild(elementoProducto);
    });
}

listaProductos.addEventListener("click", eliminarFila);

function eliminarFila(e) {
    if (e.target.matches("i")) {
        const indexFila = e.target.parentNode.parentNode.rowIndex;
        listaProductos.deleteRow(indexFila);
    }
}



//function buscarProducto(nombre) {
//    const productoEncontrado = productos.filter(producto => producto.nombre === nombre);
//    if (productoEncontrado.length > 0) {
//        alert("Producto Encontrado:");
//        mostrarProductos();
//    } else {
//        const listaProductos = document.getElementById('listaProductos');
//        listaProductos.innerHTML = 'No se encontraron productos con ese nombre.';
//    }
//}
function buscarProducto(nombre) {
    const productosEncontrados = productos.filter(producto => producto.nombre === nombre);
    if (productosEncontrados.length > 0) {
        listaProductos.innerHTML = '';

        productosEncontrados.forEach((producto, index) => {
            producto.index = index + 1;
            const precioTotalCuotas = calcularPrecioCuotas(producto);
            const elementoProducto = document.createElement('tr');
            elementoProducto.innerHTML = `
                <th scope="row">${producto.index}</th>
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
                <td>${producto.cantidad}</td>
                <td>${producto.cuotas}</td>
                <td>${precioTotalCuotas}</td>
                <td><button href=# class="eliminar"><span><i class="bi bi-x-circle-fill text-danger"></i></span></button></td>   
            `;
            listaProductos.appendChild(elementoProducto);
        });

    } else {
        listaProductos.innerHTML = 'No se encontraron productos con ese nombre.';
    }
}

function onSubmit(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombreProducto').value;
    const precio = parseFloat(document.getElementById('precioProducto').value);
    const cantidad = parseInt(document.getElementById('cantidadProducto').value);
    const cuotas = parseInt(document.getElementById('cuotasProducto').value);

    if (!nombre || isNaN(precio) || isNaN(cantidad) || isNaN(cuotas)) {
        alert('Por favor, complete todos los campos con valores válidos.');
        return;
    }

    if (precio <= 0 || cantidad <= 0) {
        alert('El precio y la cantidad deben ser números positivos.');
        return;
    }
    agregarProducto(nombre, precio, cantidad, cuotas);
}

function CalcularPrecioClick(){
    const precioTotal = productos.reduce((total, producto) => {
        return total + calcularPrecioCuotas(producto);
    }, 0);
    document.getElementById('precioTotal').textContent = `$${precioTotal}`;
}
function BuscarProductoClick(){
    const busqueda = document.getElementById('nombreBusqueda').value;
    buscarProducto(busqueda);
}

document.getElementById('formularioProducto').addEventListener('submit', onSubmit);
document.getElementById('btnCalcularPrecio').addEventListener('click', CalcularPrecioClick);
document.getElementById('btnBuscarProducto').addEventListener('click', BuscarProductoClick);

productos = cargarProductos();
mostrarProductos();