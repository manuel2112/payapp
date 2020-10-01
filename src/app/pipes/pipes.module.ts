import { NgModule } from '@angular/core';
import { DiaPipe } from './dia.pipe';
import { UrlPipe } from './url.pipe';
import { TruncarPipe } from './truncar.pipe';
import { PesoPipe } from './peso.pipe';
import { NumeroPipe } from './numero.pipe';
import { OrdenProductoPipe } from './orden-producto.pipe';

@NgModule({
  declarations: [
    DiaPipe,
    UrlPipe,
    TruncarPipe,
    PesoPipe,
    NumeroPipe,
    OrdenProductoPipe
  ],
  exports:
  [
    DiaPipe,
    UrlPipe,
    TruncarPipe,
    PesoPipe,
    NumeroPipe,
    OrdenProductoPipe
  ]
})
export class PipesModule { }
