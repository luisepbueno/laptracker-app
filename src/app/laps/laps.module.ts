import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LapsPageRoutingModule } from './laps-routing.module';

import { LapsPage } from './laps.page';
import { SelectTrackComponent } from './select-track/select-track.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LapsPageRoutingModule,
  ],
  declarations: [LapsPage, SelectTrackComponent],
  entryComponents: [SelectTrackComponent]
})
export class LapsPageModule {}
