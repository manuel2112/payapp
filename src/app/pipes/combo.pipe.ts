import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'combo'
})
export class ComboPipe implements PipeTransform {

  transform(valor: any): string {

    let salida = '';
    valor.forEach( element => {
      salida += `${element.ARTICULO_NOMBRE} - `;
    });
    return `* ${ salida.slice(0, -3) }`;
  }

}
