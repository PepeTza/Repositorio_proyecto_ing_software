document.addEventListener("DOMContentLoaded", async () => {
    // Obtener el ID del implemento desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const respuesta = await fetch(`http://localhost:8085/api/usuario/${id}`);
    const usuario = await respuesta.json();

    // Llenar el formulario con los datos del usuario
    var span = document.getElementById("nombre");
    span.textContent = usuario.nombre;
    span=document.getElementById("rol");
    span.textContent = usuario.rol;
    span=document.getElementById("correo");
    span.textContent = usuario.correo;
    span=document.getElementById("telefono");
    span.textContent = usuario.telefono;
    span=document.getElementById("username");
    span.textContent = usuario.username;
    span=document.getElementById("password");
    span.textContent = "*".repeat(usuario.password.length); //Muestra puntos en lugar de la contraseña

    //Funcionalidad para mostrar/ocultar la contraseña
    const togglePassword = document.getElementById("togglePassword");
    const passwordSpan = document.getElementById("password");
    togglePassword.addEventListener('click', () => {
        const isPasswordVisible = passwordSpan.textContent === usuario.password;
        if(isPasswordVisible){
            passwordSpan.textContent = "*".repeat(usuario.password.length); //Muestra puntos en lugar de la contraseña
            togglePassword.classList.remove("fa-eye"); //Cambia a ícono de ojo cerrado
            togglePassword.classList.add("fa-eye-slash"); //Cambia a ícono de ojo abierto
        }else{
            passwordSpan.textContent = usuario.password; //Muestra la contraseña
            togglePassword.classList.remove("fa-eye-slash"); //Cambia a ícono de ojo abierto
            togglePassword.classList.add("fa-eye"); //Cambia a ícono de ojo cerrado
        }
    });

});

function volver() {
window.history.back(); // Regresar a la página anterior
}
