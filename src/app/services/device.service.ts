import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Device } from '@ionic-native/device/ngx';
import { environment} from '../../environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor( private device: Device,
               private http:HttpClient ) { }

  insertDevice(token:string){

    let data = {
      token:token,
      idEmpresa: environment.IDEMPRESA,
      uuid: this.device.uuid,
      model: this.device.manufacturer
    };
    const options = {
      headers: {
       'Content-Type': 'application/x-www-form-urlencoded'
      }
    }; 

    this.http.post(environment.URI + 'devicerest/', JSON.stringify(data), options)
    .subscribe((response) => {
      //console.log(response);               
    });

  } 

}
