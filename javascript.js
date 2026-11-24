document.addEventListener("DOMContentLoaded", () => {
    // 1. Catálogo de platos
    const btnCatalogo = document.getElementById("btnCatalogo");
    const contenedorCatalogo = document.getElementById("contenedorCatalogo");

    const nombres = [
        "plato1",
        "plato2",
        "plato3",
        "plato4",
        "plato5"
    ];

    const fotos = [
        "listacatalogo/plato1.png",
        "listacatalogo/plato2.png",
        "listacatalogo/plato3.png",
        "listacatalogo/plato4.png",
        "listacatalogo/plato5.png"
    ];

    let catalogoVisible = false;

    if (btnCatalogo && contenedorCatalogo) {
        btnCatalogo.addEventListener("click", () => {
            if (!catalogoVisible) {
                contenedorCatalogo.innerHTML = "";
                for (let i = 0; i < nombres.length; i++) {
                    const tarjeta = document.createElement("div");
                    tarjeta.classList.add("tarjeta-plato");
                    tarjeta.innerHTML = `
                        <img src="${fotos[i]}" alt="${nombres[i]}">
                        <h4>${nombres[i]}</h4>
                    `;
                    contenedorCatalogo.appendChild(tarjeta);
                }
                btnCatalogo.textContent = "Ocultar catálogo";
                catalogoVisible = true;
            } else {
                contenedorCatalogo.innerHTML = "";
                btnCatalogo.textContent = "Ver catálogo";
                catalogoVisible = false;
            }
        });
    }

    // 2. Validación del formulario de reservas
    const formReserva = document.getElementById("formReserva");
    const mensajeReserva = document.getElementById("mensajeReserva");

    if (formReserva && mensajeReserva) {
        formReserva.addEventListener("submit", (e) => {
            e.preventDefault();

            const nombre = document.getElementById("nombre").value.trim();
            const correo = document.getElementById("correo").value.trim();
            const fecha = document.getElementById("fecha").value;
            const hora = document.getElementById("hora").value;
            const personas = parseInt(document.getElementById("personas").value, 10);

            if (!nombre || !correo || !fecha || !hora || isNaN(personas) || personas < 1) {
                mensajeReserva.style.color = "crimson";
                mensajeReserva.textContent = "Por favor, completa todos los campos correctamente.";
                return;
            }

            mensajeReserva.style.color = "green";
            mensajeReserva.textContent = `¡Reserva confirmada para ${nombre} (${personas} personas) el ${fecha} a las ${hora}!`;
            formReserva.reset();
        });
    }
});
// 3. Botón de Me gusta con contador
    const btnLike = document.getElementById("btnLike");
    const contadorLikes = document.getElementById("contadorLikes");

    if (btnLike && contadorLikes) {
        let likes = parseInt(localStorage.getItem("upcdaur_likes")) || 0;
        let yaDioLike = localStorage.getItem("upcdaur_liked") === "true";

        contadorLikes.textContent = likes;
        if (yaDioLike) {
            btnLike.classList.add("liked");
            btnLike.textContent = "❤️ Te gusta";
        }

        btnLike.addEventListener("click", () => {
            if (!yaDioLike) {
                likes++;
                yaDioLike = true;
                btnLike.classList.add("liked");
                btnLike.textContent = "❤️ Te gusta";
            } else {
                likes--;
                yaDioLike = false;
                btnLike.classList.remove("liked");
                btnLike.textContent = "🤍 Me gusta";
            }

            contadorLikes.textContent = likes;
            localStorage.setItem("upcdaur_likes", likes);
            localStorage.setItem("upcdaur_liked", yaDioLike);
        });
    }
const campoPrecio = document.getElementById("campoPrecio");

const campoCantidad = document.getElementById("campoCantidad");

const botonTotal = document.getElementById("btnTotal");

const resultadoTotal = document.getElementById("resultadoTotal");

function calcularTotal(precio, cantidad) {

    return precio * cantidad;

}

if (campoPrecio !== null && campoCantidad !== null && botonTotal !== null && resultadoTotal !== null) {

    botonTotal.addEventListener("click", function() {

        if (campoPrecio.value.trim() === "" || campoCantidad.value.trim() === "") {

            resultadoTotal.textContent = "Completa precio y cantidad.";

            resultadoTotal.style.color = "red";

        } else {

            const total = calcularTotal(Number(campoPrecio.value), Number(campoCantidad.value));

            resultadoTotal.textContent = "Total: $" + total.toFixed(2);

            resultadoTotal.style.color = "green";

        }

    });

}
const productos = [
    { id: 1, nombre: "plato1", precio: 10.0, categoria: "Carnes", foto: "listacatalogo/plato1.png" },
    { id: 2, nombre: "plato2", precio: 8.5, categoria: "Mariscos", foto: "listacatalogo/plato2.png" },
    { id: 3, nombre: "plato3", precio: 7.5, categoria: "Pastas", foto: "listacatalogo/plato3.png" },
    { id: 4, nombre: "plato4", precio: 8.9, categoria: "Entradas", foto: "listacatalogo/plato4.png" },
    { id: 5, nombre: "Plato5", precio: 10.5, categoria: "Postres", foto: "listacatalogo/plato5.png" }
];
const listaProductos = document.getElementById("listaProductos");

function mostrarProductos(lista) {
    let html = "";
    for (let i = 0; i < lista.length; i++) {
        const p = lista[i];
        html = html + "<li><img src='" + p.foto + "' alt='" + p.nombre + "' class='foto-producto'><h3>" + p.nombre + "</h3><p>$" + p.precio.toFixed(2) + "</p><button onclick='agregarAlCarrito(" + p.id + ")'>Agregar</button></li>";
    }
    if (lista.length === 0) {
        html = "<li>No se encontraron productos.</li>";
    }
    listaProductos.innerHTML = html;
}

if (listaProductos !== null) {
    mostrarProductos(productos);
}
let carrito = [];

const textoCarrito = document.getElementById("textoCarrito");
const botonVaciar = document.getElementById("btnVaciar");

function agregarAlCarrito(id) {
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].id === id) {
            carrito.push(productos[i]);
        }
    }
    mostrarCarrito();
}

function mostrarCarrito() {
    if (textoCarrito === null) {
        return;
    }

    if (carrito.length === 0) {
        textoCarrito.textContent = "El carrito está vacío.";
        return;
    }

    let total = 0;
    for (let i = 0; i < carrito.length; i++) {
        total = total + carrito[i].precio;
    }

    textoCarrito.textContent = "Productos: " + carrito.length + " | Total: $" + total.toFixed(2);
}

function vaciarCarrito() {
    carrito = [];
    mostrarCarrito();
}

if (botonVaciar !== null) {
    botonVaciar.addEventListener("click", vaciarCarrito);
}
// ===== CUENTAS (simulación en el navegador) =====
const cuUsuario = document.getElementById("cuUsuario");
const cuClave = document.getElementById("cuClave");
const mensajeCuenta = document.getElementById("mensajeCuenta");
const estadoSesion = document.getElementById("estadoSesion");
const listaPedidos = document.getElementById("listaPedidos");
const botonRegistro = document.getElementById("btnRegistro");
const botonEntrar = document.getElementById("btnEntrar");
const botonSalir = document.getElementById("btnSalir");

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
let usuarioActivo = localStorage.getItem("usuarioActivo");

function avisar(texto, color) {
    if (mensajeCuenta !== null) {
        mensajeCuenta.textContent = texto;
        mensajeCuenta.style.color = color;
    }
}

function buscarUsuario(nombre) {
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].usuario === nombre) {
            return usuarios[i];
        }
    }
    return null;
}

function registrar() {
    const nombre = cuUsuario.value.trim();
    const clave = cuClave.value;
    if (nombre === "" || clave.length < 6) {
        avisar("Escribe un usuario y una contraseña de al menos 6 caracteres.", "red");
        return;
    }
    if (buscarUsuario(nombre) !== null) {
        avisar("Ese usuario ya existe.", "red");
        return;
    }
    usuarios.push({ usuario: nombre, clave: clave });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    avisar("Cuenta creada. Ahora inicia sesión.", "green");
}

function iniciarSesion() {
    const u = buscarUsuario(cuUsuario.value.trim());
    if (u === null || u.clave !== cuClave.value) {
        avisar("Usuario o contraseña incorrectos.", "red");
        return;
    }
    usuarioActivo = u.usuario;
    localStorage.setItem("usuarioActivo", usuarioActivo);
    avisar("Bienvenido, " + usuarioActivo + ".", "green");
    actualizarSesion();
}

function cerrarSesion() {
    usuarioActivo = null;
    localStorage.removeItem("usuarioActivo");
    avisar("Sesión cerrada.", "green");
    actualizarSesion();
}

function mostrarPedidos() {
    if (listaPedidos === null) {
        return;
    }
    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    let html = "";
    for (let i = 0; i < pedidos.length; i++) {
        if (pedidos[i].usuario === usuarioActivo) {
            html = html + "<li>" + pedidos[i].fecha + " - " + pedidos[i].cantidad + " producto(s) - $" + pedidos[i].total.toFixed(2) + "</li>";
        }
    }
    if (html === "") {
        html = "<li>Aún no tienes pedidos.</li>";
    }
    listaPedidos.innerHTML = html;
}

function actualizarSesion() {
    if (estadoSesion !== null) {
        if (usuarioActivo === null) {
            estadoSesion.textContent = "Sin sesión.";
        } else {
            estadoSesion.textContent = "Sesión activa: " + usuarioActivo;
        }
    }
    mostrarPedidos();
}

if (botonRegistro !== null && botonEntrar !== null && botonSalir !== null) {
    botonRegistro.addEventListener("click", registrar);
    botonEntrar.addEventListener("click", iniciarSesion);
    botonSalir.addEventListener("click", cerrarSesion);
}

actualizarSesion();
// ===== COMPRA (requiere sesión) =====
const botonComprar = document.getElementById("btnComprar");
const mensajeCompra = document.getElementById("mensajeCompra");

function calcularTotalCarrito() {
    let total = 0;
    for (let i = 0; i < carrito.length; i++) {
        total = total + carrito[i].precio;
    }
    return total;
}

function finalizarCompra() {
    if (usuarioActivo === null) {
        mensajeCompra.textContent = "Inicia sesión para comprar.";
        mensajeCompra.style.color = "red";
        return;
    }
    if (carrito.length === 0) {
        mensajeCompra.textContent = "Tu carrito está vacío.";
        mensajeCompra.style.color = "red";
        return;
    }
    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    const pedido = {
        usuario: usuarioActivo,
        cantidad: carrito.length,
        total: calcularTotalCarrito(),
        fecha: new Date().toLocaleDateString()
    };
    pedidos.push(pedido);
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
    mensajeCompra.textContent = "Gracias, " + usuarioActivo + ". Pedido registrado por $" + pedido.total.toFixed(2) + ".";
    mensajeCompra.style.color = "green";
    vaciarCarrito();
    mostrarPedidos();
}

if (botonComprar !== null) {
    botonComprar.addEventListener("click", finalizarCompra);
}