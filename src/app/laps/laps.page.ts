import { Component, OnInit, OnDestroy } from '@angular/core';
import { LapsService } from './laps.service';
import { Lap } from './lap.model';
import { ModalController, ToastController } from '@ionic/angular';
import { SelectTrackComponent } from './select-track/select-track.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-laps',
  templateUrl: './laps.page.html',
  styleUrls: ['./laps.page.scss'],
})
export class LapsPage implements OnInit, OnDestroy {

  public listedLaps: Lap[];
  public isLoading = false;
  public loadingError = false;

  private lapsSubscription: Subscription;

  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private lapsService: LapsService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.lapsSubscription = this.lapsService.laps.subscribe(
      (laps) => {
        this.listedLaps = laps;
      }
    )
  }

  ngOnDestroy() {
    this.lapsSubscription.unsubscribe();
  }

  ionViewWillEnter() {
    this.onFetchLaps();
  }

  onFetchLaps() {
    this.isLoading = true;
    this.loadingError = false;
    this.lapsService.fetchLaps()
      .then( () => {} )
      .finally(() => this.isLoading = false)
      .catch((error) => {
        this.loadingError = true;
        this.toastCtrl.create({
          message: 'Erro ao carregar as voltas.',
          animated: true,
          duration: 2000,
          position: 'middle'
        })
          .then((toast) => {
            toast.present();
          })
      })
  }

  onSelectTrack() {
    this.modalCtrl.create({
      component: SelectTrackComponent
    })
      .then( (modalEl) => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then( (data: any) => {
        if (data.data) {
          const selectedTrackId = data.data.trackId;
          this.router.navigateByUrl(`/laps/new-laps/${selectedTrackId}`)
        }
      });
  }
}
