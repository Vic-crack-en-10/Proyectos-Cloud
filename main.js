document.addEventListener("DOMContentLoaded", () => {
    const contenedorProductos = document.querySelector("#contenedor-productos");
    const botonesCategorias = document.querySelectorAll(".boton-categoria");
    const tituloPrincipal = document.querySelector("#titulo-principal");
    const numerito = document.querySelector("#numerito");
    let productosEnCarrito = [];
    let productos = [];

    // Fetch productos desde la base de datos
    fetch("get_products.php")
        .then(response => response.json())
        .then(data => {
            productos = data;
            cargarProductos(productos);
        })
        .catch(error => console.error("Error fetching products:", error));

    function cargarProductos(productosElegidos) {
        contenedorProductos.innerHTML = "";
        productosElegidos.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("producto");
            div.innerHTML = `
                <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="producto-detalles">
                    <h3 class="producto-titulo">${producto.titulo}</h3>
                    <p class="producto-precio">$${producto.precio}</p>
                    <button class="producto-agregar" data-id="${producto.id}">Agregar</button>
                    <div class="sitio-info">
                        <div class="text-masinfo">
                            <a href="masinfo.php?id=${producto.id}" class="mas-info">+ Info</a>
                        </div>
                        <div class="text-sitio">
                            <a class="producto-info" href="${producto.info}" target="_blank">Sitio Oficial</a>
                    
                        </div>
                    </div>
                    
                </div>
            `;
            contenedorProductos.append(div);
        });
        actualizarBotonesAgregar();
    }

    botonesCategorias.forEach(boton => {
        boton.addEventListener("click", (e) => {
            botonesCategorias.forEach(boton => boton.classList.remove("active"));
            e.currentTarget.classList.add("active");

            if (e.currentTarget.id !== "todos") {
                const productosBoton = productos.filter(producto => producto.categoria == e.currentTarget.id);
                tituloPrincipal.innerText = e.currentTarget.textContent;
                cargarProductos(productosBoton);
            } else {
                tituloPrincipal.innerText = "Todos los productos";
                cargarProductos(productos);
            }
        });
    });

    function actualizarBotonesAgregar() {
        const botonesAgregar = document.querySelectorAll(".producto-agregar");
        botonesAgregar.forEach(boton => {
            boton.addEventListener("click", agregarAlCarrito);
        });
    }

    function agregarAlCarrito(e) {
        const idProducto = e.currentTarget.dataset.id;
        const productoAgregado = productos.find(producto => producto.id == idProducto);
        if (productosEnCarrito.some(producto => producto.id == idProducto)) {
            const index = productosEnCarrito.findIndex(producto => producto.id == idProducto);
            productosEnCarrito[index].cantidad++;
        } else {
            productoAgregado.cantidad = 1;
            productosEnCarrito.push(productoAgregado);
        }
        actualizarNumerito();
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    }

    function actualizarNumerito() {
        const nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
        numerito.innerText = nuevoNumerito;
    }

    let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");
    if (productosEnCarritoLS) {
        productosEnCarrito = JSON.parse(productosEnCarritoLS);
        actualizarNumerito();
    }
});

