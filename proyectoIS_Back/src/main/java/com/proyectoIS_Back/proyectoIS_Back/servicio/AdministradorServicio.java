package com.proyectoIS_Back.proyectoIS_Back.servicio;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.proyectoIS_Back.proyectoIS_Back.modelo.Administrador;
import com.proyectoIS_Back.proyectoIS_Back.repositorio.AdministradorRepositorio;

import jakarta.persistence.EntityNotFoundException;

@Service
public class AdministradorServicio {

    @Autowired
    private final AdministradorRepositorio administradorRepositorio;

    public AdministradorServicio(AdministradorRepositorio administradorRepositorio) {
        this.administradorRepositorio = administradorRepositorio;
    }

    public List<Administrador> getAdministrador() {
        return administradorRepositorio.findAll();
    }

    public Optional<Administrador> getAdministradorByID(long id) {
        return administradorRepositorio.findById(id);
    }

    public Administrador guardarAdministrador(Administrador administrador) {
        return administradorRepositorio.save(administrador);
    }

    public ResponseEntity<Administrador> modificarAdministrador(Administrador administrador, Long id) {
        Optional<Administrador> opt = administradorRepositorio.findById(id);
        if (opt.isPresent()) {
            administrador.setId(id);
            return ResponseEntity.ok(administradorRepositorio.save(administrador));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public void eliminarAdministrador(Long id) {
        // Verificar si el administrador existe antes de eliminarlo
        if (!administradorRepositorio.existsById(id)) {
            throw new EntityNotFoundException("Administrador no encontrado con ID: " + id);
        }
        //Eliminar el administrador
        administradorRepositorio.deleteById(id);
    }

    public boolean existeAdministradorCedula(Long cedula) {
        return administradorRepositorio.existsByCedula(cedula);
    }

    public boolean existeAdministradorCorreo(String correo) {
        return administradorRepositorio.existsByCorreo(correo);
    }

    public boolean existeAdministradorTelefono(String telefono) {
        return administradorRepositorio.existsByTelefono(telefono);
    }
}
