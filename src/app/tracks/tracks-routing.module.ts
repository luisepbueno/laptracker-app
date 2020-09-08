import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TracksPage } from './tracks.page';

const routes: Routes = [
  { path: '', component: TracksPage },
  {
    path: 'new-track',
    loadChildren: () => import('./new-track/new-track.module').then( m => m.NewTrackPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackPageRoutingModule {}
