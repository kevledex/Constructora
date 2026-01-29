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
                <div class="p-8 border rounded-lg dark:border-gray-700 hover:border-blue-500 transition-colors group bg-[#1a1a1a] shadow-xl">

                    <div class="relative overflow-hidden rounded-lg h-64 mb-4 bg-slate-700">
                        <img class="object-contain w-full h-full group-hover:scale-110 transition-transform duration-500" 
                            src="${inmuebles.imagen}" alt="${inmuebles.nombre}">
                    </div>

                    <div class="flex flex-col justify-between">
                        <div>
                            <h1 class="font-bold text-white uppercase text-[25px] line-clamp-1 mb-4">${inmuebles.nombre}</h1>

                            <h2 class="font-bold text-white uppercase text-[14px] line-clamp-1 mb-4">PRECIO INICIAL:
                            <span class="text-[23px]"> $ ${inmuebles.precio}</span></h2>

                            <p class="font-bold text-white uppercase text-[14px] line-clamp-1 mb-4">UBICACIÓN: 
                            <span class="text-[13px] bg-blue-700 text-white px-2 py-0.5 rounded-full font-bold  tracking-tighter">
                                ${inmuebles.ubicacion}
                            </span></p>
                        
                            <p class="font-bold text-white uppercase text-[14px] line-clamp-1 mb-4">TIPO: 
                            <span class="text-[14px] bg-blue-500 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">
                                ${inmuebles.tipo}
                            </span></p>
                        
                        
                        <div class="flex items-center justify-between mt-6">
                            
                            <button 
                            data-titulo="${inmuebles.nombre}" 
                            data-precio="${inmuebles.precio}"
                            class="btn-agregar font-bold bg-gray-600 hover:bg-gray-500 text-white p-2 rounded-lg transition-all active:scale-95">
                                RESERVAR
                            </button>
                        </div>
                    </div>
                </div>
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



