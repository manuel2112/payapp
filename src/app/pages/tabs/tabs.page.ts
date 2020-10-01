import { Component } from '@angular/core';

import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor( private storageService:StorageService ) {}

  ionViewWillEnter(){
    this.storageService.getStorage();
    this.counterShop();
  }

  counterShop(){
    return this.storageService.countProductos();
  }

}
