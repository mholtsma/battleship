import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseTransitionComponent } from './phase-transition.component';

describe('PhaseTransitionComponent', () => {
  let component: PhaseTransitionComponent;
  let fixture: ComponentFixture<PhaseTransitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhaseTransitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseTransitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
