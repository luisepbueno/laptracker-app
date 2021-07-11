import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  @ViewChild('form', {static: true}) form: NgForm;

  public errors: string[] = [];

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.form.reset();
  }

  onSubmit() {
    if(!this.form.valid)
      return;

    this.loadingCtrl.create({
      message: 'Signing up...'
    })
      .then((loadingCtrlEl) => {
        loadingCtrlEl.present();

        this.errors = [];

        const email = this.form.value['email'];
        const password = this.form.value['password'];
        const confirmPassword = this.form.value['confirmPassword'];

        // e-mail validation
        if (!this.authService.validateEmail(email))
          this.errors.push('E-mail is invalid.');
        if (password.trim() === '')
          this.errors.push('Password cannot be empty.');

        // password validation
        else if (password.length < 8)
          this.errors.push('Password must be at least 8 characters long.')
        else if (password !== confirmPassword)
          this.errors.push('Passwords don\'t match.');

        // no errors
        if (this.errors.length==0) {
          this.authService
            .signUp(email, password)
            .subscribe(
              (user) => {
                // TODO: auto-login?
                console.log('sign-up: ', user);
                this.router.navigateByUrl('/auth');
                loadingCtrlEl.dismiss();
              },
              (error) => {
                this.errors.push(error.message);
                loadingCtrlEl.dismiss();
              }
            )
          }
        else {
          loadingCtrlEl.dismiss();
        }
      })
  }
}
