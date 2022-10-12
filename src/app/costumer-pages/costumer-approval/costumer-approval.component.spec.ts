import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostumerApprovalComponent } from './costumer-approval.component';

describe('CostumerApprovalComponent', () => {
  let component: CostumerApprovalComponent;
  let fixture: ComponentFixture<CostumerApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostumerApprovalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostumerApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
