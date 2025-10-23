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

let obtenerEntrenamientos = async () => {
    const respuesta = await fetch("http://localhost:8085/api/entrenamientos");
    const entrenamientos = await respuesta.json();

    // Obtener el tbody de la tabla
    const tbody = document.getElementById("tablaEntrenamientos").querySelector("tbody");
    tbody.innerHTML = ""; // Limpiar la tabla antes de llenarla

    // Filtrar y llenar la tabla con los entrenamientos que no contienen una coma en su nombre
    entrenamientos.filter(entrenamiento => !entrenamiento.nombre.includes(',')).forEach(entrenamiento => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${entrenamiento.id}</td>
            <td>${entrenamiento.nombre}</td>
            <td>${entrenamiento.tipo}</td>
            <td>${entrenamiento.dificultad}</td>
            <td>${entrenamiento.duracion}</td>
            <td> 
                <input type="checkbox" class="entrenamiento-checkbox" data-id="${entrenamiento.id}" data-nombre="${entrenamiento.nombre}" data-duracion="${entrenamiento.duracion}" data-dificultad="${entrenamiento.dificultad}" data-tipo="${entrenamiento.tipo}"/>           
            </td>
        `;
        tbody.appendChild(fila);
    });

    // Agregar evento para guardar los entrenamientos seleccionados
    document.getElementById("añadirSeleccionados").addEventListener("click", async (event) => {
        event.preventDefault(); // Evitar el comportamiento predeterminado del botón
        const campo = mostrarSeleccionados();
        if (campo) {
            await guardarCampo(campo);
        }
    });
}

// Llamar a la función para obtener y mostrar los jugadores al cargar la página
document.addEventListener("DOMContentLoaded", obtenerEntrenamientos);

// Llamar a la función cuando la pestaña se vuelve visible
document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === 'visible') {
        obtenerEntrenamientos();
    }
});

// Función para mostrar los IDs de los entrenamientos seleccionados
function mostrarSeleccionados() {
    const checkboxes = document.querySelectorAll('.entrenamiento-checkbox:checked');
    if (checkboxes.length > 6) {
        mostrarMensajeError("Solo puedes seleccionar hasta 6 entrenamientos.");
        return null;
    }
    if (checkboxes.length < 2) {
        mostrarMensajeError("Debes seleccionar al menos 2 entrenamientos.");
        return null;
    }
    const idsSeleccionados = Array.from(checkboxes).map(checkbox => checkbox.getAttribute('data-id'));

    // Crear el objeto campo
    const nombres = Array.from(checkboxes).map(checkbox => checkbox.getAttribute('data-nombre')).join(', ');
    const duracionTotal = Array.from(checkboxes).reduce((total, checkbox) => total + parseInt(checkbox.getAttribute('data-duracion')), 0);
    
    const dificultades = Array.from(checkboxes).map(checkbox => checkbox.getAttribute('data-dificultad'));
    let dificultad = "Facil";
    if (dificultades.includes("Difícil")) {
        dificultad = "Dificil";
    } else if (dificultades.includes("Medio")) {
        dificultad = "Medio";
    }

    const tipos = Array.from(checkboxes).map(checkbox => checkbox.getAttribute('data-tipo')).join(', ');

    const campo = {
        nombre: nombres,
        descripcion: "",
        duracion: duracionTotal,
        dificultad: dificultad,
        tipo: tipos,
        objetivo: ""
    };

    return campo;
}

// Función para guardar el objeto campo en la base de datos
async function guardarCampo(campo) {
    try {
        const respuesta = await fetch("http://localhost:8085/api/guardarNuevoEntrenamiento", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(campo)
        });
        if (respuesta.ok) {
            mostrarMensajeExito();
        } else {
            mostrarMensajeError("Error al añadir el entrenamiento.");
        }
    } catch (error) {
        console.error("Error al añadir el entrenamiento:", error);
        mostrarMensajeError("Ocurrió un error al intentar añadir el entrenamiento.");
    }
}

//Crea y muestra el mensaje de exito
function mostrarMensajeExito() {
    //crear el overlay
    const overlay = document.createElement("div");
    overlay.className = 'overlay';

    //Crear el cuadro de mnsaje
    const messageBox = document.createElement("div");
    messageBox.className = 'message-box';

    //Crear el título del mensaje
    const messageTitle = document.createElement('h2');
    messageTitle.textContent = 'Sesión de Entrenamiento creada con éxito';

    //Crear el botón de OK
    const okButton = document.createElement('button');
    okButton.id = 'okButton';
    okButton.innerText = 'OK';
    okButton.addEventListener('click', function() {
        overlay.remove(); //Eliminar el overlay al hacer clic en OK 
        window.location.href = '../Diseñar Entrenamiento/TablaSesiones_Entrenamiento.html'; // Redirigir a la tabla
    });

    //Agregar el título y el botón al cuadro de mensaje
    messageBox.appendChild(messageTitle);
    messageBox.appendChild(okButton);

    //Agregar el cuadro de mensaje al overlay
    overlay.appendChild(messageBox);

    //Agregar el overlay al body del documento
    document.body.appendChild(overlay);
}

//Crea y muestra el mensaje de error
function mostrarMensajeError(mensaje) {
    //crear el overlay
    const overlay = document.createElement("div");
    overlay.className = 'overlay';

    //Crear el cuadro de mnsaje
    const messageBox = document.createElement("div");
    messageBox.className = 'message-boxError';

    //Crear el título del mensaje
    const messageTitle = document.createElement('h2');
    messageTitle.textContent = 'Error al registrar el entrenamiento';

    //Crear la lista de errores
    const messageList = document.createElement('ul');
    const errores = mensaje.split('\n').filter(error => error.trim() !== '');
    errores.forEach(error => {
        const listItem = document.createElement('li');
        listItem.innerHTML = error;
        messageList.appendChild(listItem);
    });

    //Crear el botón de OK
    const okButton = document.createElement('button');
    okButton.id = 'okButton';
    okButton.innerText = 'OK';
    okButton.addEventListener('click', function() {
        overlay.remove(); //Eliminar el overlay al hacer clic en OK
    });

    //Agregar el título y el botón al cuadro de mensaje
    messageBox.appendChild(messageTitle);
    messageBox.appendChild(messageList);
    messageBox.appendChild(okButton);

    //Agregar el cuadro de mensaje al overlay
    overlay.appendChild(messageBox);

    //Agregar el overlay al body del documento
    document.body.appendChild(overlay);
}