import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { environment} from '../../environments/environment.prod';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class StorageOrderService {

  buyorder:string = '';
  nmbSetBuyOrder:string = 'buyorder-' + environment.IDEMPRESA;

  constructor( private nativeStorage: NativeStorage,
               public platform: Platform) { }

  guardarStorage(order:string){
    this.buyorder = order;
    if(this.platform.is('cordova')){
      this.nativeStorage.setItem( this.nmbSetBuyOrder, this.buyorder)
      .then(
        () => {
          //console.log('Stored item!');
        },
          //error => console.error('Error storing item', error)
      );
    }else{      
      localStorage.setItem( this.nmbSetBuyOrder, this.buyorder);
    }
  }               
}
