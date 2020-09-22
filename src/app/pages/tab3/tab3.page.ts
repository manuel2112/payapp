import { Component } from '@angular/core';
import { TabsPage } from '../tabs/tabs.page'
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

import { ShopPage } from '../shop/shop.page';

import { LoadingService } from '../../services/loading.service';
import { ToastService } from '../../services/toast.service';
import { StorageService } from '../../services/storage.service';
import { EmpresaService } from '../../services/empresa.service';
import { ReturnStatement } from '@angular/compiler';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  productos:[] = [];
  cargando:boolean = false;
  totalProductos:number = 0;
  boolObs:boolean = false;
  txtObs:string = '';
  tipoEntrega:number = 0;//1=DELIVERY,2=RETIRO EN LOCAL
  txtDelivery:string = '';
  boolDelivery:boolean = false;
  counterNegocio:number = 0;

  constructor( private loadingService:LoadingService,
               private storageService:StorageService,
               private tabspage: TabsPage,
               private toastService: ToastService,
               private alertController: AlertController,
               private modalCtrl:ModalController,
               private router: Router,
               private empresaService:EmpresaService ) {}

  ionViewWillEnter(){
    this.loadingService.loadingPresent();
    this.cargando = false;
    this.instanciar();
  }

  instanciar(){
    this.cargarProductos();
    this.empresaService.delivery()
    .subscribe( (resp:any)  => {
      if( !resp.error ){
        this.txtDelivery = resp.info.existeDelivery ? resp.info.delivery.EMPRESA_TIPO_NEGOCIO_OBS : '';
        this.boolDelivery = resp.info.existeDelivery;
        this.counterNegocio = resp.info.counterTipos;
        if( this.boolDelivery && this.counterNegocio == 1){
          this.tipoEntrega = 1;
        }
        if( !this.boolDelivery ){          
          this.tipoEntrega = 2;
        }
      }
    });
    this.cargando = true;
  }

  ionViewDidEnter() {
    this.loadingService.loadingDismiss();
  }

  cargarProductos(){
    this.productos = this.storageService.getStorage();
    this.totalProductos = this.storageService.totalPagar(this.productos);
  }

  eliminarVarPro(idVarPro:number){
    this.cargando = false;
    this.loadingService.loadingPresent();    
    this.storageService.borrar(idVarPro);
    this.productos = this.storageService.getStorage();
    this.totalProductos = this.storageService.totalPagar(this.productos);
    this.cargando = true;
    this.tabspage.counterShop();
    this.loadingService.loadingDismiss();
    this.toastService.presentToast('Producto eliminado');
  }

  restar(nmbPro:string, varPro:any, cantidad:number){
    cantidad--;
    this.storageService.insertStorage(nmbPro, varPro, cantidad);
    this.cargarProductos();
  }
  sumar(nmbPro:string, varPro:any, cantidad:number){
    cantidad++;
    this.storageService.insertStorage(nmbPro, varPro, cantidad);
    this.cargarProductos();
  }

  async abrirShop(){
    
    const modal = await this.modalCtrl.create({
        component: ShopPage,
        componentProps: {
          subTotal: this.totalProductos,
          obs: this.txtObs,
          tipo: this.tipoEntrega,
          txtDelivery: this.txtDelivery
        }
      });

      if( !this.boolObs ){
        this.toastService.presentToast('INDICA SI DESEAS O NO AGREGAR OBSERVACIONES.');
        return;
      }
      if( this.tipoEntrega == 0 ){
        this.toastService.presentToast('SELECCIONA EL TIPO DE ENTREGA.');
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

  clcObs(valor:number){

    if( valor == 1 ){
      this.obsAlertPrompt();
    }
    this.txtObs = '';
    this.boolObs = true;
  }

  clcEntrega(valor:number){
    this.tipoEntrega = valor;
  }

}
