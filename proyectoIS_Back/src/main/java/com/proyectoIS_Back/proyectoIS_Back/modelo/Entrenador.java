package com.proyectoIS_Back.proyectoIS_Back.modelo;

import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity(name = "entrenador")
@Table(name = "tbl_entrenador")
@PrimaryKeyJoinColumn(name = "id", referencedColumnName = "id")
public class Entrenador extends Usuario {

    private String stcontrato; //STATUS DEL CONTRATO
    private long partdirigido; //PARTIDOS DIRIGIDOS POR EL ENTRENADOR
    private String entrenandoEquipo;

    public Entrenador(String nombre, Long cedula, String sexo, int edad, String nacionalidad, String correo,
            String telefono, String rol, float sueldo, String stlaboral, int experiencia, String username,
            String password, String stcontrato, long partdirigido, String entrenandoEquipo) {
        super(nombre, cedula, sexo, edad, nacionalidad, correo, telefono, rol, sueldo, stlaboral, experiencia, username,
                password);
        this.stcontrato = stcontrato;
        this.partdirigido = partdirigido;
        this.entrenandoEquipo = entrenandoEquipo;
    }

    public Entrenador() {
    }

    public String getStcontrato() {
        return stcontrato;
    }

    public void setStcontrato(String stcontrato) {
        this.stcontrato = stcontrato;
    }

    public long getPartdirigido() {
        return partdirigido;
    }

    public void setPartdirigido(long partdirigido) {
        this.partdirigido = partdirigido;
    }

    public String getEntrenandoEquipo() {
        return entrenandoEquipo;
    }

    public void setEntrenandoEquipo(String entrenandoEquipo) {
        this.entrenandoEquipo = entrenandoEquipo;
    }

}
