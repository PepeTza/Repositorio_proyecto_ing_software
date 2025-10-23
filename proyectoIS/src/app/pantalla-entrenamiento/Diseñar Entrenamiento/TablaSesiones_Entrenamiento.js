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

// Función para validar el formato de la fecha
function validarFecha(fecha) {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(202[5-9]|203[0-5])$/;
    return regex.test(fecha);
}

let obtenerEntrenamientos = async () => {
    const respuesta = await fetch("http://localhost:8085/api/entrenamientos");
    const entrenamientos = await respuesta.json();

    // Obtener el tbody de la tabla
    const tbody = document.getElementById("tablaEntrenamientos").querySelector("tbody");
    tbody.innerHTML = ""; // Limpiar la tabla antes de llenarla

    // Filtrar y llenar la tabla con los entrenamientos que contienen una coma en su nombre
    entrenamientos.filter(entrenamiento => entrenamiento.nombre.includes(',')).forEach(entrenamiento => {
        const fila = document.createElement("tr");
        const fecha = entrenamiento.descripcion ? entrenamiento.descripcion : `<input type="text" class="fecha-input" placeholder="DD/MM/AAAA" data-id="${entrenamiento.id}" />`;
        fila.innerHTML = `
            <td>${fecha}</td>
            <td>${entrenamiento.nombre}</td>
            <td>${entrenamiento.tipo}</td>
            <td>${entrenamiento.dificultad}</td>
            <td>${entrenamiento.duracion}</td>
            <td>  
                <i onClick="eliminarEntrenamiento(${entrenamiento.id})" class="material-icons button eliminar">delete</i>
            </td>
        `;
        tbody.appendChild(fila);
    });

    // Agregar evento para guardar la fecha en la base de datos al presionar Enter
    document.querySelectorAll('.fecha-input').forEach(input => {
        input.addEventListener('keypress', async (event) => {
            if (event.key === 'Enter') {
                const entrenamientoId = input.getAttribute('data-id');
                const fecha = input.value;
                if (validarFecha(fecha)) {
                    await guardarFecha(entrenamientoId, fecha);
                    input.parentElement.innerHTML = fecha; // Actualizar la celda con la fecha introducida
                } else {
                    mostrarMensajeError("Por favor, use el formato DD/MM/AAAA y asegúrese de que el año esté entre 2025 y 2035.","Formato de fecha inválido");
                }
            }
        });
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

//Funcion para eliminar jugador
async function eliminarEntrenamiento(id) {
    //const confirmacion = confirm("¿Estás seguro de que deseas eliminar este Entrenamiento?");
    if (await mostrarMensajeConfirmacion()) {
        try {
            const respuesta = await fetch(`http://localhost:8085/api/eliminarEntrenamiento/${id}`, {
                method: 'DELETE'
            });
            if (respuesta.ok) {
                mostrarMensajeExito("Entrenamiento eliminado con éxito.");
                obtenerEntrenamientos(); // Actualizar la tabla después de eliminar
            } else {
                mostrarMensajeError("Error al eliminar el entrenamiento.","Error en la eliminación");
            }
        } catch (error) {
            console.error("Error al eliminar el entrenamiento:", error);
            mostrarMensajeError("Ocurrió un error al intentar eliminar el entrenamiento.","Error al eliminar la rutina de entrenamiento");
        }
    }
}

// Función para guardar la fecha en la base de datos
async function guardarFecha(id, fecha) {
    try {
        const respuesta = await fetch(`http://localhost:8085/api/actualizarFechaEntrenamiento/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ descripcion: fecha })
        });
        if (respuesta.ok) {
            mostrarMensajeExito("Fecha guardada con éxito.");
        } else {
            mostrarMensajeError("Error al guardar la fecha.","Error en la fecha");
        }
    } catch (error) {
        console.error("Error al guardar la fecha:", error);
        mostrarMensajeError("Ocurrió un error al intentar guardar la fecha.","Error al guardar la fecha");
    }
}

//Crea y muestra el mensaje de exito
function mostrarMensajeExito(mensaje) {
    //crear el overlay
    const overlay = document.createElement("div");
    overlay.className = 'overlay';

    //Crear el cuadro de mnsaje
    const messageBox = document.createElement("div");
    messageBox.className = 'message-box';

    //Crear el título del mensaje
    const messageTitle = document.createElement('h2');
    messageTitle.textContent = mensaje;

    //Crear el botón de OK
    const okButton = document.createElement('button');
    okButton.id = 'okButton';
    okButton.innerText = 'OK';
    okButton.addEventListener('click', function() {
        overlay.remove(); //Eliminar el overlay al hacer clic en OK 
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
function mostrarMensajeError(mensaje,titulo) {
    //crear el overlay
    const overlay = document.createElement("div");
    overlay.className = 'overlay';

    //Crear el cuadro de mnsaje
    const messageBox = document.createElement("div");
    messageBox.className = 'message-boxError';

    //Crear el título del mensaje
    const messageTitle = document.createElement('h2');
    messageTitle.textContent = titulo;

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

//Crea y muesta mensaje de confirmación de eliminación
function mostrarMensajeConfirmacion() {
    return new Promise((resolve) => {
        //crear el overlay
        const overlay = document.createElement("div");
        overlay.className = 'overlay';

        //Crear el cuadro de mnsaje
        const messageBox = document.createElement("div");
        messageBox.className = 'message-boxConfirmacion';

        //Crear el título del mensaje
        const messageTitle = document.createElement('h2');
        messageTitle.textContent = '¿Estás seguro de que deseas eliminar esta rutina de Entrenamiento?';

        //Crear los botones de Sí y No
        const yesButton = document.createElement("button");
        yesButton.setAttribute("id", "btn-1");
        yesButton.innerText = "Sí";

        const noButton = document.createElement("button");
        noButton.setAttribute("id", "btn-2");
        noButton.innerText = "No";

        //Agregar el título y los botones al cuadro de mensaje
        messageBox.appendChild(messageTitle);
        messageBox.appendChild(yesButton);
        messageBox.appendChild(noButton);

        //Agregar el cuadro de mensaje al overlay
        overlay.appendChild(messageBox);

        //Agregar el overlay al body del documento
        document.body.appendChild(overlay);

        //Agregar el evento click al botón de Sí
        yesButton.addEventListener('click', () => {
            overlay.remove(); //Eliminar el overlay al hacer clic en Sí
            resolve(true); //Resolver la promesa con true
        });

        //Agregar el evento click al botón de No
        noButton.addEventListener('click', () => {
            overlay.remove(); //Eliminar el overlay al hacer clic en No
            resolve(false); //Resolver la promesa con false
        });
    });
}