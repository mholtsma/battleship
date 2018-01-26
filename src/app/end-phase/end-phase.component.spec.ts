import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndPhaseComponent } from './end-phase.component';
import { GameService } from "../game.service";
import { Game } from "../game";

describe('EndPhaseComponent', () => {
  let component: EndPhaseComponent;
  let fixture: ComponentFixture<EndPhaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EndPhaseComponent],
      providers: [GameService, Game] 
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
