import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../../services/horario.service';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.page.html',
  styleUrls: ['./horario.page.scss'],
})
export class HorarioPage implements OnInit {

  horarios:any = [];
  load:boolean = false;
  arraySk:any = Array(20);

  constructor( private _shorario:HorarioService ) {
  }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.instanciar();
  }
  instanciar(){
    this.load = false;
    this.getHorario();
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
