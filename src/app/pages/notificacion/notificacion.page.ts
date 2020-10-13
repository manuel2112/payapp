import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoadingService } from '../../services/loading.service';
import { NotificacionService } from '../../services/notificacion.service';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.page.html',
  styleUrls: ['./notificacion.page.scss'],
})
export class NotificacionPage implements OnInit {

  notificaciones:any = [];
  cargando:boolean = false;

  constructor( private notificacionService:NotificacionService,
               private loadingService:LoadingService,
               private router: Router ) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.loadingService.loadingPresent();
    this.cargando = false;
    this.instanciar();
  }
  instanciar(){
    this.notificacionService.getNotificaciones()
    .subscribe( (resp:any)  => {
      this.notificaciones = resp.info.pushs;
    });
  }
  ionViewDidEnter() {
    this.loadingService.loadingDismiss();
    this.cargando = true;
  }
  detalle(id:number){    
    this.router.navigate(['/producto',{ id: id }]);
  }

}
