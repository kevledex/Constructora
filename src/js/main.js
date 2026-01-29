import '../css/style.css'; 
import 'flowbite';

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