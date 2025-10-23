document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (id) {
        const jugador = await obtenerJugador(id);
        llenarFormulario(jugador);
    }

    document.getElementById("btnGuardarCambios").addEventListener("click", async (event) => {
        event.preventDefault(); // Evitar el envío del formulario
        await guardarCambios(id);
    });
});

async function obtenerJugador(id) {
    const respuesta = await fetch(`http://localhost:8085/api/jugador/${id}`);
    if (!respuesta.ok) {
        throw new Error("Error al obtener el jugador");
    }
    return await respuesta.json();
}

function llenarFormulario(jugador) {
    document.getElementById("nombre").value = jugador.nombre;
    document.getElementById("cedula").value = jugador.cedula;
    document.getElementById("sexo").value = jugador.sexo;
    document.getElementById("edad").value = jugador.edad;
    document.getElementById("nacionalidad").value = jugador.nacionalidad;
    document.getElementById("posicion").value = jugador.posicion;
    document.getElementById("dorsal").value = jugador.dorsal;
    document.getElementById("peso").value = jugador.peso;
    document.getElementById("altura").value = jugador.altura;
    document.getElementById("tarjetaRoja").value = jugador.tarjetaRoja;
    document.getElementById("tarjetaAmarilla").value = jugador.tarjetaAmarilla;
    document.getElementById("titulos").value = jugador.titulos;
}

// Restringir la entrada de caracteres en el campo de nombre
let nombreInput = document.getElementById("nombre");
let nombreError = document.getElementById("nombreError"); // Asegúrate de tener este elemento en tu HTML

// Validar en el evento blur
nombreInput.addEventListener("blur", function() {
    const nombreValue = nombreInput.value.trim(); // Obtener el valor y eliminar espacios en blanco

    // Verificar si el campo está vacío o tiene menos de 2 caracteres
    if (nombreValue.length < 2) {
        nombreError.style.display = "inline"; // Mostrar mensaje de error
    } else {
        nombreError.style.display = "none"; // Ocultar mensaje de error
    }
});

// Limpiar el mensaje de error en el evento focus
nombreInput.addEventListener("focus", function() {
    nombreError.style.display = "none"; // Ocultar mensaje de error al enfocar el campo
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

// Validación del campo de cédula
let cedulaInput = document.getElementById("cedula");
let cedulaError = document.getElementById("cedulaError");

// Validar en el evento blur
cedulaInput.addEventListener("blur", function() {
    const cedulaValue = parseInt(cedulaInput.value);

    // Verificar si el valor es un número y está en el rango correcto
    if (isNaN(cedulaValue) || cedulaValue < 10000000 || cedulaValue >= 40000000) {
        cedulaError.style.display = "inline"; // Mostrar mensaje de error
    } else {
        cedulaError.style.display = "none"; // Ocultar mensaje de error
    }

});

// Limpiar el mensaje de error en el evento focus
cedulaInput.addEventListener("focus", function() {
    cedulaError.style.display = "none"; // Ocultar mensaje de error al enfocar el campo
});

//Hasta aqui se valida la cedula

//Validar edad
// Validación del campo de edad
let edadInput = document.getElementById("edad");
let edadError = document.getElementById("edadError");

// Validar en el evento blur
edadInput.addEventListener("blur", function() {
    const edadValue = parseInt(edadInput.value);

    // Verificar si el valor es un número y está en el rango correcto
    if (isNaN(edadValue) || edadValue < 5 || edadValue > 25) {
        edadError.style.display = "inline"; // Mostrar mensaje de error
    } else {
        edadError.style.display = "none"; // Ocultar mensaje de error
    }
});

// Limpiar el mensaje de error en el evento focus
edadInput.addEventListener("focus", function() {
    edadError.style.display = "none"; // Ocultar mensaje de error al enfocar el campo
});
//Hasta aqui llega validad edad

//Validacion de dorsal
let dorsalInput = document.getElementById("dorsal");
let dorsalError = document.getElementById("dorsalError");

// Validar en el evento blur
dorsalInput.addEventListener("blur", function() {
    const dorsalValue = parseInt(dorsalInput.value);

    // Verificar si el valor es un número y está en el rango correcto
    if (isNaN(dorsalValue) || dorsalValue < 1 || dorsalValue > 99) {
        dorsalError.style.display = "inline"; // Mostrar mensaje de error
    } else {
        dorsalError.style.display = "none"; // Ocultar mensaje de error
    }
});

// Limpiar el mensaje de error en el evento focus
dorsalInput.addEventListener("focus", function() {
    dorsalError.style.display = "none"; // Ocultar mensaje de error al enfocar el campo
});
//Hasta aqui llega validar dorsal

//Validacion de peso y altura
// Validación del campo de peso
let pesoInput = document.getElementById("peso");
let pesoError = document.getElementById("pesoError");

// Validar en el evento blur
pesoInput.addEventListener("blur", function() {
    const pesoValue = parseFloat(pesoInput.value);

    // Verificar si el valor es un número y está en el rango correcto
    if (isNaN(pesoValue) || pesoValue < 18 || pesoValue > 99) {
        pesoError.style.display = "inline"; // Mostrar mensaje de error
    } else {
        pesoError.style.display = "none"; // Ocultar mensaje de error
    }
});

// Limpiar el mensaje de error en el evento focus
pesoInput.addEventListener("focus", function() {
    pesoError.style.display = "none"; // Ocultar mensaje de error al enfocar el campo
});

// Validación del campo de altura
let alturaInput = document.getElementById("altura");
let alturaError = document.getElementById("alturaError");

// Validar en el evento blur
alturaInput.addEventListener("blur", function() {
    const alturaValue = parseFloat(alturaInput.value);

    // Verificar si el valor es un número y está en el rango correcto
    if (isNaN(alturaValue) || alturaValue < 1.00 || alturaValue > 1.75) {
        alturaError.style.display = "inline"; // Mostrar mensaje de error
    } else {
        alturaError.style.display = "none"; // Ocultar mensaje de error
    }
});

// Limpiar el mensaje de error en el evento focus
alturaInput.addEventListener("focus", function() {
    alturaError.style.display = "none"; // Ocultar mensaje de error al enfocar el campo
});
//Hasta aqui llega la validacion de peso y altura

// Función para validar un campo numérico
function validarCampoNumerico(inputElement, errorElement, min, max) {
    inputElement.addEventListener("blur", function() {
        const value = parseInt(inputElement.value);

        // Verificar si el valor es un número y está en el rango correcto
        if (isNaN(value) || value < min || value > max) {
            errorElement.style.display = "inline"; // Mostrar mensaje de error
        } else {
            errorElement.style.display = "none"; // Ocultar mensaje de error
        }
    });

    // Limpiar el mensaje de error en el evento focus
    inputElement.addEventListener("focus", function() {
        errorElement.style.display = "none"; // Ocultar mensaje de error al enfocar el campo
    });
}

//Validaciones de tarjeta roja tarjeta amarilla, titulos
// Obtener elementos de los campos
let tarjetaRojaInput = document.getElementById("tarjetaRoja");
let tarjetaRojaError = document.getElementById("tarjetaRojaError");

let tarjetaAmarillaInput = document.getElementById("tarjetaAmarilla");
let tarjetaAmarillaError = document.getElementById("tarjetaAmarillaError");

let titulosInput = document.getElementById("titulos");
let titulosError = document.getElementById("titulosError");

// Validar los campos con la función
validarCampoNumerico(tarjetaRojaInput, tarjetaRojaError, 0, 99);
validarCampoNumerico(tarjetaAmarillaInput, tarjetaAmarillaError, 0, 99);
validarCampoNumerico(titulosInput, titulosError, 0, 99);


// Restringir la entrada de caracteres en el campo de nacionalidad
let nacionalidadInput = document.getElementById("nacionalidad");
let nacionalidadError = document.getElementById("nacionalidadError"); // Asegúrate de tener este elemento en tu HTML

// Validar en el evento blur
nacionalidadInput.addEventListener("blur", function() {
    const nacionalidadValue = nacionalidadInput.value.trim(); // Obtener el valor y eliminar espacios en blanco

    // Verificar si el campo está vacío o tiene menos de 2 caracteres
    if (nacionalidadValue.length < 2) {
        nacionalidadError.style.display = "inline"; // Mostrar mensaje de error
    } else {
        nacionalidadError.style.display = "none"; // Ocultar mensaje de error
    }
});

// Limpiar el mensaje de error en el evento focus
nacionalidadInput.addEventListener("focus", function() {
    nacionalidadError.style.display = "none"; // Ocultar mensaje de error al enfocar el campo
});

// Restringir la entrada de caracteres permitidos
nacionalidadInput.addEventListener("keypress", function(event) {
    const charCode = event.charCode;

    // Permitir solo letras (a-z, A-Z) y espacios (charCode 32)
    if ((charCode < 65 || charCode > 90) && // A-Z
        (charCode < 97 || charCode > 122) && // a-z
        charCode !== 32) { // espacio
        event.preventDefault(); // Evitar la entrada de caracteres no permitidos
    }

    // Verificar la longitud máxima
    if (nacionalidadInput.value.length >= 24) {
        event.preventDefault(); // Evitar que se escriban más caracteres
    }
});

async function guardarCambios(id) {
    let campos = {};
    
    campos.nombre = document.getElementById("nombre").value;
    campos.cedula = parseInt(document.getElementById("cedula").value);
    campos.sexo = document.getElementById("sexo").value;
    campos.edad = parseInt(document.getElementById("edad").value);
    campos.posicion = document.getElementById("posicion").value;
    campos.nacionalidad = document.getElementById("nacionalidad").value;
    campos.dorsal = parseInt(document.getElementById("dorsal").value);
    campos.peso = parseFloat(document.getElementById("peso").value);
    campos.altura = parseFloat(document.getElementById("altura").value);
    campos.tarjetaRoja = parseInt(document.getElementById("tarjetaRoja").value);
    campos.tarjetaAmarilla = parseInt(document.getElementById("tarjetaAmarilla").value);
    campos.titulosJugador = parseInt(document.getElementById("titulos").value);

    // Validaciones
    let mensajeError = "";
    let valid = true;

    // Validar nombre
    if (!campos.nombre) {
        mensajeError += "El nombre no puede estar vacío.\n";
        valid = false;
    }

    // Validar cédula
    if (isNaN(campos.cedula) || campos.cedula <= 10000000 || campos.cedula >= 40000000) {
        mensajeError += "La cédula debe ser un número entre 10,000,000 y 40,000,000 y no puede estar vacío.\n";
        valid = false;
    }

    // Validar edad
    if (isNaN(campos.edad) || campos.edad <= 5 || campos.edad >= 25) {
        mensajeError += "La edad debe estar entre 5 y 25 años y no puede estar vacía.\n";
        valid = false;
    }

    // Validar nacionalidad
    if (!campos.nacionalidad) {
        mensajeError += "La nacionalidad no puede estar vacía.\n";
        valid = false;
    }

    // Validar dorsal
    if (isNaN(campos.dorsal) || campos.dorsal <= 0 || campos.dorsal >= 99) {
        mensajeError += "El dorsal debe estar entre 1 y 99 y no puede estar vacío.\n";
        valid = false;
    }

    // Validar peso
    if (isNaN(campos.peso) || campos.peso < 18 || campos.peso > 99) {
        mensajeError += "El peso debe estar entre 18 y 99 kg y no puede estar vacío.\n";
        valid = false;
    }

    // Validar altura
    if (isNaN(campos.altura) || campos.altura < 1.00 || campos.altura > 1.75) {
        mensajeError += "La altura debe estar entre 1.00 y 1.75 m y no puede estar vacía.\n";
        valid = false;
    }

    // Validar tarjetas
    if (isNaN(campos.tarjetaRoja) || campos.tarjetaRoja < 0 || campos.tarjetaRoja > 99) {
        mensajeError += "Las tarjetas rojas deben estar entre 0 y 99 y no pueden estar vacías.\n";
        valid = false;
    }

    if (isNaN(campos.tarjetaAmarilla) || campos.tarjetaAmarilla < 0 || campos.tarjetaAmarilla > 99) {
        mensajeError += "Las tarjetas amarillas deben estar entre 0 y 99 y no pueden estar vacías.\n";
        valid = false;
    }

    if (isNaN(campos.titulosJugador) || campos.titulosJugador < 0 || campos.titulosJugador > 99) {
        mensajeError += "Los títulos deben estar entre 0 y 99 y no pueden estar vacíos.\n";
        valid = false;
    }

    // Si alguna validación falla, mostrar el mensaje de error y evitar el registro
    if (!valid) {
        alert(mensajeError); 
        return; // Salir de la función sin registrar
    }

    if (await mostrarMensajeConfirmacion()){

        try {
            const respuesta = await fetch(`http://localhost:8085/api/jugador/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(campos),
            });
    
            if (respuesta.ok) {
                mostrarMensajeExito();
            } else {
                mostrarMensajeError('Ha ocurrido un error al modificar los datos del jugador.');
            }
        } catch (error) {
            console.error("Error en la petición:", error);
            mostrarMensajeError('Ocurrió un error. Intentelo más tarde.');
        }

    }
    else{
        window.location.href = '../Tabla Jugador/Tabla_Jugador.html'; // Redirigir a la tabla de jugadores  
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
    messageTitle.textContent = 'Se han modificado los datos del jugador con éxito.';

    //Crear el botón de OK
    const okButton = document.createElement('button');
    okButton.id = 'okButton';
    okButton.innerText = 'OK';
    okButton.addEventListener('click', function() {
        overlay.remove(); //Eliminar el overlay al hacer clic en OK 
        window.location.href = '../Tabla Jugador/Tabla_Jugador.html'; // Redirigir a la tabla de jugadores
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
    messageTitle.textContent = 'Error al modificar los datos de jugador';

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
        messageTitle.textContent = '¿Estás seguro de modificar este jugador?';

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
async function guardarCambios(id) {
    const jugadorActualizado = {
        nombre: document.getElementById("nombre").value,
        cedula: document.getElementById("cedula").value,
        sexo: document.getElementById("sexo").value,
        edad: document.getElementById("edad").value,
        nacionalidad: document.getElementById("nacionalidad").value,
        posicion: document.getElementById("posicion").value,
        dorsal: document.getElementById("dorsal").value,
        peso: document.getElementById("peso").value,
        altura: document.getElementById("altura").value,
        tarjetaRoja: document.getElementById("tarjetaRoja").value,
        tarjetaAmarilla: document.getElementById("tarjetaAmarilla").value,
        titulos: document.getElementById("titulos").value,
    };

    const respuesta = await fetch(`http://localhost:8080/api/jugador/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jugadorActualizado),
    });

    if (respuesta.ok) {
        alert("Cambios guardados con éxito.");
        window.location.href = '../Tabla Jugador/Tabla_Jugador.html'; // Redirigir a la tabla de jugadores
    } else {
        alert("Error al guardar los cambios.");
    }
}*/