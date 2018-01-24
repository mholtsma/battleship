import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayPhaseComponent } from './play-phase.component';

describe('PlayPhaseComponent', () => {
  let component: PlayPhaseComponent;
  let fixture: ComponentFixture<PlayPhaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayPhaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
