package com.proyectoIS_Back.proyectoIS_Back.servicio;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.proyectoIS_Back.proyectoIS_Back.modelo.Personal;
import com.proyectoIS_Back.proyectoIS_Back.repositorio.PersonalRepositorio;

@Service
public class PersonalServicio {

    @Autowired
    private final PersonalRepositorio personalRepositorio;

    public PersonalServicio(PersonalRepositorio personalRepositorio) {
        this.personalRepositorio = personalRepositorio;
    }

    public List<Personal> getPersonal() {
        return personalRepositorio.findAll();
    }

    public Optional<Personal> getPersonalByID(long id) {
        return personalRepositorio.findById(id);
    }

    public Personal guardarPersonal(Personal personal) {
        return personalRepositorio.save(personal);
    }

    public ResponseEntity<Personal> modificarPersonal(Personal personal, Long id) {
        Optional<Personal> opt = personalRepositorio.findById(id);
        if (opt.isPresent()) {
            personal.setId(id);
            return ResponseEntity.ok(personalRepositorio.save(personal));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public void eliminarPersonal(long id) {
        if (!personalRepositorio.existsById(id)) {
            throw new RuntimeException("El empleado no existe");
        }
        personalRepositorio.deleteById(id);
    }

    public boolean existePersonalCedula(Long cedula) {
        return personalRepositorio.existsByCedula(cedula);
    }

    public boolean existePersonalCorreo(String correo) {
        return personalRepositorio.existsByCorreo(correo);
    }

    public boolean existePersonalTelefono(String telefono) {
        return personalRepositorio.existsByTelefono(telefono);
    }
}
