import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  constructor( private http:HttpClient ) {}

  getDatos(){
    return this.http.get( environment.URI + 'horariorest/' + environment.IDEMPRESA);
  }
  
}
