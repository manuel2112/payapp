import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { CompraSinglePage } from '../compra-single/compra-single.page';

import { ComprasService } from '../../services/compras.service';
import { ColoresService } from '../../services/colores.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.page.html',
  styleUrls: ['./compras.page.scss'],
})
export class ComprasPage implements OnInit {

  compras:any = [];
  load:boolean = false;
  sinCompras:boolean = false;
  colorprimero:string = '';
  colorsegundo:string = '';
  arraySk:any = Array(20);
  styleBorder:string = '';

  constructor( private comprasService:ComprasService, 
               private coloresService:ColoresService,
               private modalCtrl:ModalController ) {
                 
                this.coloresService.getColorStorage();
                
              }
               
  ngOnInit() {
    this.getColores();
  }
  ionViewWillEnter(){
    this.instanciar();
  }
  instanciar(){
    this.load = false;
    this.getCompras();
    this.styleBorder = `border-bottom: 1px solid var(--ion-color-${ this.colorsegundo })`;
  }

  getColores(){
    this.colorprimero = this.coloresService.colorprimero;
    this.colorsegundo = this.coloresService.colorsegundo;
  }

  getCompras(){
    this.comprasService.getCompras()
    .subscribe( (resp:any)  => {
      if( !resp.error ){
        this.compras = resp.data.compras;
      }
      this.sinCompras = resp.error;
      this.load = true;
    });
  }

  async detalleCompra(hash:any){    
    const modal = await this.modalCtrl.create({
        component: CompraSinglePage,
        componentProps: {
          hash
        }
      });
      await modal.present();
  }

  refresh(ev){
    this.instanciar();
    ev.target.complete();
  }

}
