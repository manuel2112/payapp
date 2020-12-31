import { NgModule } from '@angular/core';
import { DiaPipe } from './dia.pipe';
import { UrlPipe } from './url.pipe';
import { TruncarPipe } from './truncar.pipe';
import { PesoPipe } from './peso.pipe';
import { NumeroPipe } from './numero.pipe';
import { OrdenProductoPipe } from './orden-producto.pipe';
import { DatePipe } from './date.pipe';
import { TipoNegocioPipe } from './tipo-negocio.pipe';

@NgModule({
  declarations: [
    DiaPipe,
    UrlPipe,
    TruncarPipe,
    PesoPipe,
    NumeroPipe,
    OrdenProductoPipe,
    DatePipe,
    TipoNegocioPipe
  ],
  exports:
  [
    DiaPipe,
    UrlPipe,
    TruncarPipe,
    PesoPipe,
    NumeroPipe,
    OrdenProductoPipe,
    DatePipe,
    TipoNegocioPipe
  ]
})
export class PipesModule { }
