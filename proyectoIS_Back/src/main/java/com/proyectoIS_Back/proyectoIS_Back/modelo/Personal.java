package com.proyectoIS_Back.proyectoIS_Back.modelo;

import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity(name = "personal")
@Table(name = "tbl_personal")
@PrimaryKeyJoinColumn(name = "id", referencedColumnName = "id")
public class Personal extends Empleado {

    public Personal(String nombre, Long cedula, String sexo, int edad, String nacionalidad, String correo,
            String telefono, String rol, float sueldo, String stlaboral, int experiencia) {
        super(nombre, cedula, sexo, edad, nacionalidad, correo, telefono, rol, sueldo, stlaboral, experiencia);
    }

    public Personal() {
    }
}
