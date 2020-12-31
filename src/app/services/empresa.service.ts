import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Info } from '../interfaces/interfaces';
import { environment} from '../../environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  tiempoEntrega:string = '';

  constructor( private http:HttpClient ) {
    this.getInstanciar();
  }

   getTopDatos(){
     return this.http.get<Info>( environment.URI + 'clienterest/' + environment.IDEMPRESA);
   }
   apertura(){
     return this.http.get<Info>( environment.URI + 'clienterest/apertura/' + environment.IDEMPRESA);
   }
   getInstanciar(){
    return this.http.get<Info>( environment.URI + 'clienterest/' + environment.IDEMPRESA)
    .subscribe( (resp:any)  => {
      this.tiempoEntrega = resp.info.empresa.EMPRESA_T_ENTREGA;  
    });
  }

}
