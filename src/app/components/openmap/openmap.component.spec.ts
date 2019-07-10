import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenmapComponent } from './openmap.component';

describe('OpenmapComponent', () => {
  let component: OpenmapComponent;
  let fixture: ComponentFixture<OpenmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
