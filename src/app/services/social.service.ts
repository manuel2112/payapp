import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

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
    hardwareback : 'yes',
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
urlSuccessPage:string = "https://www.localfood.cl/app/index.php/paymall/exito";

  constructor( private iab: InAppBrowser,
               private platform: Platform ) { }

  facebook(url:string){
    let target = "_system";
    this.iab.create(url,target,this.options);
  }
  instagram(url:string){
    let target = "_system";
    this.iab.create(url,target,this.options);
  }
  web(url:string){
    let target = "_blank";
    this.iab.create(url,target,this.options);
  }
  whatsapp(number:string){
    let target = "_system";
    this.iab.create(`https://wa.me/${ number }?text=Hello%20world`,target);
  }
  fono(number:string){
    let target = "_system";
    this.iab.create(`tel:${ number }`,target);
  }

  webpay(url:string) {
    var browser = this.iab.create(url, '_blank', 'clearcache=yes,clearsessioncache=yes,location=yes,hardwareback=no,zoom=no');

    if( this.platform.is('cordova') ){
      browser.on('loadstart').subscribe((e) => {
        if ( e.url == this.urlSuccessPage ) {
          browser.close();
        }
      });
    }
    
  }

}
