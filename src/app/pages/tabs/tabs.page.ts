import { Component, OnInit } from '@angular/core';

import { StorageService } from '../../services/storage.service';
import { ColoresService } from '../../services/colores.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  colorprimero:string = '';
  colorsegundo:string = '';

  constructor( private storageService:StorageService, 
               private coloresService:ColoresService ) {}

  ngOnInit(){
    this.coloresService.getColores();
  }               

  ionViewWillEnter(){
    this.storageService.getStorage();
    this.counterShop();
  }

  counterShop(){
    return this.storageService.countProductos();
  }
  getColores(){
    this.colorprimero = this.coloresService.colorprimero;
    this.colorsegundo = this.coloresService.colorsegundo;
  }

}
