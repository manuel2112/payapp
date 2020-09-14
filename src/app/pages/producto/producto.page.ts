import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ZoomImagenPage  } from '../zoom-imagen/zoom-imagen.page';

import { LoadingService } from '../../services/loading.service';
import { MenuService } from '../../services/menu.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {

  id: any;
  cargando:boolean = false;
  pager:boolean = false;
  disabled:boolean = true;
  producto:any = [];
  precios:any = [];
  imagenes:any = [];
  countShop:number = 0 ;
  cantidad:any = [] ;

  constructor( private route: ActivatedRoute,
               private router: Router,
               private menuService:MenuService,
               private loadingService:LoadingService,
               private modalCtrl:ModalController,
               private storageService:StorageService) {
                
            this.instanciar();
  }

  instanciar(){
    this.loadingService.loadingPresent();
    this.pager = this.imagenes.length > 0 ? true : false;
    this.storageService.cargarStorage();
    this.countShop = this.storageService.countProductos();
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.menuService.getProducto(this.id)
    .subscribe( (resp:any)  => {
      this.producto = resp.info.producto;
      this.precios = resp.info.precios; 
      this.existeProducto(this.precios); 
      this.imagenes = resp.info.imagenes;
      this.pager = this.imagenes.length > 0 ? true : false; 
      this.cargando = true;
      this.loadingService.loadingDismiss();
    });
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
  restar(nmbPro:string, varPro:any, cantidad:number){
    if ( !cantidad ){
      cantidad = 0 ;
    }
    if ( cantidad > 0 ){
      cantidad--;
    }    
    this.cantidad[varPro.PROVAR_ID] = cantidad;
    this.storageService.insertStorage(nmbPro, varPro, cantidad);
    if( cantidad == 0 ){
      var counter = this.storageService.countProductos();
      this.storageService.borrar( counter -1 );
      this.existeProducto(this.precios);
      this.countShop = this.storageService.countProductos();
    }

  }
  sumar(nmbPro:string, varPro:any, cantidad:number){
    if ( !cantidad ){
      cantidad = 0 ;
    }
    cantidad++;   
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

}
