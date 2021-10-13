import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DelverymanPageRoutingModule } from './delveryman-routing.module';

import { DelverymanPage } from './delveryman.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DelverymanPageRoutingModule
  ],
  declarations: [DelverymanPage]
})
export class DelverymanPageModule {}
