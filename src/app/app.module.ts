import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import {HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { GoogleMaps } from '@ionic-native/google-maps';
import { PipesModule } from './pipes/pipes.module';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AgmCoreModule } from '@agm/core';            // @agm/core
import { AgmDirectionModule } from 'agm-direction';   // agm-direction


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    AgmCoreModule.forRoot({// @agm/core
      apiKey: 'AIzaSyC8TvTPxyi1Zh41iFENKegRp-SqlWfUmmc',
    }),
    AgmDirectionModule,
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
    GoogleMaps,
    NativeStorage
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
