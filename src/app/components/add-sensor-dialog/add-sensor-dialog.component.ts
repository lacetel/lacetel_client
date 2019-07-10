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
  id: string;
  constructor(
    public dialogRef: MatDialogRef<AddSensorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Sensor) {
      this.id = '';
    }

  get idNonEmpty() {
    return this.id.trim() !== '';
  }

  close(): void {
    if ( this.idNonEmpty ) {
      this.dialogRef.close(this.id);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
