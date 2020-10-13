import { Injectable } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';

import { DeviceService } from '../services/device.service';

import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor( private platform: Platform, 
               private fcm: FCM,
               private deviceService:DeviceService,
               private alertController: AlertController ) { }

  initPushNotification() {

    if( !this.platform.is('cordova') ){
      return;
    }
  
    this.fcm.subscribeToTopic('people');

    this.fcm.getToken().then(token => {
      //console.log('token: ',token);
      this.deviceService.insertDevice(token);
    });

    this.fcm.onNotification().subscribe(data => {
      console.log(data);
      if (data.wasTapped) {
        console.log('Received in background x');
        // this.router.navigate([data.landing_page, data.price]);
        // aqui direcciono el push
      } else {
        console.log('Received in foreground y');
        // this.router.navigate([data.landing_page, data.price]);
        this.showPush(data.title, data.body);
      }
    });

    this.fcm.onTokenRefresh().subscribe(token => {
      console.log(token);
    });
    // this.fcm.unsubscribeFromTopic('marketing');
    }

    async showPush(title:string, body:string) {
      const alert = await this.alertController.create({
        header: title,
        message: body,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Okay',
            handler: () => {
              console.log('Confirm Okay');
            }
          }
        ]
      });
  
      await alert.present();
    }
}
