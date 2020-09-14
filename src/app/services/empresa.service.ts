import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Info } from '../interfaces/interfaces';
import { environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor( private http:HttpClient ) {
   }

   getTopDatos(){
     return this.http.get<Info>( environment.APICliente + 'clienterest/' + environment.IDEMPRESA);
     console.log(environment.APICliente + '/clienterest/' + environment.IDEMPRESA);
   }
   apertura(){
     return this.http.get<Info>( environment.APICliente + 'clienterest/apertura/' + environment.IDEMPRESA);
   }

}
