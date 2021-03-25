import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor( private http:HttpClient ) {  }

  getMenu(){
    return this.http.get( environment.URI + 'menurest/' + environment.IDEMPRESA );
  }

  getProducto(id:number){
    return this.http.get( `${environment.URI}menurest/producto/${id}/${environment.IDEMPRESA}` );
  }
  
  comprobarStock(productos:any){
    let url = environment.URI + "menurest/stock/";
    
    let data = {
      productos
    };
    const options = {
      headers: {
       'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    return this.http.post( url , JSON.stringify(data), options );
  }

}
