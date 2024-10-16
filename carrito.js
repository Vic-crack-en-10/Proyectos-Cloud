document.addEventListener("DOMContentLoaded", () => {
    let productosEnCarrito = localStorage.getItem("productos-en-carrito");
    productosEnCarrito = JSON.parse(productosEnCarrito) || [];

    const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
    const contenedorCarritoProductos = document.querySelector("#carrito-productos");
    const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
    const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
    const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
    const contenedorTotal = document.querySelector("#total");
    const botonComprar = document.querySelector("#carrito-acciones-comprar");

    function cargarProductosCarrito() {
        if (productosEnCarrito.length > 0) {
            contenedorCarritoVacio.classList.add("disabled");
            contenedorCarritoProductos.classList.remove("disabled");
            contenedorCarritoAcciones.classList.remove("disabled");
            contenedorCarritoComprado.classList.add("disabled");

            contenedorCarritoProductos.innerHTML = "";

            productosEnCarrito.forEach(producto => {
                const div = document.createElement("div");
                div.classList.add("carrito-producto");
                div.innerHTML = `
                    <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                    <div class="carrito-producto-titulo">
                        <small>Modelo</small>
                        <h3>${producto.titulo}</h3>
                    </div>
                    <div class="carrito-producto-cantidad">
                        <small>Cantidad</small>
                        <p>${producto.cantidad}</p>
                    </div>
                    <div class="carrito-producto-precio">
                        <small>Precio</small>
                        <p>$${producto.precio}</p>
                    </div>
                    <div class="carrito-producto-subtotal">
                        <small>Subtotal</small>
                        <p>$${producto.precio * producto.cantidad}</p>
                    </div>
                    <button class="carrito-producto-eliminar" data-id="${producto.id}"><i class="bi bi-trash3-fill"></i></button>
                `;
                contenedorCarritoProductos.append(div);
            });

            actualizarBotonesEliminar();
            actualizarTotal();
        } else {
            contenedorCarritoVacio.classList.remove("disabled");
            contenedorCarritoProductos.classList.add("disabled");
            contenedorCarritoAcciones.classList.add("disabled");
            contenedorCarritoComprado.classList.add("disabled");
        }
    }

    function actualizarBotonesEliminar() {
        const botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
        botonesEliminar.forEach(boton => {
            boton.addEventListener("click", eliminarDelCarrito);
        });
    }

    function eliminarDelCarrito(e) {
        const idProducto = e.currentTarget.dataset.id;
        productosEnCarrito = productosEnCarrito.filter(producto => producto.id != idProducto);
        cargarProductosCarrito();
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    }

    botonVaciar.addEventListener("click", () => {
        productosEnCarrito.length = 0;
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        cargarProductosCarrito();
    });

    function actualizarTotal() {
        const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
        contenedorTotal.innerText = `$${totalCalculado}`;
    }

    botonComprar.addEventListener("click", () => {
        productosEnCarrito.length = 0;
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.remove("disabled");
    });

    cargarProductosCarrito();
});

