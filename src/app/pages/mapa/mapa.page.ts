import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';

declare var google: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  @Input() lat:number;
  @Input() lgt:number;
  @Input() direccion;
  @Input() nmbEmpresa;
  zoom = 17;
  load:boolean = false;
  loadingMap:boolean = false;
  map:any;
  @ViewChild('map', { read: ElementRef,static: false}) mapRef: ElementRef;
  infoWindows:any = [];


  constructor( private modalCtrl:ModalController) { }

  ngOnInit(){
    setTimeout(()=>{
      this.loadingMap = true;
      if (this.loadingMap == true) {
        this.showMap();
        this.load = true;
      }
    },500);
  }

  showMap(){
    const markers = [
                        {
                          title: this.nmbEmpresa,
                          latitude: this.lat,
                          longitude: this.lgt
                        }
                      ];
    const location = new google.maps.LatLng( this.lat, this.lgt);
    const options = {
      center: location,
      zoom: this.zoom,
      disableDefaultUI: true
    };
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.addMarkersToMap(markers); 
  }

  addMarkersToMap( markers ){
    for( let marker of markers ){
      let position = new google.maps.LatLng( marker.latitude, marker.longitude);
      let mapMarker = new google.maps.Marker({
        position: position,
        title: marker.title,
        latitude: marker.latitude,
        longitude: marker.longitude
      })
      
      mapMarker.setMap(this.map);
      //this.addInfoWindowToMarker(mapMarker);
    }
  }

  addInfoWindowToMarker(marker){
    let infoWindowContent = '<div id="content" ' + 
                             '<h2 id="firstHeading" class="firstHeading">' + marker.title + '</h2>' +
                             '<p>Latitude:' + marker.latitude + '</p>' +
                             '<p>Longitude:' + marker.longitude + '</p>' +
                             '</div>';
    let infoWindow = new google.maps.InfoWindow({
      content : infoWindowContent
    });

    marker.addListener( 'click',() => {
      this.closeInfoWindows();
      infoWindow.open(this.map,marker);
    });
    this.infoWindows.push(infoWindow);
  }

  closeInfoWindows(){
    for( let window of this.infoWindows ){
      window.close();
    }
  }

  salir(){
    this.modalCtrl.dismiss();
  }
  

}
