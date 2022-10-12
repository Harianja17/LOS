import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostumerSurveyComponent } from './costumer-survey.component';

describe('CostumerSurveyComponent', () => {
  let component: CostumerSurveyComponent;
  let fixture: ComponentFixture<CostumerSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostumerSurveyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostumerSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
