import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Info } from '../interfaces/interfaces';
import { environment} from '../../environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor( private http:HttpClient ) {}

   getTopDatos(){
     return this.http.get<Info>( environment.URI + 'clienterest/' + environment.IDEMPRESA);
   }
   apertura(){
     return this.http.get<Info>( environment.URI + 'clienterest/apertura/' + environment.IDEMPRESA);
   }
   delivery(){
     return this.http.get<Info>( environment.URI + 'clienterest/delivery/' + environment.IDEMPRESA);
   }

}
