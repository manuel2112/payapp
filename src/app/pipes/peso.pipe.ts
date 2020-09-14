import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'peso'
})
export class PesoPipe implements PipeTransform {

  transform(value: string): string {

    value = value.toString()
    while (true) {
      var n2 = value.replace(/(\d)(\d{3})($|,|\.)/g, '$1.$2$3')
      if (value == n2) break
      value = n2
    }

    const peso = '$ ' + value;
    return peso;
  }

}
