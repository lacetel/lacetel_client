import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSensorDialogComponent } from './edit-sensor-dialog.component';

describe('EditSensorDialogComponent', () => {
  let component: EditSensorDialogComponent;
  let fixture: ComponentFixture<EditSensorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSensorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSensorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
