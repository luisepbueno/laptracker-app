import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LapsService } from '../laps/laps.service';
import { Lap } from '../laps/lap.model';
import { TracksService } from '../tracks/tracks.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit, OnDestroy {

  public bestLaps = [];
  public isLoading = true;

  private lapsSubscription: Subscription;

  constructor(
    private lapsService: LapsService,
    private tracksService: TracksService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.lapsSubscription = this.lapsService.laps.subscribe(
      (laps) => {
        // remove all current best laps
        this.bestLaps = [];

        // get all trackIds in the user laps
        let tracksIds: number[] = [];
        laps.map((lap) => {
          if (!tracksIds.includes(lap.track))
            tracksIds.push(lap.track)
        });

        // get the best time for each track
        tracksIds.forEach( (trackId) => {
          const lapsInThisTrack = laps.filter((lap) => {return lap.track == trackId});
          let times: Number[] = [];
          lapsInThisTrack.forEach( (lap) => { times.push(Number(lap.best_time)); });
          const bestLap = lapsInThisTrack.reduce( (a,b) => { return (a.best_time<b.best_time) ? a : b; });
          this.tracksService.track(trackId)
            .then((track) => {
              this.bestLaps.push({
                lap: bestLap,
                track: track
              });
            });
        });

        this.isLoading = false;
      }
    );
  }

  ngOnDestroy() {
    this.lapsSubscription.unsubscribe();
  }

  ionViewWillEnter() {
    this.lapsService.fetchLaps().then(()=>{});
  }
}
