document.addEventListener("DOMContentLoaded", async () => {
    //Obtener el ID del entrenador desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    const respuesta = await fetch(`http://localhost:8085/api/entrenador/${id}`);
    const entrenador = await respuesta.json();

    //Llenar el formulario con los datos del entrenador
    var span = document.getElementById("nombre");
    span.textContent = entrenador.nombre;
    span = document.getElementById("cedula");
    span.textContent = entrenador.cedula;
    span = document.getElementById("sexo");
    span.textContent = entrenador.sexo;
    span = document.getElementById("edad");
    span.textContent = entrenador.edad;
    span = document.getElementById("nacionalidad");
    span.textContent = entrenador.nacionalidad;
    span = document.getElementById("correo");
    span.textContent = entrenador.correo;
    span = document.getElementById("telefono");
    span.textContent = entrenador.telefono;
    span = document.getElementById("rol");
    span.textContent = entrenador.rol;
    span = document.getElementById("sueldo");
    span.textContent = entrenador.sueldo;
    span = document.getElementById("estadolaboral");
    span.textContent = entrenador.stlaboral;
    span = document.getElementById("experiencia");
    span.textContent = entrenador.experiencia;
    span = document.getElementById("stContrato");
    span.textContent = entrenador.stcontrato;
    span = document.getElementById("partDirigido");
    span.textContent = entrenador.partdirigido;
    span = document.getElementById("equipoDirigido");
    span.textContent = entrenador.entrenandoEquipo;

    span = document.getElementById("username");
    span.textContent = entrenador.username ? entrenador.username : "No registrado";
    span = document.getElementById("password");
    span.textContent = entrenador.password ? "*".repeat(entrenador.password.length) : "No registrado";

    //Funcionalidad de mostrar/ocultar la contraseña
    const togglePassword = document.getElementById("togglePassword");
    const passwordSpan = document.getElementById("password");
    
    if(passwordSpan.textContent === "No registrado"){
        togglePassword.style.display = "none";
    }else{
        togglePassword.addEventListener("click", () => {
            if(togglePassword.classList.contains("fa-eye-slash")){
                togglePassword.classList.remove("fa-eye-slash");
                togglePassword.classList.add("fa-eye");
                passwordSpan.textContent = entrenador.password;
            }else{
                togglePassword.classList.remove("fa-eye");
                togglePassword.classList.add("fa-eye-slash");
                passwordSpan.textContent = "*".repeat(entrenador.password.length);
            }
        });
    }
})

function volver(){
    window.history.back(); //Regresa a la página anterior
}