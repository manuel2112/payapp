import { Injectable } from '@angular/core';

import { EmpresaService } from '../services/empresa.service';

@Injectable({
  providedIn: 'root'
})
export class AperturaService {

  open  = 0;
  horaCierre:string = '';
  timeBack:string = '';
  load:boolean = false;
  enCurso:boolean = false;

  constructor( private empresaService:EmpresaService ) { }

  updateHorario() {
      this.empresaService.apertura()
      .subscribe( (resp:any)  => {
        this.open       = resp.info.empresa.EMPRESA_ABIERTO;
        this.horaCierre = resp.info.hora.HORARIO_HORA_CLOSE;
        this.load = !(resp.error);
        if( typeof (resp.info.segundos) === 'number' && !this.enCurso ){
          this.timeBack = '';
          this.countdown(resp.info.segundos);
          this.enCurso = true;
        }
      });
  }


  countdown(seconds:number) {
    var i = 0;
    if( this.open == 0 ){
      let refreshId = setInterval(() => { 
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
        if ( i >= 60 ) {clearInterval(refreshId); i = 0;}
        if ( i == 58 ) {this.enCurso = false;}
        if ( seconds <= 0 ) {
          clearInterval(refreshId);
          this.updateHorario();
          this.open = 1;
          this.enCurso = false;
        }
      }, 1000);
    }
  }
}
