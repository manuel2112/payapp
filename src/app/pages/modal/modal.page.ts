import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';

declare var google:any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  @Input() lat;
  @Input() lgt;
  map: any;
  nativeElement: any;

  @ViewChild ('map', {read:ElementRef, static:false}) mapRef:ElementRef;
  @ViewChild('myDiv') myDivElementRef: ElementRef;

  constructor( private modalCtrl:ModalController) { }

  ngOnInit() {
  }
  ionViewDidEnter(){
    this.showMap();
  }
  ngAfterViewInit() {
    //console.log(this.label.nativeElement); // throws an error
  }

  showMap(){
    // const location = new google.maps.LatLng(this.lat,this.lgt);
    // const options = {
    //   center:location,
    //   zoom: 15,
    //   disableDefaultUI:true
    // }

    // var map = new google.maps.Map(document.getElementById("map"),options);
            
    //         var marker = new google.maps.Marker({
    //            position: new google.maps.LatLng(17.377631, 78.478603),
    //            map: map,
    //            animation:google.maps.Animation.Drop
    //         });
    //         marker.setMap(map);

        var myLatlng = new google.maps.LatLng(this.lat,this.lgt);
        var mapOptions = {
          zoom: 15,
          center: myLatlng
        }
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        
        var marker = new google.maps.Marker({
            position: myLatlng,
            title:"PAPIPA"
        });
        
        // To add the marker to the map, call setMap();
        marker.setMap(map);  
        //this.map = new google.maps.Map(this.mapRef.nativeElement, options);
  }

  salirSinArgumentos(){
    console.log('NO CIERRA');
    this.modalCtrl.dismiss();
  }

  salirConArgumentos(){
    console.log('NO CIERRA');
    this.modalCtrl.dismiss({
          nombre: 'manuel',
          pais: 'Chile'
    });
  }

}
