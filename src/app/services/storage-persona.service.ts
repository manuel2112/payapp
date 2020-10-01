import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { environment} from '../../environments/environment';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class StoragePersonaService {
  
  persona:any = [];
  nmbSetPersona:string = 'persona-' + environment.IDEMPRESA;

  constructor( private nativeStorage: NativeStorage,
               public platform: Platform) { }

    insertStorage(nombre:string, fono:string, email:string, direccion:string, ciudad:string){
      this.persona = [];
      this.persona.push({
        "nombre":nombre.toUpperCase(), 
        "fono":fono.toUpperCase(), 
        "email":email.toUpperCase(), 
        "direccion":direccion.toUpperCase(), 
        "ciudad":ciudad.toUpperCase()
      });
      this.guardarStorage();                  
    }
             
    guardarStorage(){
      if(this.platform.is('cordova')){
        this.nativeStorage.setItem( this.nmbSetPersona, this.persona)
        .then(
          () => {
            console.log('Stored item!');
          },
            error => console.error('Error storing item', error)
        );
      }else{      
        localStorage.setItem( this.nmbSetPersona, JSON.stringify(this.persona));
      }
    }
             
    getStorage(){
  
      if(this.platform.is('cordova')){
        this.nativeStorage.getItem(this.nmbSetPersona)
        .then(          
          data => this.persona = data ? data : [],
          error => console.error(error)
        );
      }else{
  
        if( localStorage.getItem(this.nmbSetPersona) ){
          this.persona = JSON.parse(localStorage.getItem(this.nmbSetPersona));
        }else{
          return [];
        }
  
      }
    }

    existePersona(){
      this.getStorage();
      let obj = this.persona;
      if( obj ){
        return true;
      }
      return false;
    }
             
    limpiarStorage(){  
      if(this.platform.is('cordova')){
        this.nativeStorage.remove(this.nmbSetPersona);
      }else{
        localStorage.removeItem(this.nmbSetPersona);
      }  
    }
}
