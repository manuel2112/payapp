import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

import { ColoresService } from '../../services/colores.service';
import { PayService } from '../../services/pay.service';
import { LoadingService } from '../../services/loading.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-detalle-compra',
  templateUrl: './detalle-compra.page.html',
  styleUrls: ['./detalle-compra.page.scss'],
})
export class DetalleCompraPage implements OnInit {

  @Input() hash:string;
  colorprimero:string = '';
  colorsegundo:string = '';
  colortercero:string = '';
  styleBorder:string = '';
  error:boolean = false;
  detalle:boolean = false;
  btnVerDetalle:boolean = true;
  buyOrder:string = '';
  tipoNegocio:number;
  propina:number;
  delivery:number;
  total:number;
  fecha:string = '';
  detalles:any = JSON;

  constructor( private modalCtrl:ModalController,
               private coloresService:ColoresService,
               private payService:PayService,
               private loadingService:LoadingService,
               private navCtrl: NavController,
               private storageService:StorageService ) {
                 
                this.coloresService.getColorStorage();
                
              }

  ngOnInit() {
    this.getColores();
    this.styleBorder = `border-bottom: 1px solid var(--ion-color-${ this.colorsegundo })`;
  }
  ionViewWillEnter(){
    this.instanciar();
    
  }
  instanciar(){
    //AQUI LLAMO SERVICE
  }
  getColores(){
    this.colorprimero = this.coloresService.colorprimero;
    this.colorsegundo = this.coloresService.colorsegundo;
    this.colortercero = this.coloresService.colortercero;
  }

  verDetalle(){
    this.loadingService.loadingPresent();
    this.payService.detalleCompra(this.hash)
    .subscribe( (resp:any)  => {
      this.error = resp.error;      
      this.btnVerDetalle = false;
      if( !resp.error ){
        this.detalle      = true;
        this.buyOrder     = resp.info.mdlPedido.PEDIDO_ORDEN;
        this.tipoNegocio  = resp.info.mdlPedido.TIPO_NEGOCIO_ID;
        this.propina      = resp.info.mdlPedido.PEDIDO_PROPINA;
        this.delivery     = resp.info.mdlPedido.PEDIDO_DELIVERY;
        this.total        = resp.info.mdlPedido.PEDIDO_TOTAL;
        this.fecha        = resp.info.mdlPedido.PEDIDO_FECHA;
        this.detalles     = resp.info.mdlDetalle;
        this.limpiarStorage();
      }
      this.loadingService.loadingDismiss();
    });
  }

  limpiarStorage(){
    this.storageService.limpiarStorage();
  }

  cerrar(){
    this.navCtrl.navigateRoot('compras');
    this.modalCtrl.dismiss({
      'dismissed': true
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
