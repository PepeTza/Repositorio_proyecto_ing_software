window.onload = function() {
    listarAdministrador();
}

let listarAdministrador = async () =>{
    try {
        const peticion = await fetch('http://localhost:8085/api/administrador',{
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });
        
        if(!peticion.ok){
            throw new Error('Error en la petición');
        }
        
        const administrador = await peticion.json();
        let contenidoTabla = '';

        for(let admin of administrador){
            let contenidoFila = `<tr>
            <td>${admin.id}</td>
            <td>${admin.nombre}</td>
            <td>${admin.cedula}</td>
            <td>${admin.sexo}</td>
            <td>${admin.edad}</td>
            <td>${admin.sueldo}</td>
            <td>
            <i onClick="consultarAdministradores(${admin.id})" class="material-icons button consultar">visibility</i>
            <i onClick="editarAdministrador(${admin.id})" class="material-icons button editar">edit</i>
            <i onClick="eliminarAdministrador(${admin.id})" class="material-icons button eliminar">delete</i>
            </td>
            </tr>`
            contenidoTabla += contenidoFila;
        }
    
        document.querySelector('#tablaAdministrador tbody').innerHTML = contenidoTabla;    
    } catch (error) {
        console.error("Erro en el servidor: ", error);
    }
    
}

let consultarAdministradores = (id) =>{
    // Abrir una nueva ventana con el archivo consultaradministrador.html y pasar el ID del administrador en la URL
    window.location.href = `administrador-consultar.html?id=${id}`;
}

let editarAdministrador= (id) =>{
    // Abrir una nueva ventana con el archivo editaradministrador.html y pasar el ID del administrador en la URL
    window.location.href = `administrador-editar.html?id=${id}`
}

let eliminarAdministrador = async(id) =>{
    if(await mostrarMensajeConfirmacion()){  
        try {
            const peticion = await fetch(`http://localhost:8085/api/administrador/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });

            if(!peticion.ok){
                throw new Error('Error en la eliminación')
            }else{
                mostrarMensajeExito();
                listarAdministrador();
            }
        } catch (error) {
            console.error("Error en el servidor: ",error);
            mostrarMensajeError("Error al eliminar el administrador");
        }
    }
}

function volver(){
    window.location.href = "/proyectoIS/src/app/Empleados/menu/menu.html";
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
    messageTitle.textContent = 'Administrador eliminado exitosamente';

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
    messageTitle.textContent = 'Error al eliminar el administrador';

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
        messageTitle.textContent = '¿Estás seguro de borrar este administrador?';

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