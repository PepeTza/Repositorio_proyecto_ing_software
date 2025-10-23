package com.proyectoIS_Back.proyectoIS_Back.servicio;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyectoIS_Back.proyectoIS_Back.modelo.Entrenamiento;
import com.proyectoIS_Back.proyectoIS_Back.repositorio.EntrenamientoRepositorio;

@Service
public class EntrenamientoServicio {

    @Autowired
    private EntrenamientoRepositorio entrenamientoRepositorio;

    public EntrenamientoServicio(EntrenamientoRepositorio entrenamientoRepositorio) {
        this.entrenamientoRepositorio = entrenamientoRepositorio;
    }

    public List<Entrenamiento> getEntrenamiento() {
        return entrenamientoRepositorio.findAll();
    }

    public Optional<Entrenamiento> getEntrenamientoByID(Long id) {
        return entrenamientoRepositorio.findById(id);
    }

    public Entrenamiento guardarEntrenamiento(Entrenamiento entrenamiento) {
        return entrenamientoRepositorio.save(entrenamiento);
    }

    public List<Entrenamiento> guardarEntrenamientos(List<Entrenamiento> entrenamientos) {
        return entrenamientoRepositorio.saveAll(entrenamientos);
    }

    /*public boolean existeEntrenamientoPorNombre(String nombre) {
        return entrenamientoRepositorio.isNombreEntrenamientoExiste(nombre);
    }*/
}
