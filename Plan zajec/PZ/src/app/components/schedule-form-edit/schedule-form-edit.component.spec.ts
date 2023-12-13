import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleFormEditComponent } from './schedule-form-edit.component';

describe('ScheduleFormEditComponent', () => {
  let component: ScheduleFormEditComponent;
  let fixture: ComponentFixture<ScheduleFormEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleFormEditComponent]
    });
    fixture = TestBed.createComponent(ScheduleFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
