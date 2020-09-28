import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dia'
})
export class DiaPipe implements PipeTransform {

  transform(valor: any): string {

    let txt;

    switch(valor) { 
      case '1': {
         txt = 'Lunes'
         break; 
      }
      case '2': {
        txt = 'Martes'
        break; 
      }
      case '3': {
        txt = 'Miércoles'
        break; 
      }
      case '4': {
        txt = 'Jueves'
        break; 
      }
      case '5': {
        txt = 'Viernes'
        break; 
      }
      case '6': {
        txt = 'Sábado'
        break; 
      }
      case '7': {
        txt = 'Domingo'
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
