import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class TipoNegocioService {

  constructor( private http:HttpClient ) { }

  getTipoNegocio(){
    return this.http.get( environment.URI + 'tiponegociorest/' + environment.IDEMPRESA);
  }
}
