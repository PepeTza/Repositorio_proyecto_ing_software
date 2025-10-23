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

import com.proyectoIS_Back.proyectoIS_Back.modelo.Personal;
import com.proyectoIS_Back.proyectoIS_Back.servicio.PersonalServicio;

@RestController
@RequestMapping(path = "api/personal")
@CrossOrigin
public class PersonalControl {

    @Autowired
    private final PersonalServicio personalServicio;

    public PersonalControl(PersonalServicio personalServicio) {
        this.personalServicio = personalServicio;
    }

    @GetMapping()
    public List<Personal> obtenerPersonal() {
        return personalServicio.getPersonal();
    }

    @GetMapping("/{id}")
    public Optional<Personal> obtenerPersonalPorID(@PathVariable long id) {
        return personalServicio.getPersonalByID(id);
    }

    @PostMapping("/save")
    public Personal guardarPersonal(@RequestBody Personal personal) {
        return personalServicio.guardarPersonal(personal);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Personal> modificarPersonal(@RequestBody Personal personal, @PathVariable Long id) {
        return personalServicio.modificarPersonal(personal, id);
    }

    @DeleteMapping("/delete/{id}")
    public void eliminarPersonal(@PathVariable long id) {
        personalServicio.eliminarPersonal(id);
    }

    @GetMapping("/exist/{cedula}")
    public ResponseEntity<Boolean> verificarCedula(@PathVariable Long cedula) {
        boolean existe = personalServicio.existePersonalCedula(cedula);
        return ResponseEntity.ok(existe);
    }

    @GetMapping("/exist2/{correo}")
    public ResponseEntity<Boolean> verificarCorreo(@PathVariable String correo) {
        boolean existe = personalServicio.existePersonalCorreo(correo);
        return ResponseEntity.ok(existe);
    }

    @GetMapping("/exist3/{telefono}")
    public ResponseEntity<Boolean> verificarTelefono(@PathVariable String telefono) {
        boolean existe = personalServicio.existePersonalTelefono(telefono);
        return ResponseEntity.ok(existe);
    }
}
