import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComboPage } from './combo.page';

const routes: Routes = [
  {
    path: '',
    component: ComboPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComboPageRoutingModule {}
