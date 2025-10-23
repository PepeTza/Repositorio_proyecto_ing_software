document.addEventListener("DOMContentLoaded", async () => {
    //Obtener el ID del personal desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    const respuesta = await fetch(`http://localhost:8085/api/personal/${id}`);
    const admnin = await respuesta.json();

    //Llenar el formulario con los datos del personal
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
})

function volver(){
    window.history.back(); //Regresa a la página anterior
}