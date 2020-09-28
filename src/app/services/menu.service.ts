import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor( private http:HttpClient ) {  }

  getMenu(){
    return this.http.get( environment.URI + 'menurest/' + environment.IDEMPRESA );
  }

  getProducto(id:number){
    return this.http.get( environment.URI + 'menurest/producto/' + id );
  }

}
