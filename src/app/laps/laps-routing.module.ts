import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LapsPage } from './laps.page';

const routes: Routes = [
  {
    path: '',
    component: LapsPage
  },
  {
    path: 'new-laps/:trackId',
    loadChildren: () => import('./new-laps/new-laps.module').then( m => m.NewLapsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LapsPageRoutingModule {}
