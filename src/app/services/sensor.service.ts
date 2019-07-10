import { Injectable } from '@angular/core';
import { Observable, of, Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_HOST_PORT } from '../config/server';


@Injectable({
  providedIn: 'root'
})
export class SensorService {

  constructor(private http: HttpClient) {}

  getSensors() {

    /*return of([
      {
        "id" : "5987609876996141",
        "lat" : 22.3601,
        "lon" : -440.6626,
        "val" : -70,
      },
      {
        "id" : "8059846668869044",
        "lat" : 20.3601,
        "lon" : -435.6626,
        "val" : -45,
      },
      {
        "id" : "24740232241854687",
        "lat" : 22.3601,
        "lon" : -443.6626,
        "val" : -20,
      },
      {
        "id" : "462124123491243234",
        "lat" : 21.3601,
        "lon" : -442.3423,
        "val" : -47
      }
    ]);//*/
    return this.http.get(API_HOST_PORT + '/sensors'); // */
  }

  private observableFactory(val: boolean) {
    return new Observable((observer: Observer<boolean>) => {
      observer.next(val);
      observer.complete();

      return { unsubscribe() {} };
    });
  }

  addSensor(id: string) {
    // return this.observableFactory(true);
    return this.http.post(API_HOST_PORT + '/sensor', { id });
  }

  removeSensor(id: string) {
    // return this.observableFactory(true);
    return this.http.delete(API_HOST_PORT + '/sensor/' + id);
  }

  rename(idOld: string, idNew: string) {
    // return this.observableFactory(true);
    return this.http.put(API_HOST_PORT + '/renameSensor', { id: idOld, idNew });
  }

  authorizeSensor(id: string) {
    // return this.observableFactory(true);
    return this.http.post(API_HOST_PORT + '/authorizeSensor', { id });
  }

}
