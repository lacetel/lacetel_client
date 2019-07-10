import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import * as moment from 'moment';
import { API_HOST_PORT } from '../config/server';
import { HttpClient, HttpParams } from '@angular/common/http';

function getRandomId(): string {
  return Math.random().toString().split('.')[1];
}

const ids = '0'.repeat(10).split('').map(getRandomId);

function generateRandomSignals(): Signal[] {

  const res: Signal[] = [];

  for (let i = 0; i < 10; i += 1) {
    res.push({
      sensor: ids[i],
      date: new Date(),
      value: -90 + Math.random() * 60
    });
  }

  return res;
}

export interface Signal {
  sensor: string;
  date: Date;
  value: number;
  frequency?: string;
  service?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SignalsService {

  streaming: boolean;
  stream: Observable<Signal[]>;
  itv: number;
  tmo;
  margin: number;

  constructor(private http: HttpClient) {
    this.streaming = false;
  }

  get isStreaming() {
    return this.streaming;
  }

  momentToStr(date: moment.Moment): string {
    return date.toDate().toISOString();
  }

  initStream( margin: number, interval: number ): Observable<Signal[]> {

    // console.log('Init stream');

    if ( this.streaming === true ) {
      // console.log('Already streamming');
      return this.stream;
    }

    this.margin = margin;
    this.itv = interval;

    // console.log('Creating stream');

    this.stream = new Observable((observer: Observer<Signal[]>) => {

      const handler = () => {

        // console.log('Handler');

        const to = moment();
        const from = to.subtract(this.margin, 'minutes');

        const toStr = this.momentToStr(from);
        const fromStr = this.momentToStr(to);

        const params: HttpParams = new HttpParams();

        params.append('from', fromStr);
        params.append('to', toStr);

        this.http.get(API_HOST_PORT + '/signals', {
          params
        }).subscribe({
          next: (res: Signal[]) => observer.next(res),
          error: (err) => {
            console.log('signalsService ERROR: ', err);
          }
        });

        // console.log('Returning values');
        // observer.next(generateRandomSignals());

        if ( this.itv > 0 ) {
          // console.log('Restarting interval');
          clearTimeout(this.tmo);
          this.tmo = setTimeout(handler, this.itv);
          // console.log(this.tmo);
        } else {
          // console.log('Is paused');
          this.streaming = false;
          clearTimeout(this.tmo);
        }

      };

      const innerItv = setInterval(() => {
        if ( this.itv > 0 && this.streaming === false) {
          // console.log('Ready to resume');
          this.tmo = setTimeout(handler, this.itv);
          this.streaming = true;
        }
      }, 500);

      return {
        unsubscribe: () => {
          // console.log('Killing observable');
          this.itv = -1;
          clearInterval(innerItv);
        }
      };

    });

    return this.stream;

  }

  setMargin(margin: number) {
    // console.log('Setting margin: %d', margin);
    this.margin = margin;
  }

  setInterval(interval: number) {
    // console.log('Setting interval: %d', interval);

    if ( this.itv === interval ) {
      return;
    }

    this.itv = interval;
    this.streaming = false;
    clearTimeout(this.tmo);
  }

  setParams(config: { margin?: number, interval?: number }) {
    // console.log('Setting params', config);

    if ( typeof config.margin === 'number' ) {
      this.setMargin(config.margin);
    }

    if ( typeof config.interval === 'number' ) {
      this.setInterval(config.interval);
    }

  }

}
