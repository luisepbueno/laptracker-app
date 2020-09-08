import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LapsPage } from './laps.page';

describe('LapsPage', () => {
  let component: LapsPage;
  let fixture: ComponentFixture<LapsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LapsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LapsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
