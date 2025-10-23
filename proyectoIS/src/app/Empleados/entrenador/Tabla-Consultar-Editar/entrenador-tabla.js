window.onload = function() {
    listarEntrenador();
}

let listarEntrenador = async () =>{
    try {
        const peticion = await fetch('http://localhost:8085/api/entrenador',{
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });
        
        if(!peticion.ok){
            throw new Error('Error en la petición');
        }
        
        const entrenador = await peticion.json();
        let contenidoTabla = '';

        for(let entre of entrenador){
            let contenidoFila = `<tr>
            <td>${entre.id}</td>
            <td>${entre.nombre}</td>
            <td>${entre.cedula}</td>
            <td>${entre.sexo}</td>
            <td>${entre.edad}</td>
            <td>${entre.sueldo}</td>
            <td>
            <i onClick="consultarEntrenadores(${entre.id})" class="material-icons button consultar">visibility</i>
            <i onClick="editarEntrenador(${entre.id})" class="material-icons button editar">edit</i>
            <i onClick="eliminarEntrenador(${entre.id})" class="material-icons button eliminar">delete</i>
            </td>
            </tr>`
            contenidoTabla += contenidoFila;
        }
    
        document.querySelector('#tablaEntrenador tbody').innerHTML = contenidoTabla;    
    } catch (error) {
        console.error("Erro en el servidor: ", error);
    }
    
}

let consultarEntrenadores = (id) =>{
    // Abrir una nueva ventana con el archivo consultarEntrenador.html y pasar el ID del Entrenador en la URL
    window.location.href = `Entrenador-consultar.html?id=${id}`;
}

let editarEntrenador= (id) =>{
    // Abrir una nueva ventana con el archivo editarEntrenador.html y pasar el ID del Entrenador en la URL
    window.location.href = `Entrenador-editar.html?id=${id}`
}

let eliminarEntrenador = async(id) =>{
    //Confirmar la acción de eliminar
    if(await mostrarMensajeConfirmacion()){
        try {
            const peticion = await fetch(`http://localhost:8085/api/entrenador/delete/${id}`, {
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
                listarEntrenador();
            }
        } catch (error) {
            console.error("Error en el servidor: ",error);
            mostrarMensajeError("Error al eliminar el Entrenador");
        }
    }
}

function volver(){
    window.location.href = "/proyectoIS/src/app/Empleados/menu/menu.html";
}

//Crea y muestra el mensaje de confirmación
function mostrarMensajeExito() {
    //crear el overlay
    const overlay = document.createElement("div");
    overlay.className = 'overlay';

    //Crear el cuadro de mnsaje
    const messageBox = document.createElement("div");
    messageBox.className = 'message-box';

    //Crear el título del mensaje
    const messageTitle = document.createElement('h2');
    messageTitle.textContent = 'Entrenador eliminado exitosamente';

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
    messageTitle.textContent = 'Error al eliminar el entrenador';

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
        messageTitle.textContent = '¿Estás seguro de borrar este entrenador?';

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