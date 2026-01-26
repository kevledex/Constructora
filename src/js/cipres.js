import '../css/style.css'; 
import 'flowbite';

const btn = document.getElementById('btn-contacto');

btn.addEventListener('mouseenter', () => {
    btn.style.backgroundColor = "black";
    btn.style.color = "white";
});

// Evento cuando el cursor sale del botón
btn.addEventListener('mouseleave', () => {
    btn.style.backgroundColor = "white";
    btn.style.color = "black";
});