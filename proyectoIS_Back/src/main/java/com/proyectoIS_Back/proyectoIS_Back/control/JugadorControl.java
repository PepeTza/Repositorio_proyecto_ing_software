package com.proyectoIS_Back.proyectoIS_Back.control;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyectoIS_Back.proyectoIS_Back.modelo.Jugador;
import com.proyectoIS_Back.proyectoIS_Back.repositorio.JugadorRepository;




@RestController

public class JugadorControl {
	 
	JugadorRepository repositorio; 
	
	public JugadorControl(JugadorRepository repositorio) {
		this.repositorio = repositorio;
	}
	
	
	@GetMapping("/api/creaJugadores")
	public void crearJugadores() {
		
		Jugador jugador1 = new Jugador("Luis",29651365l,"Hombre", 21, "Argentino","Delantero", 19, 80.0f, 1.69f, 0, 2, 15);
		Jugador jugador2 = new Jugador("Pedro",29458145l,"Hombre", 16, "Mexicano", "Delantero", 22, 81.0f, 1.87f, 0, 4, 1);
		Jugador jugador3 = new Jugador("Jose",30258741l,"Hombre", 18, "Argentino", "Arquero", 1, 88.0f, 1.66f, 10, 2, 1);
		
		repositorio.save(jugador1);
		repositorio.save(jugador2);
		repositorio.save(jugador3);
	}
	
	
	//para consultar
	
	@CrossOrigin("http://127.0.0.1:5501")
	@GetMapping("/api/jugadores")
	public List<Jugador> obtenerJugadores(){
		return repositorio.findAll();
	}
	
	@CrossOrigin("http://127.0.0.1:5501")
	@GetMapping("/api/jugador/{id}")
	public ResponseEntity<Jugador> obtenerJugador(@PathVariable Long id){
		Optional<Jugador> opt = repositorio.findById(id);
		
		if(opt.isEmpty()) {
			return ResponseEntity.badRequest().build();
		}
		else {
			return ResponseEntity.ok(opt.get());
		}
	}	
	
	@CrossOrigin("http://127.0.0.1:5501")
	@PostMapping("/api/guardarJugadores")
	public Jugador guardarJugador(@RequestBody Jugador jugador) {
		return (repositorio.save(jugador));
	}
	
	@CrossOrigin("http://127.0.0.1:5501")
	@PutMapping("/api/jugador/{id}")
	public ResponseEntity<Jugador> actualizarJugador(@PathVariable Long id, @RequestBody Jugador jugador) {
    	Optional<Jugador> opt = repositorio.findById(id);
    		if (opt.isPresent()) {
        		jugador.setId(id); // Asegúrate de que el ID del jugador se mantenga
        	return ResponseEntity.ok(repositorio.save(jugador));
    	} else {
        	return ResponseEntity.notFound().build();
   	 	}
	}
	
	//Metodo de eliminar jugador
	@CrossOrigin("http://127.0.0.1:5501")
	@DeleteMapping("/api/jugador/{id}")
	public ResponseEntity<Void> eliminarJugador(@PathVariable Long id) {
    	Optional<Jugador> opt = repositorio.findById(id);
    	if (opt.isPresent()) {
        	repositorio.delete(opt.get());
        	return ResponseEntity.ok().build();
    	} else {
        	return ResponseEntity.notFound().build();
    	}
	}

	//Metodo para bsucar la cedula, esto nos ayudara para validar que no se inserten una cedula que ya este guardada
	@CrossOrigin("http://127.0.0.1:5501")
	@GetMapping("/api/jugador/existe/{cedula}")
	public ResponseEntity<Boolean> verificarCedula(@PathVariable Long cedula) {
    	boolean existe = repositorio.existsByCedula(cedula);
    return ResponseEntity.ok(existe);
	}
}