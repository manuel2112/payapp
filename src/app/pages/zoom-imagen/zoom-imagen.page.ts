import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ColoresService } from '../../services/colores.service';

@Component({
  selector: 'app-zoom-imagen',
  templateUrl: './zoom-imagen.page.html',
  styleUrls: ['./zoom-imagen.page.scss'],
})
export class ZoomImagenPage implements OnInit {

  @Input() img;
  @Input() producto;
  colorprimero:string = '';
  colorsegundo:string = '';

  constructor( private modalCtrl:ModalController,
               private coloresService:ColoresService ) { }

  ngOnInit() {
    this.getColores();
  }
  getColores(){
    this.colorprimero = this.coloresService.colorprimero;
    this.colorsegundo = this.coloresService.colorsegundo;
  }

  salir(){
    this.modalCtrl.dismiss();
  }

}
