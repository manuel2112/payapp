import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuService } from '../../services/menu.service';
import { ColoresService } from '../../services/colores.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  menu:any = [];
  load:boolean = false;
  arraySk:any = Array(20);
  colorprimero:string = '';
  colorsegundo:string = '';

  constructor( private menuService:MenuService,
               private router: Router, 
               private coloresService:ColoresService ) {}

  ngOnInit(){
    this.getColores();
  }
  ionViewWillEnter(){
    this.instanciar();
  }
  instanciar(){
    this.load = false;
    this.getMenu();
  }
  getColores(){
    this.colorprimero = this.coloresService.colorprimero;
    this.colorsegundo = this.coloresService.colorsegundo;
  }
  getMenu(){
    this.menuService.getMenu()
    .subscribe( (resp:any)  => {
      this.menu = resp.info;
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
