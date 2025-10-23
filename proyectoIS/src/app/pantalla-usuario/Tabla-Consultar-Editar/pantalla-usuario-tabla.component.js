window.onload = function() {
    listarUsuarios();
}

let listarUsuarios = async () => {
    const peticion = await fetch('http://localhost:8085/api/usuario',
        {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "content-Type": "application/json"
            }
        }        
    )
    const usuarios = await peticion.json();
    let contenidoTabla = '';

    for(let usu of usuarios){
        if(usu.username === ''){
            let contenidoFila = `<tr>
            <td>${usu.id}</td>
            <td>${usu.nombre}</td>
            <td>${usu.rol}</td>
            <td>Sin registrar</td>
            <td>
            <i onClick="registrarUsuario(${usu.id})" class="material-icons button registrar">person_add</i>
            </td>
            </tr>`
            contenidoTabla += contenidoFila;
        }else if(usu.username !== ''){
            let contenidoFila = `<tr>
            <td>${usu.id}</td>
            <td>${usu.nombre}</td>
            <td>${usu.rol}</td>
            <td>${usu.username}</td>
            <td>
            <i onClick="consultarUsuario(${usu.id})" class="material-icons button consultar">visibility</i>
            <i onClick="editarUsuario(${usu.id})" class="material-icons button editar">edit</i>
            <i onClick="eliminarUsuaio(${usu.id})" class="material-icons button eliminar">delete</i>
            </td>
            </tr>`
            contenidoTabla += contenidoFila;
        }
    }

    document.querySelector('#tablaUsuario tbody').outerHTML = contenidoTabla;
}

let registrarUsuario = (id) => {
    // Abrir una nueva ventana con el archivo usuario-formulario.html y pasar el ID del usuario en la URL
    window.location.href = `/proyectoIS/src/app/pantalla-usuario/Formulario/usuario-formulario.html?id=${id}`;
}

let consultarUsuario = (id) => {
    // Abrir una nueva ventana con el archivo pantalla-usuario-consultar.component.html y pasar el ID del usuario en la URL
    window.location.href = `pantalla-usuario-consultar.component.html?id=${id}`;
}

let editarUsuario = (id) => {
    // Abrir una nueva ventana con el archivo pantalla-usuario-editar.component.html y pasar el ID del usuario en la URL
    window.location.href = `/proyectoIS/src/app/pantalla-usuario/Tabla-Consultar-Editar/pantalla-usuario-editar.componente.html?id=${id}`;
}

let eliminarUsuaio = async (id) => {
    //Confirmar la acción de eliminar
    if(await mostrarMensajeConfirmacion()){
        try {
            let campos = {};
            let respuesta = await fetch(`http://localhost:8085/api/usuario/${id}`);
            const usuario = await respuesta.json();
    
            if(usuario.rol === 'Administrador'){
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
                campos.username = "";
                campos.password = "";

                respuesta = await fetch(`http://localhost:8085/api/administrador/update/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(campos),
                });

                if(respuesta.ok){
                    //alert('Usuario del administrador eliminado correctamente');
                    mostrarMensajeExito(usuario.rol);
                    listarUsuarios();
                }else{
                    throw new Error('Error en la eliminación');
                }

            }else if(usuario.rol === 'Entrenador'){
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
                campos.username = "";
                campos.password = "";

                respuesta = await fetch(`http://localhost:8085/api/entrenador/update/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(campos),
                });

                if(respuesta.ok){
                    //alert('Usuario del entrenador eliminado correctamente');
                    mostrarMensajeExito(usuario.rol);
                    listarUsuarios();
                }else{
                    throw new Error('Error en la eliminación');
                }
            }
        } catch (error) {
            console.error("Error al eliminar usuario: ", error);
            mostrarMensajeError("Ocurrió un error. Inténtelo de nuevo.");
        }
        
    }
}

//Crea y muestra el mensaje de exito
function mostrarMensajeExito(rol) {
    //crear el overlay
    const overlay = document.createElement("div");
    overlay.className = 'overlay';

    //Crear el cuadro de mnsaje
    const messageBox = document.createElement("div");
    messageBox.className = 'message-box';

    //Crear el título del mensaje
    const messageTitle = document.createElement('h2');
    messageTitle.textContent = 'Usuario del ' + rol + ' eliminado exitosamente';

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
function mostrarMensajeError(mensaje) {
    //crear el overlay
    const overlay = document.createElement("div");
    overlay.className = 'overlay';

    //Crear el cuadro de mnsaje
    const messageBox = document.createElement("div");
    messageBox.className = 'message-boxError';

    //Crear el título del mensaje
    const messageTitle = document.createElement('h2');
    messageTitle.textContent = 'Error al eliminar el usuario';

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
        messageTitle.textContent = '¿Estás seguro de eliminar el usuario?';

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

        //Agregar los botones al contenedor de botones
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