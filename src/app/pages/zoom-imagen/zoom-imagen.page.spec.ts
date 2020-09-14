import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ZoomImagenPage } from './zoom-imagen.page';

describe('ZoomImagenPage', () => {
  let component: ZoomImagenPage;
  let fixture: ComponentFixture<ZoomImagenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoomImagenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ZoomImagenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
