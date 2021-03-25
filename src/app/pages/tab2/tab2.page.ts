import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TabsPage } from '../tabs/tabs.page';

import { EmpresaService } from '../../services/empresa.service';
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
               private coloresService:ColoresService,
               private tabsPage:TabsPage,
               private empresaService:EmpresaService ) { }

  ngOnInit(){
  }
  ionViewWillEnter(){
    this.instanciar();
  }
  instanciar(){
    this.load = false;
    this.tabsPage.getColores();
    this.getColores();
    this.getMenu();
    this.getEmpresa();
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
  getEmpresa(){
    this.empresaService.getEmpresa()
    .subscribe( (resp:any)  => {
      if( resp.info.empresa.EMPRESA_MEMBRESIA == 0 ){
        this.router.navigate(['tabs/tab1']);        
      }
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
