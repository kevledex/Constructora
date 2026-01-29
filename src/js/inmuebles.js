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
        //Limpiar el ocntenedor
        contenedor.innerHTML=" ";
        //Recorrer la lista de inmuebles
        datos.forEach((inmuebles) => {
            contenedor.innerHTML += `
                <article class="group relative bg-[#242424] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300 border border-gray-800 hover:border-blue-500/50 flex flex-col h-full">
                    
                    <div class="relative h-56 overflow-hidden">
                        <span class="absolute top-3 left-3 z-10 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-wider">
                            ${inmuebles.tipo}
                        </span>
                        
                        <img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
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

                        <div class="mt-auto pt-4 border-t border-gray-700 flex items-center justify-between">
                            <div>
                                <p class="text-xs text-gray-500 font-semibold uppercase">Precio desde</p>
                                <p class="text-2xl font-bold text-white">$ ${inmuebles.precio}</p>
                            </div>
                            
                            <button 
                                data-titulo="${inmuebles.nombre}" 
                                data-precio="${inmuebles.precio}"
                                class="btn-agregar group/btn flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-bold hover:bg-blue-600 hover:text-white transition-all active:scale-95">
                                <span>Reservar</span>
                                <svg class="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </button>
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

//localStore
//Intetar recuperar los libros elegidos por el usuario
let carrito = JSON.parse(localStorage.getItem("contededor_libros"))||[];
//Funcion para actualizar el carrito
const actualizarContador = ()=>{ 
const contador = document.getElementById("carrito_contador")
//si exiate el contador
if(contador) contador.innerText=carrito.length;
};

contenedor.addEventListener("click", (e)=>{ 
    const boton = e.target.closest(".btn-agregar");

    if (boton){
        const title= boton.dataset.titulo;
        const price= boton.dataset.precio;

        //Crear un objeto
    const libro = { 
        titulo:title, precio:price
    };


        //agregar al carrito
    carrito.push(libro);

    

    localStorage.setItem("carrito_libros", JSON.stringify(carrito));
    actualizarContador();
    }

});

actualizarContador();



