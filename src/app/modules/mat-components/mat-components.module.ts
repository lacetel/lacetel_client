import { NgModule } from '@angular/core';

/// Angular Material
import {
  MatCheckboxModule,
  MatSelectModule,
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatCardModule,
  MatGridListModule,
  MatListModule,
  MatButtonToggleModule,
  MatTooltipModule,
  MatExpansionModule,
  MatMenuModule,
  MatTableModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatAutocompleteModule,
} from '@angular/material';

@NgModule({
  exports: [
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatExpansionModule,
    MatMenuModule,
    MatTableModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule
  ]
})
export class MatComponentsModule { }
