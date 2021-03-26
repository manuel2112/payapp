import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComboPage } from './combo.page';

describe('ComboPage', () => {
  let component: ComboPage;
  let fixture: ComponentFixture<ComboPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComboPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComboPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
