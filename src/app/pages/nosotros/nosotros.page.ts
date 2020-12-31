import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { MapaPage } from '../mapa/mapa.page';
import { EmpresaService } from '../../services/empresa.service';
import { TipoNegocioService } from '../../services/tipo-negocio.service';
import { SocialService } from '../../services/social.service';
import { ColoresService } from '../../services/colores.service';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.page.html',
  styleUrls: ['./nosotros.page.scss'],
})
export class NosotrosPage implements OnInit {

  nmbEmpresa = '';
  lat  = '';
  lgt  = '';
  direccion  = '';
  empresa:any = [];
  load:boolean = false;
  tipoNegocio:any = [];
  arraySk:any = Array(20);
  colorprimero:string = '';
  colorsegundo:string = '';

  constructor(  private empresaService:EmpresaService,
                private modalCtrl:ModalController,
                private socialService:SocialService, 
                private coloresService:ColoresService, 
                private tipoNegocioService:TipoNegocioService ) { }           

  ngOnInit() {
    this.getColores();
  }
  ionViewWillEnter(){
    this.instanciar();
  }
  instanciar(){
    this.load = false;
    this.getEmpresa();
    this.getTipoNegocio();
  }
  getColores(){
    this.colorprimero = this.coloresService.colorprimero;
    this.colorsegundo = this.coloresService.colorsegundo;
  }
  getEmpresa(){
    this.empresaService.getTopDatos()
    .subscribe( (resp:any)  => {
      this.empresa = resp.info.empresa;
      this.nmbEmpresa = resp.info.empresa.EMPRESA_NOMBRE;
      this.lat = resp.info.empresa.EMPRESA_LAT;
      this.lgt = resp.info.empresa.EMPRESA_LONG;
      this.direccion = resp.info.empresa.EMPRESA_DIRECCION +', '+ resp.info.empresa.CIUDAD_NOMBRE;
    });
  }
  getTipoNegocio(){
    this.tipoNegocioService.getTipoNegocio()
    .subscribe( (resp:any)  => {      
      this.tipoNegocio = resp.info.tiponegocio;
      this.load = !(resp.error);
    });
  }

  async abrirMapa(){
    
    const modal = await this.modalCtrl.create({
        component: MapaPage,
        componentProps: {
          lat: this.lat,
          lgt: this.lgt,
          direccion: this.direccion,
          nmbEmpresa: this.nmbEmpresa
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
