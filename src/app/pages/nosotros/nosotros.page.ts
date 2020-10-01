import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { MapaPage } from '../mapa/mapa.page';
import { EmpresaService } from '../../services/empresa.service';
import { SocialService } from '../../services/social.service';
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
                private modalCtrl:ModalController,
                private loadingService:LoadingService,
                private socialService:SocialService) { }           

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

  /******************************/
  /*********SOCIAL***************/
  /******************************/
  btnFacebook(url:string){
    this.socialService.facebook(url);
  }
  btnInstagram(url:string){
    this.socialService.instagram(url);
  }
  btnWeb(url:string){
    this.socialService.web(url);
  }
  btnWhatsapp(number:string){
    this.socialService.whatsapp(number);
  }
  btnFono(number:string){
    this.socialService.fono(number);
  }

}
