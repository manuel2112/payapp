import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoNegocio'
})
export class TipoNegocioPipe implements PipeTransform {

  transform(valor: string): string {

    let txt;

    switch(valor) { 
      case '1': {
         txt = 'DELIVERY'
         break; 
      }
      case '2': {
        txt = 'PAGO EN LOCAL'
        break; 
      }
      case '3': {
        txt = 'RETIRO EN LOCAL'
        break; 
      }
      default: {
        txt = 'ERROR'
         break; 
      } 
   }

    return txt;
  }

}
