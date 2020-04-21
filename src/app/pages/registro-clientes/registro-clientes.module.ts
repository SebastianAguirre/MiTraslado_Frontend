import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroClientesPageRoutingModule } from './registro-clientes-routing.module';

import { RegistroClientesPage } from './registro-clientes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegistroClientesPageRoutingModule
  ],
  declarations: [RegistroClientesPage]
})
export class RegistroClientesPageModule {}
