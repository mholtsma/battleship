import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { GameService } from './game.service';
import { BeginPhaseComponent } from './begin-phase/begin-phase.component';
import { PlanningPhaseComponent } from './planning-phase/planning-phase.component';
import { PlayPhaseComponent } from './play-phase/play-phase.component';
import { EndPhaseComponent } from './end-phase/end-phase.component';
import { Game } from "./game";

const appRoutes: Routes = [
  { path: 'begin-phase', component: BeginPhaseComponent },
  { path: 'planning-phase1', component: PlanningPhaseComponent },
  { path: 'planning-phase2', component: PlanningPhaseComponent },
  { path: 'play-phase', component: PlayPhaseComponent },
  { path: 'end-phase', component: EndPhaseComponent },
  { path: '', redirectTo: '/begin-phase', pathMatch: 'full' },
];


@NgModule({
  declarations: [
    AppComponent,
    BeginPhaseComponent,
    PlanningPhaseComponent,
    PlayPhaseComponent,
    EndPhaseComponent
  ],
  imports: [RouterModule.forRoot(
    appRoutes,
    { enableTracing: true } // <-- debugging purposes only
  ),
    BrowserModule
  ],
  providers: [GameService, Game],
  bootstrap: [AppComponent]
})
export class AppModule { }
