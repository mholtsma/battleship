import { Component, OnInit } from '@angular/core';
import { GameService } from './game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name1: string;
  name2: string;


  constructor(private gameService: GameService) { }

  ngOnInit() {
    var playerNames = this.gameService.getPlayerNames();
    this.name1 = playerNames.name1;
    this.name2 = playerNames.name2;
  }

  startGame(player1Name: string, player2Name:string) {
    if (player1Name && player2Name) {
      this.gameService.putPlayerNames(player1Name, player2Name);
    }
  }
}
