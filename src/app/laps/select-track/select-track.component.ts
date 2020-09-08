import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { Track } from 'src/app/tracks/track.model';
import { TracksService } from 'src/app/tracks/tracks.service';
import { LoadingController, IonSearchbar, IonList, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-select-track',
  templateUrl: './select-track.component.html',
  styleUrls: ['./select-track.component.scss'],
})
export class SelectTrackComponent implements OnInit, OnDestroy {

  private listedTracks: Track[] = [];
  public listedTracksFiltered: Track[] = [];
  private tracksSubcription: Subscription;

  constructor(
    //private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private tracksService: TracksService
  ) { }

  ngOnInit() {
    this.tracksService.fetchTracks().then(() => {});
    this.tracksSubcription = this.tracksService.tracks.subscribe(
      (tracks) => {
        this.listedTracks = tracks;
        this.listedTracksFiltered = tracks;
      }
    )
  }

  ngOnDestroy() {
    this.tracksSubcription.unsubscribe();
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

  onChange(event: any) {
    const query = event.target.value.toLocaleLowerCase();
    this.filterItems(query);
  }

  filterItems(query: string) {
    requestAnimationFrame( () => {
      this.listedTracksFiltered = this.listedTracks.filter( (item) => {
        return item.name.toLocaleLowerCase().indexOf(query) > -1;
      });
    });
  }

  onSelectTrack(trackId: string) {
    this.modalCtrl.dismiss({ trackId: trackId });
  }
}
