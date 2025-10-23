package com.proyectoIS_Back.proyectoIS_Back.control;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyectoIS_Back.proyectoIS_Back.modelo.Implemento;
import com.proyectoIS_Back.proyectoIS_Back.servicio.ImplementoServicio;

@RestController
@CrossOrigin
@RequestMapping(path = "api/implementos")

public class ImplementoControl {

    @Autowired
    private ImplementoServicio implementoServicio;

    public ImplementoControl(ImplementoServicio implementoServicio) {
        this.implementoServicio = implementoServicio;
    }

    @GetMapping()
    public List<Implemento> getAllImplementos() {
        return implementoServicio.getImplementos();
    }

    //consigue todos los implementos 
    @GetMapping("/{id}")
    public Optional<Implemento> getImplementoPorid(@PathVariable long id) {
        return implementoServicio.getImplemento(id);
    }

    @PostMapping("/crearimplemento")
    public void guardarImplemento(@RequestBody Implemento implemento) {
        implementoServicio.saveImplemento(implemento);
    }

    @DeleteMapping("/eliminar/{id}")
    public void borrarImplemento(@PathVariable long id) {
        implementoServicio.deleteImplemento(id);
    }

    @PutMapping("/update")
    public void actualizarImplemento(@RequestBody Implemento implemento) {
        implementoServicio.saveImplemento(implemento);
    }

    @GetMapping("/existe/{nombre}")
    public ResponseEntity<Boolean> verificarNombreImplemento(@PathVariable String nombre) {
        boolean existe = implementoServicio.nombreExistente(nombre);
        return ResponseEntity.ok(existe);
    }
}
