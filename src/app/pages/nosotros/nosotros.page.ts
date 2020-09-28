import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';

import { MapPage } from '../map/map.page';
import { MapaPage } from '../mapa/mapa.page';
import { EmpresaService } from '../../services/empresa.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.page.html',
  styleUrls: ['./nosotros.page.scss'],
})
export class NosotrosPage implements OnInit {

  NMBEMPRESA = '';
  LATITUD  = '';
  LONGITUD  = '';
  DIRECCION  = '';
  empresa:any = [];
  tipoNegocio:any = [];
  cargando:boolean = false;

  constructor(  private empresaService:EmpresaService,
                private iab: InAppBrowser,
                private callNumber: CallNumber,
                private modalCtrl:ModalController,
                private loadingService:LoadingService) { }           

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.loadingService.loadingPresent();
    this.cargando = false;
    this.instanciar();
  }

  instanciar(){
    this.empresaService.getTopDatos()
    .subscribe( (resp:any)  => {
      this.empresa = resp.info.empresa;
      this.NMBEMPRESA = resp.info.empresa.EMPRESA_NOMBRE;
      this.LATITUD = resp.info.empresa.EMPRESA_LAT;
      this.LONGITUD = resp.info.empresa.EMPRESA_LONG;
      this.DIRECCION = resp.info.empresa.EMPRESA_DIRECCION +', '+ resp.info.empresa.CIUDAD_NOMBRE;
      this.tipoNegocio = resp.info.tipoNegocio;
    });
  }

  ionViewDidEnter() {
    this.loadingService.loadingDismiss();
    this.cargando = true;
  }

  btnURL(url){
    const browser = this.iab.create(url);
    browser.close();
  }

  callPhone(number){
    this.callNumber.callNumber(number, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

  msnWhatsAPP(number){ const browser = this.iab.create('https://api.whatsapp.com/send?phone='+number);
    browser.close();
  }

  async abrirMapa(){
    
    const modal = await this.modalCtrl.create({
        component: MapaPage,
        componentProps: {
          lat: this.LATITUD,
          lgt: this.LONGITUD,
          direccion: this.DIRECCION,
          nmbEmpresa: this.NMBEMPRESA
        }
      });
      await modal.present();
  }

}
