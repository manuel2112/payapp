import { NgModule } from '@angular/core';
import { DiaPipe } from './dia.pipe';
import { UrlPipe } from './url.pipe';
import { TruncarPipe } from './truncar.pipe';
import { PesoPipe } from './peso.pipe';
import { NumeroPipe } from './numero.pipe';

@NgModule({
  declarations: [
    DiaPipe,
    UrlPipe,
    TruncarPipe,
    PesoPipe,
    NumeroPipe
  ],
  exports:
  [
    DiaPipe,
    UrlPipe,
    TruncarPipe,
    PesoPipe,
    NumeroPipe
  ]
})
export class PipesModule { }
