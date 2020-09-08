import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewLapsPage } from './new-laps.page';

const routes: Routes = [
  {
    path: '',
    component: NewLapsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewLapsPageRoutingModule {}
