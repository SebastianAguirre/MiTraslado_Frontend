import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { isUndefined } from 'util';
import { AuthService } from '../../services/auth.service';
import { UsuarioInfo } from '../../interfaces/usuarios-info';


@Component({
  selector: 'app-registro-clientes',
  templateUrl: './registro-clientes.page.html',
  styleUrls: ['./registro-clientes.page.scss'],
})
export class RegistroClientesPage implements OnInit {

  newForm: FormGroup;
  passwordTypeInput = 'password';

  constructor
  (
    private _auth: AuthService, 
    private toastCtrl: ToastController, 
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit(): void {
    this.newForm = this.createForm();
  }

  createForm(): FormGroup {
    return new FormGroup({
      usuario_tipoDocumento: new FormControl('1', [
        Validators.required,
      ]),
      usuario_documento: new FormControl('', [
        Validators.required
      ]),
      usuario_nombre: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z ]+')
      ]),
      usuario_apellido: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z ]+')
      ]),
      usuario_celular: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]+')
      ]),
      usuario_email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
      ]),
      usuario_password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      usuario_terminos: new FormControl(false, [
        Validators.required
      ])
    });
  }

  async addUser(form: UsuarioInfo){
    if(form.usuario_terminos){
      this.presentLoading();
      const response = await this._auth.createUser(form);
      if(isUndefined(response)){
        this.router.navigate(['/dashboard']); 
      }else{
        this.showToast(response);
      }
      this.loadingCtrl.dismiss();
    }else{
      this.showToast('Debes aceptar Términos y condiciones.');
    }
  }

  async showToast(message: any) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      animated: true,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel'
        }
      ]
    });
    toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Creando Registro',
      spinner: 'lines',
      animated: true
    });
    await loading.present();
  }

  showPassword(): void {
    this.passwordTypeInput = this.passwordTypeInput === 'password' ? 'texto' : 'password';
  }





}
