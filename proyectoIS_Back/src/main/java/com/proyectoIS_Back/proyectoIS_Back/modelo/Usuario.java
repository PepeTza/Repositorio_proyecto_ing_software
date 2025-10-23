package com.proyectoIS_Back.proyectoIS_Back.modelo;

import jakarta.persistence.Entity;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity(name = "usuario")
@Table(name = "tbl_usuario")
@PrimaryKeyJoinColumn(name = "id", referencedColumnName = "id")
@Inheritance(strategy = InheritanceType.JOINED)
public class Usuario extends Empleado {

    private String username;
    private String password;

    public Usuario(String nombre, Long cedula, String sexo, int edad, String nacionalidad, String correo, String telefono,
            String rol, float sueldo, String stlaboral, int experiencia, String username, String password) {
        super(nombre, cedula, sexo, edad, nacionalidad, correo, telefono, rol, sueldo, stlaboral, experiencia);
        this.username = username;
        this.password = password;
    }

    public Usuario() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
