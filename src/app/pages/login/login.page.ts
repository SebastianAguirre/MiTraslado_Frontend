import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { InputPasswordComponent } from 'src/app/components/input-password/input-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  passwordTypeInput = 'password';
  newForm: FormGroup;

  constructor(private _auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.newForm = this.createForm();
  }

  createForm(): FormGroup{
    return new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  async loggeo(form){
    try {
      await this._auth.singIn(form);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.log(error);
    }
  }

  showPassword(): void {
    this.passwordTypeInput = this.passwordTypeInput === 'password' ? 'texto' : 'password';
  }

  async loggeoGoogle() {
    try {
      await this._auth.singInWithGoogle();
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.log(error);
    }
  }








}

