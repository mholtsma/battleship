import { Injectable } from '@angular/core';
import { Game } from './game';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class GameService {
  //game: Game;
  constructor(private game: Game) { }

  putPlayerNames(gameObject: Game): Observable<string> {
    console.log(gameObject);
    this.game.player1Name = gameObject.player1Name;
    this.game.player2Name = gameObject.player2Name;
    return of ('success');
  }

  getPlayerNames(): Observable<Game> {
    return of({ player1Name: this.game.player1Name, player2Name: this.game.player2Name });
  }

  putPlayerBoard(gameBoard: Array<Array<string>>): Observable<string> {
    if (this.game.isPlayer1Turn === true) {
      this.game.player1Board = gameBoard;
    } else {
      this.game.player2Board = gameBoard;
    }
    return of('success');
  }

  getPlayer1Board(): Observable<Game> {
    return of({ player1Board: this.game.player1Board })
  }

  getPlayer2Board(): Observable<Game> {
    return of({ player2Board: this.game.player2Board })
  }

  nextTurn(): Observable<string> {
    if (this.game.isPlayer1Turn === true) {
      this.game.isPlayer1Turn = false;
    } else {
      this.game.isPlayer1Turn = true;
    }
    return of('success');
  }

  getCurrentTurn(): Observable<boolean> {
    return of(this.game.isPlayer1Turn);
  }
}
