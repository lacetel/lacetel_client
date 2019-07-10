import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SignalsService, Signal } from 'src/app/services/signals.service';
import { Subscription } from 'rxjs';
import { Chart } from 'chart.js';
import { MATERIAL_COLORS } from 'src/app/utils/material-colors';
import * as moment from 'node_modules/moment';
import { MatSelect } from '@angular/material';
import { retryWhen } from 'rxjs/operators';

interface Unit {
  0: string;
  1: number;
}

const TIMES = [ 1, 2, 5, 10, 20, 40, 60, 80, 100, 200, 400, 500, 800 ];
const UNITS: Unit[] = [
  ['min', 60000],
  ['sec', 1000],
  ['ms', 1]
];

const DECIMAL_PLACES = 2;
const DECIMAL_FACTOR = 10 ** DECIMAL_PLACES;

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss']
})
export class GraficosComponent implements OnInit, OnDestroy {

  observable: Subscription;
  chart: Chart;
  labels: string[];
  MAX_POINTS = 10;
  paused: boolean;
  margin: number;
  interval: number;

  periods: number[] = TIMES;
  units: Unit[] = UNITS;

  constructor(private stream: SignalsService) {

    Chart.defaults.global.defaultFontSize = 18;

    this.margin = 1;
    this.interval = 1000;
    this.paused = false;
    this.labels = [];
  }

  ngOnInit() {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: [],
        datasets: []
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          position: 'right'
        },
        tooltips: {
          mode: 'nearest',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: false
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Tiempo'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Señal (dBm)'
            }
          }]
        }
      }
    });
    this.chart.data.datasets = [];

    this.observable = this.stream
      .initStream(this.margin, this.interval)
      .subscribe((result: Signal[]) => {
        // console.log('Result: ', result);

        if ( result.length === 0 ) {
          return;
        }

        const data: Chart.ChartDataSets[] = this.chart.data.datasets;

        for (let i = 0, maxi = result.length; i < maxi; i += 1) {
          let fnd = false;
          const maxj = data.length;
          result[i].value = this.adjustValue(result[i].value);
          for (let j = 0; j < maxj; j += 1) {
            if ( data[j].label === result[i].sensor ) {
              (data[j].data as Chart.ChartPoint[]).push({
                x: moment(result[i].date, 'x').toDate(),
                y: result[i].value,
              });
              if ( data[j].data.length > this.MAX_POINTS ) {
                data[j].data.shift();
              }
              // console.log('Inserted');
              // data[j].data.push(result[i].value);
              fnd = true;
              break;
            }
          }
          if ( !fnd ) {
            data.push({
              label: result[i].sensor,
              backgroundColor: MATERIAL_COLORS[ maxj % MATERIAL_COLORS.length ],
              data: [{
                x: moment(result[i].date, 'x').toDate(),
                y: result[i].value
              }],
              borderColor: MATERIAL_COLORS[ maxj % MATERIAL_COLORS.length ],
              // cubicInterpolationMode: 'monotone',
              lineTension: 0.2,
              fill: false
            });
          }
        }

        this.chart.data.labels.push(moment(result[0].date).format('hh:mm:ss:SSS'));

        if ( this.chart.data.labels.length > this.MAX_POINTS ) {
          this.chart.data.labels.shift();
        }

        // console.log(this.chart.data.datasets);

        this.chart.update();
      });
  }

  ngOnDestroy() {
    this.observable.unsubscribe();
  }

  adjustValue(val: number): number {
    return Math.floor(val * DECIMAL_FACTOR) / DECIMAL_FACTOR;
  }

  pause() {
    if ( this.paused ) {
      return;
    }
    this.paused = true;
    this.stream.setInterval(-1);
  }

  play() {
    if ( !this.paused ) {
      return;
    }
    this.paused = false;
    this.stream.setInterval(this.interval);

    const data: Chart.ChartDataSets[] = this.chart.data.datasets;

    for (let i = 0, maxi = data.length; i < maxi; i += 1) {
      (data[i].data as number[]).push(NaN);
    }
  }

  updateRefresh(input: HTMLInputElement) {
    this.stream.setInterval(+input.value);
  }

  updateParams(cant: MatSelect, units: MatSelect) {
    let res: number = cant.value * units.value;
    res = Math.max(res, 400);

    this.stream.setInterval(res);
  }

}
