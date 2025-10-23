package com.proyectoIS_Back.proyectoIS_Back.servicio;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyectoIS_Back.proyectoIS_Back.modelo.Usuario;
import com.proyectoIS_Back.proyectoIS_Back.repositorio.UsuarioRepositorio;

@Service
public class UsuarioServicio {

    @Autowired
    private final UsuarioRepositorio usuarioRepositorio;

    public UsuarioServicio(UsuarioRepositorio usuarioRepositorio) {
        this.usuarioRepositorio = usuarioRepositorio;
    }

    //Obtener todos los usuarios
    public List<Usuario> getUsuario() {
        return usuarioRepositorio.findAll();
    }

    //Obtener usuario por ID
    public Optional<Usuario> getUsuarioID(long id) {
        return usuarioRepositorio.findById(id);
    }

    //Guardar un nuevo usuario
    public Usuario guardarUsuario(Usuario usuario) {
        return usuarioRepositorio.save(usuario);
    }

    //Verificar si existe el username
    public boolean existeUsuarioUsername(String username) {
        return usuarioRepositorio.existsByUsername(username);
    }
}
