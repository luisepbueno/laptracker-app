import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TracksService } from '../tracks.service';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-new-track',
  templateUrl: './new-track.page.html',
  styleUrls: ['./new-track.page.scss'],
})
export class NewTrackPage implements OnInit {
  @ViewChild('f', {static: true}) form: NgForm;

  constructor(
    private tracksService: TracksService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.form.reset();
  }

  onCreateTrack() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl.create({
      message: 'Cadastrando pista...'
    })
      .then((loadingEl) => {
          loadingEl.present();
          let trackName = this.form.value['name'];
          this.tracksService
            .addTrack(trackName)
            .then(() => {
              loadingEl.dismiss();
              this.router.navigateByUrl('/tracks');
            })
            .catch(err => {
              console.log(err);
              this.toastCtrl
                .create({
                  message: 'Erro ao cadastrar pista.',
                  animated: true,
                  duration: 2000,
                  position: 'middle'
                })
                  .then((toast) => {
                    loadingEl.dismiss();
                    toast.present();
                  })
            });
        }
      )
  }

}
