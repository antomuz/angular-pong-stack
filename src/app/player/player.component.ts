import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

export class Player {
  private name;
  private score;

  constructor(name, score){
    this.name = name;
    this.score = score;
  }

  public getName () {
    return this.name
  }

  public getScore () {
    return this.score
  }

  public setScore (score) {
    this.score = score;
  }


}
