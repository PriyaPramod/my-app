import { Component, OnInit } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import * as CanvasJS from './canvasjs.min';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-app';
  questions:any;
  resultsData: any;
  data: [];
  constructor(private http: HttpClient){}
  ngOnInit() {
    console.log('call')
    this.http.get('https://api.mentimeter.com/questions/48d75c359ce4').subscribe(resr => {
      this.questions = resr;
      console.log('here', this.questions)
    })
    //https://canvasjs.com/angular-charts/ (reference site)
    this.http.get('https://api.mentimeter.com/questions/48d75c359ce4/result').subscribe(resr => {
      this.resultsData = resr;
      console.log('res', this.resultsData)
      let chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: "Which is the best interactive presentation platform?"
        },
        data: [{
          type: "column",
          dataPoints: [
            { y: this.resultsData.results[0].score[0], label: this.resultsData.results[0].label},
            { y: this.resultsData.results[1].score[0], label: this.resultsData.results[1].label},
            { y: this.resultsData.results[2].score[0], label: this.resultsData.results[2].label},
            //{ y: 3, label: "Mentimeter" },
            //{ y: 1, label: "Slido" },
          ]
        }]
      });

      chart.render();
    })

  }
}


