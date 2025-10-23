package com.proyectoIS_Back.proyectoIS_Back.control;

import java.util.List;
import java.util.Optional;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.proyectoIS_Back.proyectoIS_Back.modelo.Entrenamiento;
import com.proyectoIS_Back.proyectoIS_Back.repositorio.EntrenamientoRepositorio;

@RestController
public class EntrenamientoControl {

    private EntrenamientoRepositorio entrenamientoRepositorio;

    public EntrenamientoControl(EntrenamientoRepositorio entrenamientoRepositorio) {
        this.entrenamientoRepositorio = entrenamientoRepositorio;
    }

    @GetMapping("/api/creaEntrenamiento")
    public void creaEntrenamiento() {
        Entrenamiento entrenamiento1 = new Entrenamiento("Control de balón con un toque", "El jugador debera controlar con un solo toque todos los pases que le den, sea aereo o rastrero", 8, "Medio", "Tecnico", "Mejorar el control del balon");
        Entrenamiento entrenamiento2 = new Entrenamiento("Pase corto en pareja", "Dos jugadores se haran pases cortos", 10, "Facil", "Tecnico", "Mejora la velocidad al momento de dar los pases");
        Entrenamiento entrenamiento3 = new Entrenamiento("Conduccion con el balon", "El jugador debera completar un circuito", 15, "Dificil", "Tecnico", "Mejora el control del balon");
        Entrenamiento entrenamiento4 = new Entrenamiento("Penales", "El jugador hara penales contra el arquero", 5, "Facil", "Potencia", "Aumenta la potencia y la tecnica al momento de cobrar los penales");

        entrenamientoRepositorio.save(entrenamiento1);
        entrenamientoRepositorio.save(entrenamiento2);
        entrenamientoRepositorio.save(entrenamiento3);
        entrenamientoRepositorio.save(entrenamiento4);
    }

    //CONSULTAR
    @CrossOrigin("http://127.0.0.1:5501")
    @GetMapping("/api/entrenamientos")
    public List<Entrenamiento> obtenerEntrenamiento() {
        return entrenamientoRepositorio.findAll();
    }

    //REGISTRAR
    @CrossOrigin("http://127.0.0.1:5501")
    @PostMapping("/api/guardarNuevoEntrenamiento")
    public Entrenamiento guardarEntrenamiento(@RequestBody Entrenamiento entrenamiento) {
        return (entrenamientoRepositorio.save(entrenamiento));
    }

    @CrossOrigin("http://127.0.0.1:5501")
    @PutMapping("/api/guardarEntrenamientos")
    public ResponseEntity<Entrenamiento> actualizarEntrenamiento(@RequestBody Entrenamiento entrenamiento) {
        // VERIFICAR SI EL ENTRENAMIENTO EXISTE
        if (entrenamiento.getId() == null || !entrenamientoRepositorio.existsById(entrenamiento.getId())) {
            return ResponseEntity.badRequest().build(); // RETORNA UN ERROR SI NO EXISTE
        }

        // GUARDA EL ENTRENAMIENTO ACTUALIZADO
        Entrenamiento entrenamientoActualizado = entrenamientoRepositorio.save(entrenamiento);
        return ResponseEntity.ok(entrenamientoActualizado); // RETORNA EL ENTRENAMIENTO ACTUALIZADO
    }

    //CONSULTAR POR ID
    @CrossOrigin("http://127.0.0.1:5501")
    @GetMapping("/api/obtenerEntrenamiento/{id}")
    public Optional<Entrenamiento> obtenerEntrenamiento(@PathVariable Long id) {
        return entrenamientoRepositorio.findById(id);
    }

    //Metodo de eliminar entrenamiento
    @CrossOrigin("http://127.0.0.1:5501")
    @DeleteMapping("/api/eliminarEntrenamiento/{id}")
    public ResponseEntity<Void> eliminarEntrenamiento(@PathVariable Long id) {
        Optional<Entrenamiento> opt = entrenamientoRepositorio.findById(id);
        if (opt.isPresent()) {
            entrenamientoRepositorio.delete(opt.get());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //Diseñar entrenamiento
    @CrossOrigin("http://127.0.0.1:5501")
    @PostMapping("/api/disenarEntrenamiento")
    public Entrenamiento disenarEntrenamiento(@RequestBody Entrenamiento entrenamientos) {
        return entrenamientoRepositorio.save(entrenamientos);
    }

    // Endpoint para actualizar la fecha (descripción) de un entrenamiento
    @CrossOrigin("http://127.0.0.1:5501")
    @PutMapping("/api/actualizarFechaEntrenamiento/{id}")
    public ResponseEntity<Entrenamiento> actualizarFechaEntrenamiento(@PathVariable Long id, @RequestBody Map<String, String> body) {
        Optional<Entrenamiento> opt = entrenamientoRepositorio.findById(id);
        if (opt.isPresent()) {
            Entrenamiento entrenamiento = opt.get();
            entrenamiento.setDescripcion(body.get("descripcion"));
            entrenamientoRepositorio.save(entrenamiento);
            return ResponseEntity.ok(entrenamiento);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
