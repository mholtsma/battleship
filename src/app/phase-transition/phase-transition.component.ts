import { Component, OnInit } from '@angular/core';
import { GameService } from "../game.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-phase-transition',
  templateUrl: './phase-transition.component.html',
  styleUrls: ['./phase-transition.component.css']
})
export class PhaseTransitionComponent implements OnInit {
  playerName: string;
  isPlayer1Turn: boolean;

  constructor(private gameService: GameService, private router: Router) { }

  ngOnInit() {
    this.gameService.getCurrentTurn()
      .subscribe(result => {
        console.log(result);
        this.isPlayer1Turn = result;
        if (this.isPlayer1Turn === true) {
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

  goToPlayPhase() {
    if (this.isPlayer1Turn === true) {
      this.router.navigate(['/play-phase1']);
    } else {
      this.router.navigate(['/play-phase2']);
    }
  }

}
