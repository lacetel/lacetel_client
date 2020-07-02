import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject, Component } from '@angular/core';
import { Sensor } from '../sensores/sensores.component';

@Component({
  selector: 'app-edit-sensor-dialog',
  templateUrl: './edit-sensor-dialog.component.html',
  styleUrls: [
    './edit-sensor-dialog.component.scss'
  ]
})
export class EditSensorDialogComponent {
	newSensor: Sensor; 
  constructor(
    public dialogRef: MatDialogRef<EditSensorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Sensor) {
      this.newSensor = {
        id: '',
        lat: 0,
        lon: 0,
	    };
    }

  // get idNonEmpty() {
    // return this.newSensor.id.trim() !== '';
  // }
  
  close(): void {
    if ( this.newSensor.lat && this.newSensor.lon ) {
      this.dialogRef.close(this.newSensor);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
