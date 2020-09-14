import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncar'
})
export class TruncarPipe implements PipeTransform {

  transform(value: string): string {

    let cortar = 55;
    return value.length > cortar ? value.substring(0,cortar) +'...' : value;
  }

}
