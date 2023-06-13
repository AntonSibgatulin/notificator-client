import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailingPageComponent } from './mailing-page.component';

describe('MailingPageComponent', () => {
  let component: MailingPageComponent;
  let fixture: ComponentFixture<MailingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailingPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
