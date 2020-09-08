import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'splash', loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), canLoad: [AuthGuard] },
  { path: 'laps', loadChildren: () => import('./laps/laps.module').then( m => m.LapsPageModule), canLoad: [AuthGuard] },
  { path: 'analysis', loadChildren: () => import('./analysis/analysis.module').then( m => m.AnalysisPageModule), canLoad: [AuthGuard] },
  { path: 'tracks', loadChildren: () => import('./tracks/tracks.module').then( m => m.TracksPageModule), canLoad: [AuthGuard] },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule) },
  { path: 'signup', loadChildren: () => import('./auth/signup/signup.module').then( m => m.SignupPageModule) },
  {
    path: 'analysis',
    loadChildren: () => import('./analysis/analysis.module').then( m => m.AnalysisPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
