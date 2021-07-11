import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { Track } from './track.model';
import { TracksService } from './tracks.service';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-track',
  templateUrl: './tracks.page.html',
  styleUrls: ['./tracks.page.scss'],
})
export class TracksPage implements OnInit, OnDestroy {

  public listedTracks: Track[] = [];
  public isLoading = false;
  public loadingError = false;
  private tracksSubscription: Subscription;

  constructor(
    private loadingCtrl: LoadingController,
    private tracksService: TracksService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.tracksSubscription = this.tracksService.tracks.subscribe(tracks => {
      this.listedTracks = tracks;
    });
  }

  ionViewWillEnter() {
    this.onFetchTracks();
  }

  onFetchTracks() {
    this.isLoading = true;
    this.loadingError = false;
    this.loadingCtrl.create(
      {message: 'Carregando...'}
    ).then( (loadingEl) => {
      loadingEl.present();
      this.tracksService.fetchTracks()
        .then(() => {})
        .finally(() => {
          this.isLoading = false;
          loadingEl.dismiss();
        })
        .catch((error) => {
          this.loadingError = true;
          this.isLoading = false;
          this.toastCtrl.create({
            message: 'Erro ao carregar as pistas.',
            animated: true,
            duration: 2000,
            position: 'middle'
          })
            .then((toast) => {
              toast.present();
            })
        });
    })
  }

  onDelTrack(trackId: number) {
    this.alertCtrl.create({
      header: 'Deletar pista',
      message: 'Deseja deletar esta pista?',
      buttons: [
        'Cancelar'
        ,
        {
          text: 'Deletar',
          handler: () => {
            //console.log('removido');
            this.isLoading = true;
            this.tracksService.deleteTrack(trackId)
              .then( () => {
                this.isLoading = false;
              })
              .catch( (error) => {
                console.log(error);
                this.isLoading = false;
              })
          }
        }
      ]
    }).then( alertEl => {
      alertEl.present();
    })
  }

  ngOnDestroy() {
    this.tracksSubscription.unsubscribe();
  }

}
