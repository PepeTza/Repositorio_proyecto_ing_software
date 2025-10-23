package com.proyectoIS_Back.proyectoIS_Back.control;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyectoIS_Back.proyectoIS_Back.modelo.Usuario;
import com.proyectoIS_Back.proyectoIS_Back.servicio.UsuarioServicio;

@RestController
@RequestMapping(path = "api/usuario")
@CrossOrigin
public class UsuarioControl {

    @Autowired
    private final UsuarioServicio usuarioServicio;

    public UsuarioControl(UsuarioServicio usuarioServicio) {
        this.usuarioServicio = usuarioServicio;
    }

    //Obtener todos los usuarios
    @GetMapping()
    public List<Usuario> obtenerUsuario() {
        return usuarioServicio.getUsuario();
    }

    //Obtener usuario por ID
    @GetMapping("/{id}")
    public Optional<Usuario> obtenerUsuarioID(@PathVariable long id) {
        return usuarioServicio.getUsuarioID(id);
    }

    //Guardar un nuevo usuario
    @PostMapping("/save")
    public Usuario guardarUsuario(@RequestBody Usuario usuario) {
        return usuarioServicio.guardarUsuario(usuario);
    }

    //Verificar si existe el username
    @GetMapping("/existUsername/{username}")
    public ResponseEntity<Boolean> verificarUsername(@PathVariable String username) {
        return ResponseEntity.ok(usuarioServicio.existeUsuarioUsername(username));
    }
}
