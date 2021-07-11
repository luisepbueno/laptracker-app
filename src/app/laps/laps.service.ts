import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, tap, map, switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { environment } from '../../environments/environment';

import { Lap, LapData } from './lap.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LapsService {
  private _laps = new BehaviorSubject<Lap[]>([]);

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  // format time in the format mm:ss:ms to ms
  formatTime(time: string) {
    const a = time.split('.');
    const b = a[0].split(':');
    const minutes = parseInt(b[0]);
    const seconds = parseInt(b[1]);
    const miliseconds = parseInt(a[1]);
    return miliseconds + seconds * 1000 + minutes * 60 * 1000;
  }

  addLap(trackId: number, date: Date, bestTime: number, lapCount: number) {
    const newLapSet = new Lap(null, trackId, date, bestTime, lapCount);
    let lapId: number;

    return this.authService.getToken()
      .then((token) => {
        const httpOptions = {
          headers: new HttpHeaders({
            'Authorization': token
          })
        }
        return this.http.post<{id: number}>(
          `${environment.restApiUrl}/lap`,
          {...newLapSet, id: null},
          httpOptions)
          .pipe(
            switchMap( (data) => {
              lapId = data.id;
              return this.laps;
            }),
            take(1),
            tap( (tracks) => {
              newLapSet.id = lapId;
              this._laps.next(tracks.concat(newLapSet));
            })
          )
          .toPromise()
    })
  }

  fetchLaps() {
    return this.authService.getToken()
      .then((token) => {
        const httpOptions = {
          headers: new HttpHeaders({
            'Authorization': token
          })
        }
        return this.http.get<Lap[]>(`${environment.restApiUrl}/lap`, httpOptions)
          .pipe(
            take(1),
            map( (data) => {
              const laps: Lap[] = [];
              if (data) {
                for(const lapData of data) {
                  laps.push(new Lap(
                    lapData.id,
                    lapData.track,
                    lapData.date,
                    lapData.best_time,
                    lapData.lap_count
                  ));
                }
              }
              return laps;
            }),
            tap( (laps) => {
              this._laps.next(laps);
            })
          )
          .toPromise()
        })
      .catch((err) => {
        this._laps.next([]);
        throw new Error(err);
      });
  }

  get laps() {
    return this._laps.asObservable();
  }
}
