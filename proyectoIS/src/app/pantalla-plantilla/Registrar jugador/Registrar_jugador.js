let boton = document.getElementById("btnRegistrarJugador");

boton.addEventListener("click", async evento => {
    evento.preventDefault(); // Evitar el envío del formulario
    const cedula = parseInt(document.getElementById("cedula").value);
    
    if(cedula >= 0){
        // Verificar si la cédula ya está registrada
        const existe = await verificarCedula(cedula);
        if (existe) {
            const string = "La cédula ya está registrada. Por favor, ingrese una cédula diferente.";
            mostrarMensajeError(string);
            return; // Detener el registro si la cédula ya existe
        }
    }

    registrarJugador();  
});

let verificarCedula = async (cedula) => {
    const respuesta = await fetch(`http://localhost:8085/api/jugador/existe/${cedula}`);
    return await respuesta.json(); // Retorna true o false
};

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

let registrarJugador = async () => {
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
        mensajeError += "El <span class='campo-errado'>Nombre</span> no puede estar vacío.\n";
        valid = false;
    }

    // Validar cédula
    if (isNaN(campos.cedula) || campos.cedula <= 10000000 || campos.cedula >= 40000000) {
        mensajeError += "La <span class='campo-errado'>Cédula</span> debe ser un número entre 10,000,000 y 40,000,000 y no puede estar vacío.\n";
        valid = false;
    }

    // Validar edad
    if (isNaN(campos.edad) || campos.edad <= 5 || campos.edad >= 25) {
        mensajeError += "La <span class='campo-errado'>Edad</span> debe estar entre 5 y 25 años y no puede estar vacía.\n";
        valid = false;
    }

    // Validar nacionalidad
    if (!campos.nacionalidad) {
        mensajeError += "La <span class='campo-errado'>Nacionalidad</span> no puede estar vacía.\n";
        valid = false;
    }

    // Validar dorsal
    if (isNaN(campos.dorsal) || campos.dorsal <= 0 || campos.dorsal >= 99) {
        mensajeError += "El <span class='campo-errado'>Dorsal</span> debe estar entre 1 y 99 y no puede estar vacío.\n";
        valid = false;
    }

    // Validar peso
    if (isNaN(campos.peso) || campos.peso < 18 || campos.peso > 99) {
        mensajeError += "El <span class='campo-errado'>Peso</span> debe estar entre 18 y 99 kg y no puede estar vacío.\n";
        valid = false;
    }

    // Validar altura
    if (isNaN(campos.altura) || campos.altura < 1.00 || campos.altura > 1.75) {
        mensajeError += "La <span class='campo-errado'>Altura</span> debe estar entre 1.00 y 1.75 m y no puede estar vacía.\n";
        valid = false;
    }

    // Validar tarjetas
    if (isNaN(campos.tarjetaRoja) || campos.tarjetaRoja < 0 || campos.tarjetaRoja > 99) {
        mensajeError += "Las <span class='campo-errado'>Tarjetas Rojas</span> deben estar entre 0 y 99 y no pueden estar vacías.\n";
        valid = false;
    }

    if (isNaN(campos.tarjetaAmarilla) || campos.tarjetaAmarilla < 0 || campos.tarjetaAmarilla > 99) {
        mensajeError += "Las <span class='campo-errado'>Tarjetas Amarillas</span> deben estar entre 0 y 99 y no pueden estar vacías.\n";
        valid = false;
    }

    if (isNaN(campos.titulosJugador) || campos.titulosJugador < 0 || campos.titulosJugador > 99) {
        mensajeError += "Los <span class='campo-errado'>Titulos</span> deben estar entre 0 y 99 y no pueden estar vacíos.\n";
        valid = false;
    }

    // Si alguna validación falla, mostrar el mensaje de    // Si alguna validación falla, mostrar el mensaje de error y evitar el registro
    if (!valid) {
        //alert(mensajeError); 
        mostrarMensajeError(mensajeError);
        return; // Salir de la función sin registrar
    }

    try {
        const peticion = await fetch("http://localhost:8085/api/guardarJugadores", {
            method: 'POST',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(campos) 
        });

        if (peticion.ok) {
            //window.location.href = 'Mensaje_GuardadoConExito.html'; // Redirigir a la página del mensaje de éxito
            mostrarMensajeExito();
        } else {
            alert("Error al registrar el jugador. Intente nuevamente.");
        }
    } catch (error) {
        console.error("Error en la petición:", error);
        alert("Ocurrió un error. Por favor, intente más tarde.");
    }
}

//Crea y muestra el mensaje de éxito
function mostrarMensajeExito() {
    //crear el overlay
    const overlay = document.createElement("div");
    overlay.className = 'overlay';

    //Crear el cuadro de mnsaje
    const messageBox = document.createElement("div");
    messageBox.className = 'message-box';

    //Crear el título del mensaje
    const messageTitle = document.createElement('h2');
    messageTitle.textContent = 'Jugador registrado con éxito';

    //Crear el botón de OK
    const okButton = document.createElement('button');
    okButton.id = 'okButton';
    okButton.innerText = 'OK';
    okButton.addEventListener('click', function() {
        overlay.remove(); //Eliminar el overlay al hacer clic en OK 
        window.location.href = '../Tabla Jugador/Tabla_Jugador.html'; // Redirigir a la tabla
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
    messageTitle.textContent = 'Error al registrar jugador';

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