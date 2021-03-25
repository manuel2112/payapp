import { Component, OnInit, Input } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

import { DetalleCompraPage } from '../detalle-compra/detalle-compra.page';
import { environment } from '../../../environments/environment.prod';

import { PesoPipe } from '../../pipes/peso.pipe';

import { LoadingService } from '../../services/loading.service';
import { ToastService } from '../../services/toast.service';
import { StoragePersonaService } from '../../services/storage-persona.service';
import { GeolocationService } from '../../services/geolocation.service';
import { ColoresService } from '../../services/colores.service';
import { EmpresaService } from '../../services/empresa.service';
import { TipoNegocioService } from '../../services/tipo-negocio.service';
import { PayService } from '../../services/pay.service';
import { AperturaService } from '../../services/apertura.service';
import { StorageOrderService } from '../../services/storage-order.service';
import { SocialService } from '../../services/social.service';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {

  @Input() subTotal:number;
  @Input() tipo:number;//1:DELIVERY 2:RESTAURANTE 3:RETIRO LOCAL
  @Input() productos:[];
  @Input() articulos:[];
  propina:number = 0;
  total:number = 0;
  boolConfirma:boolean = false;
  boolPropina:boolean = false;
  boolPersona:boolean = false;
  boolConfirmarArea:boolean = false;
  latitude:number = null;
  longitude:number = null;
  persona:any = JSON;
  arraySk:any = Array(20);
  colorprimero:string = '';
  colorsegundo:string = '';
  colortercero:string = '';
  tiempoEntrega:string = '';
  txtDelivery:string = '';

  txtMonto:string = '';
  numMonto:number = null;
  sectores:any = [];
  ishidden:boolean = true;
  txtDatos:string = 'INGRESA TUS DATOS AQUÍ';
  txtBotonSector:string = 'SELECCIONAR MONTO DELIVERY';
  montoDelivery:number = 0;
  sectorDelivery:any = '';
  urlPay:string = environment.URISSL + 'paymall?token=';

  constructor( private modalCtrl:ModalController,
               private loadingService:LoadingService,
               private alertController: AlertController,
               private toastService: ToastService,
               private storagePersonaService:StoragePersonaService,
               private geolocationService:GeolocationService,
               private coloresService:ColoresService,
               private empresaService:EmpresaService,
               private tipoNegocioService:TipoNegocioService,
               private payService:PayService,
               private aperturaService:AperturaService,
               private storageOrderService:StorageOrderService,
               private socialService:SocialService,
               private menuService:MenuService ) {

                this.coloresService.getColorStorage();

              }

  ngOnInit() {
    this.getColores();
  }
  ionViewWillEnter(){
    this.instanciar();
  }
  instanciar(){
    this.tiempoEntrega = this.empresaService.tiempoEntrega;
    this.total = this.subTotal;
    this.storagePersonaService.getStorage();
    this.getTipoNegocio();
    if( this.tipo == 1 ){
      this.geolocationService.geolocalizar();
    }
  }
  showHidde(){
    this.ishidden = false;
    this.total = this.total - Number(this.montoDelivery);
    this.montoDelivery = 0;
  }
  selectSector(sector:any){
    this.sectorDelivery = sector;
    this.txtBotonSector = sector.SECTOR_OBS;
    this.montoDelivery  = sector.SECTOR_VALOR;
    this.total = this.total + Number(this.montoDelivery);
    this.ishidden = true;
  }
  getTipoNegocio(){
    this.tipoNegocioService.getTipoNegocio()
    .subscribe( (resp:any)  => {

      if( this.tipo == 1 ){
        this.txtDelivery = resp.info.tiponegocio[0].EMPRESA_TIPO_NEGOCIO_OBS;
      }
      
      if( resp.info.montoMinimo ){
          if( resp.info.montoMinimo.MONTO_MIN_GRATIS_FLAG == 1 ){
            this.txtMonto = resp.info.montoMinimo.MONTO_MIN_GRATIS_OBS;
            this.numMonto = resp.info.montoMinimo.MONTO_MIN_GRATIS_VALOR;
          }         
      }

      if( resp.info.sectores ){
        this.sectores = resp.info.sectores;
      }
      
    });
  }
  getColores(){
    this.colorprimero = this.coloresService.colorprimero;
    this.colorsegundo = this.coloresService.colorsegundo;
    this.colortercero = this.coloresService.colortercero;
  }
  propinaFn(total:number){
    let valor = Math.trunc(total * 0.1);
    return valor;
  }
  darPropina(option:number){
    if( option === 1 ){
      this.propina = 0;
      this.total = this.subTotal + Number(this.montoDelivery);
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
    this.total = this.subTotal + Number(this.montoDelivery) + Number(propina);
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
    this.storagePersonaService.getStorage();
    let valor = this.storagePersonaService.persona;
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

  async alertCtrlDelivery() {
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
          value: existe ? this.datosStoragePersona('fono') : '+569',
          placeholder: 'N° CELULAR EJ. 56912345678'
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
            if( data.fonoDato == '' || data.fonoDato == '+569' ){
              this.toastService.presentToast('N° CELULAR OBLIGATORIO');
              return false;
            }
            if( data.emailDato == '' ){
              this.toastService.presentToast('EMAIL OBLIGATORIO');
              return false;
            }
            if( data.direccionDato == '' ){
              this.toastService.presentToast('DIRECCIÓN OBLIGATORIO');
              return false;
            }
            if( data.ciudadDato == '' ){
              this.toastService.presentToast('CIUDAD/SECTOR OBLIGATORIO');
              return false;
            }
            if( data.nmbDato == '' || data.fonoDato == '' || data.emailDato == '' || data.direccionDato == '' || data.ciudadDato == '' ){
              this.boolConfirma = false;
              this.boolPersona = false;
              return false;
            }else{
              this.guardarPersona(data.nmbDato.trim(), data.fonoDato.trim(), data.emailDato.trim(), data.direccionDato.trim(), data.ciudadDato.trim());
              return true;
            }
          }
        }
      ]
    });

    await alert.present();
  }

  guardarPersona(nombre:string,fono:string,email:string,direccion:string,ciudad:string){
    this.storagePersonaService.insertStorage(nombre,fono,email,direccion,ciudad);
    this.persona = {
      "res":{"nombre": nombre, "fono": fono, "email": email, "direccion": direccion, "ciudad": ciudad}
      };
    this.txtDatos = 'DATOS INGRESADOS';
    this.boolConfirma = true;
    this.boolPersona = true;
  }
  
  async alertCtrlOtro() {
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
          value: existe ? this.datosStoragePersona('fono') : '+569',
          placeholder: 'N° CELULAR EJ. +56912345678'
        },
        {
          name: 'emailDato',
          type: 'email',
          value: existe ? this.datosStoragePersona('email') : '',
          placeholder: 'EMAIL'
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
            if( data.fonoDato == '' || data.fonoDato == '+569' ){
              this.toastService.presentToast('N° CELULAR OBLIGATORIO');
              return false;
            }
            if( data.emailDato == '' ){
              this.toastService.presentToast('EMAIL OBLIGATORIO');
              return false;
            }
            if( data.nmbDato == '' || data.fonoDato == '' || data.emailDato == '' ){
              this.boolConfirma = false;
              this.boolPersona = false;
              return false;
            }else{
              var direccion = existe ? this.datosStoragePersona('direccion') : '';
              var ciudad    = existe ? this.datosStoragePersona('ciudad') : '';
              this.guardarPersona(data.nmbDato.trim(), data.fonoDato.trim(), data.emailDato.trim(), direccion, ciudad);
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

  comprobarStock(){
    this.loadingService.loadingPresent();
      this.menuService.comprobarStock(this.productos)
      .subscribe( (resp:any)  => {
        this.loadingService.loadingDismiss();
        if( !resp.error ){
          this.toastService.presentToast(resp.info.mensaje);
          return;
        }else{
          this.pagar();
        }
      });
  }  

  pagar(){
    if(!this.boolPropina){
      this.toastService.presentToast('CONFIRMAR PROPINA');
      return;
    }
    if(this.tipo == 1 && ( this.numMonto >= this.subTotal ) && ( this.sectorDelivery == '' ) ){
      this.toastService.presentToast('SELECCIONAR MONTO DELIVERY');
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

    if(this.boolPropina && this.boolPersona && ( this.boolConfirmarArea || this.tipo == 2 || this.tipo == 3 ) ){
      let ubicacion = {
        "res":{"latitude": this.latitude, "longitude": this.longitude}
      };
      
      //COMPROBAR SI TIENDA ESTÁ ABIERTA
      if( this.aperturaService.open == 1 ){
        this.sendCompra( ubicacion, this.total, this.subTotal, this.propina, this.tipo, this.persona, this.productos, this.sectorDelivery, this.articulos); 
        this.loadingService.loadingPresent();
        this.modalCtrl.dismiss();
      }else{        
        this.toastService.presentToast('TIENDA CERRADA, ESPERAR SU APERTURA');
        this.modalCtrl.dismiss();
      }
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

  sendCompra( ubicacion, total, subTotal, propina, tipo, persona, productos, sectorDelivery, articulos){
    this.payService.sendCompra(ubicacion, total, subTotal, propina, tipo, persona, productos, sectorDelivery, articulos)
    .subscribe( (res:any)  => {
        this.storageOrderService.guardarStorage(res.info);
        this.loadingService.loadingDismiss();
        this.socialService.webpay( this.urlPay + res.info );
        this.abrirDetalle(res.info);
    });
  }

  async abrirDetalle( hash:string ){
    
    const modal = await this.modalCtrl.create({
        component: DetalleCompraPage,
        componentProps: {
          hash: hash
        }
      });
      await modal.present();
  }

  salir(){
    this.modalCtrl.dismiss();
  }
  refresh(ev){
    this.instanciar();
    ev.target.complete();
  }

}