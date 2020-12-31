import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ColoresService } from '../../services/colores.service';
import { PayService } from '../../services/pay.service';

@Component({
  selector: 'app-compra-single',
  templateUrl: './compra-single.page.html',
  styleUrls: ['./compra-single.page.scss'],
})
export class CompraSinglePage implements OnInit {

  @Input() hash:string;
  colorprimero:string = '';
  colorsegundo:string = '';
  colortercero:string = '';
  styleBorder:string = '';
  load:boolean = false;
  buyOrder:string = '';
  tipoNegocio:number;
  propina:number;
  delivery:number;
  total:number;
  fecha:string = '';
  detalles:any = JSON;
  arraySk:any = Array(20);

  constructor( private modalCtrl:ModalController,
               private coloresService:ColoresService,
               private payService:PayService ) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.instanciar();    
  }
  instanciar(){
    this.load = false;
    this.getColores();
    this.styleBorder = `border-bottom: 1px solid var(--ion-color-${ this.colorsegundo })`;
    this.verDetalle();
  }
  getColores(){
    this.colorprimero = this.coloresService.colorprimero;
    this.colorsegundo = this.coloresService.colorsegundo;
    this.colortercero = this.coloresService.colortercero;
  }

  verDetalle(){
    this.payService.detalleCompra(this.hash)
    .subscribe( (resp:any)  => {
      if( !resp.error ){
        this.buyOrder     = resp.info.mdlPedido.PEDIDO_ORDEN;
        this.tipoNegocio  = resp.info.mdlPedido.TIPO_NEGOCIO_ID;
        this.propina      = resp.info.mdlPedido.PEDIDO_PROPINA;
        this.delivery     = resp.info.mdlPedido.PEDIDO_DELIVERY;
        this.total        = resp.info.mdlPedido.PEDIDO_TOTAL;
        this.fecha        = resp.info.mdlPedido.PEDIDO_FECHA;
        this.detalles     = resp.info.mdlDetalle;
        this.load         = true;
      }
    });
  }

  salir(){
    this.modalCtrl.dismiss();
  }
  refresh(ev){
    this.instanciar();
    ev.target.complete();
  }

}
