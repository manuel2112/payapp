import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TabsPage } from '../tabs/tabs.page';

import { EmpresaService } from '../../services/empresa.service';
import { OfertasService } from '../../services/ofertas.service';
import { SocialService } from '../../services/social.service';
import { AperturaService } from '../../services/apertura.service';
import { ColoresService } from '../../services/colores.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {  

  empresa:any = [];
  open  = 0;
  horaCierre:string = '';
  timeBack:string = '';
  ofertas: any = [];
  destacados: any = [];
  load:boolean = false;
  loadEmpresa:boolean = false;
  colorprimero:string = '';
  bgStylePrimero:string = '';
  colorsegundo:string = '';
  colortercero:string = '';
  arraySk:any = Array(20);
  membresia:boolean = true;

  constructor( private empresaService:EmpresaService,
               private ofertaService:OfertasService,
               private router: Router,
               private socialService:SocialService,
               private aperturaService:AperturaService,
               private coloresService:ColoresService,
               private tabsPage:TabsPage ) { }

  ngOnInit(){
    this.aperturaService.updateHorario();
    this.updateHorarioTimer();
  }
  ionViewWillEnter(){
    this.instanciar();
  }
  instanciar(){
    this.load = false;
    this.getEmpresa();
    this.getOfertas();
    this.getDestacados();
    this.getColores();
    this.tabsPage.getColores();
    this.loadPage();
  }
  getColores(){
    this.colorprimero = this.coloresService.colorprimero;
    this.bgStylePrimero = `--ion-background-color: var(--ion-color-${ this.colorprimero });--ion-text-color: var(--ion-color-${ this.colorprimero }-contrast)`;
    this.colorsegundo = this.coloresService.colorsegundo;
    this.colortercero = this.coloresService.colortercero;
  }
  getEmpresa(){
    this.empresaService.getEmpresa()
    .subscribe( (resp:any)  => {
      this.empresa = resp.info.empresa;
      this.horaCierre = resp.info.hora.HORARIO_HORA_CLOSE;
      this.loadEmpresa = true;
      this.membresia = resp.info.empresa.EMPRESA_MEMBRESIA == 0 ? false : true ;
    });
  }
  getOfertas(){      
    this.ofertaService.getOfertas()
    .subscribe( (resp:any)  => {
      this.ofertas = resp.info;
    });
  }
  getDestacados(){      
    this.ofertaService.getDestacados()
    .subscribe( (resp:any)  => {
      this.destacados = resp.info;
    });
  }

  loadPage()
  {
    setInterval(() => {
      var loadColor = this.coloresService.loadColor;
      if( loadColor && this.loadEmpresa ){
        this.load = true;
      }
      if( this.colorprimero == 'instancia' ){
        this.getColores();
        this.tabsPage.getColores();
        this.coloresService.getColorStorage();
      }
    }, 1000);
  }

  updateHorarioTimer() 
  {
    setInterval(() => {
      this.aperturaService.updateHorario();
      this.horaCierre = this.aperturaService.horaCierre;
    }, 60000);
    setInterval(() => {
      this.timeBack = this.aperturaService.timeBack;
      this.open = this.aperturaService.open;
      if( this.open == 1 && this.horaCierre === undefined ){
        this.aperturaService.updateHorario();
        this.horaCierre = this.aperturaService.horaCierre;
      }
    }, 1000);
  }

  detalle(id:number)
  {
    this.router.navigate(['/producto',{ id: id }]);
  }

  refresh(ev)
  {
    this.coloresService.cambiarColores();
    this.instanciar();
    ev.target.complete();
  }

  /******************************/
  /*********SOCIAL***************/
  /******************************/
  btnFacebook(url:string)
  {
    this.socialService.facebook(url);
  }
  btnInstagram(url:string)
  {
    this.socialService.instagram(url);
  }
  btnWeb(url:string)
  {
    this.socialService.web(url);
  }
  btnWhatsapp(number:string)
  {
    this.socialService.whatsapp(number);
  }
  btnFono(number:string)
  {
    this.socialService.fono(number);
  }
  btnEmail(email:string)
  {
    this.socialService.email(email);
  }
}
