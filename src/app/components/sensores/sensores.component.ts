import { Component, OnInit, Inject } from '@angular/core';
import { SensorService } from 'src/app/services/sensor.service';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddSensorDialogComponent } from '../add-sensor-dialog/add-sensor-dialog.component';

export interface Sensor {
  id: string;
  lat: number;
  lon: number;
  val?: number;
  lastSeen?: number;
  editing?: boolean;
  auth?: boolean;
}

@Component({
  selector: 'app-confirmation-dialog',
  template: `
  <h1 mat-dialog-title>Estás seguro?</h1>
  <div mat-dialog-content>
    <span>Sensor: {{data.id}}</span>
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="onNoClick()">Calcelar</button>
    <button mat-button [mat-dialog-close]="data.id" cdkFocusInitial class="delete">
      <mat-icon matPrefix svgIcon="close"></mat-icon>Eliminar
    </button>
  </div>
  `,
})
export class ConfirmationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Sensor) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'app-sensores',
  templateUrl: './sensores.component.html',
  styleUrls: ['./sensores.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SensoresComponent implements OnInit {

  expandedElement: Sensor | null;

  columns: {}[];
  sensors: Sensor[];
  temporalEdition: Sensor;

  constructor(
    private sensorService: SensorService,
    private dialog: MatDialog) {

    this.columns = [ 'id', 'lat', 'lon', 'val', 'lastSeen' ];

    this.sensors = [];

    this.sensorService.getSensors().subscribe((sensorList: Sensor[]) => {
      this.sensors = [].concat(sensorList);
      // console.log('SENSORS', this.sensors);
    });

    this.temporalEdition = {
      id: '',
      lat: 0,
      lon: 0
    };

  }

  ngOnInit() {
  }

  get authorized() {
    return this.sensors.filter((e) => Boolean(e.auth));
  }

  get unauthorized() {
    return this.sensors.filter((e) => !Boolean(e.auth));
  }

  get authsensors() {
    return this.authorized.length;
  }

  get unauthsensors() {
    return this.unauthorized.length;
  }

  expand(event, target, sensor: Sensor) {
    // console.log(event, target);
    if ( target.tagName === 'INPUT' ) {
      event.stopPropagation();
      return null;
    }
    this.expandedElement = this.expandedElement === sensor ? null : sensor;
  }

  deleteSensor(id: string) {

    let iTemp = null;

    for (let i = 0; i < this.sensors.length; i += 1) {
      if ( this.sensors[i].id === id ) {
        iTemp = i;
        break;
      }
    }

    if ( iTemp != null ) {

      // console.log('Found sensor at', iTemp, this.sensors.length);

      const sensor = this.sensors[iTemp];
      this.sensors.splice(iTemp, 1);
      this.sensors = [].concat(this.sensors);

      // console.log(this.sensors.length);

      this.sensorService.removeSensor(id)
        .subscribe({
          error: (error) => {
            console.log('sensores.component removeSensor ERROR: ', error);
            this.sensors.splice(iTemp, 0, sensor);
            this.sensors = [].concat(this.sensors);
          }
        });
    }

  }

  editToggle(sensor: Sensor) {
    sensor.editing = !sensor.editing;
    this.temporalEdition.id = sensor.id;
    if ( !sensor.editing ) {
      this.cancelEdition(sensor);
    }
  }

  cancelEdition(sensor: Sensor) {
    sensor.id = this.temporalEdition.id;
    sensor.editing = false;
  }

  hasChanged(sensor: Sensor) {
    return this.expandedElement === sensor &&
      sensor.id.trim() !== this.temporalEdition.id;
  }

  save(sensor: Sensor) {
    // console.log(this.temporalEdition.id, sensor.id);

    sensor.editing = false;

    this.sensorService.rename(this.temporalEdition.id, sensor.id)
      .subscribe({
        error: (err) => {
          console.log('sensores.component rename ERROR: ', err);
          sensor.id = this.temporalEdition.id;
        }
      });
  }

  deleteConfirmation(sensor: Sensor): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: sensor
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteSensor(result);
      }
    });
  }

  addSensorConfirmation(): void {
    const sensor: Sensor = {
      id: '',
      lat: 0,
      lon: 0,
      auth: true
    };

    const dialogRef = this.dialog.open(AddSensorDialogComponent, {
      data: sensor
    });

    dialogRef.afterClosed().subscribe(result => {
      if ( result ) {
        sensor.id = result;
        this.sensors = this.sensors.concat(sensor);
        this.sensorService.addSensor(result).subscribe({
          error: (err) => {
            console.log('sensores.component addSensor ERROR: ', err);
            this.sensors.pop();
          }
        });
      }
    });

  }

  authorize(sensor: Sensor) {

    sensor.auth = true;

    this.sensorService.authorizeSensor(sensor.id)
      .subscribe({
        error: (err) => {
          console.log('sensores.component authorizeSensor ERROR: ', err);
          sensor.auth = false;
        }
      });

  }

}
