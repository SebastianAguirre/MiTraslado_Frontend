import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss'],
})
export class InputPasswordComponent implements OnInit {

  @Input() typeInput: string;
  @Output() newTypeInput = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  showPassword(): void {
    this.typeInput = this.typeInput === 'password' ? 'text' : 'password';
    this.newTypeInput.emit(this.typeInput);
  }

}
