import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloProducto } from 'src/app/modelos/producto.modelo';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});
  id: string = '';
  constructor(
    private fb: FormBuilder,
    private productoServicio: ProductoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.BuscarProducto();
    this.fgValidador = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      imagen: ['', [Validators.required]]
    });
  }
  BuscarProducto() {
    this.productoServicio.ObtenerRegistrosPorId(this.id).subscribe((datos: ModeloProducto) => {
      this.fgValidador.controls["id"].setValue(this.id);
      this.fgValidador.controls["nombre"].setValue(datos.nombre);
      this.fgValidador.controls["precio"].setValue(datos.precio);
      this.fgValidador.controls["imagen"].setValue(datos.imagen);
    });
  }
  EditarProducto() {
    let nombre = this.fgValidador.controls["nombre"].value;
    let precio = parseInt(this.fgValidador.controls["precio"].value);
    let imagen = this.fgValidador.controls["imagen"].value;
    let p = new ModeloProducto();
    p.nombre = nombre;
    p.precio = precio;
    p.imagen = imagen;
    p.id = this.id;
    this.productoServicio.ActualizarProducto(p).subscribe((datos: ModeloProducto) => {
      alert("Producto actualizado correctamente.")
      this.router.navigate(["/administracion/listar-productos"])
    }, (error: any) => {
      alert("Error al actualizar el producto.")
    })
  }
}
