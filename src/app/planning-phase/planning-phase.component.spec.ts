import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningPhaseComponent } from './planning-phase.component';
import { Router } from '@angular/router';
import { GameService } from "../game.service";
import { Game } from '../game';

describe('PlanningPhaseComponent', () => {
  let component: PlanningPhaseComponent;
  let fixture: ComponentFixture<PlanningPhaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlanningPhaseComponent],
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
    fixture = TestBed.createComponent(PlanningPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it sets the default data', () => {
    expect(component.drawing).toBe(false);
    expect(component.rowNum).toBe(0);
    expect(component.colNum).toBe(0);
    expect(component.shipNum).toBe(0);
    expect(component.grid.length).toBe(10);
    expect(component.playerBoard.length).toBe(10);
    expect(component.shipList.length).toBeGreaterThan(0);
    expect(component.selectedShip).toBe('Carrier');
  });

  it('returns correct color for changeColor() on valid input', () => {
    expect(component.changeColor('c')).toBe('green');
    expect(component.changeColor('b')).toBe('blue');
    expect(component.changeColor('')).toBe('#eaeaea');
  });

  it('returns the default color on invalid input for changeColor()', () => {
    expect(component.changeColor('Dvdfgadrgergearg')).toBe('#eaeaea');
    expect(component.changeColor('.*%^&%*&^%*&')).toBe('#eaeaea');
    expect(component.changeColor('324234234')).toBe('#eaeaea');
  });

  it('returns invalid position for any drawShipDownVertical()', () => {
    expect(component.drawShipDownVertical(10, 10, 3)).toBe('Invalid position');
    expect(component.drawShipDownVertical(-10, -10, 3)).toBe('Invalid position');
  });

  it('returns invalid position for any drawShipDownHorizontal()', () => {
    expect(component.drawShipDownHorizontal(10, 10, 3)).toBe('Invalid position');
    expect(component.drawShipDownHorizontal(-10, -10, 3)).toBe('Invalid position');
  });

  it('returns invalid position for any drawShipUpVertical()', () => {
    expect(component.drawShipUpVertical(0, 0, 3)).toBe('Invalid position');
    expect(component.drawShipUpVertical(-10, -10, 3)).toBe('Invalid position');
  });

  it('returns invalid position for any drawShipUpHorizontal()', () => {
    expect(component.drawShipUpHorizontal(0, 0, 3)).toBe('Invalid position');
    expect(component.drawShipUpHorizontal(-10, -10, 3)).toBe('Invalid position');
  });

  it('returns invalid position for any drawShipLeftVertical()', () => {
    expect(component.drawShipLeftVertical(0, 0, 3)).toBe('Invalid position');
    expect(component.drawShipLeftVertical(-10, -10, 3)).toBe('Invalid position');
  });

  it('returns invalid position for any drawShipLeftHorizontal()', () => {
    expect(component.drawShipLeftHorizontal(0, 0, 3)).toBe('Invalid position');
    expect(component.drawShipLeftHorizontal(-10, -10, 3)).toBe('Invalid position');
  });

  it('returns invalid position for any drawShipRightVertical()', () => {
    expect(component.drawShipRightVertical(10, 10, 3)).toBe('Invalid position');
    expect(component.drawShipRightVertical(-10, -10, 3)).toBe('Invalid position');
  });

  it('returns invalid position for any drawShipRightHorizontal()', () => {
    expect(component.drawShipRightHorizontal(10, 10, 3)).toBe('Invalid position');
    expect(component.drawShipRightHorizontal(-10, -10, 3)).toBe('Invalid position');
  });
});
