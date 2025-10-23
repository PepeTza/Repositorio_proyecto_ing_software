let boton = document.getElementById("btnRegistrarEntrenamiento");

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

// Limpiar el mensaje de error en el evento focus
duracionInput.addEventListener("focus", function() {
    duracionError.style.display = "none"; // Ocultar mensaje de error al enfocar el campo
});
//Hasta aquí la validación de duración

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
    objetivoEntrenamientoError.style.display = "none"; // Ocultar mensaje de error al enfocar el campo
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

boton.addEventListener("click", async evento => {
    evento.preventDefault(); // Evitar el envío del formulario

    // Recoger los datos del formulario
    let campos = {
        nombre: document.getElementById("nombre").value,
        descripcion: document.getElementById("descripcion").value,
        duracion: parseInt(document.getElementById("duracion").value),
        dificultad: document.getElementById("dificultad").value,
        tipo: document.getElementById("tipo").value,
        objetivo: document.getElementById("objetivo").value
    };

    /*console.log("descripcion: "+document.getElementById("descripcion").value.length)
    console.log("objetivo: "+document.getElementById("objetivo").value.length)

    if(document.getElementById("descripcion").value.length > 0){
        campos.descripcion = document.getElementById("descripcion").value;
    }else{
        campos.descripcion = "";
    }

    if(document.getElementById("objetivo").value.length > 0){
        objetivo: document.getElementById("objetivo").value;
    }else{
        campos.objetivo = "";
    }*/

    // Validaciones
    let mensajeError = "";
    let valid = true;

    console.log("mensajeError: "+ mensajeError);
    
    // Validar nombre
    if (!campos.nombre) {
        mensajeError += "El <span class='campo-errado'>Nombre</span> no puede estar vacío.\n";
        valid = false;
    }
    console.log("mensajeError: "+ mensajeError);

    // Validar duración
    if (isNaN(campos.duracion) || campos.duracion < 5 || campos.duracion > 30) {
        mensajeError += "La <span class='campo-errado'>Duración</span> debe estar entre 5 y 30 minutos.\n";
        valid = false;
    }
    console.log("mensajeError: "+ mensajeError);

    console.log("campos.descripcion: "+campos.descripcion);
    console.log("campos.descripcion: "+campos.descripcion==="");
    // Validar descripción
    if (!campos.descripcion) {
        mensajeError += "La <span class='campo-errado'>Descripción</span> no puede estar vacía.\n";
        valid = false;
    }
    console.log("mensajeError: "+ mensajeError);

    // Validar tipo
    if (!campos.tipo) {
        mensajeError += "El <span class='campo-errado'>Tipo</span> de ejercicio no puede estar vacío.\n";
        valid = false;
    }
    console.log("mensajeError: "+ mensajeError);

    console.log("campos.objetivo: "+campos.objetivo);
    // Validar objetivo
    if (!campos.objetivo) {
        mensajeError += "El <span class='campo-errado'>Objetivo</span> no puede estar vacío.\n";
        valid = false;
    }
    console.log("mensajeError: "+ mensajeError);

    // Si alguna validación falla, mostrar el mensaje de error y evitar el registro
    if (!valid) {
        mostrarMensajeError(mensajeError);
        return; // Salir de la función sin registrar
    }

    try {
        const peticion = await fetch("http://localhost:8085/api/guardarNuevoEntrenamiento", {
            method: 'POST',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(campos) 
        });

        if (peticion.ok) {
            mostrarMensajeExito();
        } else {
            mostrarMensajeError("Error al registrar el nuevo ejercicio. Intente nuevamente.");
        }
    } catch (error) {
        console.error("Error en la petición:", error);
        mostrarMensajeError("Ocurrió un error. Por favor, intente más tarde.");
    }
});

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
    messageTitle.textContent = 'Ejercicio registrado con éxito.';

    //Crear el botón de OK
    const okButton = document.createElement('button');
    okButton.id = 'okButton';
    okButton.innerText = 'OK';
    okButton.addEventListener('click', function() {
        overlay.remove(); //Eliminar el overlay al hacer clic en OK 
        window.location.href = '../Tabla Entrenamiento/Tabla_Entrenamiento.html'; // Redirigir a la tabla
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
    messageTitle.textContent = 'Error al registrar el ejercicio';

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