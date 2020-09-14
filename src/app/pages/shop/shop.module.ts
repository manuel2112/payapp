import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopPageRoutingModule } from './shop-routing.module';
import { PipesModule } from '../../pipes/pipes.module';

import { ShopPage } from './shop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopPageRoutingModule,
    PipesModule
  ],
  declarations: [ShopPage]
})
export class ShopPageModule {}
