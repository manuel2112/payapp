import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NosotrosPageRoutingModule } from './nosotros-routing.module';
import { PipesModule } from '../../pipes/pipes.module';

import { NosotrosPage } from './nosotros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NosotrosPageRoutingModule,
    PipesModule
  ],
  declarations: [NosotrosPage]
})
export class NosotrosPageModule {}
