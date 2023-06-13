import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CronPageComponent } from './cron-page.component';

describe('CronPageComponent', () => {
  let component: CronPageComponent;
  let fixture: ComponentFixture<CronPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CronPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CronPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
