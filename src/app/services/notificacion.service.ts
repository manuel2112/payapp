import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  constructor( private http:HttpClient ) { }

  getNotificaciones(){
    return this.http.get( environment.URI + 'pushrest/' + environment.IDEMPRESA );
  }
  
}
