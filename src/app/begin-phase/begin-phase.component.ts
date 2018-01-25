import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GameService } from "../game.service";
import { Game } from '../game';

@Component({
  selector: 'app-begin-phase',
  templateUrl: './begin-phase.component.html',
  styleUrls: ['./begin-phase.component.css']
})
export class BeginPhaseComponent implements OnInit {

  name1: string;
  name2: string;
  gameObject: Game;

  constructor(private gameService: GameService, private router: Router) { }

  ngOnInit() {
  }

  startGame(player1Name: string, player2Name: string) {
    if (player1Name && player2Name) {
      this.gameService.putPlayerNames({ player1Name, player2Name } as Game)
        .subscribe(result => {
          console.log(result);
          this.router.navigate(['/planning-phase1']);
        });
    }
  }

}
