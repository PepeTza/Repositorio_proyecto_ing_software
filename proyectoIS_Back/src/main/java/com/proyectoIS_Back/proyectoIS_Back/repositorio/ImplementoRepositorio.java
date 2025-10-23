package com.proyectoIS_Back.proyectoIS_Back.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyectoIS_Back.proyectoIS_Back.modelo.Implemento;

@Repository
public interface ImplementoRepositorio extends JpaRepository<Implemento, Long> {

    boolean existsByNombre(String nombre); //Verificar si existe el nombre
}
