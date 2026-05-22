// banner
$(document).ready(function() {
    let indice = 0;
    let imagenes = $(".slide-img");
    let total = imagenes.length;
    
    function cambiarImagen() {
        imagenes.hide();
        imagenes.eq(indice).show();
        indice = (indice + 1) % total;
    }
    
    setInterval(cambiarImagen, 4000);
    imagenes.hide();
    imagenes.first().show();
});

$(window).scroll(function() {
    if ($(window).scrollTop() > 50) {
        $("#mainNavbar").addClass("scrolled");
    } else {
        $("#mainNavbar").removeClass("scrolled");
    }
});
   
//productos
$(document).ready(function() {

    const productos = [
        { nombre: "Collar corazones", precio: "19.90", categoria: "collares", img: "/img/catalogo collar/collar1.png" },
        { nombre: "Collar anilla", precio: "24.90", categoria: "collares", img: "/img/catalogo collar/collar2.png" },
        { nombre: "Collar multiple", precio: "22.90", categoria: "collares", img: "/img/catalogo collar/collar3.png" },
        { nombre: "Pulsera luna", precio: "12.90", categoria: "pulseras", img: "/img/catalogo pulseras/pulsera1.png" },
        { nombre: "Pulsera recta", precio: "14.90", categoria: "pulseras", img: "/img/catalogo pulseras/pulsera2.png" },
        { nombre: "Pulsera estrellas", precio: "16.90", categoria: "pulseras", img: "/img/catalogo pulseras/pulsera3.png" },
        { nombre: "Anillo corazones", precio: "9.90", categoria: "anillos", img: "/img/catalogo anillos/anillo1.png" },
        { nombre: "Anillo turquesa", precio: "7.90", categoria: "anillos", img: "/img/catalogo anillos/anillo2.png" },
        { nombre: "Anillo hebilla", precio: "11.90", categoria: "anillos", img: "/img/catalogo anillos/anillo3.png" }
    ];

    function mostrarProductos(categoria) {
        let html = "";
        
        for (let i = 0; i < productos.length; i++) {
            const p = productos[i];
            if (categoria === "todos" || p.categoria === categoria) {
                html += `
                    <div class="col-md-3 col-sm-6">
                        <div class="producto-card">
                            <a href="producto.html?nombre=${encodeURIComponent(p.nombre)}&precio=${p.precio}&img=${encodeURIComponent(p.img)}">
                            <img src="${p.img}" alt="${p.nombre}">
                            </a>
                            <h3>${p.nombre}</h3>
                            <p class="precio">${p.precio}€</p>
                        </div>
                    </div>
                `;
            }
        }
        
        $("#productos-container").html(html);
    }

    mostrarProductos("todos");

    $(".filtro-btn").click(function() {
        $(".filtro-btn").removeClass("active");
        $(this).addClass("active");
        const categoria = $(this).data("categoria");
        mostrarProductos(categoria);
    });
    
});

//  ACORDEÓN 
$(document).ready(function() {
    
    $(".acordeon-titulo").click(function() {
        let item = $(this).parent(".acordeon-item");
        
        if (item.hasClass("active")) {
            item.removeClass("active");
        } else {
            $(".acordeon-item").removeClass("active");
            item.addClass("active");
        }
    });
    
});

//carrito

function obtenerCarrito() {
    let carrito = sessionStorage.getItem("carrito");
    if (carrito) {
        return JSON.parse(carrito);
    } else {
        return [];
    }
}

function guardarCarrito(carrito) {
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
    let carrito = obtenerCarrito();
    let total = 0;
    
    for (let i = 0; i < carrito.length; i++) {
        total = total + carrito[i].cantidad;
    }
    
    $(".cart-count").remove();
    
    if (total > 0) {
        $(".nav-link:contains('Carrito')").append(' <span class="cart-count" style="background-color:#FF6B8A; color:white; border-radius:50%; padding:2px 8px; font-size:12px;">' + total + '</span>');
    }
}

function añadirAlCarrito(nombre, precio, cantidad) {
    let carrito = obtenerCarrito();
    let encontrado = false;
    
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].nombre === nombre) {
            carrito[i].cantidad = carrito[i].cantidad + cantidad;
            encontrado = true;
            break;
        }
    }
    
    if (!encontrado) {
        carrito.push({
            nombre: nombre,
            precio: parseFloat(precio),
            cantidad: cantidad
        });
    }
    
    guardarCarrito(carrito);
    alert(nombre + " añadido al carrito");
}

$(document).on("click", ".btn-comprar", function() {
    let nombre = $(this).data("nombre");
    let precio = $(this).data("precio");
    let cantidad = 1;
    
    if ($("#cantidad").length) {
        cantidad = parseInt($("#cantidad").val()) || 1;
    }
    
    añadirAlCarrito(nombre, precio, cantidad);
});

$(document).ready(function() {
    actualizarContadorCarrito();
});