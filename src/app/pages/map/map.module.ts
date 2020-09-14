import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapPageRoutingModule } from './map-routing.module';
import { PipesModule } from '../../pipes/pipes.module';

import { MapPage } from './map.page';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapPageRoutingModule,
    AgmCoreModule,
    AgmDirectionModule,
    PipesModule
  ],
  declarations: [MapPage]
})
export class MapPageModule {}
