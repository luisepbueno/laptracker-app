import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  @ViewChild('form', {static: true}) form: NgForm;

  errors: string[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
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
        });
    }
  }

  onLogin() {
    this.loadingCtrl.create({
        keyboardClose: true,
        message: 'Logging in...'
      }
    ).then(loadingCtrlEl => {
      loadingCtrlEl.present();

      this.errors = [];

      const email = this.form.value['email'];
      const password = this.form.value['password'];

      if (!this.authService.validateEmail(email))
        this.errors.push('E-mail invalid');
      if (password.trim() === '')
        this.errors.push('Password cannot be empty');

      if (this.errors.length > 0) {
        loadingCtrlEl.dismiss();
        return;
      }

      this.authService.login(email, password)
        .subscribe(
          (user) => {
            /*this.authService.user.getToken().then((token) => {
              console.log('Stored token: ', token);
            })*/
            this.router.navigateByUrl("/home");
            loadingCtrlEl.dismiss();
          },
          (error) => {
            this.errors.push(error.error.msg);
            loadingCtrlEl.dismiss();
          });
    })
  }

}
