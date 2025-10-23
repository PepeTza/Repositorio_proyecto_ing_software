package com.proyectoIS_Back.proyectoIS_Back.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyectoIS_Back.proyectoIS_Back.modelo.Entrenamiento;

@Repository
public interface EntrenamientoRepositorio extends JpaRepository<Entrenamiento, Long> {
    //boolean isNombreEntrenamientoExiste(String nombre);
}
