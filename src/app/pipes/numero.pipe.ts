import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numero'
})
export class NumeroPipe implements PipeTransform {

  transform( value: string ): number {
    return Number(value);
  }

}
