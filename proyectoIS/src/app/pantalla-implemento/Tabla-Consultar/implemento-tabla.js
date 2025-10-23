document.addEventListener('DOMContentLoaded',()=>{
    const userRol = localStorage.getItem('userRol');

    if(userRol === "Entrenador"){
        //Ocultar los enlaces de "Empleados" y "Usuarios"
        document.querySelectorAll('.nav-item').forEach(item => {
            if(item.textContent.includes('Empleados') || item.textContent.includes('Usuarios')){
                item.style.display = 'none';
            }
        });

        //Ocultar el botón de "Agregar Implemento"
        document.getElementById('btnAgregarImplemento').style.display = 'none';
    }
});

window.onload = function() {
    listarImplementos();
}

let listarImplementos = async () => {
    const peticion = await fetch('http://localhost:8085/api/implementos',
        {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "content-Type": "application/json"
            }
        }        
    )
    const implemento = await peticion.json();
    
    const userRol = localStorage.getItem('userRol');
    let contenidoTabla = '';

    for(let imp of implemento){
        let contenidoFila = `<tr>
        <td>${imp.id}</td>
        <td>${imp.nombre}</td>
        <td>${imp.cantidad}</td>
        <td>
            <i onClick="consultarImplementos(${imp.id})"class="material-icons button read">visibility</i>
            <i onClick="editarImplemento(${imp.id})"class="material-icons button edit">edit</i>
            ${userRol !== "Entrenador" ?`
            <i onClick="borrarImplemento(${imp.id})"class="material-icons button delete">delete</i>
            ` : ''}
        </td>
        </tr>`
        contenidoTabla += contenidoFila;
    }

    document.querySelector('#tablaImplementos tbody').outerHTML = contenidoTabla;
}

let editarImplemento = (id) => {
    window.location.href = `../Modificar-Implemento/implemento-editar.html?id=${id}`;
}

let borrarImplemento = async (id) => {
    //const confirmacion = confirm("¿Estas seguro de borrar este implemento?");
    let confirmacion = await mensajeConfimacionBorrado();
    if (confirmacion){
        try{
            const peticion = await fetch('http://localhost:8085/api/implementos/eliminar/'+id,
                {
                    method: 'DELETE',
                    headers: {
                        "Accept": "application/json",
                        "content-Type": "application/json"
                    }
                }
            )
            if(peticion.ok){
                mostrarMensajeExito();
            }else{
                mostrarMensajeErrorBorrado();
            }
        }catch(error){
            console.error("Error al eliminar el implemento:", error);
            //alert("Ocurrio un error al intentar eliminar el implemento.");
            mostrarMensajeErrorBorrado()
        }
    }
    listarImplementos();
}

function mensajeConfimacionBorrado() {
    return new Promise((resolve) => {
        //crear el overlay
        const overlay = document.createElement("div");
        overlay.className = 'overlay';

        //Crear el cuadro de mnsaje
        const messageBox = document.createElement("div");
        messageBox.className = 'message-boxConfirmacion';

        //Crear el título del mensaje
        const messageTitle = document.createElement('h2');
        messageTitle.textContent = '¿Estás seguro de eliminar este implemento?';

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

function mostrarMensajeExito() {
    //crear el overlay
    const overlay = document.createElement("div");
    overlay.className = 'overlay';

    //Crear el cuadro de mnsaje
    const messageBox = document.createElement("div");
    messageBox.className = 'message-box';

    //Crear el título del mensaje
    const messageTitle = document.createElement('h2');
    messageTitle.textContent = 'Implemento eliminado con éxito';

    //Crear el botón de OK
    const okButton = document.createElement('button');
    okButton.id = 'okButton';
    okButton.innerText = 'OK';
    okButton.addEventListener('click', function() {
        overlay.remove(); //Eliminar el overlay al hacer clic en OK 
        window.location.href = "../Tabla-Consultar/implemento-tabla.html"; // Redirigir a la tabla
    });

    //Agregar el título y el botón al cuadro de mensaje
    messageBox.appendChild(messageTitle);
    messageBox.appendChild(okButton);

    //Agregar el cuadro de mensaje al overlay
    overlay.appendChild(messageBox);

    //Agregar el overlay al body del documento
    document.body.appendChild(overlay);
}

function mostrarMensajeErrorBorrado() {
    //crear el overlay
    const overlay = document.createElement("div");
    overlay.className = 'overlay';

    //Crear el cuadro de mnsaje
    const messageBox = document.createElement("div");
    messageBox.className = 'message-boxError';

    //Crear el título del mensaje
    const messageTitle = document.createElement('h2');
    messageTitle.textContent = 'Error al borrar el implemento';

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
let consultarImplementos = (id) => {
    // Abrir una nueva ventana con el archivo consultarJugador.html y pasar el ID del jugador en la URL
    window.location.href = `implemento-consultar.html?id=${id}`;
}