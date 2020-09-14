import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoading = false;
  constructor(public loadingController: LoadingController) { }
  
  async loadingPresent() {

    try {
      this.isLoading = true;
      return await this.loadingController.create({
        message: 'Cargando ...'
      }).then(a => {
        a.present().then(() => {
          if (!this.isLoading) {
            a.dismiss().then(() => '');
          }
        });
      });
    }
    catch(e) {
      //console.log('present',e);
    }


  }

  async loadingDismiss() {

    try {
      this.isLoading = false;
      return await this.loadingController.dismiss().then(() => '');
    }
    catch(e) {
      //console.log('dismiss',e);
    }
  }
}
