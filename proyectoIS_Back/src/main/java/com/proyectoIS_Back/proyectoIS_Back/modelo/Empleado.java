package com.proyectoIS_Back.proyectoIS_Back.modelo;

import jakarta.persistence.Entity;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;

@Entity(name = "empleado")
@Table(name = "tbl_empleado")
@Inheritance(strategy = InheritanceType.JOINED)
public class Empleado extends Persona {

    private String correo;
    private String telefono;
    private String rol;
    private float sueldo;
    private String stlaboral;
    private int experiencia; //AÑOS DE experiencia DEL EMPLEADO

    public Empleado(String nombre, Long cedula, String sexo, int edad, String nacionalidad, String correo, String telefono,
            String rol, float sueldo, String stlaboral, int experiencia) {
        super(nombre, cedula, sexo, edad, nacionalidad);
        this.correo = correo;
        this.telefono = telefono;
        this.rol = rol;
        this.sueldo = sueldo;
        this.stlaboral = stlaboral;
        this.experiencia = experiencia;
    }

    public Empleado() {
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public float getSueldo() {
        return sueldo;
    }

    public void setSueldo(float sueldo) {
        this.sueldo = sueldo;
    }

    public String getStlaboral() {
        return stlaboral;
    }

    public void setStlaboral(String stlaboral) {
        this.stlaboral = stlaboral;
    }

    public int getExperiencia() {
        return experiencia;
    }

    public void setExperiencia(int experiencia) {
        this.experiencia = experiencia;
    }

}
