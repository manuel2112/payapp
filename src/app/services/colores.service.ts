import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { environment } from '../../environments/environment.prod';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class ColoresService {

  colorprimero:string = 'instancia';
  colorsegundo:string = 'instancia';
  colortercero:string = 'instancia';
  loadColor:boolean = false;
  colores:any = [];
  nmbSetColores:string = 'colores-' + environment.IDEMPRESA;

  constructor( private http:HttpClient,
               private nativeStorage: NativeStorage,
               private platform: Platform  ) { }

  getColores(){
    this.http.get( environment.URI + 'paletarest/' + environment.IDEMPRESA)
    .subscribe( (resp:any)  => {
      this.insertColorStorage(resp.info.paleta.COLOR_NMB_01,  resp.info.paleta.COLOR_NMB_02, resp.info.paleta.COLOR_NMB_03);
    });
  }

  insertColorStorage(primario:string, secundario:string, terciario:string){
    this.colores = [];
    this.colores.push({
      "primario":primario, 
      "secundario":secundario, 
      "terciario":terciario
    });
    this.guardarColorStorage();                  
  }

  cambiarColores(){
    this.getColores();
    this.getColorStorage();
  }

  guardarColorStorage(){
    if(this.platform.is('cordova')){
      this.nativeStorage.setItem( this.nmbSetColores, this.colores)
      .then(
        () => {
          // console.log('Stored item!');
        },
          // error => console.error('Error storing item', error)
      );
    }else{      
      localStorage.setItem( this.nmbSetColores, JSON.stringify(this.colores));
    }
  }

  getColorStorage(){

    if(this.platform.is('cordova')){
      this.nativeStorage.getItem(this.nmbSetColores)
      .then(          
        (data) => {
          this.colores = data ? data : [];
          this.colorprimero = this.colores[0].primario;
          this.colorsegundo = this.colores[0].secundario;
          this.colortercero = this.colores[0].terciario;
          this.loadColor = true;
        },
        (error) => {
          console.error(error);
        }
      );
    }else{

      if( localStorage.getItem(this.nmbSetColores) ){
        this.colores = JSON.parse(localStorage.getItem(this.nmbSetColores));
        this.colorprimero = this.colores[0].primario;
        this.colorsegundo = this.colores[0].secundario;
        this.colortercero = this.colores[0].terciario;
        this.loadColor = true;
      }else{
        return [];
      }

    }

  }

  limpiarColorStorage(){  
    if(this.platform.is('cordova')){
      this.nativeStorage.remove(this.nmbSetColores);
    }else{
      localStorage.removeItem(this.nmbSetColores);
    }  
  }

}
