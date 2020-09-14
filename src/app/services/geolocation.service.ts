import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  latitude:number = 0;
  longitude:number = 0;

  constructor(private geolocation: Geolocation) {
    this.geolocalizar();
  }

  geolocalizar(){

    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
    //  let watch = this.geolocation.watchPosition();
    //  watch.subscribe((data) => {
    //   console.log(data);
    //   // data can be a set of coordinates, or an error (if an error occurred).
    //   // data.coords.latitude
    //   // data.coords.longitude
    //  });

  }
}
