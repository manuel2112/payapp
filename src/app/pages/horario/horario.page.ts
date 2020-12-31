import { Component, OnInit } from '@angular/core';

import { HorarioService } from '../../services/horario.service';
import { ColoresService } from '../../services/colores.service';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.page.html',
  styleUrls: ['./horario.page.scss'],
})
export class HorarioPage implements OnInit {

  horarios:any = [];
  load:boolean = false;
  arraySk:any = Array(20);
  colorprimero:string = '';
  colorsegundo:string = '';
  styleBorder:string = '';

  constructor( private _shorario:HorarioService, 
               private coloresService:ColoresService ) {
  }

  ngOnInit() {
    this.getColores();
  }
  ionViewWillEnter(){
    this.instanciar();
  }
  instanciar(){
    this.load = false;
    this.getHorario();
    this.styleBorder = `border-bottom: 1px solid var(--ion-color-${ this.colorsegundo })`;
  }
  getColores(){
    this.colorprimero = this.coloresService.colorprimero;
    this.colorsegundo = this.coloresService.colorsegundo;
  }
  getHorario(){
    this._shorario.getDatos()
    .subscribe( (resp:any)  => {
      this.horarios = resp.data.horario;
      this.load = !(resp.error);
    });
  }
  refresh(ev){
    this.instanciar();
    ev.target.complete();
  }

}
