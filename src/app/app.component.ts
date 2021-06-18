import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Player } from '../app/player/player.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],


})
export class AppComponent{
  title = "PONG";
  public dispJeu : boolean = false;
  public dispLB : boolean = false;
  public hideregister : boolean = false;

  public disabledispJeu : boolean = !this.dispJeu;
  public disabledispLB  : boolean = !this.dispLB;

  public name = new FormControl('');


  Players : Player[] = [
    new Player ("AAA", 50),
    new Player ("OBR", 40),
    new Player ('DOC', 30),
    new Player ('PSY', 25),
    new Player ('LOL', 22),
    new Player ('GWE', 17),
    new Player ('WIZ', 13),
    new Player ('PUF', 10),
    new Player ('JES', 7),
    new Player ('KRO', 5)
  ]

  public launchGame(){
    localStorage.setItem(this.name.value, this.name.value)
    if(localStorage.getItem("score"+this.name.value)  == null) {
      localStorage.setItem("score"+this.name.value, this.ConvertNumberTostring(0))
    }
    this.Players.push(new Player(localStorage.getItem(this.name.value), localStorage.getItem("score"+this.name.value)))

    this.hideregister = !this.hideregister;
    this.disabledispLB = !this.disabledispLB;
    this.dispJeu = !this.dispJeu;
  }

  public getplayers () {
    return this.Players;
  }

  public display(): void {
    this.dispJeu = !this.dispJeu;
    this.dispLB = !this.dispLB;

    this.disabledispJeu = !this.disabledispJeu;
    this.disabledispLB = !this.disabledispLB;
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

  ConvertNumberTostring(input: number) {
    return String(input);
  }

}
