import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-zoom-imagen',
  templateUrl: './zoom-imagen.page.html',
  styleUrls: ['./zoom-imagen.page.scss'],
})
export class ZoomImagenPage implements OnInit {

  @Input() img;
  @Input() producto;

  constructor( private modalCtrl:ModalController ) { }

  ngOnInit() {
  }

  salir(){
    this.modalCtrl.dismiss();
  }

}
