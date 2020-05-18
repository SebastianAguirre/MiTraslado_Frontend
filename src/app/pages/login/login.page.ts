import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  public passwordTypeInput: string = 'password';
  newForm: FormGroup;

  constructor(private _auth: AuthService, private router: Router, private alertCtrl: AlertController, private toastCtrl: ToastController) {}

  ngOnInit(): void {
    this.newForm = this.createForm();
  }

  createForm(): FormGroup{
    return new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  async singIn(form) {
    try {
      const response = await this._auth.singIn(form);
      if(!response.user.emailVerified){
        this.reenviarVerificacion();
      }else{
        this.router.navigate(['/dashboard']);
      }
    } catch (error) {
      this.showMensajeError('Correo y/o contraseña incorrectos');
    }
  }

  async singInWithGoogle() {
    try {
      await this._auth.singInWithGoogle();
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.log(error);
    }
  }

  async reenviarVerificacion() {
    const alert = await this.alertCtrl.create({
      header: '¡Atención!',
      message: 'Debes de verificar tu correo antes de iniciar sesión.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, 
        {
          text: 'Reenviar verificación',
          handler: () => {
            this._auth.sendVerificationEmail();
          }
        }
      ]
    });
    await alert.present();
  }

  async showMensajeError(message: string) {
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
}

