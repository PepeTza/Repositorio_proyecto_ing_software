package com.proyectoIS_Back.proyectoIS_Back.servicio;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.proyectoIS_Back.proyectoIS_Back.modelo.Entrenador;
import com.proyectoIS_Back.proyectoIS_Back.repositorio.EntrenadorRepositorio;

import jakarta.persistence.EntityNotFoundException;

@Service
public class EntrenadorServicio {

    @Autowired
    private final EntrenadorRepositorio entrenadorRepositorio;

    public EntrenadorServicio(EntrenadorRepositorio entrenadorRepositorio) {
        this.entrenadorRepositorio = entrenadorRepositorio;
    }

    public List<Entrenador> getEntrenador() {
        return entrenadorRepositorio.findAll();
    }

    public Optional<Entrenador> getEntrenadorByID(long id) {
        return entrenadorRepositorio.findById(id);
    }

    public Entrenador guardarEntrenador(Entrenador entrenador) {
        return entrenadorRepositorio.save(entrenador);
    }

    public ResponseEntity<Entrenador> guardarEntrenador(Entrenador entrenador, Long id) {
        Optional<Entrenador> opt = entrenadorRepositorio.findById(id);
        if (opt.isPresent()) {
            entrenador.setId(id);
            return ResponseEntity.ok(entrenadorRepositorio.save(entrenador));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<Entrenador> modificarEntrenador(Entrenador entrenador, Long id) {
        Optional<Entrenador> opt = entrenadorRepositorio.findById(id);
        if (opt.isPresent()) {
            entrenador.setId(id);
            return ResponseEntity.ok(entrenadorRepositorio.save(entrenador));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public void eliminarEntrenador(Long id) {
        if (!entrenadorRepositorio.existsById(id)) {
            throw new EntityNotFoundException("Entrenador no encontrado con ID: " + id);
        }
        entrenadorRepositorio.deleteById(id);
    }

    public boolean existeEntrenadorCedula(Long cedula) {
        return entrenadorRepositorio.existsByCedula(cedula);
    }

    public boolean existeEntrenadorCorreo(String correo) {
        return entrenadorRepositorio.existsByCorreo(correo);
    }

    public boolean existeEntrenadorTelefono(String telefono) {
        return entrenadorRepositorio.existsByTelefono(telefono);
    }
}
