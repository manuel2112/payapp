import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CompraSinglePageRoutingModule } from './compra-single-routing.module';
import { CompraSinglePage } from './compra-single.page';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompraSinglePageRoutingModule,
    PipesModule
  ],
  declarations: [CompraSinglePage]
})
export class CompraSinglePageModule {}
