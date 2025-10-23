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

// Función para obtener el ID del jugador de la URL
function getJugadorId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Función para obtener los detalles del jugador
async function obtenerDetallesJugador() {
    const id = getJugadorId();
    if (!id) {
        alert("ID de jugador no encontrado.");
        return;
    }

    try {
        const respuesta = await fetch(`http://localhost:8085/api/jugador/${id}`);
        if (!respuesta.ok) {
            throw new Error("Error al obtener los detalles del jugador.");
        }
        const jugador = await respuesta.json();

        // Mostrar los detalles del jugador en la página
        document.getElementById("nombre").textContent = jugador.nombre;
        document.getElementById("cedula").textContent = jugador.cedula;
        document.getElementById("posicion").textContent = jugador.posicion;
        document.getElementById("edad").textContent = jugador.edad;
        document.getElementById("nacionalidad").textContent = jugador.nacionalidad;
        document.getElementById("dorsal").textContent = jugador.dorsal;
        document.getElementById("peso").textContent = jugador.peso;
        document.getElementById("altura").textContent = jugador.altura;
        document.getElementById("tarjetaRoja").textContent = jugador.tarjetaRoja;
        document.getElementById("tarjetaAmarilla").textContent = jugador.tarjetaAmarilla;
        document.getElementById("titulos").textContent = jugador.titulos;
    } catch (error) {
        console.error("Error al obtener los detalles del jugador:", error);
        alert("Ocurrió un error al obtener los detalles del jugador.");
    }
}

// Llamar a la función para obtener los detalles del jugador al cargar la página
document.addEventListener("DOMContentLoaded", obtenerDetallesJugador);