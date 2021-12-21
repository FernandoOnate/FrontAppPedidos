import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ModeloIdentificar } from '../modelos/identificar.modelo';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  url = 'http://localhost:3000';
  datosUsuarioEnSesion = new BehaviorSubject<ModeloIdentificar>(new ModeloIdentificar());

  constructor(private http: HttpClient) { this.VerificarSesionActual()}

  VerificarSesionActual() {
    let datos = this.ObtenerInfoSesion();
    if (datos) {
      this.RefrescarDatosSesion(datos);
    }
  }

  RefrescarDatosSesion(datos: ModeloIdentificar) {
    this.datosUsuarioEnSesion.next(datos);
  }

  Identificar(usuario: string, clave: string): Observable<ModeloIdentificar> {
    return this.http.post<ModeloIdentificar>(`${this.url}/identificarPersona/`,
      {
        usuario: usuario,
        clave: clave
      },
      {
        headers: new HttpHeaders({

        })
      })

  }
  GuardarSesion(datos: ModeloIdentificar) {
    datos.estaIdentificado = true;
    let stringDatos = JSON.stringify(datos);
    localStorage.setItem("datosSesion", stringDatos);
    this.RefrescarDatosSesion(datos);
  }

  ObtenerInfoSesion() {
    let datosString = localStorage.getItem("datosSesion");
    if (datosString) {
      let datos = JSON.parse(datosString);
      return datos;
    } else {
      return null;
    }
  }

  EliminarInfoSesion() {
    localStorage.removeItem("datosSesion");
    this.RefrescarDatosSesion(new ModeloIdentificar());
  }
  GetDatosUserSesion() {
    return this.datosUsuarioEnSesion.asObservable();
  }
  seHaIniciadoSesion() {
    let datosString = localStorage.getItem("datosSesion");
      return datosString;
  }
}
