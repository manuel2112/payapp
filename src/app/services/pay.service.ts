import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment} from '../../environments/environment.prod';

import { DeviceService } from './device.service';

@Injectable({
  providedIn: 'root'
})
export class PayService {  

  constructor( private http:HttpClient,
               private deviceService:DeviceService ) {}

  sendCompra(ubicacion, total, subtotal, propina, tipo, persona, productos, sectordelivery, articulos){

    let url = environment.URI + "payrest";
    
    let data = {
      idEmpresa: environment.IDEMPRESA,
      ubicacion,
      total,
      subtotal,
      propina,
      tipo,
      persona,
      productos,
      articulos,
      sectordelivery,
      uuid: this.deviceService.getUUID(),
      model: this.deviceService.getModel()
    };
    const options = {
      headers: {
       'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    return this.http.post( url , JSON.stringify(data), options );
  }

  detalleCompra( hash ){
    return this.http.get( environment.URI + 'payrest/detallecompra/' + hash );
  }
}
