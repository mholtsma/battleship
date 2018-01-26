import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayPhaseComponent } from './play-phase.component';
import { Router } from '@angular/router';
import { GameService } from "../game.service";
import { Game } from "../game";

describe('PlayPhaseComponent', () => {
  let component: PlayPhaseComponent;
  let fixture: ComponentFixture<PlayPhaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlayPhaseComponent],
      providers: [GameService, Game,
        {
          provide: Router,
          useValue: {}, 
        }
      ] 
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

  it('sets default data', () => {
    expect(component.afterFireMsg).toBe('');
    expect(component.shotTaken).not.toBeTruthy();
  });

  it('returns correct color for changeColor() on valid input', () => {
    expect(component.changeColor('f')).toBe('red');
    expect(component.changeColor('m')).toBe('yellow');
    expect(component.changeColor('b')).toBe('blue');
    expect(component.changeColor('')).toBe('#eaeaea');
  });

  it('returns the default color on invalid input for changeColor()', () => {
    expect(component.changeColor('Dvdfgadrgergearg')).toBe('#eaeaea');
    expect(component.changeColor('.*%^&%*&^%*&')).toBe('#eaeaea');
    expect(component.changeColor('324234234')).toBe('#eaeaea');
  });
});


