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

import com.proyectoIS_Back.proyectoIS_Back.modelo.Administrador;
import com.proyectoIS_Back.proyectoIS_Back.servicio.AdministradorServicio;

@RestController
@RequestMapping(path = "api/administrador")
@CrossOrigin
public class AdministradorControl {

    @Autowired
    private final AdministradorServicio administradorServicio;

    public AdministradorControl(AdministradorServicio administradorServicio) {
        this.administradorServicio = administradorServicio;
    }

    //Obtener todos los administradores
    @GetMapping()
    public List<Administrador> obtenerAdministrador() {
        return administradorServicio.getAdministrador();
    }

    //Obtener administrador por ID
    @GetMapping("/{id}")
    public Optional<Administrador> obtenerAdministradorID(@PathVariable long id) {
        return administradorServicio.getAdministradorByID(id);
    }

    //Guardar un nuevo administrador
    @PostMapping("/save")
    public Administrador guardarAdministrador(@RequestBody Administrador administrador) {
        return administradorServicio.guardarAdministrador(administrador);
    }

    //Modificar un administrador
    @PutMapping("/update/{id}")
    public ResponseEntity<Administrador> modificarAdministrador(@RequestBody Administrador administrador, @PathVariable Long id) {
        return administradorServicio.modificarAdministrador(administrador, id);
    }

    //Eliminar un administrador
    @DeleteMapping("/delete/{id}")
    public void eliminarAdministrador(@PathVariable long id) {
        administradorServicio.eliminarAdministrador(id);
    }

    //Verificar si existe la cédula
    @GetMapping("/exist/{cedula}")
    public ResponseEntity<Boolean> verificarCedula(@PathVariable Long cedula) {
        boolean existe = administradorServicio.existeAdministradorCedula(cedula);
        return ResponseEntity.ok(existe);
    }

    //Verificar si existe el correo
    @GetMapping("/exist2/{correo}")
    public ResponseEntity<Boolean> verificarCorreo(@PathVariable String correo) {
        boolean existe = administradorServicio.existeAdministradorCorreo(correo);
        return ResponseEntity.ok(existe);
    }

    //Verificar si existe el teléfono
    @GetMapping("/exist3/{telefono}")
    public ResponseEntity<Boolean> verificarTelefono(@PathVariable String telefono) {
        boolean existe = administradorServicio.existeAdministradorTelefono(telefono);
        return ResponseEntity.ok(existe);
    }
}
