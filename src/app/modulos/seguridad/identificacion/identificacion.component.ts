import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import * as cryptoJS from "crypto-js";
import { Router } from '@angular/router';

@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.component.html',
  styleUrls: ['./identificacion.component.css']
})
export class IdentificacionComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
  private servicioSeguridad:SeguridadService,private router:Router) { }

  ngOnInit(): void {
    this.fgValidador = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required]]
    });
  }
  IdentificarUsuario() {
    let usuario = this.fgValidador.controls["usuario"].value;
    let clave = this.fgValidador.controls["clave"].value;
    let clavecifrada = cryptoJS.MD5(clave).toString();
    this.servicioSeguridad.Identificar(usuario, clavecifrada).subscribe((datos: any) => {
      //ok 
      this.servicioSeguridad.GuardarSesion(datos);
      this.router.navigate(['/inicio']);
    }, (error: any) => {
      //  KO  
      alert("Datos incorrectos")
    })  
  }

}
