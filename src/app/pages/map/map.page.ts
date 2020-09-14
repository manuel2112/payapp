import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  @Input() lat:number;
  @Input() lgt:number;
  @Input() direccion;
  @Input() nmbEmpresa;
  zoom = 17;
  cargando:boolean = false;
   
  origin: any;
  destination: any;

  constructor( private modalCtrl:ModalController,
               private loadingService:LoadingService) {}

  ionViewWillEnter(){
    this.loadingService.loadingPresent();
    this.cargando = false;
    this.getDirection();
  }

  ionViewDidEnter() {
    this.loadingService.loadingDismiss();
  }

  ngOnInit() {
  }
   
  getDirection() {
    this.origin = { lat: this.lat, lng: this.lgt };
    //this.destination = { lat: 24, lng: 120 };
    this.cargando = true;
  }

  salir(){
    this.modalCtrl.dismiss();
  }

}
