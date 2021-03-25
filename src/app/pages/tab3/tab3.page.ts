import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

import { TabsPage } from '../tabs/tabs.page';
import { ShopPage } from '../shop/shop.page';
import { ComboPage } from '../combo/combo.page';

import { EmpresaService } from '../../services/empresa.service';
import { LoadingService } from '../../services/loading.service';
import { ToastService } from '../../services/toast.service';
import { StorageService } from '../../services/storage.service';
import { TipoNegocioService } from '../../services/tipo-negocio.service';
import { AperturaService } from '../../services/apertura.service';
import { ColoresService } from '../../services/colores.service';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  productos:any = [];
  articulos:any = [];
  load:boolean = false;
  totalProductos:number = 0;
  txtObs:string = '';
  tipoEntrega:number = 0;
  arraySk:any = Array(20);
  open  = 0;
  timeBack:string = '';
  colorprimero:string = '';
  colorsegundo:string = '';
  colortercero:string = '';
  styleBorder:string = '';
  tipoNegocio:any = [];
  montoMinimo:any = [];

  constructor( private loadingService:LoadingService,
               private storageService:StorageService,
               private tabspage: TabsPage,
               private toastService: ToastService,
               private alertController: AlertController,
               private modalCtrl:ModalController,
               private router: Router,
               private aperturaService:AperturaService,
               private coloresService:ColoresService, 
               private tipoNegocioService:TipoNegocioService,
               private tabsPage:TabsPage,
               private menuService:MenuService,
               private empresaService:EmpresaService ) {}

  ngOnInit(){
    this.aperturaService.updateHorario();
    this.updateHorarioTimer();
  }
  ionViewWillEnter(){
    this.instanciar();
  }
  instanciar(){
    this.load = false;
    this.tipoEntrega = 0;
    this.getColores();
    this.tabsPage.getColores();
    this.styleBorder = `border-bottom: 1px solid var(--ion-color-${ this.colorsegundo })`;
    this.cargarProductos();
    this.getTipoNegocio();
    this.getEmpresa();
  }
  getColores(){
    this.colorprimero = this.coloresService.colorprimero;
    this.colorsegundo = this.coloresService.colorsegundo;
    this.colortercero = this.coloresService.colortercero;
  }
  getEmpresa(){
    this.empresaService.getEmpresa()
    .subscribe( (resp:any)  => {
      if( resp.info.empresa.EMPRESA_MEMBRESIA == 0 ){
        this.router.navigate(['tabs/tab1']);
      }
    });
  }

  updateHorarioTimer() {
    setInterval(() => {
      this.aperturaService.updateHorario();
    }, 60000);
    setInterval(() => {
      this.load = this.aperturaService.load;
      this.timeBack = this.aperturaService.timeBack;
      this.open = this.aperturaService.open;
    }, 1000);
  }
  getTipoNegocio(){
    this.tipoNegocioService.getTipoNegocio()
    .subscribe( (resp:any)  => {
      this.tipoNegocio = resp.info.tiponegocio;
      this.montoMinimo = resp.info.montoMinimo;
    });
  }
  ionViewDidEnter() {
    this.loadingService.loadingDismiss();
  }

  cargarProductos(){
    this.storageService.getStorage();
    this.storageService.getComboStorage();
    this.productos = this.storageService.shoping;
    this.articulos = this.storageService.combo;
    this.totalProductos = this.storageService.totalPagar(this.productos);
  }

  eliminarVarPro(idVarPro:number){
    this.loadingService.loadingPresent();
    this.storageService.borrar(idVarPro);
    this.cargarProductos();
    this.tabspage.counterShop();
    this.loadingService.loadingDismiss();
    this.toastService.presentToast('Producto eliminado');
  }

  restar( producto:any ){
    this.loadingService.loadingPresent();
    producto.cantidad--;
    this.storageService.insertStorage(producto.nmbPro, producto.varPro, producto.cantidad, '', producto.esCombo, '', false);
    //ELIMINAR ULTIMO PEDIDO DE COMBO
    if( producto.esCombo ){
      this.storageService.deleteLastCombo(producto.varPro.PROVAR_ID);
    }
    this.cargarProductos();
    this.loadingService.loadingDismiss();
  }

  
  getProducto(id:number,producto:any){
    this.menuService.getProducto(id)
    .subscribe( (resp:any)  => {
      this.abrirDatosCombo(resp.info.combo, producto.nmbPro, producto.varPro, producto.cantidad, '');
    });
  }

  sumar( producto:any ){
    this.loadingService.loadingPresent();
    //CONFIRMAR SI ES COMBO
    if( producto.esCombo ){
      this.getProducto(producto.varPro.PRODUCTO_ID, producto);      
    }else{
      this.addSuma(producto.nmbPro, producto.varPro, producto.cantidad, '', producto.esCombo, '', false);
    }    
    this.loadingService.loadingDismiss();
  }

  addSuma(nmbPro:string, varPro:any, cantidad:number, stock:any, esCombo:boolean, articulo:any, esSuma:boolean){
    cantidad++;
    this.storageService.insertStorage(nmbPro, varPro, cantidad, '', esCombo, articulo, esSuma);
    this.cargarProductos();
  }

  async abrirDatosCombo(combo:any, nmbPro:string, varPro:any, cantidad:number, stock:any){    
    const modal = await this.modalCtrl.create({
        component: ComboPage,
        componentProps: {
          combo,
          nmbPro
        }
      });
      modal.onDidDismiss()
      .then((data) => {
        if( data.data ){
          this.addSuma(nmbPro, varPro, cantidad, '', true, data.data, true);
        }
      });

      await modal.present();
  }
  
  comprobarStock(){
    this.loadingService.loadingPresent();
      this.menuService.comprobarStock(this.productos)
      .subscribe( (resp:any)  => {
        this.loadingService.loadingDismiss();
        if( !resp.error ){
          this.toastService.presentToast(resp.info.mensaje);
          return;
        }else if( resp.info.disponible != '' ){
          this.toastService.presentToast(resp.info.disponible);
          return;
        }else{
          if( this.montoMinimo != null){
            if( this.tipoEntrega == 1 && (this.montoMinimo.MONTO_MIN_COMPRA_FLAG == 1) && (this.totalProductos < this.montoMinimo.MONTO_MIN_COMPRA_VALOR) ){
              this.toastService.presentToast(this.montoMinimo.MONTO_MIN_COMPRA_OBS);
              return;
            }
          }
          this.abrirShop();
        }
      }); 
  }

  async abrirShop(){
        
    const modal = await this.modalCtrl.create({
        component: ShopPage,
        componentProps: {
          subTotal: this.totalProductos,
          tipo: this.tipoEntrega,
          productos: this.productos,
          articulos: this.articulos
        }
      });      
      
      if( this.tipoEntrega == 0 ){
        this.toastService.presentToast('SELECCIONA EL TIPO DE SERVICIO.');
        return;
      }
      await modal.present();
  }

  irMenu(){
    this.router.navigate(['tabs/tab2']);
  }

  async obsAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'OBSERVACIONES',
      subHeader: 'Ingresa si deseas algo en especial en tu pedido, ej. completo sin mayo, bebida helada etc.',
      inputs: [
        {
          name: 'observacion',
          type: 'textarea',
          value: this.txtObs != '' ? this.txtObs : '',
          placeholder: 'ESCRIBE AQUÍ TU OBS.'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancelar',
          cssClass: 'secondary',
          handler: () => {
            this.toastService.presentToast('NO INGRESASTE OBSERVACIÓN');
          }
        }, {
          text: 'Agregar',
          handler: (data) => {
            this.txtObs = data.observacion;
          }
        }
      ]
    });
    
    await alert.present();
  }
  
  async helpServicio() {
    
    var mensaje = '';
    this.tipoNegocio.forEach(function (value) {
      mensaje += `<strong>${ value.TIPO_NEGOCIO_ABR }</strong>: ${ value.TIPO_NEGOCIO_DESC }<br><br>`;
    }); 

    const alert = await this.alertController.create({
      header: 'SERVICIOS',
      subHeader: 'SELECCIONA EL TIPO DE SERVICIO QUE DESEAS:',
      message: mensaje,
      buttons: ['CERRAR']
    });

    await alert.present();
  }

  clcEntrega(valor:number){
    this.tipoEntrega = valor;
  }
  refresh(ev:any){
    this.instanciar();
    ev.target.complete();
  }

  cleanCanasta(){
    this.storageService.limpiarStorage();
  }

}
