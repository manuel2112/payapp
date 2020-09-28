import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

// import { INotificationPayload } from 'cordova-plugin-fcm-with-dependecy-updated';
// import { FCM } from '@ionic-native/fcm/ngx';

@Injectable({
  providedIn: 'root'
})
export class PushService {
  // public hasPermission: boolean;
  // public token: string;
  // public pushPayload: INotificationPayload;

  constructor( ) { 

    // this.setupFCM();

  }
  
  // async setupFCM() {
  //   await this.platform.ready();
  //   console.log('FCM setup started');

  //   if (!this.platform.is('cordova')) {
  //     return;
  //   }
  //   console.log('In cordova platform');

  //   console.log('Subscribing to token updates');
  //   this.fcm.onTokenRefresh().subscribe((newToken) => {
  //     this.token = newToken;
  //     console.log('onTokenRefresh received event with: ', newToken);
  //   });

  //   console.log('Subscribing to new notifications');
  //   this.fcm.onNotification().subscribe((payload) => {
  //     this.pushPayload = payload;
  //     console.log('onNotification received event with: ', payload);
  //   });

  //   // this.hasPermission = await this.fcm.requestPushPermission();
  //   // console.log('requestPushPermission result: ', this.hasPermission);

  //   this.token = await this.fcm.getToken();
  //   console.log('getToken result: ', this.token);

  //   // this.pushPayload = await this.fcm.getInitialPushPayload();
  //   // console.log('getInitialPushPayload result: ', this.pushPayload);
  // }

  // public get pushPayloadString() {
  //   return JSON.stringify(this.pushPayload, null, 4);
  // }
}
