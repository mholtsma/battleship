import { Injectable } from '@angular/core';
import { Game } from './game';

@Injectable()
export class GameService {
  game: Game;

  constructor() { }

  putPlayerNames(name1: string, name2: string) {
    this.game.player1Name = name1;
    this.game.player2Name = name2;
  }

  getPlayerNames() {
    return { 'name1': this.game.player1Name, 'name2': this.game.player2Name }
  }
}
