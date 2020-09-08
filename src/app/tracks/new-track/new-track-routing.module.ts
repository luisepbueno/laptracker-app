import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewTrackPage } from './new-track.page';

const routes: Routes = [
  {
    path: '',
    component: NewTrackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewTrackPageRoutingModule {}
