document.addEventListener('DOMContentLoaded',()=>{
    const userRol = localStorage.getItem('userRol');
    
    if(userRol === "Entrenador"){
        //Ocultar los enlaces de "Empleados" y "Usuarios"
        document.querySelectorAll('.nav-item').forEach(item => {
            if(item.textContent.includes('Empleados') || item.textContent.includes('Usuarios')){
                item.style.display = 'none';
            }
        })
    }

})