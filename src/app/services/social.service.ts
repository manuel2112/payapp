import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no'
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'no',//Android only ,shows browser zoom controls
    hardwareback : 'no',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'X', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'no', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'no',//Windows only    
    hideurlbar : 'yes',//Windows only    
};
  urlSuccessPage:string = environment.URISSL + "paymall/exito";

  constructor( private iab: InAppBrowser,
               private platform: Platform ) { }

  facebook(url:string){
    let target = "_blank";
    this.iab.create(url,target,this.options);
  }
  instagram(url:string){
    let target = "_blank";
    this.iab.create(url,target,this.options);
  }
  web(url:string){
    let target = "_blank";
    this.iab.create(url,target,this.options);
  }
  whatsapp(number:string){
    let target = "_system";
    this.iab.create(`https://wa.me/${ number }?text=Hola,%20quiero%20hacer%20una%20consulta`,target);
  }
  fono(number:string){
    let target = "_system";
    this.iab.create(`tel:${ number }`,target);
  }

  webpay(url:string) {
    let target = "_blank";
    var browser = this.iab.create(url, target, this.options);

    if( this.platform.is('cordova') ){
      browser.on('loadstart').subscribe((e) => {
        if ( e.url == this.urlSuccessPage ) {
          browser.close();
        }
      });
    }
    
  }

  email(email:string){
    window.location.href = `mailto:${ email }?subject=Hola,%20quiero%20hacer%20una%20consulta`;
  }

}
