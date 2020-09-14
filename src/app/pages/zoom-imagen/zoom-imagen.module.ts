import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ZoomImagenPageRoutingModule } from './zoom-imagen-routing.module';
import { PipesModule } from '../../pipes/pipes.module';

import { ZoomImagenPage } from './zoom-imagen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZoomImagenPageRoutingModule,
    PipesModule
  ],
  declarations: [ZoomImagenPage]
})
export class ZoomImagenPageModule {}
