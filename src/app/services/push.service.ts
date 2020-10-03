import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor( private platform: Platform, 
               private fcm: FCM ) { }

  initPushNotification() {
  
    this.fcm.subscribeToTopic('people');

    this.fcm.getToken().then(token => {
      console.log('token: ',token);
    });

    this.fcm.onNotification().subscribe(data => {
      console.log(data);
      if (data.wasTapped) {
        console.log('Received in background');
        // this.router.navigate([data.landing_page, data.price]);
      } else {
        console.log('Received in foreground');
        // this.router.navigate([data.landing_page, data.price]);
      }
    });

    this.fcm.onTokenRefresh().subscribe(token => {
      console.log(token);
    });

    // this.fcm.unsubscribeFromTopic('marketing');
    }
}
