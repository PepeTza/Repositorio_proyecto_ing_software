package com.proyectoIS_Back.proyectoIS_Back.servicio;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyectoIS_Back.proyectoIS_Back.modelo.Implemento;
import com.proyectoIS_Back.proyectoIS_Back.repositorio.ImplementoRepositorio;

@Service
public class ImplementoServicio {

    @Autowired
    private ImplementoRepositorio implementoRepositorio;

    public ImplementoServicio(ImplementoRepositorio implementoRepositorio) {
        this.implementoRepositorio = implementoRepositorio;
    }

    //consigue todos los objetos de la base de datos
    public List<Implemento> getImplementos() {
        return implementoRepositorio.findAll();
    }

    //consuigue el objeto implemento por su id 
    public Optional<Implemento> getImplemento(long id) {
        return implementoRepositorio.findById(id);
    }

    public void saveImplemento(Implemento implemento) {
        implementoRepositorio.save(implemento);
    }

    public void deleteImplemento(long id) {
        implementoRepositorio.deleteById(id);
    }

    public boolean nombreExistente(String nombre) {
        return implementoRepositorio.existsByNombre(nombre);
    }
}
