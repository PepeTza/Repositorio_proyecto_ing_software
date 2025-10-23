package com.proyectoIS_Back.proyectoIS_Back.modelo;

import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity(name = "administrador")
@Table(name = "tbl_administrador")
@PrimaryKeyJoinColumn(name = "id", referencedColumnName = "id")
public class Administrador extends Usuario {

    private String especializacion;

    public Administrador(String nombre, Long cedula, String sexo, int edad, String nacionalidad, String correo,
            String telefono, String rol, float sueldo, String stlaboral, int experiencia, String username,
            String password, String especializacion) {
        super(nombre, cedula, sexo, edad, nacionalidad, correo, telefono, rol, sueldo, stlaboral, experiencia, username,
                password);
        this.especializacion = especializacion;
    }

    public Administrador() {
    }

    public String getEspecializacion() {
        return especializacion;
    }

    public void setEspecializacion(String especializacion) {
        this.especializacion = especializacion;
    }

}
