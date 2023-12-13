import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home_SITE } from './home.component';

describe('HomeComponent', () => {
  let component: Home_SITE;
  let fixture: ComponentFixture<Home_SITE>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Home_SITE]
    });
    fixture = TestBed.createComponent(Home_SITE);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
