import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HorarioPageRoutingModule } from './horario-routing.module';

import { HorarioPage } from './horario.page';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HorarioPageRoutingModule,
    PipesModule
  ],
  declarations: [HorarioPage]
})
export class HorarioPageModule {}
