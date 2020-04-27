import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro-clientes',
  templateUrl: './registro-clientes.page.html',
  styleUrls: ['./registro-clientes.page.scss'],
})
export class RegistroClientesPage implements OnInit {

  newForm: FormGroup;
  passwordTypeInput = 'password';

  constructor(private _auth: AuthService, private toastCtrl: ToastController) { }

  ngOnInit(): void {
    this.newForm = this.createForm();
  }

  createForm(): FormGroup {
    return new FormGroup({
      tipo_documento: new FormControl('', [
        Validators.required,
      ]),
      documento: new FormControl('', [
        Validators.required
      ]),
      nombre: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z ]+')
      ]),
      apellido: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z ]+')
      ]),
      celular: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]+')
      ]),
      correo: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
      ]),
      contrasena: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      terminos: new FormControl(false, [
        Validators.required
      ])
    });
  }

  showPassword(): void {
    this.passwordTypeInput = this.passwordTypeInput === 'password' ? 'texto' : 'password';
  }

  async addUser(form: any){
    if(this.newForm.get('terminos').value){
      try {
        const response = await this._auth.createUser(form);
        console.log(response);
      } catch (error) {
        console.log(error)
      }
    }
    else
      this.showMessage();
  }


  async showMessage() {
    const toast = await this.toastCtrl.create({
      message: 'Debes aceptar nuestros términos y condiciones.',
      duration: 2000,
      animated: true
    });
    toast.present();
  }



}
