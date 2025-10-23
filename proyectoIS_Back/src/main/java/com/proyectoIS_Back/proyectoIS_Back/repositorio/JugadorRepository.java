package com.proyectoIS_Back.proyectoIS_Back.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyectoIS_Back.proyectoIS_Back.modelo.Jugador;

@Repository
public interface JugadorRepository extends JpaRepository<Jugador, Long>{
    public boolean existsByCedula(Long cedula);
}