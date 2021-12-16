import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';

@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.component.html',
  styleUrls: ['./identificacion.component.css']
})
export class IdentificacionComponent implements OnInit {
  
  //fgValidador: FormGroup;

  constructor(private fb: FormBuilder) { }
  
  ngOnInit(): void {
    //this.fgValidador = this.fb.group({
    //usuario: ['', [Validators.required, Validators.email]],
   // clave: ['', [Validators.required]]
  //});
  }

}
