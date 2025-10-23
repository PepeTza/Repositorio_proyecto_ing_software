async function cargarDatosImplementos(){
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if(!id){
        mostrarMensajeError('No se proporcionó el ID del implemento');
        return;
    }

    try{
        const peticion = await fetch(`http://localhost:8085/api/implementos/${id}`);

        if(!peticion.ok){
            throw new Error('Error al cargar el implemento');
        }

        const implemento = await peticion.json();

        if(implemento){
            document.getElementById("nombre").value = implemento.nombre;
            document.getElementById("tipo").value = implemento.tipo;
            document.getElementById("material").value = implemento.material;
            document.getElementById("marca").value = implemento.marca;
            document.getElementById("cantidad").value = implemento.cantidad;
        }
        else{
            console.error("Error al cargar los datos de implemento");
            mostrarMensajeError("No se encontró el implemento.");
        }

    }catch(error){
        console.error("Error al cargar los datos del implemento:", error);
        mostrarMensajeError("Ocurrio un error al intentar cargar los datos del implemento.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const userRol = localStorage.getItem('userRol');
    cargarDatosImplementos();
    
    if(userRol === "Entrenador"){
       //Ocultar los enlaces de  "Empleados" y "Usuarios"
        document.querySelectorAll('.nav-item').forEach(item => {
            if(item.textContent.includes('Empleados') || item.textContent.includes('Usuarios')){
                item.style.display = 'none';
            }
        });
       
        //Evita que sea modificados los campos nombre, tipo, material y marca
        const campos = ["nombre", "tipo", "material", "marca"];
        campos.forEach(campo => {
            const input = document.getElementById(campo);
            input.disabled = true;
            input.classList.add("disabled");
        });
    }
});

let boton = document.getElementById("boton");

boton.addEventListener("click", async evento=>{
    evento.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if(!id){
        mostrarMensajeError('No se proporcionó el ID del implemento');
        return;
    }

    try{
        const peticion = await fetch(`http://localhost:8085/api/implementos/${id}`);

        if(!peticion.ok){
            throw new Error('Error al cargar el implemento');
        }

        const implemento = await peticion.json();
        let nombre = document.getElementById("nombre").value;
        if(nombre === ""){
            mostrarMensajeError("El <span class='campo-errado'>Nombre del Implemento</span> no puede estar vacío.");
            return;
        }else{
            const existe = await verificarNombreConIsNombre(nombre);
            if(existe && nombre !==implemento.nombre){
                mostrarMensajeError("El <span class='campo-errado'>Nombre del Implemento</span> ya existe.\n");
                return;
            }else if(nombre === implemento.nombre || !existe){
                guardarModificacion();
            }
        }
    }
    catch(error){
        console.error("Error al cargar los datos del implemento:", error);
        alert("Ocurrio un error al intentar cargar los datos del implemento.");
    }
});

let verificarNombreConIsNombre = async (nombre)=>{
    const respuesta = await fetch(`http://localhost:8085/api/implementos/existe/${nombre}`);
    return await respuesta.json();
};

let verificarNombre = document.getElementById("nombre");
let nombreError = document.getElementById("nombreError");

//Validar en el evento blur
verificarNombre.addEventListener("blur", ()=>{
    let nombreValue = verificarNombre.value.trim();

    if(nombreValue <3){
        nombreError.style.display = "inline";
    }else{
        nombreError.style.display = "none";
    }
})

verificarNombre.addEventListener("keypress",function(event){
    const charCode = event.charCode;

    if((charCode < 65 || charCode > 90) && (charCode <97 || charCode>122)&&(charCode!=32)){
        event.preventDefault();
    }

    if(verificarNombre.value.length >= 20){
        event.preventDefault();
    }
})

let verificarTipo = document.getElementById("tipo");
let tipoError = document.getElementById("tipoError");

verificarTipo.addEventListener("blur",function(event){
    let tipoValue = verificarTipo.value.trim();

    if(tipoValue < 4){
        tipoError.style.display = "inline";
    }else{
        tipoError.style.display = "none";
    }
})

verificarTipo.addEventListener("keypress",function(event){
    const charCode = event.charCode;

    if((charCode < 65 || charCode > 90) && (charCode <97 || charCode>122)&&(charCode!=32)){
        event.preventDefault();
    }

    if(verificarTipo.value.length >= 15){
        event.preventDefault();
    }
})

let verificarMaterial = document.getElementById("material");
let errorMaterial = document.getElementById("materialError");

verificarMaterial.addEventListener("keypress",function(event){
    const charCode = event.charCode;   
    if((charCode < 65 || charCode > 90) && (charCode <97 || charCode>122)&&(charCode!=32)){
        event.preventDefault();
    }
    
    if(verificarMaterial.value.length >= 20){
        event.preventDefault();
    }
})

verificarMaterial.addEventListener("blur",function(event){
    let materialValue = verificarMaterial.value.trim();

    if(materialValue < 5){
        errorMaterial.style.display = "inline";
    }else{
        errorMaterial.style.display = "none";
    }
})

let verificarMarca = document.getElementById("marca");
let marcaError = document.getElementById("marcaError");

verificarMarca.addEventListener("blur",function(event){
    let marcaValue = verificarMarca.value.trim();

    if(marcaValue < 3){
        marcaError.style.display = "inline";
    }else{
        marcaError.style.display = "none";
    }
});
verificarMarca.addEventListener("keypress",function(event){
    const charCode = event.charCode;

    if((charCode < 65 || charCode > 90) && (charCode <97 || charCode>122)&&(charCode!=32)){
        event.preventDefault();
    }

    if(verificarMarca.value.length >= 20){
        event.preventDefault();
        marcaError.style.display="inline";
    }
})

let verificarCantidad = document.getElementById("cantidad");
let cantidadErrada = document.getElementById("cantidadError");

verificarCantidad.addEventListener("blur",function(){
    const cantValue = parseInt(verificarCantidad.value);

    if(isNaN(cantValue)|| cantValue<0 || cantValue>40){
        cantidadErrada.style.display = "inline";
    }
    else{
        cantidadErrada.style.display = "none";
    }
})

verificarCantidad.addEventListener("focus",function(){
    cantidadErrada.style.display = "none";
})

async function guardarModificacion(){
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    let confirmacion = await mostrarMensajeConfirmacion();
    if(confirmacion){

        let campos = {};
        let mensajeError = "";
        let valid = true;

        campos.id = id;
        campos.nombre = document.getElementById("nombre").value;
        campos.tipo = document.getElementById("tipo").value;
        campos.material = document.getElementById("material").value;
        campos.marca = document.getElementById("marca").value;
        if(!document.getElementById("cantidad").value){
            mensajeError += "Debe ingresar la <span class='campo-errado'>Cantidad del Implemento</span>.\n";
            valid = false;
        }else{
            campos.cantidad = parseInt(document.getElementById("cantidad").value);
        }

        if(!campos.nombre || campos.nombre.length < 3 || campos.nombre.length > 20){
            mensajeError += "El <span class='campo-errado'>Nombre del Implemento</span> no puede estar vacío y solo se permiten de 3 a 20 caracteres.\n";
            valid = false;
        }
        
        if(!campos.tipo){
            mensajeError += "Debe ingresar el <span class='campo-errado'>Tipo del Implemento</span>.\n";
            valid = false;
        }else if(campos.tipo.length <4 || campos.tipo.length > 20 ){
            mensajeError += "El <span class='campo-errado'>Tipo del Implemento</span> solo se permiten de 4 a 20 caracteres.\n";
            valid = false;
        }
        
        if(!campos.material){
            mensajeError += "Debe ingresar el <span class='campo-errado'>Material del Implemento</span>.\n";
            valid = false;
        }else if(campos.material.length < 6 || campos.material.length > 30){
            mensajeError += "El <span class='campo-errado'>Material del Implemento</span> solo se permiten de 6 a 30 caracteres.\n";
            valid = false;
        }
        
        if(!campos.marca){
            mensajeError += "Debe ingresar la <span class='campo-errado'>Marca del Implemento</span>.\n";
            valid = false;
        }else if(campos.marca.length < 4 || campos.marca.length >20){
            mensajeError += "El <span class='campo-errado'>Marca del Implemento</span> solo se permiten de 4 a 20 caracteres.\n";
            valid = false;
        }
        
        if(isNaN(campos.cantidad) || campos.cantidad < 0 || campos.cantidad > 40){
            mensajeError += "Debe ingresar una <span class='campo-errado'>Cantidad</span> válida entre 0 y 40. ";
            valid = false;
        }
        
        if(!valid){
            mostrarMensajeError(mensajeError);
            return;
        }
        
        try{
            const peticion = await fetch(`http://localhost:8085/api/implementos/update`,{
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(campos)
            })
    
            if(peticion.ok){
                mostrarMensajeExito();
            }else{
                mostrarMensajeError("Error al modificar el implemento");
                console.error("Error:", await peticion.text());
            }
    
        }catch(error){
            console.error("Error al guardar los cambios:", error);
            mostrarMensajeError("Ocurrio un error al intentar guardar los cambios del implemento.");
            return;
        }
    }else{
        window.location.href = "../Tabla-Consultar/implemento-tabla.html";
    }
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
    messageTitle.textContent = 'Implemento modificado con éxito';

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

function mostrarMensajeError(mensaje) {
    //crear el overlay
    const overlay = document.createElement("div");
    overlay.className = 'overlay';

    //Crear el cuadro de mnsaje
    const messageBox = document.createElement("div");
    messageBox.className = 'message-boxError';

    //Crear el título del mensaje
    const messageTitle = document.createElement('h2');
    messageTitle.textContent = 'Error al modificar el implemento';

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
        messageTitle.textContent = '¿Estás seguro de modificar este implemento?';

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

function volver() {
    window.history.back(); // Regresar a la página anterior
}