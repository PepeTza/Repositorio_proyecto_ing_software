document.addEventListener('DOMContentLoaded',()=>{
    const userRol = localStorage.getItem('userRol');

    if(userRol === "Entrenador"){
        //Ocultar los enlaces de "Empleados" y "Usuarios"
        document.querySelectorAll('.nav-item').forEach(item => {
            if(item.textContent.includes('Empleados') || item.textContent.includes('Usuarios')){
                item.style.display = 'none';
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    // Obtener el ID del implemento desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

            const respuesta = await fetch(`http://localhost:8085/api/implementos/${id}`);
            const implemento = await respuesta.json();

            // Llenar el formulario con los datos del implemento
            var span = document.getElementById("nombre");
            span.textContent = implemento.nombre;
            span=document.getElementById("tipo");
            span.textContent = implemento.tipo;
            span=document.getElementById("material");
            span.textContent = implemento.material;
            span=document.getElementById("marca");
            span.textContent = implemento.marca;
            span=document.getElementById("cantidad");
            span.textContent = implemento.cantidad;
        
});

function volver() {
    window.history.back(); // Regresar a la página anterior
}
