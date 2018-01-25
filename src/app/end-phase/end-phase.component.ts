import { Component, OnInit } from '@angular/core';
import { GameService } from "../game.service";

@Component({
  selector: 'app-end-phase',
  templateUrl: './end-phase.component.html',
  styleUrls: ['./end-phase.component.css']
})
export class EndPhaseComponent implements OnInit {
  playerName: string;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.getCurrentTurn()
      .subscribe(result => {
        console.log(result);
        if (result === true) {
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
      });
  }

}
