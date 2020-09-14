import { Component } from '@angular/core';
import { TabsPage } from '../tabs/tabs.page'
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

import { ShopPage } from '../shop/shop.page';

import { LoadingService } from '../../services/loading.service';
import { ToastService } from '../../services/toast.service';
import { StorageService } from '../../services/storage.service';

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

  constructor( private loadingService:LoadingService,
               private storageService:StorageService,
               private tabspage: TabsPage,
               private toastService: ToastService,
               private alertController: AlertController,
               private modalCtrl:ModalController,
               private router: Router ) {}

  ionViewWillEnter(){
    this.loadingService.loadingPresent();
    this.cargando = false;
    this.instanciar();
  }
  
  instanciar(){
    this.cargarProductos();
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
          obs: this.txtObs
        }
      });

      if( this.boolObs ){
        await modal.present();
      }else{
        this.toastService.presentToast('Indica si deseas o no agregar observaciones.');
      }
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

}
