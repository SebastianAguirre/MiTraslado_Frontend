import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
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
  public passwordTypeInput: string = 'password';

  constructor
  (
    private _auth: AuthService, 
    private toastCtrl: ToastController, 
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) 
  {}

  ngOnInit(): void {
    this.newForm = this.createForm();
  }

  createForm(): FormGroup {
    return new FormGroup({
      usuario_nombre: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z ]+')
      ]),
      usuario_apellido: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z ]+')
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

  async addCliente(form: UsuarioInfo){
    if(form.usuario_terminos){
      this.loadMessage();
      const response = await this._auth.createCliente(form);
      if(isUndefined(response)){
        await this.verificarEmailAlert();
        this.router.navigate(['/login']);
      }else{
        this.mensajeError('Ha ocurrido un error, intente nuevamente.');
      }
      this.loadingCtrl.dismiss();
    }else{
      this.mensajeError('Debes aceptar Términos y condiciones.');
    }
  }

  async mensajeError(message: string) {
    const mensaje = await this.toastCtrl.create({
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
    mensaje.present();
  }

  async loadMessage() {
    const load = await this.loadingCtrl.create({
      message: 'Creando Registro',
      spinner: 'lines',
      animated: true
    });
    await load.present();
  }

  async verificarEmailAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Bienvenido a MiTraslado',
      message: `Antes de iniciar sesión, debes verificar tu correo. Por favor, revisa el correo <strong>${this.newForm.controls.usuario_email.value}</strong> y sigue las instrucciones enviadas.`,
      buttons: ['Entiendo'],
      backdropDismiss: false
    });
    await alert.present();
  }
}
