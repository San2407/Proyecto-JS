let productos;
function guardarProductos() {
    localStorage.setItem('productos', JSON.stringify(productos));
}

function cargarProductos() {
    const productosJSON = localStorage.getItem('productos');
    return productosJSON ? JSON.parse(productosJSON) : [];
}

function eliminarProducto(index) {
    productos.splice(index, 1);
    guardarProductos();
    mostrarProductos();
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
        Swal.fire({
            title: '¿Estas Seguro?',
            text: 'La fila seleccionada esta elimanda.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                const indexFila = e.target.parentNode.parentNode.rowIndex;
                listaProductos.deleteRow(indexFila);
                eliminarProducto(indexFila);

                Swal.fire(
                    '¡Eliminado!',
                    'La fila ha sido eliminada exitosamente.',
                    'success'
                );
                const precioTotal = productos.reduce((total, producto) => {
                    return total + calcularPrecioCuotas(producto);
                }, 0);

                document.getElementById('precioTotal').textContent = `$${precioTotal}`;
                document.getElementById('precioConvertido').textContent = `$${precioTotal}`;
            }
        });
    }
}

function buscarProducto() {
    const inputBusqueda = document.getElementById('nombreBusqueda');
    const valorBusqueda = inputBusqueda.value.toLowerCase(); 

    const productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(valorBusqueda));

    listaProductos.innerHTML = '';
    productosFiltrados.forEach((producto, index) => {
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

function onSubmit(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombreProducto').value;
    const precio = parseFloat(document.getElementById('precioProducto').value);
    const cantidad = parseInt(document.getElementById('cantidadProducto').value);
    const cuotas = parseInt(document.getElementById('cuotasProducto').value);

    if (!nombre || isNaN(precio) || isNaN(cantidad) || isNaN(cuotas)) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, complete todos los campos con valores válidos.',
        });
        return;
    }

    if (precio <= 0 || cantidad <= 0) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El precio y la cantidad deben ser números positivos.',
        });
        return;
    }

    agregarProducto(nombre, precio, cantidad, cuotas);

    Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Producto agregado exitosamente!',
    });
}

function CalcularPrecioClick() {
    if (productos.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No hay productos en la tabla. Agrega al menos uno antes de calcular el precio.',
        });
        return;
    }

    Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Se calculo el precio",
        showConfirmButton: false,
        timer: 1500
    });
    const precioTotal = productos.reduce((total, producto) => {
        return total + calcularPrecioCuotas(producto);
    }, 0);
    document.getElementById('precioTotal').textContent = `$${precioTotal}`;
    document.getElementById('precioConvertido').textContent = `$${precioTotal}`;
}

function tasaCambio(){
    var precio = document.getElementById('precioTotal').textContent;
    precio = precio.replace('$','');
    console.log(precio)
    var precioConvertido = document.getElementById('precioConvertido');
    var divisa = document.getElementById('selectDivisas').value;

    fetch(`https://v6.exchangerate-api.com/v6/ca7a6b813dcfb353b37b038d/pair/ARS/${divisa}`)
    .then(res => res.json())
    .then(data => {
        const cambio = data.conversion_rate;
        const tasa = (precio * cambio).toFixed(2);
        precioConvertido.textContent = `$${tasa}`;
    })
}

document.getElementById('formularioProducto').addEventListener('submit', onSubmit);
document.getElementById('btnCalcularPrecio').addEventListener('click', CalcularPrecioClick);
const seleccionDivisas = document.getElementById('selectDivisas').addEventListener('change', tasaCambio);

productos = cargarProductos();
mostrarProductos();