import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ZoomImagenPage  } from '../zoom-imagen/zoom-imagen.page';

import { MenuService } from '../../services/menu.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {

  id: any;
  pager:boolean = false;
  disabled:boolean = true;
  stock:any = [] ;
  producto:any = [];
  load:boolean = false;
  precios:any = [];
  imagenes:any = [];
  countShop:number = 0 ;
  cantidad:any = [] ;
  arraySk:any = Array(20);

  constructor( private route: ActivatedRoute,
               private router: Router,
               private menuService:MenuService,
               private modalCtrl:ModalController,
               private storageService:StorageService) {}

  ionViewWillEnter(){
    this.instanciar();
  }
  instanciar(){
    this.load = false;
    this.id = this.route.snapshot.paramMap.get('id');
    this.getProducto(this.id);
    // this.pager = this.imagenes.length > 0 ? true : false;
    this.storageService.getStorage();
    this.countShop = this.storageService.countProductos();
  }
  getProducto(id:number){
    this.menuService.getProducto(this.id)
    .subscribe( (resp:any)  => {
      this.producto = resp.info.producto;
      this.precios = resp.info.precios; 
      this.existeProducto(this.precios); 
      this.imagenes = resp.info.imagenes;
      this.pager = this.imagenes.length > 0 ? true : false;
      this.load = !(resp.error);
    });
  }
  ngOnInit() {
  }

  existeProducto(objeto:any){
    const carrito = objeto;
    this.disabled = true;
    objeto.forEach((obj, i) => {
      var cantidad = this.storageService.existeProducto(obj.PROVAR_ID);
      if( cantidad > 0 ){
        this.cantidad[obj.PROVAR_ID] = cantidad;
        this.disabled = false;
      }else{
        this.cantidad[obj.PROVAR_ID] = 0;
      }
    });
  }
  
  async abrirImagen(img:string,producto:string){    
    const modal = await this.modalCtrl.create({
        component: ZoomImagenPage,
        componentProps: {
          img,
          producto
        }
      });
      await modal.present();
  }

  addCarrito(nmbPro:string, varPro:any, value:any){
    
    if( value.detail.value ){
      
      this.storageService.insertStorage(nmbPro, varPro, value.detail.value);
      this.disabled = false;

    }else{
      console.log('no entra');
    }
    this.countShop = this.storageService.countProductos();

  }
  restar(nmbPro:string, varPro:any, cantidad:number, stock:number){
    if ( !cantidad ){
      cantidad = 0 ;
    }
    if ( cantidad > 0 ){
      cantidad--;
    }
    if ( stock > cantidad ){
      this.stock[varPro.PROVAR_ID] = '';
    }
    this.cantidad[varPro.PROVAR_ID] = cantidad;
    this.storageService.insertStorage(nmbPro, varPro, cantidad);
    if( cantidad == 0 ){
      var counter = this.storageService.countProductos();
      this.storageService.borrarUltimo( counter - 1 );
      this.existeProducto(this.precios);
      this.countShop = this.storageService.countProductos();
    }

  }
  sumar(nmbPro:string, varPro:any, cantidad:number, stock:number){
    if ( !cantidad ){
      cantidad = 0 ;
    }
    cantidad++;    
    if( cantidad == stock ){
      this.stock[varPro.PROVAR_ID] = stock;
    }
    this.cantidad[varPro.PROVAR_ID] = cantidad;
    this.storageService.insertStorage(nmbPro, varPro, cantidad);
    this.countShop = this.storageService.countProductos();
    this.disabled = false;
  }

  irShop(){
    this.router.navigate(['tabs/tab3']);
  }

  limpiarStorage(){
    this.storageService.limpiarStorage();
    this.countShop = 0;
    this.disabled = true;
    console.log('LIMPIO');
  }
  refresh(ev){
    this.instanciar();
    ev.target.complete();
  }

}
