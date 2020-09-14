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
               private router: Router) {
                this.loadingService.loadingPresent();
  }

  ngOnInit(){
    this.menuService.getMenu()
    .subscribe( (resp:any)  => {
      this.menu = resp.info;
      this.cargando = true;
      this.loadingService.loadingDismiss();
    });
  }

  detalle(id:number){
    
    this.router.navigate(['/producto',{ id: id }]);

  }

}
