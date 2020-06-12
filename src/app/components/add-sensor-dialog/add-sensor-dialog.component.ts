import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject, Component } from '@angular/core';
import { Sensor } from '../sensores/sensores.component';

@Component({
  selector: 'app-add-sensor-dialog',
  templateUrl: './add-sensor-dialog.component.html',
  styleUrls: [
    './add-sensor-dialog.component.scss'
  ]
})
export class AddSensorDialogComponent {
	newSensor: Sensor; 
  constructor(
    public dialogRef: MatDialogRef<AddSensorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Sensor) {
      this.newSensor = {
        id: '',
        lat: 0,
        lon: 0,
	    };
    }

  get idNonEmpty() {
    return this.newSensor.id.trim() !== '';
  }
  
  close(): void {
    if ( this.idNonEmpty ) {
      this.dialogRef.close(this.newSensor);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
