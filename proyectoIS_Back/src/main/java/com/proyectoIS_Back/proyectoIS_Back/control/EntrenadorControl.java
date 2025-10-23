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

import com.proyectoIS_Back.proyectoIS_Back.modelo.Entrenador;
import com.proyectoIS_Back.proyectoIS_Back.servicio.EntrenadorServicio;

@RestController
@RequestMapping(path = "api/entrenador")
@CrossOrigin
public class EntrenadorControl {

    @Autowired
    private final EntrenadorServicio entrenadorServicio;

    public EntrenadorControl(EntrenadorServicio entrenadorServicio) {
        this.entrenadorServicio = entrenadorServicio;
    }

    //Obtener todos los entrenadores
    @GetMapping()
    public List<Entrenador> obtenerEntrenador() {
        return entrenadorServicio.getEntrenador();
    }

    //Obtener entrenador por ID
    @GetMapping("/{id}")
    public Optional<Entrenador> getEntrenadorById(@PathVariable long id) {
        return entrenadorServicio.getEntrenadorByID(id);
    }

    //Guardar un nuevo entrenador
    @PostMapping("/save")
    public Entrenador guardarEntrenador(@RequestBody Entrenador entrenador) {
        return entrenadorServicio.guardarEntrenador(entrenador);
    }

    //Modificar un entrenador
    @PutMapping("/update/{id}")
    public ResponseEntity<Entrenador> modificarEntrenador(@RequestBody Entrenador entrenador, @PathVariable Long id) {
        return entrenadorServicio.modificarEntrenador(entrenador, id);
    }

    //Eliminar un entrenador
    @DeleteMapping("/delete/{id}")
    public void eliminarEntrenador(@PathVariable Long id) {
        entrenadorServicio.eliminarEntrenador(id);
    }

    //Verificar si existe la cédula
    @GetMapping("/exist/{cedula}")
    public ResponseEntity<Boolean> verificarCedula(@PathVariable Long cedula) {
        boolean existe = entrenadorServicio.existeEntrenadorCedula(cedula);
        return ResponseEntity.ok(existe);
    }

    //Verificar si existe el correo
    @GetMapping("/exist2/{correo}")
    public ResponseEntity<Boolean> verificarCorreo(@PathVariable String correo) {
        boolean existe = entrenadorServicio.existeEntrenadorCorreo(correo);
        return ResponseEntity.ok(existe);
    }

    //Verificar si existe el teléfono
    @GetMapping("/exist3/{telefono}")
    public ResponseEntity<Boolean> verificarTelefono(@PathVariable String telefono) {
        boolean existe = entrenadorServicio.existeEntrenadorTelefono(telefono);
        return ResponseEntity.ok(existe);
    }
}
