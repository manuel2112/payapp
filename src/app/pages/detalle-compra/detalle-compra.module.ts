import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { DetalleCompraPageRoutingModule } from './detalle-compra-routing.module';
import { DetalleCompraPage } from './detalle-compra.page';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleCompraPageRoutingModule,
    PipesModule
  ],
  declarations: [DetalleCompraPage]
})
export class DetalleCompraPageModule {}
