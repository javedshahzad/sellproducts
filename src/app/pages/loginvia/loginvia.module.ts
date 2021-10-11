import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginviaPageRoutingModule } from './loginvia-routing.module';

import { LoginviaPage } from './loginvia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginviaPageRoutingModule
  ],
  declarations: [LoginviaPage]
})
export class LoginviaPageModule {}
