import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDisbursementComponent } from './admin-disbursement.component';

describe('AdminDisbursementComponent', () => {
  let component: AdminDisbursementComponent;
  let fixture: ComponentFixture<AdminDisbursementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDisbursementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDisbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
