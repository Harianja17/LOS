import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostumerPagesComponent } from './costumer-pages.component';

describe('CostumerPagesComponent', () => {
  let component: CostumerPagesComponent;
  let fixture: ComponentFixture<CostumerPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostumerPagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostumerPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
