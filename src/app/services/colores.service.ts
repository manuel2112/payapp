import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ColoresService {

  colorprimero:string = 'instancia';
  colorsegundo:string = 'instancia';
  colortercero:string = 'instancia';
  loadColor:boolean = false;

  constructor( private http:HttpClient ) { }

  getColores(){
    this.http.get( environment.URI + 'paletarest/' + environment.IDEMPRESA)
    .subscribe( (resp:any)  => {
      this.colorprimero = resp.info.paleta.COLOR_NMB_01;
      this.colorsegundo = resp.info.paleta.COLOR_NMB_02;
      this.colortercero = resp.info.paleta.COLOR_NMB_03;
      this.loadColor = true;
    });
  }
}
