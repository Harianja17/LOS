import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreditSubmissionComponent } from './admin-credit-submission.component';

describe('AdminCreditSubmissionComponent', () => {
  let component: AdminCreditSubmissionComponent;
  let fixture: ComponentFixture<AdminCreditSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCreditSubmissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCreditSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
