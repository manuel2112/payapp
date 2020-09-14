import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductoPageRoutingModule } from './producto-routing.module';
import { PipesModule } from '../../pipes/pipes.module';

import { ProductoPage } from './producto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductoPageRoutingModule,
    PipesModule
  ],
  declarations: [ProductoPage]
})
export class ProductoPageModule {}
