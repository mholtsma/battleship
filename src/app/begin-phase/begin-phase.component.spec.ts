import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeginPhaseComponent } from './begin-phase.component';
import { Router } from '@angular/router';
import { GameService } from "../game.service";
import { Game } from '../game';

describe('BeginPhaseComponent', () => {
  let component: BeginPhaseComponent;
  let fixture: ComponentFixture<BeginPhaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BeginPhaseComponent],
      providers: [
        {
          provide: GameService,
        useValue: {},
        },
        {
          provide: Router,
          useValue: {},
        }
      ]  
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


