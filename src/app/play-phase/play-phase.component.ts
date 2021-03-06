import { Component, OnInit } from '@angular/core';
import { GameService } from "../game.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-play-phase',
  templateUrl: './play-phase.component.html',
  styleUrls: ['./play-phase.component.css']
})
export class PlayPhaseComponent implements OnInit {
  //The fire grid is the grid on which players will
  //select where to try to hit the other player's ship
  fireGrid: Array<Array<string>>;
  //The ship grid shows where the current players ships
  //are in relation to where the other player has fired
  shipGrid: Array<Array<string>>;
  isPlayer1Turn: boolean;
  rowNum: number;
  colNum: number;
  playerName: string;
  afterFireMsg: string;
  shotTaken: boolean;


  constructor(private gameService: GameService, private router: Router) { }

  ngOnInit() {
    this.setUpTurn();
    this.shotTaken = false;
    this.afterFireMsg = '';
  }

  //function that will be called at the beginning
  //of every turn to set up the view for the player
  setUpTurn() {
    this.gameService.setUpTurn()
      .subscribe(result => {
        console.log(result);
        this.shipGrid = result.shipBoard;
        this.fireGrid = result.fireBoard;
        this.playerName = result.playerName;
        this.isPlayer1Turn = result.isPlayer1Turn;
      });
  }

  changeColor(value: string) {
    switch (value) {
      case 'f':
        return 'red';
      case 'b':
        return 'blue';
      case 'm':
        return 'yellow';
      default:
        return '#eaeaea';
    }
  }

  sendAttack(i: number, j: number) {
    if (this.shotTaken === false) {
      this.gameService.calculateHit(i, j)
        .subscribe(result => {
          console.log(result);
          this.calculateHit(i, j, result);
        });
    }
  }

  calculateHit(i: number, j:number, result: string) {
    switch (result) {
      case 'win':
        this.router.navigate(['/end-phase']);
        break;
      case 'hit':
        this.fireGrid[i][j] = 'f';
        this.afterFireMsg = 'Ship Hit!';
        this.shotTaken = true;
        break;
      case 'sunk':
        this.fireGrid[i][j] = 'f';
        this.afterFireMsg = 'Ship Sunk!';
        this.shotTaken = true;
        break;
      case 'miss':
        this.fireGrid[i][j] = 'm';
        this.afterFireMsg = 'Miss!';
        this.shotTaken = true;
        break;
      case 'already taken':
        this.afterFireMsg = 'You Have Already Fired There!';
        break;
      default:
        break;
    }
  }

  endTurn() {
    this.nextTurn();
  }

  putFireBoard() {
    this.gameService.putPlayerFireBoard(this.fireGrid)
      .subscribe(result => {
        console.log(result);
      });
  }

  nextTurn() {
    this.putFireBoard();
    this.gameService.nextTurn()
      .subscribe(result => {
        console.log(result);
        this.router.navigate(['/transition']);
      });
  }

}
