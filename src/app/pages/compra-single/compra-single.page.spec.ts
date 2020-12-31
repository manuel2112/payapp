import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompraSinglePage } from './compra-single.page';

describe('CompraSinglePage', () => {
  let component: CompraSinglePage;
  let fixture: ComponentFixture<CompraSinglePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompraSinglePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CompraSinglePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
