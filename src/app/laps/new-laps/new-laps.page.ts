import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoadingController, PickerController } from '@ionic/angular';

import { LapsService } from '../laps.service';
import { TracksService } from 'src/app/tracks/tracks.service';
import { padZeroesToLeft } from 'src/app/utils';

@Component({
  selector: 'app-new-laps',
  templateUrl: './new-laps.page.html',
  styleUrls: ['./new-laps.page.scss'],
})
export class NewLapsPage implements OnInit, OnDestroy {
  @ViewChild('form', {static: true}) form: NgForm;

  public trackName: string = "oi mundo";
  private trackId: number;
  private routeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private pickerCtrl: PickerController,
    private lapService: LapsService,
    private trackService: TracksService
  ) { }

  ngOnInit() {
    this.routeSubscription = this.route.paramMap.subscribe( (paramMap) => {
      this.trackId = parseInt(paramMap.get('trackId'));
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  ionViewWillEnter() {
    // clean the form
    this.form.reset();

    // set default date as the current date
    const now = new Date().
      toLocaleString('pt-br', {year: 'numeric', month: '2-digit', day: '2-digit'});
    const values = this.form.value;
    values['date'] = now;
    this.form.setValue(values);
  }

  onLapCountFocus() {
    // get current value
    // and set the selectedIndex value
    let curValue = this.form.value['lapCount'];
    const selectedIndex = (curValue==null) ? 0 : curValue - 1;

    // create the number picker
    this.pickerCtrl.create({
      columns: [{
        name: 'lapCount',
        options: this.singleColumnNumberPickerOptions(1, 10),
        selectedIndex: selectedIndex
      }],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Ok',
          handler: (value) => {
            const formValues = this.form.value;
            formValues['lapCount'] = value.lapCount.value;
            this.form.setValue(formValues);
          }
        }
      ]
    }).then(pickerEl => pickerEl.present());
  }

  onBestTimeFocus() {
    // get current value
    // and set the selectedIndex value
    // TODO

    // create the time picker
    this.pickerCtrl.create({
      columns: this.timeNumberPickerColumns(),
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Ok',
          handler: (value) => {
            const formValues = this.form.value;
            const minutes = value.minutes.value;
            const seconds = value.seconds.value;
            const miliseconds = value.miliseconds.value;
            formValues['bestTime'] = `${padZeroesToLeft(minutes, 2)}:` +
              `${padZeroesToLeft(seconds, 2)}.` +
              `${padZeroesToLeft(miliseconds, 3)}`;
            this.form.setValue(formValues);
          }
        }
      ]
    }).then(pickerEl => pickerEl.present());
  }

  onSubmit() {
    if(!this.form.valid)
      return;

    this.loadingCtrl.create(
      {message: 'Adicionando tempos...'}
    ).then((loadingEl) => {
      const lapCount = this.form.value['lapCount'];
      const bestTime = this.lapService.formatTime(this.form.value['bestTime']);
      const date = this.form.value['date'];
      this.lapService
        .addLap(this.trackId, date, bestTime, lapCount)
        .then(() => {
            this.router.navigateByUrl('/laps');
            loadingEl.dismiss();
          }
        )
    });
  }

  singleColumnNumberPickerOptions(start: number, end: number) {
    let options = []
    for (let i = start; i<=end; i++) {
      options.push({
        text: i,
        value: i,
      })
    }
    return options;
  }

  timeNumberPickerColumns() {
    let columns = [];
    columns.push({
      name: 'minutes',
      options: this.singleColumnNumberPickerOptions(0, 59)
    })
    columns.push({
      name: 'seconds',
      options: this.singleColumnNumberPickerOptions(0, 59)
    })
    columns.push({
      name: 'miliseconds',
      options: this.singleColumnNumberPickerOptions(0, 999)
    })
    return columns;
  }
}
