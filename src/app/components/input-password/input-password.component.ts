import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss'],
})
export class InputPasswordComponent implements OnInit {

  passwordTypeInput = 'password';
  contrasena = '';

  constructor() { }

  ngOnInit() {}

  showPassword() {
    this.passwordTypeInput = this.passwordTypeInput === 'password' ? 'texto' : 'password';
  }

}
