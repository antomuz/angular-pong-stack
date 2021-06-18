import { Component, OnInit } from '@angular/core';
import {Player} from '../player/player.component';
import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.css']
})
export class LeaderBoardComponent implements OnInit {
  private Players: Player[]
  PLayersOrdered : Player[];

  constructor(private app: AppComponent) { }

  ngOnInit(): void {
    this.Players = this.app.getplayers();

    this.PLayersOrdered = this.Players.sort(this.compare);
  }

  compare( a, b ) {
    if ( a.score > b.score ){
      return -1;
    }
    if ( a.score < b.score ){
      return 1;
    }
    return 0;
  }


}
