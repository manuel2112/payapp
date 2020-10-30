import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { MapaPage } from '../mapa/mapa.page';
import { EmpresaService } from '../../services/empresa.service';
import { SocialService } from '../../services/social.service';

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
  load:boolean = false;
  tipoNegocio:any = [];
  arraySk:any = Array(20);

  constructor(  private empresaService:EmpresaService,
                private modalCtrl:ModalController,
                private socialService:SocialService) { }           

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.instanciar();
  }
  instanciar(){
    this.load = false;
    this.getEmpresa();
  }
  getEmpresa(){
    this.empresaService.getTopDatos()
    .subscribe( (resp:any)  => {
      this.empresa = resp.info.empresa;
      this.NMBEMPRESA = resp.info.empresa.EMPRESA_NOMBRE;
      this.LATITUD = resp.info.empresa.EMPRESA_LAT;
      this.LONGITUD = resp.info.empresa.EMPRESA_LONG;
      this.DIRECCION = resp.info.empresa.EMPRESA_DIRECCION +', '+ resp.info.empresa.CIUDAD_NOMBRE;
      this.tipoNegocio = resp.info.tipoNegocio;
      this.load = !(resp.error);
    });
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
  refresh(ev){
    this.instanciar();
    ev.target.complete();
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
