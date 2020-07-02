import { Injectable } from '@angular/core';
import { Observable, of, Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_HOST_PORT } from '../config/server';
import { Sensor } from '../components/sensores/sensores.component';


@Injectable({
  providedIn: 'root'
})
export class SensorService {

  constructor(private http: HttpClient) {}

  getSensors() {

    return this.http.get(API_HOST_PORT + '/sensors'); // */
  }

  private observableFactory(val: boolean) {
    return new Observable((observer: Observer<boolean>) => {
      observer.next(val);
      observer.complete();

      return { unsubscribe() {} };
    });
  }

  addSensor(result: Sensor) {
    // return this.observableFactory(true);
    return this.http.post(API_HOST_PORT + '/sensor', result);
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
  
  getSameIdSensors(id: string) {

    return this.http.get(API_HOST_PORT + '/sameIdSensors' + id); 
  }

}
