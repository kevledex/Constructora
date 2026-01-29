import '../css/style.css'; 
import 'flowbite'; 

const contenedor = document.getElementById("contededor-inmuebles")

//Funcion para cargar los libros- Funcion asincrona

const cargarTienda = async ()=>{
    try{
        const respuesta = await fetch("/data/inmuebles.json")
        //verificar si la repsuesta fue exitosa
        if(!respuesta.ok) throw new Error("Error en la red")
        //Convertir el cuepo de la respuesta a un objeto json que sepueda usar
        const datos = await respuesta.json();

        const inmueblesVendidos = JSON.parse(localStorage.getItem("inmuebles-vendidos")) || [];
        contenedor.innerHTML = "";
        
        datos.forEach((inmuebles) => {
            //verificar si el inmubele se vendio
            const esVendido = inmueblesVendidos.includes(inmuebles.nombre);
            const botonHTML = esVendido
            ? `<button disabled class="flex items-center gap-2 bg-gray-500 text-gray-200 px-4 py-2 rounded-lg font-bold cursor-not-allowed w-64 justify-center">
                     <span>Reservado</span>
                     <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                   </button>`:
                   `<button data-nombre="${inmuebles.nombre}" data-precio="${inmuebles.precio}"data-imagen="${inmuebles.imagen}" data-ubicacion="${inmuebles.ubicacion}" 
                data-tipo="${inmuebles.tipo}"
                        class="btn-reservar group/btn flex items-center justify-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-bold hover:bg-blue-600 hover:text-white transition-all active:scale-95 w-64">
                        <span>Reservar</span>
                        <svg class="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                   </button>`;

            contenedor.innerHTML += `
                <article class="group relative bg-[#242424] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300 border border-gray-800 flex flex-col h-full ${esVendido ? 'opacity-70 grayscale' : ''}">
                    
                    <div class="relative h-56 overflow-hidden">
                        <span class="absolute top-3 left-3 z-10 ${esVendido ? 'bg-gray-600' : 'bg-blue-600/90'} backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-wider">
                            ${esVendido ? 'NO DISPONIBLE' : inmuebles.tipo}
                        </span>
                        
                        <img class="w-full h-full object-cover ${esVendido ? '' : 'group-hover:scale-110'} transition-transform duration-700" 
                             src="${inmuebles.imagen}" 
                             alt="${inmuebles.nombre}" loading="lazy">
                        <div class="absolute inset-0 bg-gradient-to-t from-[#242424] via-transparent to-transparent opacity-60"></div>
                    </div>

                    <div class="p-5 flex flex-col flex-grow">
                        <h3 class="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors">
                            ${inmuebles.nombre}
                        </h3>

                        <div class="flex items-start gap-2 mb-4 text-gray-400 text-sm">
                            <svg class="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            <span class="line-clamp-2">${inmuebles.ubicacion}</span>
                        </div>

                        <div class="mt-auto pt-4 border-t border-gray-700 flex items-center justify-between gap-4">
                            <div>
                                <p class="text-xs text-gray-500 font-semibold uppercase">Reserva</p>
                                <p class="text-xl font-bold text-white">$ ${inmuebles.precio}</p>
                            </div>
                            
                            ${botonHTML}
                        </div>
                    </div>
                </article>
            `;
        });
    }
    catch(error){
        console.log("Error", error);
        contenedor.innerHTML= `<p class= text-red-500 text-center col-span-full fond-bold>Verificar la conexion</p>`;
    }

}

cargarTienda();

//Intentar recuperar los libros elegidos por el usuario
let reserva = JSON.parse(localStorage.getItem("contededor-inmuebles"))||[];
//Funcion para actualizar el carrito
const actualizarContador = ()=>{ 
const contador = document.getElementById("carrito-contador")
//si exiate el contador
if(contador) contador.innerText=reserva.length;
};

contenedor.addEventListener("click", (e)=>{ 
    const boton = e.target.closest(".btn-reservar");

    if (boton){
        const image = boton.dataset.imagen;
        const name= boton.dataset.nombre;
        const price= boton.dataset.precio;
        const location = boton.dataset.ubicacion;
        const type = boton.dataset.tipo;
        
        //Crear un objeto
    const inmueble = { 
        nombre: name, precio: price, imagen: image, ubicacion: location, tipo: type
    };
        //agregar al carrito
    reserva.push(inmueble);

    localStorage.setItem("contededor-inmuebles", JSON.stringify(reserva));
    actualizarContador();

    alert("Inmueble agregado al carrito!");
    }

});

actualizarContador();

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