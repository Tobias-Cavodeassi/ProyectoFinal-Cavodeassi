let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        setTimeout(() => {
            catalogo.innerHTML = ``
            loader.style.display = "none";
            catalogo.style.display = "grid";
            data.forEach(el => crearCard(el));
        }, 2000);
    });

function crearCard(producto) {
    const card = document.createElement("div");
    card.className = "producto";
    
    const tipo = document.createElement("p");
    tipo.innerText = producto.tipo;

    const modelo = document.createElement("p");
    modelo.innerText = producto.modelo;
    
    const imagen = document.createElement("img");
    imagen.src = producto.imagen;
    imagen.className = "productoContenido";

    const precio = document.createElement("p");
    precio.innerText = `Precio: $${producto.precio}`;

    const botonAgregarAlCarrito = document.createElement("button");
    botonAgregarAlCarrito.innerText = "Agregar al carrito";
    botonAgregarAlCarrito.className = "agregarAlCarritoBoton";
    botonAgregarAlCarrito.addEventListener("click", () => agregarAlCarrito(producto));
    
    card.append(tipo);
    card.append(modelo);
    card.append(imagen);
    card.append(precio);
    card.append(botonAgregarAlCarrito);
    
    catalogo.append(card);
}

function verCarrito() {
    const carritoContenedor = document.getElementById('carritoContenedor');
    carritoContenedor.innerHTML = "";
    
    if (carrito.length === 0) {
        const mensajeVacio = document.createElement('h1');
        mensajeVacio.innerText = 'Tu carrito está vacío';
        mensajeVacio.className = 'mostrarCarritoTexto';
        carritoContenedor.append(mensajeVacio);
    } else {
        const lista = document.createElement('div');
        lista.className = 'mostrarCarritoTexto';
        
        const titulo = document.createElement('h1');
        titulo.innerText = 'Este es tu carrito actual:';
        lista.append(titulo)

        carrito.forEach((producto) => {
            const itemCarrito = document.createElement('p');
            itemCarrito.innerText = `${producto.tipo} ${producto.modelo} - Precio: $${producto.precio}`;
            itemCarrito.className = 'mostrarCarritoTexto';
            lista.append(itemCarrito);
        });

        carritoContenedor.append(lista);
    }
};
verCarrito();
console.log(carrito);

function agregarAlCarrito(producto) {
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    verCarrito();
}

function limpiarCarrito() {
    carrito = [];
    localStorage.removeItem('carrito');
    verCarrito();
};

function sweetAlertCompra(){
    Swal.fire({
        title: "Gracias por tu compra!",
        text: "La compra se realizó correctamente",
        icon: "success"
    }).then(() => {
        limpiarCarrito();
    });
};

function sweetAlertCarritoVacio(){
    Swal.fire({
        title: "No agregaste productos al carrito!",
        text: "No se pudo realizar la compra",
        icon: "error"
    })
};

const botonComprar = document.createElement("button");
botonComprar.innerText = "Comprar";
botonComprar.className = "carritoBoton";
botonComprar.addEventListener("click", () => {
    if (carrito.length === 0) {
        sweetAlertCarritoVacio();
    } else {
        sweetAlertCompra();
    };
});
document.body.append(botonComprar);

const botonLimpiarCarrito = document.createElement("button");
botonLimpiarCarrito.innerText = "Limpiar Carrito";
botonLimpiarCarrito.className = "carritoBoton";
botonLimpiarCarrito.addEventListener("click", limpiarCarrito);
document.body.append(botonLimpiarCarrito);