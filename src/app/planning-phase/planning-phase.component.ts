import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from "../game.service";
import { Game } from '../game';

@Component({
  selector: 'app-planning-phase',
  templateUrl: './planning-phase.component.html',
  styleUrls: ['./planning-phase.component.css']
})
export class PlanningPhaseComponent implements OnInit {
  gameObject: Game;
  playerName: string;
  grid: any;
  shipList: any;
  selectedShip: string;
  selectColor: string;
  rowNum: number;
  colNum: number;
  errorMessage: string;
  currentShipLength: number;
  isVertical: boolean;
  playerBoard: any;
  shipNum: number;
  drawing: boolean;
  player1Turn: boolean;
  shipLocations: Map<string, string>;

  constructor(private router: Router, private gameService: GameService) { }

  ngOnInit() {
    this.getCurrentTurn();
    this.getPlayerName();
    this.shipLocations = new Map<string, string>();
    this.drawing = false;
    this.rowNum = 0;
    this.shipNum = 0;
    this.colNum = 0;
    this.grid = [
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ];
    this.playerBoard = [
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ];
    this.shipList = ['Carrier', 'Battleship', 'Cruiser', 'Submarine', 'Destroyer'];
    this.selectedShip = this.shipList[this.shipNum];
  }

  getPlayerName() {
    if (this.player1Turn === true) {
      this.gameService.getPlayer1Name()
        .subscribe(result => {
          console.log(result);
          this.playerName = result;
        });
    } else {
      this.gameService.getPlayer2Name()
        .subscribe(result => {
          console.log(result);
          this.playerName = result;
        });
    }
  }

  getCurrentTurn() {
    this.gameService.getCurrentTurn()
      .subscribe(result => {
        console.log(result);
        this.player1Turn = result;
      });
  }

  changeColor(value: string): string {
    switch (value) {
      case 'c':
        return 'green';
      case 'b':
        return 'blue';
      default:
        return '#eaeaea';
    }
  }

  putShip(i: number, j: number) {
    switch (this.selectedShip) {
      case 'Carrier':
        this.drawing = true;
        this.currentShipLength = 5;
        this.removeColors(this.rowNum, this.colNum);
        this.isVertical = true;
        this.errorMessage = this.drawShipDownVertical(i, j, this.currentShipLength);
        console.log(this.errorMessage);
        break;
      case 'Battleship':
        this.drawing = true;
        this.currentShipLength = 4;
        this.removeColors(this.rowNum, this.colNum);
        this.isVertical = true;
        this.errorMessage = this.drawShipDownVertical(i, j, this.currentShipLength);
        console.log(this.errorMessage);
        break;
      case 'Cruiser':
        this.drawing = true;
        this.currentShipLength = 3;
        this.removeColors(this.rowNum, this.colNum);
        this.isVertical = true;
        this.errorMessage = this.drawShipDownVertical(i, j, this.currentShipLength);
        console.log(this.errorMessage);
        break;
      case 'Submarine':
        this.drawing = true;
        this.currentShipLength = 3;
        this.removeColors(this.rowNum, this.colNum);
        this.isVertical = true;
        this.errorMessage = this.drawShipDownVertical(i, j, this.currentShipLength);
        console.log(this.errorMessage);
        break;
      case 'Destroyer':
        this.drawing = true;
        this.currentShipLength = 2;
        this.removeColors(this.rowNum, this.colNum);
        this.isVertical = true;
        this.errorMessage = this.drawShipDownVertical(i, j, this.currentShipLength);
        console.log(this.errorMessage);
        break;
      default:
        break;
    }
  }

  drawShipDownVertical(i: number, j: number, shipLength: number) {
    this.rowNum = i;
    this.colNum = j;
    for (var x = 0; x < shipLength; x++){
      if (i + shipLength < this.grid.length && i >= 0 && j >= 0) {
        if (this.grid[i + x + 1][j] === 'b'){
          this.grid[i + x + 1][j] = 'b';
        } else {
          this.grid[i + x + 1][j] = 'c';
        }
      } else {
        this.rowNum = 0;
        this.colNum = 0;
        console.log('Invalid position');
        return 'Invalid position';
      }
    }
    this.rowNum += 1;
  }

  drawShipDownHorizontal(i: number, j: number, shipLength: number) {
    this.rowNum = i;
    this.colNum = j;
    for (var x = 0; x < shipLength; x++) {
      if (i + 1 < this.grid.length && i >= 0 && j >= 0) {
        if (this.grid[i + 1][j + x] === 'b'){
          this.grid[i + 1][j + x] = 'b';
        } else {
          this.grid[i + 1][j + x] = 'c';
        }
      } else {
        this.rowNum = 0;
        this.colNum = 0;
        console.log('Invalid position');
        return 'Invalid position';
      }
    }
    this.rowNum += 1;
  }

  drawShipUpVertical(i: number, j: number, shipLength: number) {
    this.rowNum = i;
    this.colNum = j;
    for (var x = 0; x < shipLength; x++) {
      if (i + shipLength <= this.grid.length && i >= 0 && j >= 0) {
        if (this.grid[i + x - 1][j] === 'b'){
          this.grid[i + x - 1][j] = 'b';
        } else {
          this.grid[i + x - 1][j] = 'c';
        }
      } else {
        this.rowNum = 0;
        this.colNum = 0;
        console.log('Invalid position');
        return 'Invalid position';
      }
    }
    this.rowNum -= 1;
  }

  drawShipUpHorizontal(i: number, j: number, shipLength: number) {
    this.rowNum = i;
    this.colNum = j;
    for (var x = 0; x < shipLength; x++) {
      if (i - 1 >= 0 && i >= 0 && j >= 0) {
        if (this.grid[i - 1][j + x] === 'b'){
          this.grid[i - 1][j + x] = 'b';
        } else {
          this.grid[i - 1][j + x] = 'c';
        }
      } else {
        this.rowNum = 0;
        this.colNum = 0;
        console.log('Invalid position');
        return 'Invalid position';
      }
    }
    this.rowNum -= 1;
  }

  drawShipLeftVertical(i: number, j: number, shipLength: number) {
    this.rowNum = i;
    this.colNum = j;
    for (var x = 0; x < shipLength; x++) {
      if (j - 1 >= 0 && i >= 0 && j >= 0) {
        if (this.grid[i][j - 1] === 'b'){
          this.grid[i][j - 1] = 'b';
        } else {
          this.grid[i][j - 1] = 'c';
        }
          i++;
      } else {
        this.rowNum = 0;
        this.colNum = 0;
        console.log('Invalid position');
        return 'Invalid position';
      }
    }
    this.colNum = this.colNum - 1;
  }

  drawShipLeftHorizontal(i: number, j: number, shipLength: number) {
    this.rowNum = i;
    this.colNum = j;
    for (var x = 0; x < shipLength; x++) {
      if (j - 1 >= 0 && i >= 0 && j >= 0) {
        if (this.grid[i][j + x - 1] === 'b'){
          this.grid[i][j + x - 1] = 'b';
        } else {
          this.grid[i][j + x - 1] = 'c';
        }
      } else {
        this.rowNum = 0;
        this.colNum = 0;
        console.log('Invalid position');
        return 'Invalid position';
      }
    }
    this.colNum = this.colNum - 1;
  }

  drawShipRightVertical(i: number, j: number, shipLength: number) {
    this.rowNum = i;
    this.colNum = j;
    for (var x = 0; x < shipLength; x++) {
      if (j + 1 <= this.grid.length - 1 && i >= 0 && j >= 0) {
        if (this.grid[i][j + 1] === 'b'){
          this.grid[i][j + 1] = 'b';
        } else {
          this.grid[i][j + 1] = 'c';
        }
          i++;
      } else {
        this.rowNum = 0;
        this.colNum = 0;
        console.log('Invalid position');
        return 'Invalid position';
      }
    }
    this.colNum += 1;
  }

  drawShipRightHorizontal(i: number, j: number, shipLength: number) {
    this.rowNum = i;
    this.colNum = j;
    for (var x = 0; x < shipLength; x++) {
      if (j + shipLength < this.grid.length && i >= 0 && j >= 0) {
        if (this.grid[i][j + x + 1] === 'b'){
          this.grid[i][j + x + 1] = 'b';
        } else {
          this.grid[i][j + x + 1] = 'c';
        }
      } else {
        this.rowNum = 0;
        this.colNum = 0;
        console.log('Invalid position');
        return 'Invalid position';
      }
    }
    this.colNum += 1;
  }

  rotateShip() {
    console.log(this.isVertical);
    this.removeColors(this.rowNum, this.colNum);
    this.rowNum = 0;
    this.colNum = 0;
    if (this.isVertical === true){
      this.isVertical = false;
      this.drawShipRightHorizontal(this.rowNum, this.colNum, this.currentShipLength)
    } else {
      this.isVertical = true;
      this.drawShipDownVertical(this.rowNum, this.colNum, this.currentShipLength)
    }
  }

  removeColors(i: number, j: number) {
    if (this.isVertical === true) {
      for (var x = this.currentShipLength - 1; i + x >= i; x--) {
        if (this.grid[i + x][j] === 'b') {
          this.grid[i + x][j] = 'b';
        } else {
          this.grid[i + x][j] = ' ';
        }
      }
    } else {
      for (var x = this.currentShipLength - 1; i + x >= i; x--) {
        if (this.grid[i][j + x] === 'b') {
          this.grid[i][j + x] = 'b';
        } else {
          this.grid[i][j + x] = ' ';
        }
      }
    }
  }

  setVerticalShip(i,j) {
    for (var x = 0; x < this.currentShipLength; x++) {
      if (this.playerBoard[i + x][j] === 'b') {
        return;
      }
    }
    for (var x = 0; x < this.currentShipLength; x++) {
      var tmp = i + x;
      var locationKey = tmp + ', ' + j;
      this.shipLocations.set(locationKey, this.selectedShip);
      this.playerBoard[i + x][j] = 'b';
      this.grid[i + x][j] = 'b';
    }
    this.shipNum += 1;
    this.selectedShip = this.shipList[this.shipNum];
    this.rowNum = 0;
    this.colNum = 0;
    this.gameService.putPlayerShipBoard(this.playerBoard)
      .subscribe(result => {
        console.log(result);
      });
  }

  setHorizontalShip(i, j) {
    for (var x = 0; x < this.currentShipLength; x++) {
      if (this.playerBoard[i][j + x] === 'b') {
        return;
      }
    }
    for (var x = 0; x < this.currentShipLength; x++) {
      var tmp = j + x;
      var locationKey = tmp + ', ' + i;
      this.shipLocations.set(locationKey, this.selectedShip);
      this.playerBoard[i][j + x] = 'b';
      this.grid[i][j + x] = 'b';
    }
    this.selectedShip = this.shipList[this.shipNum++];
    this.rowNum = 0;
    this.colNum = 0;
    this.gameService.putPlayerShipBoard(this.playerBoard)
      .subscribe(result => {
        console.log(result);
      });
  }

  setShip() {
    var i = this.rowNum;
    var j = this.colNum;
    if (this.isVertical === true) {
      this.setVerticalShip(i, j);
    } else {
      this.setHorizontalShip(i, j);
    }
    if (this.player1Turn === true) {
      if (this.shipNum === this.shipList.length) {
        this.gameService.putShipLocations(this.shipLocations)
          .subscribe(result => {
            console.log(result);
          });
        this.gameService.nextTurn()
          .subscribe(result => {
            console.log(result);
            this.router.navigate(['/planning-phase2']);
          });
      }
    } else {
      if (this.shipNum === this.shipList.length) {
        this.gameService.putShipLocations(this.shipLocations)
          .subscribe(result => {
            console.log(result);
          });
        this.gameService.nextTurn()
          .subscribe(result => {
            console.log(result);
            this.router.navigate(['/transition']);
          });
      }
    }
    this.drawing = false;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(event.key);
    this.moveShip(event);
  }

  moveShip(event: any) {
    if (this.drawing === true) {
      console.log(this.playerBoard)
      console.log(this.grid)
      switch (event.key) {
        case 'ArrowUp':
          this.removeColors(this.rowNum, this.colNum);
          if (this.isVertical == true) {
            this.errorMessage = this.drawShipUpVertical(this.rowNum, this.colNum, this.currentShipLength);
          } else {
            this.errorMessage = this.drawShipUpHorizontal(this.rowNum, this.colNum, this.currentShipLength);
          }
          break;
        case 'ArrowDown':
          this.removeColors(this.rowNum, this.colNum);
          if (this.isVertical == true) {
            this.errorMessage = this.drawShipDownVertical(this.rowNum, this.colNum, this.currentShipLength);
          } else {
            this.errorMessage = this.drawShipDownHorizontal(this.rowNum, this.colNum, this.currentShipLength);
          }
          break;
        case 'ArrowLeft':
          this.removeColors(this.rowNum, this.colNum);
          if (this.isVertical == true) {
            this.errorMessage = this.drawShipLeftVertical(this.rowNum, this.colNum, this.currentShipLength);
          } else {
            this.errorMessage = this.drawShipLeftHorizontal(this.rowNum, this.colNum, this.currentShipLength);
          }
          break;
        case 'ArrowRight':
          this.removeColors(this.rowNum, this.colNum);
          if (this.isVertical == true) {
            this.errorMessage = this.drawShipRightVertical(this.rowNum, this.colNum, this.currentShipLength);
          } else {
            this.errorMessage = this.drawShipRightHorizontal(this.rowNum, this.colNum, this.currentShipLength);
          }
          break;
        case ' ':
          console.log('space');
          this.rotateShip();
          break;
        case 'Enter':
          console.log('enter');
          this.setShip();
          break;
        default:
          break;
      }
    }
  }
}
