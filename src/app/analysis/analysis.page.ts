import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.page.html',
  styleUrls: ['./analysis.page.scss'],
})
export class AnalysisPage implements OnInit {

  public isLoading: boolean;

  constructor() { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.isLoading = true;
  }

}
