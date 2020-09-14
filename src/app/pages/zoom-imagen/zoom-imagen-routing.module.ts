import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZoomImagenPage } from './zoom-imagen.page';

const routes: Routes = [
  {
    path: '',
    component: ZoomImagenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZoomImagenPageRoutingModule {}
