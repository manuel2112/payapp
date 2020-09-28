import { Pipe, PipeTransform } from '@angular/core';
import { environment} from '../../environments/environment.prod'

@Pipe({
  name: 'url'
})
export class UrlPipe implements PipeTransform {

  transform( value: string ): string {

    const image = value ? environment.URI + value : './assets/img/no-img.png' ; 

    return image;
  }

}
