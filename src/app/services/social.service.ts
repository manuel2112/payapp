import { Injectable } from '@angular/core';

import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'X', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only    
};

  constructor( private iab: InAppBrowser,
               private callNumber: CallNumber ) { }

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
    this.iab.create(`https://wa.me/${ number }?text=Hello%20world`,target);
  }
  fono(number:string){
    let target = "_system";
    this.iab.create(`tel:${ number }`,target);
    // this.callNumber.callNumber(number, true)
    // .then(res => console.log('Launched dialer!', res))
    // .catch(err => console.log('Error launching dialer', err));
  }
}
