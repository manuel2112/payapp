import { Component, OnInit, Input } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

import { PesoPipe } from '../../pipes/peso.pipe';

import { LoadingService } from '../../services/loading.service';
import { ToastService } from '../../services/toast.service';
import { StoragePersonaService } from '../../services/storage-persona.service';
import { GeolocationService } from '../../services/geolocation.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {

  @Input() subTotal:number;
  @Input() obs:string;
  @Input() tipo:number;
  @Input() txtDelivery:string;
  cargando:boolean = false;
  propina:number = 0;
  total:number = 0;
  boolConfirma:boolean = false;
  boolPropina:boolean = false;
  boolPersona:boolean = false;
  boolConfirmarArea:boolean = false;
  latitude:number = null;
  longitude:number = null;
  persona:string = '';

  constructor( private modalCtrl:ModalController,
               private loadingService:LoadingService,
               private alertController: AlertController,
               private toastService: ToastService,
               private storagePersonaService:StoragePersonaService,
               private geolocationService:GeolocationService) { }

  ngOnInit() {
    this.total = this.subTotal;
  }

  ionViewWillEnter(){
    this.loadingService.loadingPresent();
    this.cargando = false;
    console.log(this.tipo);
  }

  ionViewDidEnter() {
    this.cargando = true;
    this.loadingService.loadingDismiss();
  }

  propinaFn(total:number){
    let valor = total * 0.1;
    return valor;
  }
  darPropina(option:number){
    if( option === 1 ){
      this.propina = 0;
      this.total = this.subTotal;
      this.boolPropina = true;
      this.alertConsultaPropina();
    }else if( option === 0 ){
      this.propina = 0;
      this.boolPropina = true;
      this.totalPagar(this.propina);
    }
  }
  
  totalPagar(propina:number){
    this.propina = propina;
    this.total = this.subTotal + Number(propina);
  }

  pipeToString(valor:any){
    return new PesoPipe().transform(String(valor));
  }

  async alertConsultaPropina() {
    const alert = await this.alertController.create({
      header: 'Propina, 10% sugerido.',
      message: '<h1 class="txtPropina">'+ this.pipeToString(this.propinaFn(this.subTotal)) +'</h1>',
      buttons: [
        {
          text: 'Otro monto',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.presentAlertPrompt();
          }
        }, {
          text: 'Dar 10%',
          handler: () => {
            this.toastService.presentToast('GRACIAS POR TU PROPINA');
            this.totalPagar(this.propinaFn(this.subTotal));
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Propina',
      subHeader: 'Ingresar nuevo monto',
      inputs: [
        {
          name: 'propinaValue',
          type: 'number',
          value: '',
          placeholder: 'INGRESA MONTO',
          id: 'update',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancelar',
          cssClass: 'secondary',
          handler: () => {
            this.toastService.presentToast('NO INGRESASTE PROPINA');
          }
        }, {
          text: 'Agregar',
          handler: (data) => {
            console.log(data.propinaValue);
            if( data.propinaValue < 1 ){
              data.propinaValue = 0;
              this.toastService.presentToast('INGRESAR MONTO SUPERIOR A 0');
              return false;
            }
            this.toastService.presentToast('GRACIAS POR TU PROPINA');
            this.totalPagar(data.propinaValue);
          }
        }
      ]
    });
    
    await alert.present();
  }

  datosStoragePersona(st:string){

    let atributo;
    let valor = this.storagePersonaService.getStorage();
    this.persona = valor;
    switch(st) { 
      case 'nombre': { 
        atributo = valor[0].nombre;
        break; 
      } 
      case 'fono': { 
        atributo = valor[0].fono;
        break; 
      } 
      case 'email': { 
        atributo = valor[0].email;
        break; 
      } 
      case 'direccion': { 
        atributo = valor[0].direccion;
        break; 
      } 
      case 'ciudad': { 
        atributo = valor[0].ciudad;
        break; 
      }
   }
   
    return atributo;
  }

  async datosAlertPrompt() {
    let existe = this.storagePersonaService.existePersona();
    const alert = await this.alertController.create({
      header: 'INGRESA TUS DATOS',
      inputs: [
        {
          name: 'nmbDato',
          type: 'text',
          value: existe ? this.datosStoragePersona('nombre') : '',
          placeholder: 'NOMBRE'
        },
        {
          name: 'fonoDato',
          type: 'text',
          value: existe ? this.datosStoragePersona('fono') : '',
          placeholder: 'N° CELULAR EJ. +56912345678'
        },
        {
          name: 'emailDato',
          type: 'email',
          value: existe ? this.datosStoragePersona('email') : '',
          placeholder: 'EMAIL'
        },
        {
          name: 'direccionDato',
          type: 'text',
          value: existe ? this.datosStoragePersona('direccion') : '',
          placeholder: 'DIRECCIÓN'
        },
        {
          name: 'ciudadDato',
          type: 'text',
          value: existe ? this.datosStoragePersona('ciudad') : '',
          placeholder: 'CIUDAD/SECTOR'
        }
      ],
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.boolConfirma = false;
            this.boolPersona = false;
          }
        }, {
          text: 'CONFIRMAR',
          handler: (data) => {
            
            if( data.nmbDato == '' ){
              this.toastService.presentToast('NOMBRE OBLIGATORIO');
              return false;
            }
            if( data.fonoDato == '' ){
              this.toastService.presentToast('N° CELULAR OBLIGATORIO');
              return false;
            }
            if( data.emailDato == '' ){
              this.toastService.presentToast('EMAIL OBLIGATORIO');
              return false;
            }
            if( data.direccionDato == '' && this.tipo == 1 ){
              this.toastService.presentToast('DIRECCIÓN OBLIGATORIO');
              return false;
            }
            if( data.ciudadDato == '' && this.tipo == 1 ){
              this.toastService.presentToast('CIUDAD/SECTOR OBLIGATORIO');
              return false;
            }
            if( (data.nmbDato == '' || data.fonoDato == '' || data.emailDato == '' || data.direccionDato == '' || data.ciudadDato == '') && this.tipo == 1 ){
              this.boolConfirma = false;
              this.boolPersona = false;
              return false;
            }else if( (data.nmbDato == '' || data.fonoDato == '' || data.emailDato == '') && this.tipo == 1 ){
              this.boolConfirma = false;
              this.boolPersona = false;
              return false;
            }else{
              this.storagePersonaService.insertStorage(data.nmbDato.trim(), data.fonoDato.trim(), data.emailDato.trim(), data.direccionDato.trim(), data.ciudadDato.trim());
              this.boolConfirma = true;
              this.boolPersona = true;
              return true;
            }
          }
        }
      ]
    });

    await alert.present();
  }

  confirmarArea(ev:any){
    this.boolConfirmarArea = ev.detail.checked;
  }

  confirmarGPS(ev:any){
    if(ev.detail.checked){
      this.latitude = this.geolocationService.latitude;
      this.longitude = this.geolocationService.longitude;
    }else{
      this.latitude = null;
      this.longitude = null;
    }
  }

  pagar(){
    if(!this.boolPropina){
      this.toastService.presentToast('CONFIRMAR PROPINA');
      return;
    }
    if(!this.boolPersona){
      this.toastService.presentToast('CONFIRMAR TUS DATOS');
      return;
    }
    if(!this.boolConfirmarArea && this.tipo == 1){
      this.toastService.presentToast('CONFIRMAR QUE VIVES DENTRO DEL AREA DE REPARTO');
      return;
    }
    
    if( this.tipo == 1 ){      
      this.latitude = this.geolocationService.latitude;
      this.longitude = this.geolocationService.longitude;
    }

    if(this.boolPropina && this.boolPersona && (this.boolConfirmarArea || this.tipo == 2) ){
      console.log('REALIZAR EL RESUMEN DEL PEDIDO');
      console.log('latitud',this.latitude);
      console.log('longitud',this.longitude);
    }
  }

  async areaReparto() {
    const alert = await this.alertController.create({
      header: 'ÁREAS DE REPARTO',
      message: this.txtDelivery,
      buttons: ['CERRAR']
    });

    await alert.present();
  }

  salir(){
    this.modalCtrl.dismiss();
  }

}
