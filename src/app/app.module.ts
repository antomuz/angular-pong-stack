import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';

import { AppComponent } from './app.component';
import { JeuComponent } from './jeu/jeu.component';
import { LeaderBoardComponent } from './leader-board/leader-board.component';
import { PreloadingStrategy } from '@angular/router';
import { PieceComponent } from './piece/piece.component';
import { PlayerComponent } from './player/player.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    JeuComponent,
    LeaderBoardComponent,
    PieceComponent,
    PlayerComponent,
  ],
  imports: [
    MatButtonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
