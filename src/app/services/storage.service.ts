import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { environment } from '../../environments/environment.prod';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  shoping:any = [];
  combo:any = [];
  nmbSetProductos:string = 'item-' + environment.IDEMPRESA;
  nmbSetCombo:string = 'combo-' + environment.IDEMPRESA;
  objProductos:any = [];

  constructor( private nativeStorage: NativeStorage,
               public platform: Platform) { }

  insertStorage(nmbPro:string, varPro:any, cantidad:number, observacion:string, esCombo:boolean, articulo:any, esSuma:boolean){
    this.comprobarProductoIngresado(varPro.PROVAR_ID);
    this.shoping.push({"nmbPro":nmbPro, "varPro":varPro, "cantidad":cantidad, "obs":observacion, "esCombo":esCombo});
    this.guardarProductoStorage();
    if( esCombo && esSuma ){
      this.combo.push({"PROVAR_ID":varPro.PROVAR_ID, "NUMERO":cantidad, "articulo":articulo});
      this.guardarComboStorage();
    }
  }

  guardarProductoStorage(){
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
  
  guardarComboStorage(){
    if(this.platform.is('cordova')){

      this.nativeStorage.setItem( this.nmbSetCombo, this.combo)
      .then(
      () => {
        //console.log('Stored item!');
      },
        //error => console.error('Error storing item', error)
      );
    }else{      
      localStorage.setItem( this.nmbSetCombo, JSON.stringify(this.combo));
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
  
  deleteLastCombo(id:number){

    const combo = this.combo;
    for (var i = combo.length - 1; i >= 0; --i) {
      var elemento = combo[i];
      if ( id === elemento.PROVAR_ID ) {
        this.combo.splice(i,1);
        this.guardarComboStorage();
        break;
      }
    }

  }
  
  deleteCombo(id:number){

    const combo = this.combo;
    for (var i = combo.length - 1; i >= 0; --i) {
      var elemento = combo[i];
      if ( id === elemento.PROVAR_ID ) {
        this.combo.splice(i,1);
      }
    }    
    this.guardarComboStorage();

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
      pagar = ( elemento.varPro.PROVAR_VALOR * elemento.cantidad ) + pagar
    }
    return pagar;
  }

  borrarUltimo(i:number){
    this.shoping.splice( i, 1);
    this.guardarProductoStorage();
  }

  borrar(i:number){
    this.comprobarProductoIngresado(i);
    this.deleteCombo(i);
    this.guardarProductoStorage();
  }
             
  getStorage(){    

    if(this.platform.is('cordova')){
      
      this.nativeStorage.getItem(this.nmbSetProductos)
      .then(
        (data) => { 

          this.shoping = data ? data : [];
          
        },
        (error) => {
          this.guardarProductoStorage();
          console.error('ERROR: ',error);
        }
      );
    }else{

      if( localStorage.getItem(this.nmbSetProductos) ){
        this.shoping = JSON.parse(localStorage.getItem(this.nmbSetProductos));
      }else{
        this.shoping = [];
      }

    }

  }
  
  getComboStorage(){    

    if(this.platform.is('cordova')){
      
      this.nativeStorage.getItem(this.nmbSetCombo)
      .then(
        (data) => { 

          this.combo = data ? data : [];
          
        },
        (error) => {
          this.guardarProductoStorage();
          console.error('ERROR: ',error);
        }
      );
    }else{

      if( localStorage.getItem(this.nmbSetCombo) ){
        this.combo = JSON.parse(localStorage.getItem(this.nmbSetCombo));
      }else{
        this.combo = [];
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
      this.nativeStorage.remove(this.nmbSetCombo);
      this.combo = [];
    }else{
      localStorage.removeItem(this.nmbSetProductos);
      this.shoping = [];
      localStorage.removeItem(this.nmbSetCombo);
      this.combo = [];
    }
  }

}