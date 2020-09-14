import { Component, OnInit, Input } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

import { PesoPipe } from '../../pipes/peso.pipe';

import { LoadingService } from '../../services/loading.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {

  @Input() subTotal:number;
  @Input() obs:string;
  cargando:boolean = false;
  daPropina:boolean = false;
  propina:number = 0;
  total:number = 0;
  txtSugerido:string = "10% sugerido";
  boolConfirma:boolean = false;

  constructor( private modalCtrl:ModalController,
               private loadingService:LoadingService,
               private alertController: AlertController,
               private toastService: ToastService) { }

  ngOnInit() {
    this.total = this.subTotal;
    console.log(this.obs);
  }

  ionViewWillEnter(){
    this.loadingService.loadingPresent();
    this.cargando = false;
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
      this.alertConsultaPropina();
    }else if( option === 0 ){
      this.propina = 0;
      this.daPropina = true;
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

  async datosAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'INGRESA TUS DATOS',
      inputs: [
        {
          name: 'nmbDato',
          type: 'text',
          label: 'NOMBRE',
          placeholder: 'NOMBRE'
        },
        {
          name: 'fonoDato',
          type: 'text',
          label: 'NOMBRE',
          placeholder: 'N° CELULAR'
        },
        {
          name: 'emailDato',
          type: 'email',
          placeholder: 'EMAIL'
        },
        {
          name: 'direccionDato',
          type: 'text',
          placeholder: 'DIRECCIÓN'
        },
        {
          name: 'ciudadDato',
          type: 'text',
          placeholder: 'CIUDAD'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            if( data.fonoDato == '' || data.emailDato == '' || data.direccionDato == '' || data.direccionDato == ''){
              this.toastService.presentToast('TODOS LOS DATOS OBLIGATORIOS');
              this.boolConfirma = true;
              //return false
            }else{
            }
          }
        }
      ]
    });

    await alert.present();
  }

  salir(){
    this.modalCtrl.dismiss();
  }

}
