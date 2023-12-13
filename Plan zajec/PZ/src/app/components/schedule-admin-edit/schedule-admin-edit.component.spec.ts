import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleAdminEditComponent } from './schedule-admin-edit.component';

describe('ScheduleAdminEditComponent', () => {
  let component: ScheduleAdminEditComponent;
  let fixture: ComponentFixture<ScheduleAdminEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleAdminEditComponent]
    });
    fixture = TestBed.createComponent(ScheduleAdminEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
