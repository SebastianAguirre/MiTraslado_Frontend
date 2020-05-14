import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { InputPasswordComponent } from './input-password/input-password.component';

@NgModule({
  declarations: [ 
    InputPasswordComponent
  ],
  imports: [
    CommonModule, 
    IonicModule,
    FormsModule
  ],
  exports: [
    InputPasswordComponent
  ]
})
export class ComponentsModule { }
