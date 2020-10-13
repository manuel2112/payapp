import { NgModule } from '@angular/core';
import { DiaPipe } from './dia.pipe';
import { UrlPipe } from './url.pipe';
import { TruncarPipe } from './truncar.pipe';
import { PesoPipe } from './peso.pipe';
import { NumeroPipe } from './numero.pipe';
import { OrdenProductoPipe } from './orden-producto.pipe';
import { DatePipe } from './date.pipe';

@NgModule({
  declarations: [
    DiaPipe,
    UrlPipe,
    TruncarPipe,
    PesoPipe,
    NumeroPipe,
    OrdenProductoPipe,
    DatePipe
  ],
  exports:
  [
    DiaPipe,
    UrlPipe,
    TruncarPipe,
    PesoPipe,
    NumeroPipe,
    OrdenProductoPipe,
    DatePipe
  ]
})
export class PipesModule { }
