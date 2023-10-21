const productosDiv = document.getElementById("productos");
const carritoTable = document.getElementById("carrito-body");
const totalElement = document.getElementById("total");

let productos = [];

function cargarProductos() {
    fetch("productos.json")
        .then(response => response.json())
        .then(data => {
            productos = data;
            mostrarProductos();
        })
        .catch(error => console.error("Error al cargar los productos:", error));
}

function mostrarProductos() {
    productosDiv.innerHTML = "";
    productos.forEach((producto) => {
        const productoDiv = document.createElement("div");
        productoDiv.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        `;
        productosDiv.appendChild(productoDiv);
    });
}

function agregarAlCarrito(productoId) {
    const productoSeleccionado = productos.find((producto) => producto.id === productoId);

    if (!productoSeleccionado) return;

    const productoEnCarrito = carrito.find((item) => item.id === productoId);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({ ...productoSeleccionado, cantidad: 1 });
    }

    actualizarCarrito().then(() => {
        animateCartItemAddition(productoSeleccionado.nombre);
    });
}

function actualizarCarrito() {
    return new Promise((resolve) => {
        carritoTable.innerHTML = "";
        let total = 0;

        carrito.forEach((item) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${item.nombre}</td>
                <td>$${item.precio}</td>
                <td>${item.cantidad}</td>
            `;
            carritoTable.appendChild(fila);
            total += item.precio * item.cantidad;
        });

        totalElement.textContent = `$${total}`;
        localStorage.setItem("carrito", JSON.stringify(carrito));

        setTimeout(() => {
            resolve();
        }, 500);
    });
}

function animateCartItemAddition(productoNombre) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "msg";
    messageDiv.textContent = `Agregado al carrito: ${productoNombre}`;
    document.body.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.remove();
    }, 2000);
}

function reiniciarCompras() {
    carrito.length = 0;
    actualizarCarrito();
}

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

cargarProductos();
actualizarCarrito();