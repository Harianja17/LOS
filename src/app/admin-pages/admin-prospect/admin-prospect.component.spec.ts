import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProspectComponent } from './admin-prospect.component';

describe('AdminProspectComponent', () => {
  let component: AdminProspectComponent;
  let fixture: ComponentFixture<AdminProspectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProspectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
