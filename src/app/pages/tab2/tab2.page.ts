import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoadingService } from '../../services/loading.service';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  menu:any = [];
  cargando:boolean = false;

  constructor( private menuService:MenuService,
               private loadingService:LoadingService,
               private router: Router) {}

  ngOnInit(){
  }
  ionViewWillEnter(){
    this.loadingService.loadingPresent();
    this.cargando = false;
    this.instanciar();
  }
  instanciar(){
    this.menuService.getMenu()
    .subscribe( (resp:any)  => {
      this.menu = resp.info;
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
