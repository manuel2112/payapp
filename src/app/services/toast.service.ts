import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor( public toastController: ToastController ) { }

  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position: 'bottom'
    });
    toast.present();
  }

}
