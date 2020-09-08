import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewLapsPage } from './new-laps.page';

describe('NewLapsPage', () => {
  let component: NewLapsPage;
  let fixture: ComponentFixture<NewLapsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewLapsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewLapsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
