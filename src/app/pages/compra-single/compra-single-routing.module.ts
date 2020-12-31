import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompraSinglePage } from './compra-single.page';

const routes: Routes = [
  {
    path: '',
    component: CompraSinglePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompraSinglePageRoutingModule {}
