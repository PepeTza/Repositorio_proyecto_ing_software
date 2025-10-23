document.addEventListener("DOMContentLoaded", async () => {
    //Obtener el ID del administrador desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    const respuesta = await fetch(`http://localhost:8085/api/administrador/${id}`);
    const admnin = await respuesta.json();

    //Llenar el formulario con los datos del administrador
    var span = document.getElementById("nombre");
    span.textContent = admnin.nombre;
    span = document.getElementById("cedula");
    span.textContent = admnin.cedula;
    span = document.getElementById("sexo");
    span.textContent = admnin.sexo;
    span = document.getElementById("edad");
    span.textContent = admnin.edad;
    span = document.getElementById("nacionalidad");
    span.textContent = admnin.nacionalidad;
    span = document.getElementById("correo");
    span.textContent = admnin.correo;
    span = document.getElementById("telefono");
    span.textContent = admnin.telefono;
    span = document.getElementById("rol");
    span.textContent = admnin.rol;
    span = document.getElementById("sueldo");
    span.textContent = admnin.sueldo;
    span = document.getElementById("estadolaboral");
    span.textContent = admnin.stlaboral;
    span = document.getElementById("experiencia");
    span.textContent = admnin.experiencia;
    span = document.getElementById("especializacion");
    span.textContent = admnin.especializacion;
    
    span = document.getElementById("username");
    span.textContent = admnin.username ? admnin.username : "No registrado";
    span = document.getElementById("password");
    span.textContent = admnin.password ? "*".repeat(admnin.password.length) : "No registrado";

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
                passwordSpan.textContent = admnin.password;
            } else {
                togglePassword.classList.remove("fa-eye");
                togglePassword.classList.add("fa-eye-slash");
                passwordSpan.textContent = "*".repeat(admnin.password.length);
            }
        });
    }
})

function volver(){
    window.history.back(); //Regresa a la página anterior
}