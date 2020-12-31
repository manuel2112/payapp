import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

import { environment} from '../../environments/environment.prod';
import { DeviceService } from './device.service';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  constructor( private http:HttpClient,
               private deviceService:DeviceService,
               private platform: Platform ) {}

  getCompras(){

    if( this.platform.is('cordova') ){
      var idDevice = this.deviceService.getUUID();
    }
    else{
      var idDevice = '3a9adc6881595303';
    }
    
    return this.http.get( environment.URI + 'pedidorest/' + environment.IDEMPRESA +'/'+ idDevice);
  }
}
