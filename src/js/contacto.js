import '../css/style.css'; 
import 'flowbite';

const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const email = document.getElementById("email");
const telefono = document.getElementById("telefono");
const mensaje = document.getElementById("mensaje");
const formulario = document.getElementById("formulario");

//Expresiones regulares para la validacion
const patrones = {
    usuario: /^[a-zA-ZÀ-ÿ\s]{3,16}$/, // Letras y espacios (3-16 caracteres)
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // Formato email
  telefono: /^\+?[\d\s-]{10,10}$/, 
  mensaje: /^[\s\S]{10,500}$/, 
}

//Función para habilitar el mensaje de error
const mostrarError = (input, idError) => {
    const mensajeError = document.getElementById(idError);

    //Si el mensaje existe le quitamos la clase hidden para que sea visible
    if(mensajeError) mensajeError.classList.remove("hidden");
    input.classList.remove("border-green-500");
    input.classList.add("border-red-500", "ring-red-500", "focus:ring-red-500");
}

//Funcion para eliminar el error
const eliminarError = (input, idError) => {
    const mensajeError = document.getElementById(idError);
    if(mensajeError) mensajeError.classList.add("hidden");
    input.classList.remove("border-red-500", "ring-red-500", "focus:ring-red-500");
    input.classList.add("border-green-500");
}

//Manejar el evento principal que es la validacion
formulario.addEventListener("submit", (e) => {
    e.preventDefault(); //Evita que la página se actualice
    let formularioValido = true;

    //Validacion del nombre
    if(!patrones.usuario.test(nombre.value)){
        mostrarError(nombre, "error-nombre");
        formularioValido = false;
    } else {
        eliminarError(nombre, "error-nombre");
    }
    //Validacion del apellido
    if(!patrones.usuario.test(apellido.value)){
        mostrarError(apellido, "error-apellido");
        formularioValido = false;
    } else {
        eliminarError(apellido, "error-apellido");
    }
    //Validacion del email
    if(!patrones.correo.test(email.value)){
        mostrarError(email, "error-email");
        formularioValido = false;
    } else {
        eliminarError(email, "error-email");
    }
    //Validacion del telefono
    if(!patrones.telefono.test(telefono.value)){
        mostrarError(telefono, "error-telefono");
        formularioValido = false;
    } else {
        eliminarError(telefono, "error-telefono");
    }
    //Validacion del mensaje
    if(!patrones.mensaje.test(mensaje.value)){
        mostrarError(mensaje, "error-mensaje");
        formularioValido = false;
    } else {
        eliminarError(mensaje, "error-mensaje");
    }
    if(formularioValido){
        alert(`${nombre.value}, tu formulario ha sido enviado!`);
        //limpiar los inputs
        formulario.reset();
    } else {
        e.preventDefault();
        alert("Datos incorrectos")
    }
});

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

