import { Injectable } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';

import { DeviceService } from '../services/device.service';

import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor( private platform: Platform, 
               private fcm: FCM,
               private deviceService:DeviceService,
               private alertController: AlertController,
               private router: Router ) { }

  initPushNotification() {

    if( !this.platform.is('cordova') ){
      return;
    }
  
    this.fcm.subscribeToTopic('people');

    this.fcm.getToken().then(token => {
      this.deviceService.insertDevice(token);
    });

    this.fcm.onNotification().subscribe(data => {
      //console.log(data);
      if (data.wasTapped) {
        if( data.idProducto > 0 ){
          this.detalle(data.idProducto);
        }        
      } else {
        if( data.idProducto > 0 ){
          this.showPushProducto(data.title, data.body, data.idProducto);
        }else{
          this.showPushNoProducto(data.title, data.body);
        }
      }
    });

    this.fcm.onTokenRefresh().subscribe(token => {
      //console.log(token);
    });
    // this.fcm.unsubscribeFromTopic('marketing');
  }

    async showPushProducto(title:string, body:string, idProducto:any) {
      const alert = await this.alertController.create({
        header: title,
        message: body,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {}
          }, {
            text: 'VER',
            handler: () => {
              this.detalle(idProducto);             
            }
          }
        ]
      });
  
      await alert.present();
    }

    async showPushNoProducto( title:string, body:string ) {
      const alert = await this.alertController.create({
        header: title,
        message: body,
        buttons: [
          {
            text: 'Cerrar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {}
          }
        ]
      });
  
      await alert.present();
    }

    detalle(id:any){
      if( id != '' ){
        this.router.navigate(['/producto',{ id: id }]);
      }else{
        this.router.navigate(['/notificacion']);
      }      
    }
}
