import { Component, OnInit } from '@angular/core';
import { TabsPage } from '../tabs/tabs.page'
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

import { ShopPage } from '../shop/shop.page';

import { LoadingService } from '../../services/loading.service';
import { ToastService } from '../../services/toast.service';
import { StorageService } from '../../services/storage.service';
import { TipoNegocioService } from '../../services/tipo-negocio.service';
import { AperturaService } from '../../services/apertura.service';
import { ColoresService } from '../../services/colores.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  productos:any = [];
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

  constructor( private loadingService:LoadingService,
               private storageService:StorageService,
               private tabspage: TabsPage,
               private toastService: ToastService,
               private alertController: AlertController,
               private modalCtrl:ModalController,
               private router: Router,
               private aperturaService:AperturaService,
               private coloresService:ColoresService, 
               private tipoNegocioService:TipoNegocioService ) {}

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
    this.styleBorder = `border-bottom: 1px solid var(--ion-color-${ this.colorsegundo })`;
    this.cargarProductos();
    this.getTipoNegocio();
  }
  getColores(){
    this.colorprimero = this.coloresService.colorprimero;
    this.colorsegundo = this.coloresService.colorsegundo;
    this.colortercero = this.coloresService.colortercero;
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
    });
  }
  ionViewDidEnter() {
    this.loadingService.loadingDismiss();
  }

  cargarProductos(){
    this.storageService.getStorage();
    this.productos = this.storageService.shoping;
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

  restar(nmbPro:string, varPro:any, cantidad:number){
    this.loadingService.loadingPresent();
    cantidad--;
    this.storageService.insertStorage(nmbPro, varPro, cantidad, '');
    this.cargarProductos();
    this.loadingService.loadingDismiss();
  }
  sumar(nmbPro:string, varPro:any, cantidad:number){
    this.loadingService.loadingPresent();
    cantidad++;
    this.storageService.insertStorage(nmbPro, varPro, cantidad, '');
    this.cargarProductos();
    this.loadingService.loadingDismiss();
  }

  async abrirShop(){
    
    const modal = await this.modalCtrl.create({
        component: ShopPage,
        componentProps: {
          subTotal: this.totalProductos,
          tipo: this.tipoEntrega,
          productos: this.productos
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
    const alert = await this.alertController.create({
      header: 'SERVICIOS',
      subHeader: 'SELECCIONA EL TIPO DE SERVICIO QUE DESEAS:',
      message: '<strong>DELIVERY</strong>: ENTREGA A TU HOGAR U OTRO PUNTO QUE DESEES<br><br> <strong>EN LOCAL</strong>: SOLICITARÁS TU PEDIDO ESTANDO EN EL LOCAL<br><br> <strong>RETIRO</strong>: SOLICITARÁS TU PEDIDO PARA QUE LO RETIRES CUANDO TE AVISEMOS',
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

}
