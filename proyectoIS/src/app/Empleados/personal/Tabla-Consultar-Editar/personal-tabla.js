window.onload = function() {
    listarPersonal();
}

let listarPersonal = async () =>{
    try {
        const peticion = await fetch('http://localhost:8085/api/personal',{
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });
        
        if(!peticion.ok){
            throw new Error('Error en la petición');
        }
        
        const personal = await peticion.json();
        let contenidoTabla = '';

        for(let person of personal){
            let contenidoFila = `<tr>
            <td>${person.id}</td>
            <td>${person.nombre}</td>
            <td>${person.cedula}</td>
            <td>${person.sexo}</td>
            <td>${person.edad}</td>
            <td>${person.sueldo}</td>
            <td>
            <i onClick="consultarPersonales(${person.id})" class="material-icons button consultar">visibility</i>
            <i onClick="editarPersonal(${person.id})" class="material-icons button editar">edit</i>
            <i onClick="eliminarPersonal(${person.id})" class="material-icons button eliminar">delete</i>
            </td>
            </tr>`
            contenidoTabla += contenidoFila;
        }
    
        document.querySelector('#tablaPersonal tbody').innerHTML = contenidoTabla;    
    } catch (error) {
        console.error("Erro en el servidor: ", error);
    }
    
}

let consultarPersonales = (id) =>{
    // Abrir una nueva ventana con el archivo consultarpersonal.html y pasar el ID del personal en la URL
    window.location.href = `personal-consultar.html?id=${id}`;
}

let editarPersonal= (id) =>{
    // Abrir una nueva ventana con el archivo editarpersonal.html y pasar el ID del personal en la URL
    window.location.href = `personal-editar.html?id=${id}`
}

let eliminarPersonal = async(id) =>{
    //Confirmar la acción de eliminar
    if(await mostrarMensajeConfirmacion()){
        try {
            const peticion = await fetch(`http://localhost:8085/api/personal/delete/${id}`, {
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
                listarPersonal();
            }
        } catch (error) {
            console.error("Error en el servidor: ",error);
            mostrarMensajeError("Error al eliminar el personal");
        }
    }
}

function volver(){
    window.location.href = "/proyectoIS/src/app/Empleados/menu/menu.html";
}

//Crea y muestra el mensaje de exito de empleado común eliminado
function mostrarMensajeExito() {
    //crear el overlay
    const overlay = document.createElement("div");
    overlay.className = 'overlay';

    //Crear el cuadro de mnsaje
    const messageBox = document.createElement("div");
    messageBox.className = 'message-box';

    //Crear el título del mensaje
    const messageTitle = document.createElement('h2');
    messageTitle.textContent = 'Empleado común eliminado exitosamente';

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
    messageTitle.textContent = 'Error al eliminar al empleado común';

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
        messageTitle.textContent = '¿Estás seguro de borrar este emeplado común?';

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