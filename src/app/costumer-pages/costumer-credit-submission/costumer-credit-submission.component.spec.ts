import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostumerCreditSubmissionComponent } from './costumer-credit-submission.component';

describe('CostumerCreditSubmissionComponent', () => {
  let component: CostumerCreditSubmissionComponent;
  let fixture: ComponentFixture<CostumerCreditSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostumerCreditSubmissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostumerCreditSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
