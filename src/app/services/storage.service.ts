import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { environment} from '../../environments/environment';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  shoping:any = [];
  nmbSetProductos:string = 'item-' + environment.IDEMPRESA;

  constructor( private nativeStorage: NativeStorage,
               public platform: Platform) { }

  insertStorage(nmbPro:string, varPro:any, cantidad:number){       
    this.comprobarProductoIngresado(varPro.PROVAR_ID);
    this.shoping.push({"nmbPro":nmbPro, "varPro":varPro, "cantidad":cantidad });
    this.guardarStorage();                  
  }

  guardarStorage(){
    if(this.platform.is('cordova')){
      this.nativeStorage.setItem( this.nmbSetProductos, this.shoping)
      .then(
      () => {
        console.log('Stored item!');
      },
        error => console.error('Error storing item', error)
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

  totalPagar(carrito:any){

    var pagar = 0;
    for (var i = 0; i < carrito.length; ++i) {
      var elemento = carrito[i];
      pagar = ( elemento.varPro.PROVAR_VALOR * elemento.cantidad) + pagar
    }
    return pagar;
  }

  borrar(i:number){
    this.comprobarProductoIngresado(i);
    this.guardarStorage();
  }
             
  cargarStorage(){

    if(this.platform.is('cordova')){
      this.nativeStorage.getItem(this.nmbSetProductos)
      .then(
        data => console.log(data),
        error => console.error(error)
      );
    }else{

      if( localStorage.getItem(this.nmbSetProductos) ){
        this.shoping = JSON.parse(localStorage.getItem(this.nmbSetProductos));
      }else{
        this.shoping = [];
      }

    }
  }
             
  getStorage(){

    if(this.platform.is('cordova')){
      this.nativeStorage.getItem(this.nmbSetProductos)
      .then(
        data => console.log(data),
        error => console.error(error)
      );
    }else{

      if( localStorage.getItem(this.nmbSetProductos) ){
        return this.orderProductos();
      }else{
        return [];
      }

    }
  }

  orderProductos(){
    let data = JSON.parse(localStorage.getItem(this.nmbSetProductos));
    let val = data.sort((a, b) => (a.varPro.PROVAR_ID > b.varPro.PROVAR_ID) ? 1 : -1 );
    return val;
  }
             
  countProductos(){

    if(this.platform.is('cordova')){
    }else{
      return this.shoping.length;
    }

  }
             
  limpiarStorage(){

    if(this.platform.is('cordova')){
      this.nativeStorage.setItem(this.nmbSetProductos, [])
      .then(
      () => {
        console.log('Stored item!');
      },
        error => console.error('Error storing item', error)
      );
    }else{
      localStorage.removeItem(this.nmbSetProductos);
    }

  }

}
