import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewTrackPageRoutingModule } from './new-track-routing.module';

import { NewTrackPage } from './new-track.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewTrackPageRoutingModule
  ],
  declarations: [NewTrackPage]
})
export class NewTrackPageModule {}
