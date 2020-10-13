import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: string ): string {

    var dia = value.substr(8, 2);
    var mes = value.substr(5, 2);
    var anno = value.substr(0, 4);
    var date = dia + '/' + mes + '/' + anno;
    return date;
  }

}
