import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloProducto } from 'src/app/modelos/producto.modelo';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  fgValidador: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private productoServicio: ProductoService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.fgValidador = this.fb.group({
      nombre: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      imagen: ['', [Validators.required]]
    });
  }
  GuardarProducto() {
    let nombre = this.fgValidador.controls["nombre"].value;
    let precio = parseInt(this.fgValidador.controls["precio"].value);
    let imagen = this.fgValidador.controls["imagen"].value;
    let p = new ModeloProducto();
    p.nombre = nombre;
    p.precio = precio;
    p.imagen = imagen;
    this.productoServicio.CrearProducto(p).subscribe((datos: ModeloProducto) => {
      alert("Producto almacenado correctamente.")
      this.router.navigate(["/administracion/listar-productos"])
    }, (error: any) => {
      alert("Error al crear el producto.")
    })
  }

}
