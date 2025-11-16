1. Descargar e instalar jdk 25

Opcional configurar el path para poder hacer los siguientes comandos con java, hay que agregar una nueva variable de entorno que va a tener de nombre [JAVA_HOME] 
su ruta va a ser la ruta donde se instalo el java, por ejemplo [C:\Program Files\Java\jdk-25], luego de eso hay que editar la pariable de entorno path y agregar 
este texto [%JAVA_HOME%\bin].

2. Comprobar que java este instalado con el comando [java -version].

3. Ejecutar el comando [.\mvnw.cmd clean install -DskipTests].

4. Instalar MySQL con su Workbench.

5. Crear una nueva base de datos llamada [proyectois].

6. Verificar en el archivo [proyectoIS_Back\src\main\resources\application.properties] que existan las siguientes lineas de codigo:
    
    spring.datasource.url=jdbc:mysql://localhost:3306/proyectois
    spring.datasource.username=root
    spring.datasource.password=[La contraseña que escogiste mamawebo]

7. Instalar la extension [live server] si aun no la tienes.

8. Abrir MySQL Workbench si no esta abierto y comprobar las tablas de la vase de datos [proyectois].

9. Abrir un editor de query y ejecutar lo siguiente:

    INSERT INTO tbl_persona (edad, nombre, cedula, nacionalidad, sexo)
    VALUES (30, 'Admin Sistema', 0, 'Local', 'M');
    SET @newId = LAST_INSERT_ID();
    SELECT @newId AS new_persona_id;
    INSERT INTO tbl_empleado (id, experiencia, sueldo, rol, stlaboral, correo, telefono)
    VALUES (@newId, 0, 0.0, 'ADMIN', 'ACTIVO', 'admin@local', NULL);
    INSERT INTO tbl_usuario (id, username, password)
    VALUES (@newId, 'admin', '123456');
    SELECT * FROM tbl_persona WHERE id = @newId;
    SELECT * FROM tbl_empleado WHERE id = @newId;
    SELECT * FROM tbl_usuario WHERE id = @newId;

7. Ejecutar el comando [.\mvnw.cmd spring-boot:run].

8. Ejecutar [proyectoIS\src\app\login\login.component.html] con [live server].

9. iniciar sesion con el usuario: admin y la clave: 123456.