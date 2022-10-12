import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostumerDisbursementComponent } from './costumer-disbursement.component';

describe('CostumerDisbursementComponent', () => {
  let component: CostumerDisbursementComponent;
  let fixture: ComponentFixture<CostumerDisbursementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostumerDisbursementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostumerDisbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
