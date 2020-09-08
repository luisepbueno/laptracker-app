import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewLapsPageRoutingModule } from './new-laps-routing.module';

import { NewLapsPage } from './new-laps.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewLapsPageRoutingModule
  ],
  declarations: [NewLapsPage]
})
export class NewLapsPageModule {}
