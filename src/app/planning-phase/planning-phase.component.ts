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
  name1: string;
  name2: string;
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
  currentTurn: boolean;

  constructor(private router: Router, private gameService: GameService) { }

  ngOnInit() {
    this.drawing = false;
    this.rowNum = 0;
    this.shipNum = 0;
    this.colNum = 0;
    this.getNames();
    this.name1 = this.gameObject.player1Name;
    this.name2 = this.gameObject.player2Name;
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

  getNames(): void {
    this.gameService.getPlayerNames()
      .subscribe(gameObject => this.gameObject = gameObject);
  }

  goToEndPhase() {
    this.router.navigate(['end-phase']);
  }

  changeColor(value: string) {
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
      if (i + shipLength < this.grid.length) {
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
      if (i + 1 < this.grid.length) {
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
      if (i + shipLength <= this.grid.length) {
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
      if (i - 1 >= 0) {
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
      if (j - 1 >= 0) {
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
      if (j - 1 >= 0) {
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
      if (j + 1 <= this.grid.length - 1) {
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
      if (j + shipLength < this.grid.length) {
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

  setShip() {
    var i = this.rowNum;
    var j = this.colNum;
    if (this.isVertical === true) {
      for (var x = 0; x < this.currentShipLength; x++) {
        if (this.playerBoard[i + x][j] === 'b') {
          return;
        } 
      }
      for (var x = 0; x < this.currentShipLength; x++) {
        this.playerBoard[i + x][j] = 'b';
        this.grid[i + x][j] = 'b';
      }
      this.shipNum += 1;
      this.selectedShip = this.shipList[this.shipNum];
      this.rowNum = 0;
      this.colNum = 0;
      this.gameService.putPlayerBoard(this.playerBoard)
        .subscribe(result => {
          console.log(result);
        });
    } else {
      for (var x = 0; x < this.currentShipLength; x++) {
        if (this.playerBoard[i][j + x] === 'b') {
          return;
        }
      }
      for (var x = 0; x < this.currentShipLength; x++) {
        this.playerBoard[i][j + x] = 'b';
        this.grid[i][j+x] = 'b';
      }
      this.selectedShip = this.shipList[this.shipNum++];
      this.rowNum = 0;
      this.colNum = 0;
      this.gameService.putPlayerBoard(this.playerBoard)
        .subscribe(result => {
          console.log(result);
        });
    }
    this.gameService.getCurrentTurn()
      .subscribe(result => {
        console.log(result);
        this.currentTurn = result;
      });
    if (this.shipNum === this.shipList.length - 1) {
      this.gameService.nextTurn()
        .subscribe(result => {
          console.log(result);
          this.router.navigate(['/planning-phase2']);
        });
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
