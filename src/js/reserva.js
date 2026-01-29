import '../css/style.css'; 
import 'flowbite'; 

const lista = document.getElementById("lista-carrito");
const totalPago = document.getElementById("total-compra");
const limpiar = document.getElementById("btn-vaciar");
// Botón scroll (verifica que en reserva.html tengas un botón con este ID, si no, bórralo abajo)
const btnScroll = document.getElementById("btn-scroll-top"); 

// Traer la información (Mismo nombre de clave "contededor-inmuebles")
let reserva = JSON.parse(localStorage.getItem("contededor-inmuebles")) || [];

const actualizarContador = () => {
    const contador = document.getElementById("carrito-contador");
    if (contador) contador.innerText = reserva.length;
};

const mostrarReserva = () => {
    lista.innerHTML = "";
    let total = 0;

    //so esta vacio
    if (reserva.length === 0) {
        lista.innerHTML = `
            <div class="flex flex-col items-center justify-center py-10 opacity-60">
                <svg class="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                <p class="text-xl text-gray-500 font-light">Tu carrito está vacío</p>
                <a href="/src/pages/inmuebles_venta.html" class="mt-4 text-blue-600 hover:underline">Ir a ver inmuebles</a>
            </div>
        `;
        totalPago.innerText = "$0.00";
        actualizarContador();
        return;
    }

    reserva.forEach((inmueble, index) => {
        total += parseFloat(inmueble.precio);
        
        const foto = inmueble.imagen;
        const ubic = inmueble.ubicacion;
        const tipo = inmueble.tipo;

        lista.innerHTML += `
            <article class="group relative flex flex-col md:flex-row bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden mb-6">
                
                <div class="relative w-full md:w-64 h-48 flex-shrink-0 overflow-hidden">
                    <span class="absolute top-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider z-10">
                        ${tipo}
                    </span>
                    <img src="${foto}" alt="${inmueble.nombre}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                </div>

                <div class="flex-1 p-5 flex flex-col justify-between">
                    <div>
                        <div class="flex justify-between items-start">
                            <h3 class="text-lg font-bold text-gray-900 leading-tight mb-2">${inmueble.nombre}</h3>
                            <button data-index="${index}" class="btn-eliminar text-gray-400 hover:text-red-500 transition-colors">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                        </div>
                        
                        <div class="flex items-center text-gray-500 text-sm mb-4">
                            <svg class="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            ${ubic}
                        </div>
                    </div>

                    <div class="flex justify-between items-end border-t border-gray-100 pt-3">
                        <div>
                            <p class="text-xs text-gray-400 font-bold uppercase">Precio</p>
                            <p class="text-2xl font-black text-blue-900">$${inmueble.precio}</p>
                        </div>
                    </div>
                </div>
            </article>
        `;
    });

    totalPago.innerText = `$${total.toFixed(2)}`;
    actualizarContador();
};

lista.addEventListener("click", (e) => {
    const boton = e.target.closest(".btn-eliminar");
    if(boton){
        const index = parseInt(boton.dataset.index);
        reserva.splice(index, 1);
        localStorage.setItem("contededor-inmuebles", JSON.stringify(reserva));
        mostrarReserva();
    }
});

limpiar.addEventListener("click", () => {
    reserva = [];
    localStorage.setItem("contededor-inmuebles", JSON.stringify(reserva));
    mostrarReserva();
});
mostrarReserva();

const btnConfirmar = document.getElementById("btn-confirmar");

if (btnConfirmar) {
    btnConfirmar.addEventListener("click", () => {
        if (reserva.length === 0) {
            alert("Tu carrito está vacío.");
            return;
        }

        let inmueblesVendidos = JSON.parse(localStorage.getItem("inmuebles-vendidos")) || [];

        reserva.forEach(item => {
            inmueblesVendidos.push(item.nombre);
        });

        localStorage.setItem("inmuebles-vendidos", JSON.stringify(inmueblesVendidos));
        reserva = [];
        localStorage.setItem("contededor-inmuebles", JSON.stringify(reserva));
        
        mostrarReserva();
        alert("Cita confirmada con exito!");
    });
}

//Boton volver arriba
const botonirArriba = document.getElementById("btn-volver-arriba");

window.onscroll = () => {
    if (window.scrollY > 700) {
        botonirArriba.classList.remove("translate-y-20", "opacity-0");
        botonirArriba.classList.add("translate-y-0", "opacity-100");
    } else {
        botonirArriba.classList.add("translate-y-20", "opacity-0");
        botonirArriba.classList.remove("translate-y-0", "opacity-100");
    }
};