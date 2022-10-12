import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostumerProspectComponent } from './costumer-prospect.component';

describe('CostumerProspectComponent', () => {
  let component: CostumerProspectComponent;
  let fixture: ComponentFixture<CostumerProspectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostumerProspectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostumerProspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
