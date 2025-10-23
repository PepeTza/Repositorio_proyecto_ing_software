async function cargarDetallesEntrenamiento() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const respuesta = await fetch(`http://localhost:8085/api/obtenerEntrenamiento/${id}`);
    const entrenamiento = await respuesta.json();

    if (entrenamiento) {
        document.getElementById("nombre").value = entrenamiento.nombre;
        document.getElementById("descripcion").value = entrenamiento.descripcion;
        document.getElementById("duracion").value = entrenamiento.duracion;
        document.getElementById("dificultad").value = entrenamiento.dificultad;
        document.getElementById("tipo").value = entrenamiento.tipo;
        document.getElementById("objetivo").value = entrenamiento.objetivo;
    } else {
        alert("Entrenamiento no encontrado");
    }
}


async function guardarCambios() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const entrenamiento = {
        id: id,
        nombre: document.getElementById("nombre").value,
        descripcion: document.getElementById("descripcion").value,
        duracion: parseInt(document.getElementById("duracion").value),
        dificultad: document.getElementById("dificultad").value,
        tipo: document.getElementById("tipo").value,
        objetivo: document.getElementById("objetivo").value
    };

    // Validaciones
    let mensajeError = "";
    let valid = true;

    // Validar nombre
    if (!entrenamiento.nombre) {
        mensajeError += "El nombre no puede estar vacío.\n";
        valid = false;
    }

    // Validar descripción
    if (!entrenamiento.descripcion) {
        mensajeError += "La descripción no puede estar vacía.\n";
        valid = false;
    }

    // Validar duración
    if (isNaN(entrenamiento.duracion) || entrenamiento.duracion < 5 || entrenamiento.duracion > 30) {
        mensajeError += "La duración debe estar entre 5 min y 30 min y no puede estar vacía.\n";
        valid = false;
    }

    // Validar tipo
    if (!entrenamiento.tipo) {
        mensajeError += "El tipo no puede estar vacío.\n";
        valid = false;
    }

    // Validar objetivo
    if (!entrenamiento.objetivo) {
        mensajeError += "El objetivo no puede estar vacío.\n";
        valid = false;
    }

    // Si alguna validación falla, mostrar el mensaje de error y evitar el registro
    if (!valid) {
        alert(mensajeError);
        return; // Salir de la función sin registrar
    }

    // Si todas las validaciones son correctas, proceder a actualizar el entrenamiento
    
    if(await mostrarMensajeConfirmacion()){

        try {
            const respuesta = await fetch(`http://localhost:8085/api/guardarEntrenamientos`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(entrenamiento),
            });
    
            if (respuesta.ok) {
                mostrarMensajeExito();
            } else {
                mostrarMensajeError('Ha ocurrido un error al modificar los datos del entrenamiento.');
            }
        } catch (error) {
            console.error("Error en la petición:", error);
            alert("Ocurrió un error al intentar actualizar el entrenamiento.");
        }

    }
    else{
        window.location.href = "../Tabla Entrenamiento/Tabla_Entrenamiento.html";
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
    messageTitle.textContent = 'Se han modificado los datos del entrenamiento con éxito.';

    //Crear el botón de OK
    const okButton = document.createElement('button');
    okButton.id = 'okButton';
    okButton.innerText = 'OK';
    okButton.addEventListener('click', function() {
        overlay.remove(); //Eliminar el overlay al hacer clic en OK 
        window.location.href = "../Tabla Entrenamiento/Tabla_Entrenamiento.html"; // Redirigir a la tabla de entrenamientos
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
    messageTitle.textContent = 'Error al modificar los datos de entrenamiento';

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

//Crea y muesta mensaje de confirmación de editar
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
        messageTitle.textContent = '¿Estás seguro de modificar este entrenamiento?';

        //Crear el contenedor de los botones
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';

        //Crear los botones de Sí y No
        const yesButton = document.createElement("button");
        yesButton.setAttribute("id", "btn-1");
        yesButton.innerText = "Sí";

        const noButton = document.createElement("button");
        noButton.setAttribute("id", "btn-2");
        noButton.innerText = "No";

        //Agregar los botones al contenedor
        buttonContainer.appendChild(yesButton);
        buttonContainer.appendChild(noButton);

        //Agregar el título y los botones al cuadro de mensaje
        messageBox.appendChild(messageTitle);
        messageBox.appendChild(buttonContainer);

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


/*
async function guardarCambios() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const entrenamiento = {
        id: id,
        nombre: document.getElementById("nombre").value,
        descripcion: document.getElementById("descripcion").value,
        duracion: parseInt(document.getElementById("duracion").value),
        dificultad: document.getElementById("dificultad").value,
        tipo: document.getElementById("tipo").value,
        objetivo: document.getElementById("objetivo").value
    };

    const respuesta = await fetch(`http://localhost:8081/api/guardarEntrenamientos`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(entrenamiento)
    });

    if (respuesta.ok) {
        alert("Entrenamiento actualizado con éxito");
        window.location.href = "tablaEntrenmiento.html"; // Redirigir a la tabla de entrenamientos
    } else {
        alert("Error al actualizar el entrenamiento");
    }
}
*/

// Llamar a la función para cargar los detalles del entrenamiento al cargar la página
document.addEventListener("DOMContentLoaded", cargarDetallesEntrenamiento);

function volver() {
    window.history.back(); // Regresar a la página anterior
}

// desde aqui comienza la restrinccion del nombre

// Restringir la entrada de caracteres en el campo de nombre
let nombreInput = document.getElementById("nombre");
let nombreEntrenamientoError = document.getElementById("nombreEntrenamientoError"); // Asegúrate de tener este elemento en tu HTML

// Validar en el evento blur
nombreInput.addEventListener("blur", function() {
    const nombreValue = nombreInput.value.trim(); // Obtener el valor y eliminar espacios en blanco

    // Verificar si el campo está vacío o tiene menos de 2 caracteres
    if (nombreValue.length < 3) {
        nombreEntrenamientoError.style.display = "inline"; // Mostrar mensaje de error
    } else {
        nombreEntrenamientoError.style.display = "none"; // Ocultar mensaje de error
    }
});

// Limpiar el mensaje de error en el evento focus
nombreInput.addEventListener("focus", function() {
    nombreEntrenamientoError.style.display = "none"; // Ocultar mensaje de error al enfocar el campo
});

// Restringir la entrada de caracteres permitidos
nombreInput.addEventListener("keypress", function(event) {
    const charCode = event.charCode;

    // Permitir solo letras (a-z, A-Z) y espacios (charCode 32)
    if ((charCode < 65 || charCode > 90) && // A-Z
        (charCode < 97 || charCode > 122) && // a-z
        charCode !== 32) { // espacio
        event.preventDefault(); // Evitar la entrada de caracteres no permitidos
    }

    // Verificar la longitud máxima
    if (nombreInput.value.length >= 25) {
        event.preventDefault(); // Evitar que se escriban más caracteres
    }
});

//Hasta aqui se valida el nombre 


// desde aqui comienza la restrinccion de la descripcion de entrenamiento

// Restringir la entrada de caracteres en el campo de descripcion
let descripcionInput = document.getElementById("descripcion");
let descripcionEntrenamientoError = document.getElementById("descripcionEntrenamientoError"); // Asegúrate de tener este elemento en tu HTML

// Validar en el evento blur
descripcionInput.addEventListener("blur", function() {
    const descripcionValue = descripcionInput.value.trim(); // Obtener el valor y eliminar espacios en blanco

    // Verificar si el campo está vacío o tiene menos de 2 caracteres
    if (descripcionValue.length < 3) {
        descripcionEntrenamientoError.style.display = "inline"; // Mostrar mensaje de error
    } else {
        descripcionEntrenamientoError.style.display = "none"; // Ocultar mensaje de error
    }
});

// Limpiar el mensaje de error en el evento focus
descripcionInput.addEventListener("focus", function() {
    descripcionEntrenamientoError.style.display = "none"; // Ocultar mensaje de error al enfocar el campo
});

// Restringir la entrada de caracteres permitidos
descripcionInput.addEventListener("keypress", function(event) {
    const charCode = event.charCode;

    // Permitir solo letras (a-z, A-Z) y espacios (charCode 32)
    if ((charCode < 65 || charCode > 90) && // A-Z
        (charCode < 97 || charCode > 122) && // a-z
        charCode !== 32) { // espacio
        event.preventDefault(); // Evitar la entrada de caracteres no permitidos
    }

    // Verificar la longitud máxima
    if (descripcionInput.value.length >= 50) {
        event.preventDefault(); // Evitar que se escriban más caracteres
    }
});

//Hasta aqui se valida la descripcion 


// Validación del campo de duración
let duracionInput = document.getElementById("duracion");
let duracionError = document.getElementById("duracionError");

// Validar en el evento blur
duracionInput.addEventListener("blur", function() {
    const duracionValue = parseInt(duracionInput.value);

    // Verificar si el valor es un número y está en el rango duración
    if (isNaN(duracionValue) || duracionValue < 5 || duracionValue > 30) {
        duracionError.style.display = "inline"; // Mostrar mensaje de error
    } else {
        duracionError.style.display = "none"; // Ocultar mensaje de error
    }
});


// Restringir la entrada de caracteres en el campo de tipo

let tipoInput = document.getElementById("tipo");
let tipoEntrenamientoError = document.getElementById("tipoEntrenamientoError"); // Asegúrate de tener este elemento en tu HTML

// Validar en el evento blur
tipoInput.addEventListener("blur", function() {
    const tipoValue = tipoInput.value.trim(); // Obtener el valor y eliminar espacios en blanco

    // Verificar si el campo está vacío o tiene menos de 2 caracteres
    if (tipoValue.length < 2) {
        tipoEntrenamientoError.style.display = "inline"; // Mostrar mensaje de error
    } else {
        tipoEntrenamientoError.style.display = "none"; // Ocultar mensaje de error
    }
});

// Limpiar el mensaje de error en el evento focus
tipoInput.addEventListener("focus", function() {
    tipoEntrenamientoError.style.display = "none"; // Ocultar mensaje de error al enfocar el campo
});

// Restringir la entrada de caracteres permitidos
tipoInput.addEventListener("keypress", function(event) {
    const charCode = event.charCode;

    // Permitir solo letras (a-z, A-Z) y espacios (charCode 32)
    if ((charCode < 65 || charCode > 90) && // A-Z
        (charCode < 97 || charCode > 122) && // a-z
        charCode !== 32) { // espacio
        event.preventDefault(); // Evitar la entrada de caracteres no permitidos
    }

    // Verificar la longitud máxima
    if (tipoInput.value.length >= 10) {
        event.preventDefault(); // Evitar que se escriban más caracteres
    }
});

//Hasta aqui se valida el tipo 


// Restringir la entrada de caracteres en el campo del obejtivo

let objetivoInput = document.getElementById("objetivo");
let objetivoEntrenamientoError = document.getElementById("objetivoEntrenamientoError"); // Asegúrate de tener este elemento en tu HTML

// Validar en el evento blur
objetivoInput.addEventListener("blur", function() {
    const objetivoValue = objetivoInput.value.trim(); // Obtener el valor y eliminar espacios en blanco

    // Verificar si el campo está vacío o tiene menos de 2 caracteres
    if (objetivoValue.length < 2) {
        objetivoEntrenamientoError.style.display = "inline"; // Mostrar mensaje de error
    } else {
        objetivoEntrenamientoError.style.display = "none"; // Ocultar mensaje de error
    }
});

// Limpiar el mensaje de error en el evento focus
objetivoInput.addEventListener("focus", function() {
    nombreError.style.display = "none"; // Ocultar mensaje de error al enfocar el campo
});

// Restringir la entrada de caracteres permitidos
objetivoInput.addEventListener("keypress", function(event) {
    const charCode = event.charCode;

    // Permitir solo letras (a-z, A-Z) y espacios (charCode 32)
    if ((charCode < 65 || charCode > 90) && // A-Z
        (charCode < 97 || charCode > 122) && // a-z
        charCode !== 32) { // espacio
        event.preventDefault(); // Evitar la entrada de caracteres no permitidos
    }

    // Verificar la longitud máxima
    if (objetivoInput.value.length >= 50) {
        event.preventDefault(); // Evitar que se escriban más caracteres
    }
});

//Hasta aqui se valida el objetivo 