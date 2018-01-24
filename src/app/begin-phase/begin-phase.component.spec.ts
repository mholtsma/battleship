import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeginPhaseComponent } from './begin-phase.component';

describe('BeginPhaseComponent', () => {
  let component: BeginPhaseComponent;
  let fixture: ComponentFixture<BeginPhaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeginPhaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeginPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
