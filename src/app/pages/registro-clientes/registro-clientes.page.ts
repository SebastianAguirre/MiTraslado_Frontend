import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-registro-clientes',
  templateUrl: './registro-clientes.page.html',
  styleUrls: ['./registro-clientes.page.scss'],
})
export class RegistroClientesPage implements OnInit {

  newForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.newForm = this.createForm();
  }

  onClick(form: any){
    console.log('Form', form);
  }

  createForm(): FormGroup {
    return new FormGroup({
      tipo_documento: new FormControl(),
      documento: new FormControl(),
      nombre: new FormControl(),
      apellido: new FormControl(),
      celular: new FormControl(),
      correo: new FormControl(),
      usuario: new FormControl(),
      contrasena: new FormControl(),
      terminos: new FormControl()
    });
  }



}
