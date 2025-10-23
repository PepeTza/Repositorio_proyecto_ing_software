document.addEventListener("DOMContentLoaded", ()=>{
    //Funcionalidad para mostrar/ocultar la contraseña
    const togglePassword = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("campoPassword");

    togglePassword.addEventListener("click",()=>{
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type",type);
        togglePassword.classList.toggle("fa-eye"); //Ícono de ojo cerrada
        togglePassword.classList.toggle("fa-eye-slash"); //Ícono de ojo abierta
    })
})

let boton = document.getElementById('btnIniciarSecion');

async function cargarListaUsuarios(username,password){
    try {
        const peticion = await fetch('http://localhost:8085/api/usuario',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const listaUsuarios = await peticion.json();
    
        for(let usuario of listaUsuarios){
            if(usuario.username === username && usuario.password === password){
                //Almacena el rol del usuario en el localStorage
                localStorage.setItem('userRol', usuario.rol);
                return true;
            }
        }
        
        return false;    
    } catch (error) {
       console.error('Error al cargar la lista de usuarios: ', error); 
       return false;
    }
    
}

async function iniciarSeccion(evento){
    evento.preventDefault();

    const usuario = document.getElementById('campoUsuario').value;
    const password = document.getElementById('campoPassword').value;
    
    if(!usuario || !password){
        mostrarMensajeError('Por favor, ingrese el nombre de usuario y la contraseña');
        return;
    }else{
        if(await cargarListaUsuarios(usuario,password)){
            window.location.href = '/proyectoIS/src/app/pantalla-inicio/pantalla-inicio.component.html';
        }else if(await cargarListaUsuarios(usuario,password) === false){
            mostrarMensajeError('Usuario y/o contreseña incorrectos');
        }
    }
}

boton.addEventListener('click', iniciarSeccion);

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
    messageTitle.textContent = 'Error al iniciar sesión';

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