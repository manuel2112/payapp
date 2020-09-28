import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PipesModule } from './pipes/pipes.module';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AgmCoreModule } from '@agm/core';            // @agm/core
import { AgmDirectionModule } from 'agm-direction';   // agm-direction
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FCM } from '@ionic-native/fcm/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
     IonicModule.forRoot(),
     AppRoutingModule,
     PipesModule,
     HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    InAppBrowser,
    CallNumber,
    NativeStorage,
    Geolocation,
    FCM
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
