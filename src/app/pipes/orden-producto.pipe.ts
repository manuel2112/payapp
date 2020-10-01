import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordenProducto'
})
export class OrdenProductoPipe implements PipeTransform {

  transform(value: any, ): [] {
    return value.sort((a, b) => (a.varPro.PROVAR_ID > b.varPro.PROVAR_ID) ? 1 : -1 );
  }

}
