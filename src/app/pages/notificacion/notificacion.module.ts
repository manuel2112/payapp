import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificacionPageRoutingModule } from './notificacion-routing.module';
import { PipesModule } from '../../pipes/pipes.module';

import { NotificacionPage } from './notificacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificacionPageRoutingModule,
    PipesModule
  ],
  declarations: [NotificacionPage]
})
export class NotificacionPageModule {}
