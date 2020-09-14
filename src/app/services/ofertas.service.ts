import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class OfertasService {

  constructor( private http:HttpClient ) { }

  getOfertas(){
    return this.http.get( environment.APICliente + 'ofertarest/' + environment.IDEMPRESA );
  }

  getDestacados(){
    return this.http.get( environment.APICliente + 'ofertarest/destacado/' + environment.IDEMPRESA );
  }
}
