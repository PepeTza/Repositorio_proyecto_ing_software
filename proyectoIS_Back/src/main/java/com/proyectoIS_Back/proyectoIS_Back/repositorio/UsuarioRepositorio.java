package com.proyectoIS_Back.proyectoIS_Back.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyectoIS_Back.proyectoIS_Back.modelo.Usuario;

@Repository
public interface UsuarioRepositorio extends JpaRepository<Usuario, Long> {

    boolean existsByUsername(String username); //Verificar si existe el username
}
