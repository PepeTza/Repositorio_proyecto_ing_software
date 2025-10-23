document.addEventListener("DOMContentLoaded", async() =>{
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if(id){
        const usuario = await obtenerUsuario(id);
        llenarFormulario(usuario);
    }

    //Funcionalidad para mostrar/ocultar la contraseña
    const togglePassword = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("password");

    togglePassword.addEventListener("click", () => {
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type", type);
        togglePassword.classList.toggle("fa-eye"); // Cambia a ícono de ojo abierto
        togglePassword.classList.toggle("fa-eye-slash"); // Cambia a ícono de ojo cerrado
    });

    //Funcionalidad para mostrar/ocultar la confirmación de la contraseña
    const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");
    const confirmPasswordInput = document.getElementById("confirmarPassword");

    toggleConfirmPassword.addEventListener("click", () => {
        const type = confirmPasswordInput.getAttribute("type") === "password" ? "text" : "password";
        confirmPasswordInput.setAttribute("type", type);
        toggleConfirmPassword.classList.toggle("fa-eye"); // Cambia a ícono de ojo abierto
        toggleConfirmPassword.classList.toggle("fa-eye-slash"); // Cambia a ícono de ojo cerrado
    });

    document.getElementById("botonGuardarCambios").addEventListener("click", async(event) => {
        event.preventDefault();
        const usuario = await obtenerUsuario(id);
        if(usuario.rol === "Administrador"){
            await guardarCambios(id,'administrador');
        }else{
            await guardarCambios(id,'entrenador');
        }
    });
})

async function obtenerUsuario(id){
    const respuesta = await fetch(`http://localhost:8085/api/usuario/${id}`,)
    if(!respuesta.ok){
        throw new Error("Error al obtener los datos del usuario");
    }
    return await respuesta.json();
}

function llenarFormulario(usuario){
    var span = document.getElementById("nombre");
    span.textContent = usuario.nombre;
    span = document.getElementById("rol");
    span.textContent = usuario.rol;
    document.getElementById("username").value = usuario.username;
    document.getElementById("password").value = usuario.password;
    document.getElementById("confirmarPassword").value = usuario.password;
}

let verificarUsername = async(username)=>{
    try {
        let respuesta = await fetch(`http://localhost:8085/api/usuario/existUsername/${username}`);

        if(respuesta.ok){
            return await respuesta.json();    
        }else{
            throw new Error('Error en la petición: ', respuesta.statusText);
        }
    } catch (error) {
        console.error("Error al verficar el username de usuario: ", error);
        return false;
    }
}

//Registrar la entrada de caracteres en los campos de username
let usernameInput = document.getElementById("username");
let usernameError = document.getElementById("usernameError");

//Validar en el evento blur
usernameInput.addEventListener("blur", ()=>{
    let usernameValue = usernameInput.value.trim();

    if(usernameValue.length <2){
        usernameError.style.display = "inline";
    }else{
        usernameError.style.display = "none";
    }
})

//Limpiar el mensaje de error en el evento focus
usernameInput.addEventListener("focus", ()=>{
    usernameError.style.display = "none";
})

//Entrada de caracteres permitidos en el campo username
usernameInput.addEventListener("keypress", (evento)=>{

    //Verificar la longitud del campo username
    if(usernameInput.value.length >= 15){
        evento.preventDefault();
    }

})
//Termina la validación del campo username

//Registrar la entrada de caracteres en los campos de password
let passwordInput = document.getElementById("password");
let passwordError = document.getElementById("passwordError");

//Validar en el evento blur
passwordInput.addEventListener("blur", ()=>{
    let passwordValue = passwordInput.value.trim();

    if(passwordValue.length <8){
        passwordError.style.display = "inline";
    }else{
        passwordError.style.display = "none";
    }
});

//Limpiar el mensaje de error en el evento focus
passwordInput.addEventListener("focus", ()=>{
    passwordError.style.display = "none";
});

//Entrada de caracteres permitidos en el campo password
passwordInput.addEventListener("keypress", (evento)=>{
    //Verificar la longitud del campo password
    if(passwordInput.value.length >= 20){
        evento.preventDefault();
    }
});
//Termina la validación del campo password

//Registrar la entrada de caracteres en los campos de confirmar password
let confirmPasswordInput = document.getElementById("confirmarPassword");
let confirmPasswordError = document.getElementById("confirmarPasswordError");

//Validar en el evento blur
confirmPasswordInput.addEventListener("blur", ()=>{
    let confirmPasswordValue = confirmPasswordInput.value.trim();

    if(confirmPasswordValue.length <8){
        confirmPasswordError.style.display = "inline";
    }else{
        confirmPasswordError.style.display = "none";
    }
});

//Limpiar el mensaje de error en el evento focus
confirmPasswordInput.addEventListener("focus", ()=>{
    confirmPasswordError.style.display = "none";
});

//Entrada de caracteres permitidos en el campo confirmar password
confirmPasswordInput.addEventListener("keypress", (evento)=>{
    //Verificar la longitud del campo confirmar password
    if(confirmPasswordInput.value.length >= 20){
        evento.preventDefault();
    }
});
//Termina la validación del campo confirmar password

async function guardarCambios(id,rol){
    try {
        let campos = {};
        let username = true; 
        let password = true;

        let respuesta = await fetch(`http://localhost:8085/api/${rol}/${id}`);
        const usuario = await respuesta.json();

        campos.nombre = usuario.nombre;
        campos.cedula = usuario.cedula;
        campos.sexo = usuario.sexo;
        campos.edad = usuario.edad;
        campos.nacionalidad = usuario.nacionalidad;
        campos.correo = usuario.correo;
        campos.telefono = usuario.telefono;
        campos.rol = usuario.rol;
        campos.sueldo = usuario.sueldo;
        campos.stlaboral = usuario.stlaboral;
        campos.expereincia = usuario.experiencia;
        
        if(rol === 'entrenador'){
            campos.stcontrato = usuario.stcontrato;
            campos.partdirigido = usuario.partdirigido;
            campos.entrenandoEquipo = usuario.entrenandoEquipo;
        }else{
            campos.especializacion = usuario.especializacion;
        }

        if(document.getElementById("username").value === usuario.username){
            campos.username = document.getElementById("username").value; //Si no cambia el nombre de usuario
        }else{
            campos.username = document.getElementById("username").value;
            username = false; //Si cambia el nombre de usuario
        }

        if(document.getElementById("password").value === usuario.password){
            campos.password = document.getElementById("password").value; //Si no cambia la contraseña
        }else{
            campos.password = document.getElementById("password").value;
            password = false; //Si cambia la contraseña
        }

        //Validaciones
        let valid = true
        let mensajeError = "";

        if(!campos.username || campos.username.length < 5 || campos.username.length > 15){
            valid = false;
            mensajeError += "El campo <span class='campo-errado'>Usuario</span> no puede estar vacío y debe tener entre 5 y 15 caracteres.\n";
        }else if(!username){
            if(await verificarUsername(campos.username)){
                valid = false;
                mensajeError += "Ese nombre de <span class='campo-errado'>Usuario</span> ya existe\n";
            }
        }

        if(!password){
            if(!campos.password ||campos.password.length < 8 || campos.password.length > 20){
                valid = false;
                mensajeError += "El campo <span class='campo-errado'>Contraseña</span> no puede estar vacío y debe tener entre 8 y 20 caracteres.\n";
            }
        }

        if(document.getElementById("confirmarPassword").value === ""){
            valid = false;
            mensajeError += "Es obligatorio confirmar su contraseña.\n";
        } else if(campos.password !== document.getElementById("confirmarPassword").value){
            valid = false;
            mensajeError += "Las contraseñas no coinciden.\n";
        }

        if(!valid){
            mostrarMensajeError(mensajeError);
            return;
        }else{
            //Se actualiza los campos usuario y contraseña
            respuesta = await fetch(`http://localhost:8085/api/${rol}/update/${id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(campos)
            });

            if(respuesta.ok){
                mostrarMensajeExito();
            }else{
                mostrarMensajeError('Ha ocurrido un error al modificar los datos del usuario.');
            }
        }

    } catch (error) {
        console.error("Error en la petición:", error);
        mostrarMensajeError("Ocurrió un error. Intentelo más tarde.");
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
    messageTitle.textContent = 'Los cambios se guardaron correctamente.';

    //Crear el botón de OK
    const okButton = document.createElement('button');
    okButton.id = 'okButton';
    okButton.innerText = 'OK';
    okButton.addEventListener('click', function() {
        overlay.remove(); //Eliminar el overlay al hacer clic en OK 
        window.location.href = '../Tabla-Consultar-Editar/pantalla-usuario-tabla.component.html'; // Redirigir a la tabla
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
    messageTitle.textContent = 'Error al modificar los datos del usuario';

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