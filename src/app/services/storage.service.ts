import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { environment } from '../../environments/environment.prod';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  shoping:any = [];
  nmbSetProductos:string = 'item-' + environment.IDEMPRESA;
  objProductos:any = [];

  constructor( private nativeStorage: NativeStorage,
               public platform: Platform) { }

  insertStorage(nmbPro:string, varPro:any, cantidad:number, observacion:string){
    this.comprobarProductoIngresado(varPro.PROVAR_ID);
    this.shoping.push({"nmbPro":nmbPro, "varPro":varPro, "cantidad":cantidad, "obs":observacion});
    this.guardarStorage();
  }

  guardarStorage(){
    if(this.platform.is('cordova')){
      this.nativeStorage.setItem( this.nmbSetProductos, this.shoping)
      .then(
      () => {
        //console.log('Stored item!');
      },
        //error => console.error('Error storing item', error)
      );
    }else{      
      localStorage.setItem( this.nmbSetProductos, JSON.stringify(this.shoping));
    }
  }

  comprobarProductoIngresado(id:number){

    const carrito = this.shoping;
    for (var i = 0; i < carrito.length; ++i) {
      var elemento = carrito[i];
      if ( id === elemento.varPro.PROVAR_ID ) {
          this.shoping.splice( i, 1);
          break;
      }
    }

  }

  existeProducto(idVarPro:number){

    var cantidad = 0;
    const carrito = this.shoping;
    for (var i = 0; i < carrito.length; ++i) {
      var elemento = carrito[i];
      if ( idVarPro === elemento.varPro.PROVAR_ID ) {
        cantidad = elemento.cantidad;  
          break;
      }
    }
    return cantidad;
  }

  getObs(idVarPro:number){

    var obs = '';
    const carrito = this.shoping;
    for (var i = 0; i < carrito.length; ++i) {
      var elemento = carrito[i];
      if ( idVarPro === elemento.varPro.PROVAR_ID ) {
        obs = elemento.obs;  
          break;
      }
    }
    return obs;
  }

  totalPagar(carrito:any){

    var pagar = 0;
    for (var i = 0; i < carrito.length; ++i) {
      var elemento = carrito[i];
      pagar = ( elemento.varPro.PROVAR_VALOR * elemento.cantidad) + pagar
    }
    return pagar;
  }

  borrarUltimo(i:number){
    this.shoping.splice( i, 1);
    this.guardarStorage();
  }

  borrar(i:number){
    this.comprobarProductoIngresado(i);
    this.guardarStorage();
  }
             
  getStorage(){

    if(this.platform.is('cordova')){
      this.nativeStorage.getItem(this.nmbSetProductos)
      .then(
        data => this.shoping = data ? data : [],
        // error => console.error(error)
      );
    }else{

      if( localStorage.getItem(this.nmbSetProductos) ){
        this.shoping = JSON.parse(localStorage.getItem(this.nmbSetProductos));
      }else{
        this.shoping = [];
      }

    }
  }
             
  countProductos(){
    return this.shoping.length;
  }
             
  limpiarStorage(){
    if(this.platform.is('cordova')){
      this.nativeStorage.remove(this.nmbSetProductos);
      this.shoping = [];
    }else{
      localStorage.removeItem(this.nmbSetProductos);
      this.shoping = [];
    }
  }

}
