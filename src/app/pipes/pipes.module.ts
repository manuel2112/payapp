import { NgModule } from '@angular/core';
import { DiaPipe } from './dia.pipe';
import { UrlPipe } from './url.pipe';
import { TruncarPipe } from './truncar.pipe';
import { PesoPipe } from './peso.pipe';
import { NumeroPipe } from './numero.pipe';
import { OrdenProductoPipe } from './orden-producto.pipe';
import { DatePipe } from './date.pipe';
import { TipoNegocioPipe } from './tipo-negocio.pipe';
import { Nl2brPipe } from './nl2br.pipe';
import { ComboPipe } from './combo.pipe';

@NgModule({
  declarations: [
    DiaPipe,
    UrlPipe,
    TruncarPipe,
    PesoPipe,
    NumeroPipe,
    OrdenProductoPipe,
    DatePipe,
    TipoNegocioPipe,
    Nl2brPipe,
    ComboPipe
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
    TipoNegocioPipe,
    Nl2brPipe,
    ComboPipe
  ]
})
export class PipesModule { }
