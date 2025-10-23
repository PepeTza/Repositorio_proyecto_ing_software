document.addEventListener('DOMContentLoaded', async() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if(id){
        const entrenador = await obtenerEntrenador(id);
        llenarFormulario(entrenador);
    }

    document.getElementById("btnGuardarCambios").addEventListener('click', async(event) => {
        event.preventDefault();        
        const entrenador = await obtenerEntrenador(id);
        await guardarCambios(entrenador,id);
    });

});

async function obtenerEntrenador(id){
    const respuesta = await fetch(`http://localhost:8085/api/entrenador/${id}`);
    if(!respuesta.ok){
        throw new Error('Error al obtener el entrenador');
    }
    return await respuesta.json();
}

function llenarFormulario(entrenador){
    document.getElementById("nombre").value = entrenador.nombre;
    document.getElementById("cedula").value = entrenador.cedula;
    document.getElementById("sexo").value = entrenador.sexo;
    document.getElementById("edad").value = entrenador.edad;
    document.getElementById("nacionalidad").value = entrenador.nacionalidad;
    document.getElementById("email").value = entrenador.correo;

    const telefono = entrenador.telefono;
    const telefonoDividido = telefono.split("-");
    document.getElementById("num").value = telefonoDividido[0];
    document.getElementById("telefono").value = telefonoDividido[1];

    document.getElementById("rol").value = entrenador.rol;
    document.getElementById("sueldo").value = entrenador.sueldo;
    document.getElementById("stLaboral").value = entrenador.stlaboral;
    document.getElementById("experiencia").value = entrenador.experiencia;
    document.getElementById("stContrato").value = entrenador.stcontrato;
    document.getElementById("partDirigido").value = entrenador.partdirigido;
    document.getElementById("equipoDirigido").value = entrenador.entrenandoEquipo;
}

//Registrar la entrada de caracteres en los campos de nombre
let nombreInput = document.getElementById("nombre");
let nombreError = document.getElementById("nombreError");

//Validar en el evento blur
nombreInput.addEventListener("blur", ()=>{
    let nombreValue = nombreInput.value.trim();

    if(nombreValue <2){
        nombreError.style.display = "inline";
    }else{
        nombreError.style.display = "none";
    }
})

//Limpiar el mensaje de error en el evento focus
nombreInput.addEventListener("focus", ()=>{
    nombreError.style.display = "none";
})

//Entrada de caracteres permitidos en el campo nombre
nombreInput.addEventListener("keypress", (evento)=>{
    const charCode = evento.charCode;
    const char = String.fromCharCode(charCode);

    //Permite solo letras, espacios, guiones, apóstrofes, acentos y ñ
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]$/;
    
    if(!regex.test(char)){
        evento.preventDefault();
    }

    //Verificar la longitud del campo nombre
    if(nombreInput.value.length >= 30){
        evento.preventDefault();
    }
})
//Termina la validación del campo nombre

//Validación del campo cédula
let cedulaInput = document.getElementById("cedula");
let cedulaError = document.getElementById("cedulaError");

//Validar en el evento blur
cedulaInput.addEventListener("blur", ()=>{
    const cedulaValue = parseInt(cedulaInput.value);

    //Verificar si la cédula es un número y esta en el rgo correcto
    if(isNaN(cedulaValue) || cedulaValue < 9000000 || cedulaValue > 40000000){
        cedulaError.style.display = "inline";
    }else{
        cedulaError.style.display = "none";
    }
})

//Limpiar el mensaje de error en el evento focus
cedulaInput.addEventListener("focus", function(){
    cedulaError.style.display = "none";
})
//Termina la validación del campo cédula

//Validación del campo edad
let edadInput = document.getElementById("edad");
let edadError = document.getElementById("edadError");

//Validar en el evento blur
edadInput.addEventListener("blur", function(){
    const edadValue = parseInt(edadInput.value);

    //Verificar si la edad es un número y esta en el rango correcto
    if(isNaN(edadValue) || edadValue < 20 || edadValue > 80){
        edadError.style.display = "inline";
    }else{
        edadError.style.display = "none";
    }
})

//Limpiar el mensaje de error en el evento focus
edadInput.addEventListener("focus", function(){
    edadError.style.display = "none";
})
//Termina la validación del campo edad

// Restringir la entrada de caracteres en el campo de nacionalidad
let nacionalidadInput = document.getElementById("nacionalidad");
let nacionalidadError = document.getElementById("nacionalidadError"); 

// Validar en el evento blur
nacionalidadInput.addEventListener("blur", function() {
    const nacionalidadValue = nacionalidadInput.value.trim(); 

    // Verificar si el campo está vacío o tiene menos de 2 caracteres
    if (nacionalidadValue.length < 2) {
        nacionalidadError.style.display = "inline"; 
    } else {
        nacionalidadError.style.display = "none"; 
    }
});

// Limpiar el mensaje de error en el evento focus
nacionalidadInput.addEventListener("focus", function() {
    nacionalidadError.style.display = "none"; 
});

// Restringir la entrada de caracteres permitidos
nacionalidadInput.addEventListener("keypress", function(event) {
    const charCode = event.charCode;
    const char = String.fromCharCode(charCode);

    //Perimite solo letras (a-z, A-Z) y espacios y ñ
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s-]$/;

    if(!regex.test(char)){
        event.preventDefault();
    }

    // Verificar la longitud máxima
    if (nacionalidadInput.value.length >= 25) {
        event.preventDefault(); 
    }
});
//Termina la validación del campo nacionalidad

//Validación del campo correo
let emailInput = document.getElementById("email");
let emailError = document.getElementById("emailError");

//Validar en el evento blur
emailInput.addEventListener("blur", function(){
    const emailValue = emailInput.value.trim();

    //Verificar si el campo está vacío
    if(emailValue.length < 1){
        emailError.style.display = "inline";
    }else{
        emailError.style.display = "none";
    }
})

//Limpiar el mensaje de error en el evento focus
emailInput.addEventListener("focus", function(){
    emailError.style.display = "none";
})

//Entrada de caracteres permitidos en el campo email
emailInput.addEventListener("keypress", function(evento){
    const charCode = evento.charCode;

    //Permite letras, números, guiones, guiones bajos, puntos y arrobas
    if((charCode < 65 && charCode > 90) && //A-Z
        (charCode < 97 && charCode > 122) &&  //a-z
        (charCode < 48 && charCode > 57) &&  //0-9
        (charCode !== 32) && //espacio
        (charCode !== 45) && //guion
        (charCode !== 95) && //guion bajo
        (charCode !== 46) && //punto
        (charCode !== 64)){ //arroba
            evento.preventDefault();
    }
})
//Termina la validación del campo email

//Validación del campo teléfono
let telefonoInput = document.getElementById("telefono");
let telefonoError = document.getElementById("telefonoError");

//Validar en el evento blur
telefonoInput.addEventListener("blur", function(){
    const telefonoValue = telefonoInput.value.trim();

    //Verificar si el campo está vacío o tiene menos o más de 7 dígitos
    if(telefonoValue.length < 7 || telefonoValue.length > 7 || isNaN(telefonoValue)){
        telefonoError.style.display = "inline";
    }else{
        telefonoError.style.display = "none";
    }

})

//Limpiar el mensaje de error en el evento focus
telefonoInput.addEventListener("focus", function(){
    telefonoError.style.display = "none";
})

//Entrada de caracteres permitidos en el campo teléfono
telefonoInput.addEventListener("keypress", function(evento){
    const charCode = evento.charCode;

    //Permite números
    if(charCode < 48 || charCode > 57){ //0-9
        evento.preventDefault();
    }
})
//Termina la validación del campo teléfono

//Validación del campo sueldo
let sueldoInput = document.getElementById("sueldo");
let sueldoError = document.getElementById("sueldoError");

//Validar en el evento blur
sueldoInput.addEventListener("blur", function(){
    const sueldoValue = parseFloat(sueldoInput.value);

    //Verificar si el campo está vacío o que cumpla con el rgo permitido
    if(isNaN(sueldoValue) || sueldoValue < 3.60 || sueldoValue > 3000.00){
        sueldoError.style.display = "inline";
    }else{
        sueldoError.style.display = "none";
    }
})

//Limpiar el mensaje de error en el evento focus
sueldoInput.addEventListener("focus", function(){
    sueldoError.style.display = "none";
})
//Termina la validación del campo sueldo

//Validación del campo experiencia
let experienciaInput = document.getElementById("experiencia");
let experienciaError = document.getElementById("experienciaError");

//Validar en el evento blur
experienciaInput.addEventListener("blur", function(){
    const experienciaValue = parseInt(experienciaInput.value);

    //Verificar si el campo está vacío o que cumpla con el rgo permitido
    if(isNaN(experienciaValue) || experienciaValue < 0 || experienciaValue > 60){
        experienciaError.style.display = "inline";
    }else{
        experienciaError.style.display = "none";
    }
})

//Limpiar el mensaje de error en el evento focus
experienciaInput.addEventListener("focus", function(){
    experienciaError.style.display = "none";
})
//Termina la validación del campo experiencia

//Validación del campo partDirigido
let partDirigidoInput = document.getElementById("partDirigido");
let partDirigidoError = document.getElementById("partDirigidoError");

//Validar en el evento blur
partDirigidoInput.addEventListener("blur", function(){
    const partDirigidoValue = parseInt(partDirigidoInput.value);

    //Verificar si el campo está vacío o que cumpla con el rgo permitido
    if(isNaN(partDirigidoValue) || partDirigidoValue < 0 || partDirigidoValue > 200){
        partDirigidoError.style.display = "inline";
    }else{
        partDirigidoError.style.display = "none";
    }
})

//Limpiar el mensaje de error en el evento focus
partDirigidoInput.addEventListener("focus", function(){
    partDirigidoError.style.display = "none";
})
//Termina la validación del campo partDirigido

//Validación del campo equipoDirigido
let equipoDirigidoInput = document.getElementById("equipoDirigido");
let equipoDirigidoError = document.getElementById("equipoDirigidoError");

//Validar en el evento blur
equipoDirigidoInput.addEventListener("blur", function(){
    const equipoDirigidoValue = equipoDirigidoInput.value.trim();

    //Verificar si el campo está vacío o tiene menos de 2 caracteres
    if(equipoDirigidoValue.length < 2){
        equipoDirigidoError.style.display = "inline";
    }else{
        equipoDirigidoError.style.display = "none";
    }
})

//Limpiar el mensaje de error en el evento focus
equipoDirigidoInput.addEventListener("focus", function(){
    equipoDirigidoError.style.display = "none";
})
//Termina la validación del campo equipoDirigido

let verificarCedula = async (cedula,num)=>{
    try {
        let respuesta
        if(num===1){
            respuesta = await fetch(`http://localhost:8085/api/entrenador/exist/${cedula}`);
        }else if(num===2){
            respuesta = await fetch(`http://localhost:8085/api/personal/exist/${cedula}`);  
        }else{
            respuesta = await fetch(`http://localhost:8085/api/administrador/exist/${cedula}`);
        }

        if(respuesta.ok){
            return await respuesta.json(); //Retorna true o false para cedula
        }else{
            throw new Error("Error en la petición: ", respuesta.statusText);
        }
    } catch (error) {
        console.error("Error al verificar la cédula: ", error);
        return false;
    }
}

let verificarCorreo = async (correo, num)=>{
    try {
        let respuesta;
        if(num===1){
            respuesta = await fetch(`http://localhost:8085/api/entrenador/exist2/${correo}`);
        }else if(num===2){
            respuesta = await fetch(`http://localhost:8085/api/personal/exist2/${correo}`);
        }else{
            respuesta = await fetch(`http://localhost:8085/api/administrador/exist2/${correo}`);
        }

        if(respuesta.ok){
            return await respuesta.json(); //Retorna true o false para correo
        }else{
            throw new Error("Error en la petición: ", respuesta.statusText);
        }
    } catch (error) {
        console.error("Error al verificar el correo: ", error);
        return false;
    }
}

let verificarTelefono = async (telefono,num)=>{
    try {
        let respuesta;
        if(num===1){
            respuesta = await fetch(`http://localhost:8085/api/entrenador/exist3/${telefono}`);
        }else if(num===2){
            respuesta = await fetch(`http://localhost:8085/api/personal/exist3/${telefono}`);
        }else{
            respuesta = await fetch(`http://localhost:8085/api/administrador/exist3/${telefono}`); 
        }

        if(respuesta.ok){
            return await respuesta.json(); //Retorna true o false para telefono
        }else{
            throw new Error("Error en la petición: ", respuesta.statusText);
        }
    } catch (error) {
        console.error("Error al verificar el teléfono: ", error);
        return false
    }
}

async function guardarCambios(entrenador,id){
    if(await mostrarMensajeConfirmacion()){
        try {
            let campos = {};
            let cedula = true; let correo = true; let telefono = true;

            campos.nombre = document.getElementById("nombre").value;

            if(parseInt(document.getElementById("cedula").value) === entrenador.cedula){
                campos.cedula = parseInt(document.getElementById("cedula").value); //Si la cédula no cambia
            }else{
                campos.cedula = parseInt(document.getElementById("cedula").value); //Si la cédula cambia
                cedula = false;
            }

            campos.sexo = document.getElementById("sexo").value;
            campos.edad = parseInt(document.getElementById("edad").value);
            campos.nacionalidad = document.getElementById("nacionalidad").value;

            if(document.getElementById("email").value === entrenador.correo){
                campos.correo = document.getElementById("email").value; //Si el correo no cambia
            }else{
                campos.correo = document.getElementById("email").value; //Si el correo cambia
                correo = false;
            }

            if((document.getElementById("num").value === entrenador.telefono.split("-")[0]) && 
                (document.getElementById("telefono").value === entrenador.telefono.split("-")[1])){
                    campos.telefono = document.getElementById("num").value + "-" + document.getElementById("telefono").value; //Si el teléfono no cambia
            }else{
                campos.telefono = document.getElementById("num").value + "-" + document.getElementById("telefono").value; //Si el teléfono cambia
                telefono = false;
            }

            campos.rol = document.getElementById("rol").value;
            campos.sueldo = parseFloat(document.getElementById("sueldo").value);
            campos.stlaboral = document.getElementById("stLaboral").value;
            campos.experiencia = parseInt(document.getElementById("experiencia").value);
            campos.stcontrato = document.getElementById("stContrato").value;
            campos.partdirigido = parseInt(document.getElementById("partDirigido").value);
            campos.entrenandoEquipo = document.getElementById("equipoDirigido").value;
            campos.username = entrenador.username;
            campos.password = entrenador.password;

            //Validaciones
            let mensajeError = "";
            let valid = true;
            
            if(!campos.nombre || campos.nombre.length < 2 || campos.nombre.length > 30){
                mensajeError += "El <span class='campo-errado'>Nombre</span> no puede estar vacío y solo se permiten de 2 a 30 caracteres.\n";
                valid = false;
            }

            if(isNaN(campos.cedula) || campos.cedula <= 9000000 || campos.cedula >= 40000000){
                mensajeError += "La <span class='campo-errado'>Cédula</span> debe ser un número entre 9,000,000 y 40,000,000 y no puede estar vacío.\n";
                valid = false;
            }else if(!cedula){
                if(await verificarCedula(campos.cedula,1)){
                    mensajeError += "Existe un entrenador registrado con esa <span class='campo-errado'>misma Cédula</span>.\n";
                    valid = false;
                }else if(await verificarCedula(campos.cedula,2)){
                    mensajeError += "Existe un empleado común registrado con esa <span class='campo-errado'>misma Cédula</span>.\n";
                    valid = false;
                }else if(await verificarCedula(campos.cedula,3)){
                    mensajeError += "Existe un administrador registrado con esa <span class='campo-errado'>misma Cédula</span>.\n";
                    valid = false;
                }
            }

            if(isNaN(campos.edad) || campos.edad < 20 || campos.edad > 80){
                mensajeError += "La <span class='campo-errado'>Edad</span> debe de ser un número entre 20 y 80, y no puede estar vacía.\n";
                valid = false;
            }

            if(!campos.nacionalidad || campos.nacionalidad.length < 3 || campos.nacionalidad.length > 25){
                mensajeError += "La <span class='campo-errado'>Nacionalidad</span> no puede estar vacía y solo se permiten de 3 a 25 caracteres.\n";
                valid = false;
            }  

            if(!campos.correo){
                mensajeError += "El <span class='campo-errado'>Correo</span> no puede estar vacío.\n";
                valid = false;
            }else if(!correo){
                if(await verificarCorreo(campos.correo,1)){
                    mensajeError += "Existe un entrenador registrado con esa <span class='campo-errado'>mismo Correo</span>.\n";
                    valid = false;
                }else if(await verificarCorreo(campos.correo,2)){
                    mensajeError += "Existe un empleado común registrado con esa <span class='campo-errado'>mismo Correo</span>.\n";
                    valid = false;
                }else if(await verificarCorreo(campos.correo,3)){
                    mensajeError += "Existe un administrador registrado con esa <span class='campo-errado'>mismo Correo</span>.\n";
                    valid = false;
                }
            }

            if(!campos.telefono || campos.telefono.length < 12 || campos.telefono.length > 12){
                mensajeError += "El <span class='campo-errado'>Telefono</span> no puede estar vacío y debe tener 7 dígitos.\n";
                valid = false;
            }else if(!telefono){
                if(await verificarTelefono(campos.telefono,1)){
                    mensajeError += "Existe un entrenador registrado con esa <span class='campo-errado'>mismo Número Telefónico</span>.\n";
                    valid = false;
                }else if(await verificarTelefono(campos.telefono,2)){
                    mensajeError += "Existe un empleado común registrado con esa <span class='campo-errado'>mismo Número Telefónico</span>.\n";
                    valid = false;
                }else if(await verificarTelefono(campos.telefono,3)){
                    mensajeError += "Existe un administrador registrado con esa <span class='campo-errado'>mismo Número Telefónico</span>.\n";
                    valid = false;
                }
            }

            if(isNaN(campos.sueldo) || campos.sueldo < 3.60 || campos.sueldo > 3000.00){
                mensajeError += "El <span class='campo-errado'>Sueldo</span> debe ser un número entre $3.60 y $3000.00, y no puede estar vacío.\n";
                valid = false;
            }

            if(isNaN(campos.experiencia) || campos.experiencia < 0 || campos.experiencia > 60){
                mensajeError += "La <span class='campo-errado'>Experiencia</span> debe ser un número entre 0 y 60, y no puede estar vacía.\n";
                valid = false;
            }else if(campos.edad <= campos.experiencia){
                mensajeError += "La <span class='campo-errado'>Experiencia</span> no puede ser mayor a la <span class='campo-errado'>Edad</span >.\n";
                valid = false;
            }else if((campos.edad - campos.experiencia)<20){
                mensajeError += "La <span class='campo-errado'>Edad</span> no puede ser menor a 20 años, y la <span class='campo-errado'>Experiencia</span> no puede ser superior o igual a la <span class='campo-errado'>Edad</span> .\n";
                valid = false;
            }

            if(isNaN(campos.partdirigido) || campos.partdirigido < 0 || campos.partdirigido > 200){
                mensajeError += "El campo <span class='campo-errado'>Patidos Dirigidos</span> debe ser un número entero y estar entre 0 y 200 y no puede estar vacío.\n";
                valid = false;
            }

            if(!campos.entrenandoEquipo || campos.entrenandoEquipo.length < 2){
                mensajeError += "El campo <span class='campo-errado'>Equipo Dirigido</span> no puede estar vacío.\n";
                valid = false;
            }

            if(!valid){
                mostrarMensajeError(mensajeError);
                return;
            }else{
                const respuesta = await fetch(`http://localhost:8085/api/entrenador/update/${id}`,{
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(campos)
                });

                if(respuesta.ok){
                    mostrarMensajeExito();
                }else{
                    mostrarMensajeError("Ha ocurrido un error al modificar los datos del Entrenador.");
                }
            }
        } catch (error) {
            console.error("Error en la petición: ",error);
            mostrarMensajeError("Ocurrió un error. Intentelo más tarde.");
        }
    }else{
        window.location.href = '../Tabla-Consultar-Editar/entrenador-tabla.html'; // Redirigir a la tabla
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
    messageTitle.textContent = 'Se han modificado los datos del Entrenador con éxito.';

    //Crear el botón de OK
    const okButton = document.createElement('button');
    okButton.id = 'okButton';
    okButton.innerText = 'OK';
    okButton.addEventListener('click', function() {
        overlay.remove(); //Eliminar el overlay al hacer clic en OK 
        window.location.href = '../Tabla-Consultar-Editar/entrenador-tabla.html'; // Redirigir a la tabla
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
    messageTitle.textContent = 'Error al modificar los datos del Entrenador';

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
        messageTitle.textContent = '¿Estás seguro de modificar este entrenador?';

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