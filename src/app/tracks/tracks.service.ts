import { Injectable } from '@angular/core';
import { BehaviorSubject, pipe, of, from } from 'rxjs';
import { take, tap, map, switchMap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { Track, TrackData } from 'src/app/tracks/track.model';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class TracksService {

  private _tracks = new BehaviorSubject<Track[]>([]);

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  addTrack(name: string) {
    const newTrack = new Track(null, name);
    let trackId: number;

    return this.authService.getToken()
      .then(token => {
        const httpOptions = {
          headers: new HttpHeaders({
            'Authorization': token
          })
        }
        return this.http.post<{id: number, name: string}>(
          `${environment.restApiUrl}/track`,
          {...newTrack, id: null},
          httpOptions
        )
        .pipe(
          switchMap(
            (data) => {
              trackId = data.id;
              return this.tracks;
            }
          ),
          take(1),
          tap(
            (tracks) => {
              newTrack.id = trackId;
              this._tracks.next(tracks.concat(newTrack));
            }
          )
        )
        .toPromise()
      })
  }

  deleteTrack(trackId: number) {
    return this.authService.getToken()
      .then(token => {
        const httpOptions = {
          headers: new HttpHeaders({
            'Authorization': token
          })
        }
        return this.http.delete(
          `${environment.restApiUrl}/track/` + trackId,
          httpOptions
        )
        .pipe(
          switchMap ( () => {
            return this.tracks;
          }),
          take(1),
          tap( (tracks) => {
            this._tracks.next(tracks.filter(t => t.id != trackId));
          })
        )
        .toPromise()
      })
  }

  fetchTracks() {
    return this.authService.getToken()
      .then((token) => {
        const httpOptions = {
          headers: new HttpHeaders({
            'Authorization': token
          })
        }
        return this.http.get<Track[]>(`${environment.restApiUrl}/track`,
          httpOptions
        )
          .pipe(
            take(1),
            tap((tracks) => {
              this._tracks.next(tracks);
            })
          )
          .toPromise()
      })
      .catch((err) => {
        this._tracks.next([]);
        throw new Error(err);
      });
  }

  get tracks() {
    return this._tracks.asObservable();
  }

  track(trackId: number) {

    return this.authService.getToken()
      .then((token) => {
        const httpOptions = {
          headers: new HttpHeaders({
            'Authorization': token
          })
        }
        return this.http.get<TrackData>(`${environment.restApiUrl}/track/${trackId}`, httpOptions)
          .pipe(
            take(1),
            map( (track) => {
              return new Track(trackId, track.name);
            })
          )
          .toPromise()
      })
  }
}
