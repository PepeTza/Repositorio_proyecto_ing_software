let boton = document.getElementById("botonRegistrar");

document.addEventListener("DOMContentLoaded", async () => {
    //Obtener el ID del usuario desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const respuesta = await fetch(`http://localhost:8085/api/usuario/${id}`);
    const usu = await respuesta.json();

    //Llenar label username y rol
    var span = document.getElementById("nombre");
    span.textContent = usu.nombre;
    span = document.getElementById("rol");
    span.textContent = usu.rol;

    //Funcionalidad para mostrar/ocultar la contraseña
    const togglePassword = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("password");

    togglePassword.addEventListener("click", () =>{
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
});

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

boton.addEventListener("click", async evento => {
    evento.preventDefault();

    if(document.getElementById("username").value !== ""){
       const username = document.getElementById("username").value;

        if(await verificarUsername(username)){
            mostrarMensajeError("Ese nombre de usuario ya existe");
            return;
        }
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    registrarUsuario(id);
});

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
    if(usernameInput.value.length >= 30){
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

let registrarUsuario = async (id) => {

    try {
        let campos = {};

        let respuesta = await fetch(`http://localhost:8085/api/usuario/${id}`);
        const usu = await respuesta.json();    

        if(usu.rol === "Administrador"){
            respuesta = await fetch(`http://localhost:8085/api/administrador/${id}`);
            const adm = await respuesta.json();

            campos.nombre = adm.nombre;
            campos.cedula = adm.cedula;
            campos.sexo = adm.sexo;
            campos.edad = adm.edad;
            campos.nacionalidad = adm.nacionalidad;
            campos.correo = adm.correo;
            campos.telefono = adm.telefono;
            campos.rol = adm.rol;
            campos.sueldo = adm.sueldo;
            campos.stlaboral = adm.stlaboral;
            campos.experiencia = adm.experiencia;
            campos.especializacion = adm.especializacion;
            campos.username = document.getElementById("username").value;
            campos.password = document.getElementById("password").value;

        }else if(usu.rol === "Entrenador"){
            respuesta = await fetch(`http://localhost:8085/api/entrenador/${id}`);
            const ent = await respuesta.json();

            campos.nombre = ent.nombre;
            campos.cedula = ent.cedula;
            campos.sexo = ent.sexo;
            campos.edad = ent.edad;
            campos.nacionalidad = ent.nacionalidad;
            campos.correo = ent.correo;
            campos.telefono = ent.telefono;
            campos.rol = ent.rol;
            campos.sueldo = ent.sueldo;
            campos.stlaboral = ent.stlaboral;
            campos.experiencia = ent.experiencia;
            campos.stcontrato = ent.stcontrato;
            campos.partdirigido = ent.partdirigido;
            campos.entrenandoEquipo = ent.entrenandoEquipo;
            campos.username = document.getElementById("username").value;
            campos.password = document.getElementById("password").value;
        }

        //Validaciones
        let valid = true;
        let mensaje = "";

        if(!campos.username || campos.username.length < 5 || campos.username.length > 15){
            mensaje += "El campo <span class='campo-errado'>Usuario</span> no puede estar vacío y debe tener entre 5 y 15 caracteres.\n";
            valid = false;
        }

        if(!campos.password || campos.password.length < 8 || campos.password.length > 20){
            mensaje += "El campo <span class='campo-errado'>Contraseña</span> no puede estar vacío y debe tener entre 8 y 20 caracteres.\n";
            valid = false;
        }

        if(document.getElementById("confirmarPassword").value === ""){
            mensaje += "Es obligatorio confirmar la contraseña.\n";
            valid = false;
        }else if(campos.password !== document.getElementById("confirmarPassword").value){
            mensaje += "Las contraseñas no coinciden.\n";
            valid = false;
        }

        if(!valid){
            mostrarMensajeError(mensaje);
            return;
        }else{
            if(campos.rol === "Administrador"){
                //Se registrar un usuario con rol administrador
                const peticion = await fetch(`http://localhost:8085/api/administrador/update/${id}`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(campos)
                });

                if(peticion.ok){
                    /*alert("Usuario registrado con éxito");
                    window.location.href = '/proyectoIS/src/app/pantalla-usuario/Tabla-Consultar-Editar/pantalla-usuario-tabla.component.html';*/
                    mostrarMensajeExito();
                }else{
                    throw new Error("Error en la respuesta de la API");
                }
            }else{                
                //Se registrar un usuario con rol entrenador
                const peticion = await fetch(`http://localhost:8085/api/entrenador/update/${id}`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(campos)
                });

                if(peticion.ok){
                    /*alert("Usuario registrado con éxito");
                    window.location.href = '/proyectoIS/src/app/pantalla-usuario/Tabla-Consultar-Editar/pantalla-usuario-tabla.component.html';*/
                    mostrarMensajeExito();
                }else{
                    throw new Error("Error en la respuesta de la API");
                }
            }
        }
    } catch (error) {
        console.error("Error al registrar el usuario: ", error);
        mostrarMensajeError("Ocurrió un error. Inténtelo de nuevo");
    }
};

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
    messageTitle.textContent = 'Usuario registrado con éxito';

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
    messageTitle.textContent = 'Error al registrar el usuario';

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