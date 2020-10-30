import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NotificacionService } from '../../services/notificacion.service';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.page.html',
  styleUrls: ['./notificacion.page.scss'],
})
export class NotificacionPage implements OnInit {

  notificaciones:any = [];
  load:boolean = false;
  arraySk:any = Array(20);

  constructor( private notificacionService:NotificacionService,
               private router: Router ) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.instanciar();
  }
  instanciar(){
    this.load = false;
    this.getNotificaciones();
  }
  getNotificaciones(){
    this.notificacionService.getNotificaciones()
    .subscribe( (resp:any)  => {
      this.notificaciones = resp.info.pushs;
      this.load = !(resp.error);
    });
  }
  detalle(id:number){    
    this.router.navigate(['/producto',{ id: id }]);
  }
  refresh(ev){
    this.instanciar();
    ev.target.complete();
  }

}
