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
      console.log(data);
      if (data.wasTapped) {
        this.detalle(data.idProducto);
      } else {
        this.showPush(data.title, data.body, data.idProducto);
      }
    });

    this.fcm.onTokenRefresh().subscribe(token => {
      console.log(token);
    });
    // this.fcm.unsubscribeFromTopic('marketing');
  }

    async showPush(title:string, body:string, idProducto:any) {
      const alert = await this.alertController.create({
        header: title,
        message: body,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              //console.log('Confirm Cancel: blah');
            }
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

    detalle(id:any){
      if( id != '' ){
        this.router.navigate(['/producto',{ id: id }]);
      }else{
        this.router.navigate(['/notificacion']);
      }      
    }
}
