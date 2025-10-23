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
                <i onClick="consultarEntrenamiento(${entrenamiento.id})" class="material-icons button editar">edit</i> 
                <i onClick="eliminarEntrenamiento(${entrenamiento.id})" class="material-icons button eliminar">delete</i>
            </td>
        `;
        tbody.appendChild(fila);
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

function consultarEntrenamiento(id) {
    window.location.href = `../Modificar Entrenamiento/Modificar_Entrenamiento.html?id=${id}`;
}

//Funcion para eliminar jugador
async function eliminarEntrenamiento(id) {
    if (await mostrarMensajeConfirmacion()) {
        try {
            const respuesta = await fetch(`http://localhost:8085/api/eliminarEntrenamiento/${id}`, {
                method: 'DELETE'
            });
            if (respuesta.ok) {
                mostrarMensajeExito();
                obtenerEntrenamientos(); // Actualizar la tabla después de eliminar
            } else {
                alert("Error al eliminar el entrenamiento.");
            }
        } catch (error) {
            console.error("Error al eliminar el entrenamiento:", error);
            mostrarMensajeError("Error al eliminar el jugador");
        }
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
    messageTitle.textContent = 'Entrenamiento eliminado exitosamente';

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
        messageTitle.textContent = '¿Estás seguro de borrar este entrenamiento?';

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
    messageTitle.textContent = 'Error al eliminar el Entrenamiento';

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