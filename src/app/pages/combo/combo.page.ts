import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ColoresService } from '../../services/colores.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-combo',
  templateUrl: './combo.page.html',
  styleUrls: ['./combo.page.scss'],
})
export class ComboPage implements OnInit {

  @Input() combo;
  @Input() nmbPro;
  colorprimero:string = '';
  colorsegundo:string = '';
  colortercero:string = '';
  arreglo:any = Array();

  constructor( private modalCtrl:ModalController,
               private coloresService:ColoresService,
               private toastService: ToastService ) {
                 
                this.coloresService.getColorStorage();
              }

  ngOnInit() {
    this.getColores();
  }
  getColores(){
    this.colorprimero = this.coloresService.colorprimero;
    this.colorsegundo = this.coloresService.colorsegundo;
    this.colortercero = this.coloresService.colortercero;
  }

  selectArticulo(idArticulo:number, indice:number){
    this.arreglo[indice] = idArticulo;
  }

  seleccionar(){
  
    if( this.arreglo.length == this.combo.length ){
      this.modalCtrl.dismiss(this.arreglo);
    }else{
      this.toastService.presentToast('SELECCIONAR TODOS LOS CAMPOS');
    }

  }

  salir(){
    this.modalCtrl.dismiss();
  }

}
