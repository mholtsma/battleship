import { TestBed, inject } from '@angular/core/testing';

import { GameService } from './game.service';
import { Game } from "./game";

describe('GameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({  
      providers: [GameService, Game],
    });
  });

  it('should be created', inject([GameService], (service: GameService) => {
    expect(service).toBeTruthy();
  }));
});
