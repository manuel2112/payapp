import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../../services/horario.service';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.page.html',
  styleUrls: ['./horario.page.scss'],
})
export class HorarioPage implements OnInit {

  horarios:any;

  constructor( private _shorario:HorarioService ) {
  }

  ngOnInit() {
    this._shorario.getDatos()
    .subscribe( (resp:any)  => {
      this.horarios = resp.data.horario;
    })
  }

}
