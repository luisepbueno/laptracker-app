import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if(this.authService.isLogged) {
      // if user is logged, redirect to home
      this.router.navigateByUrl('/home');
    } else {
      // if user is not logged, try to recover
      // login info from storage
      this.authService.recoverAuthInfo()
        .then((result) => {
          if(result)
            this.router.navigateByUrl('/home');
          else
            this.router.navigateByUrl('/auth');
        })
    }
  }

}
