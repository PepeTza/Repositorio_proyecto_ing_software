package com.proyectoIS_Back.proyectoIS_Back.modelo;



import jakarta.persistence.Entity;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;

@Entity (name = "jugador")
@Inheritance(strategy = InheritanceType.JOINED)

public class Jugador extends Persona{
	 
	private String posicion;
	private int dorsal;
	private float peso;
	private float altura;
	private int tarjetaRoja;
	private int tarjetaAmarilla;
	private int titulos;
	
	public Jugador(String nombre, Long cedula, String sexo, int edad, String nacionalidad, String posicion, int dorsal, float peso, float altura, int tarjetaRoja, int tarjetaAmarilla, int titulos) {
		super(nombre,cedula,sexo,edad,nacionalidad);
		
		this.posicion = posicion;
		this.dorsal = dorsal;
		this.peso = peso;
		this.altura = altura;
		this.tarjetaRoja = tarjetaRoja;
		this.tarjetaAmarilla = tarjetaAmarilla;
		this.titulos = titulos;	
		
	}
		 
	 public Jugador() {
	 }
	  

	public String getPosicion() {
		return posicion;
	}


	public void setPosicion(String posicion) {
		this.posicion = posicion;
	}

	public int getDorsal() {
		return dorsal;
	}


	public void setDorsal(int dorsal) {
		this.dorsal = dorsal;
	}


	public float getPeso() {
		return peso;
	}


	public void setPeso(float peso) {
		this.peso = peso;
	}


	public float getAltura() {
		return altura;
	}


	public void setAltura(float altura) {
		this.altura = altura;
	}


	public int getTarjetaRoja() {
		return tarjetaRoja;
	}


	public void setTarjetaRoja(int tarjetaRoja) {
		this.tarjetaRoja = tarjetaRoja;
	}


	public int getTarjetaAmarilla() {
		return tarjetaAmarilla;
	}


	public void setTarjetaAmarilla(int tarjetaAmarilla) {
		this.tarjetaAmarilla = tarjetaAmarilla;
	}


	public int getTitulos() {
		return titulos;
	}


	public void setTitulos(int titulos) {
		this.titulos = titulos;
	}
	 
}
