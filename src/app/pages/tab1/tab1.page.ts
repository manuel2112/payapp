import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';

import { EmpresaService } from '../../services/empresa.service';
import { OfertasService } from '../../services/ofertas.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {  

  empresa:any = [];
  ABIERTO  = 0;
  horaCierre:string = '';
  timeBack:string = '';
  ofertas: any = [];
  destacados: any = [];
  cargando:boolean = false;

  constructor( private empresaService:EmpresaService,
               private iab: InAppBrowser,
               private callNumber: CallNumber,
               private ofertaService:OfertasService,
               private loadingService:LoadingService,
               private router: Router ) {
                 
                }

  ionViewWillEnter(){
    this.loadingService.loadingPresent();
    this.cargando = false;
    this.instanciar();
  }

  instanciar(){
    this.getEmpresa();
    this.getOfertas();
    this.getDestacados();
    this.updateHorarioTimer();
  }

  ionViewDidEnter() {
    this.loadingService.loadingDismiss();
    this.cargando = true;
  }

  ngOnInit(){
  }

  updateHorario() {
      this.empresaService.apertura()
      .subscribe( (resp:any)  => {
        this.ABIERTO    = resp.info.empresa.EMPRESA_ABIERTO;
        this.horaCierre = resp.info.hora.HORARIO_HORA_CLOSE;
        this.countdown(resp.info.segundos);
      });
  }

  updateHorarioTimer() {
    setInterval(() => { this.updateHorario(); }, 60000);
  }

  countdown(seconds:number) {
    var i = 0;
    if( this.ABIERTO == 0 ){
      var refreshId = setInterval(() => { 
        seconds--;
        i++;
        var days        = Math.floor(seconds/24/60/60);
        var hoursLeft   = Math.floor((seconds) - (days*86400));
        var hours       = Math.floor(hoursLeft/3600);
        var minutesLeft = Math.floor((hoursLeft) - (hours*3600));
        var minutes     = Math.floor(minutesLeft/60);
        var remainingSeconds = seconds % 60;    
        function pad(n) {return (n < 10 ? '0' + n : n); }
        var dias  = days > 0  ? pad(days) + ':' : '' ;
        var horas = hours > 0  ? pad(hours) + ':' : '' ;
        var txt = dias + horas + pad(minutes) + ':' + pad(remainingSeconds);
        this.timeBack = txt;
        if ( i >= 60 ) {clearInterval(refreshId);}
        if ( seconds <= 0 ) {
          clearInterval(refreshId);
          this.updateHorario();
          this.ABIERTO = 1;
        }
      }, 1000);
    }
  }

  getEmpresa(){
    this.empresaService.getTopDatos()
    .subscribe( (resp:any)  => {
      this.empresa = resp.info.empresa;
      this.ABIERTO = resp.info.empresa.EMPRESA_ABIERTO;
      this.horaCierre = resp.info.hora.HORARIO_HORA_CLOSE;
      this.cargando = true;
      this.countdown(resp.info.segundos);
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

  detalle(id:number){
    this.router.navigate(['/producto',{ id: id }]);
  }
  
}
