import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewTrackPage } from './new-track.page';

describe('NewTrackPage', () => {
  let component: NewTrackPage;
  let fixture: ComponentFixture<NewTrackPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTrackPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewTrackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
