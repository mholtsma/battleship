import { Injectable } from '@angular/core';
import { Game, PlayerTurnInfo } from './game';
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

  getPlayer1Name(): Observable<string> {
    return of(this.game.player1Name);
  }

  getPlayer2Name(): Observable<string> {
    return of(this.game.player2Name);
  }

  putPlayerShipBoard(gameBoard: Array<Array<string>>): Observable<string> {
    if (this.game.isPlayer1Turn === true) {
      this.game.player1ShipBoard = gameBoard;
    } else {
      this.game.player2ShipBoard = gameBoard;
    }
    return of('success');
  }

  putPlayerFireBoard(gameBoard: Array<Array<string>>): Observable<string> {
    if (this.game.isPlayer1Turn === true) {
      this.game.player1FireBoard = gameBoard;
    } else {
      this.game.player2FireBoard = gameBoard;
    }
    return of('success');
  }

  //function returns what is necessary for a players turn to proceed
  setUpTurn(): Observable<PlayerTurnInfo> {
    if (this.game.isPlayer1Turn === true) {
      return of({
        playerName: this.game.player1Name,
        shipBoard: this.game.player1ShipBoard,
        fireBoard: this.game.player1FireBoard,
        isPlayer1Turn: this.game.isPlayer1Turn
      })
    } else {
      return of({
        playerName: this.game.player2Name,
        shipBoard: this.game.player2ShipBoard,
        fireBoard: this.game.player2FireBoard,
        isPlayer1Turn: this.game.isPlayer1Turn
      })
    }
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

  calculateHit(i: number, j: number): Observable<string> {
    var rtnString;
    if (this.game.isPlayer1Turn === true) {
      rtnString = this.checkShipBoard(i, j, this.game.player2ShipBoard);
      if (rtnString === 'hit') {
        var ship = this.game.player1ShipLocations.get(i + ', ' + j);
        if (this.game.player1ShipCounters[ship]){
          this.game.player1ShipCounters[ship]++;
        } else {
          this.game.player1ShipCounters[ship] = 1;
        }
        this.game.player1HitCounter += 1;
        if (this.game.player1HitCounter === 17) {
          return of('win');
        }
        if (this.checkIfSunk(this.game.player1ShipCounters[ship], ship) === 'sunk') {
          return of('sunk');
        }
      }
      return of(rtnString);
    } else {
      rtnString = this.checkShipBoard(i, j, this.game.player1ShipBoard);
      if (rtnString === 'hit') {
        var ship = this.game.player2ShipLocations.get(i + ', ' + j);
        if (this.game.player2ShipCounters[ship]) {
          this.game.player2ShipCounters[ship]++;
        } else {
          this.game.player2ShipCounters[ship] = 1;
        }
        this.game.player2HitCounter += 1;
        if (this.game.player2HitCounter === 17) {
          return of('win');
        }
        if (this.checkIfSunk(this.game.player2ShipCounters[ship], ship) === 'sunk') {
          return of('sunk');
        }
      }
      return of(rtnString);
    }
  }

  checkIfSunk(hitCount: number, ship: string): string {
    switch(ship) {
      case 'Carrier':
        if (hitCount === 5){
          return 'sunk';
        }
        break;
      case 'Battleship':
        if (hitCount === 4) {
          return 'sunk';
        }
        break;
      case 'Cruiser':
        if (hitCount === 3) {
          return 'sunk';
        }
        break;
      case 'Submarine':
        if (hitCount === 3) {
          return 'sunk';
        }
        break;
      case 'Destroyer':
        if (hitCount === 2) {
          return 'sunk';
        }
        break;
      default:
        break;
    }
  }

  checkShipBoard(i: number, j: number, shipBoard: Array<Array<string>>) {
    if (shipBoard[i][j] === 'f' || shipBoard[i][j] === 'm') {
      return 'already taken';
    } else {
      if (shipBoard[i][j] === 'b') {
        shipBoard[i][j] = 'f';

        return 'hit';
      } else {
        shipBoard[i][j] = 'm';
        return 'miss'
      }
    }
  }

  putShipLocations(locations: Map<string, string>): Observable<string> {
    if (this.game.isPlayer1Turn === true) {
      this.game.player1ShipLocations = locations;
    } else {
      this.game.player2ShipLocations = locations;
    }
    return of('success')
  }
}
