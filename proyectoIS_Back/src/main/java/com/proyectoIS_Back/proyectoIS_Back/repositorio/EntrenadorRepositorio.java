package com.proyectoIS_Back.proyectoIS_Back.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyectoIS_Back.proyectoIS_Back.modelo.Entrenador;

@Repository
public interface EntrenadorRepositorio extends JpaRepository<Entrenador, Long> {

    boolean existsByCedula(Long cedula); //Verificar si exite la cédula

    boolean existsByCorreo(String correo); //Verificar si existe el correo

    boolean existsByTelefono(String telefono); //Verificar si existe el teléfono
}
