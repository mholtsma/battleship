import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningPhaseComponent } from './planning-phase.component';

describe('PlanningPhaseComponent', () => {
  let component: PlanningPhaseComponent;
  let fixture: ComponentFixture<PlanningPhaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanningPhaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
