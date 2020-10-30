import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EmpresaService } from '../../services/empresa.service';
import { OfertasService } from '../../services/ofertas.service';
import { SocialService } from '../../services/social.service';
import { AperturaService } from '../../services/apertura.service';

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

  constructor( private empresaService:EmpresaService,
               private ofertaService:OfertasService,
               private router: Router,
               private socialService:SocialService,
               private aperturaService:AperturaService ) { }

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
  }
  getEmpresa(){
    this.empresaService.getTopDatos()
    .subscribe( (resp:any)  => {
      this.empresa = resp.info.empresa;
      this.horaCierre = resp.info.hora.HORARIO_HORA_CLOSE;   
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

  updateHorarioTimer() {
    setInterval(() => {
      this.aperturaService.updateHorario();
      this.horaCierre = this.aperturaService.horaCierre;
    }, 60000);
    setInterval(() => {
      this.load = this.aperturaService.load;
      this.timeBack = this.aperturaService.timeBack;
      this.open = this.aperturaService.open;
      if( this.open == 1 && this.horaCierre === undefined ){
        this.aperturaService.updateHorario();
        this.horaCierre = this.aperturaService.horaCierre;
      }
    }, 1000);
  }

  detalle(id:number){
    this.router.navigate(['/producto',{ id: id }]);
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
