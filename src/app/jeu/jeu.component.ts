import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from '../app.component';
import { LeaderBoardComponent } from '../leader-board/leader-board.component';
import { Circle, Rectangle } from '../piece/piece.component';
import { Player } from '../player/player.component';


@Component({
  selector: 'app-jeu',
  templateUrl: './jeu.component.html',
  styleUrls: ['./jeu.component.css']
})
export class JeuComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  circles: Circle[] = [];
  rect1: Rectangle;
  rect2: Rectangle;
  menu: number;
  scoreP1: number;
  scoreP2: number;
  losePoint: number;
  posY: number;
  player: Player;
  PLayersOrdered : Player[];

  constructor(private app: AppComponent) {
  }

  ngOnInit() {

    this.menu = 0;
    this.posY = 0;

    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = 'white';

    this.rect1 = new Rectangle(this.ctx, 45);
    this.rect2 = new Rectangle(this.ctx, 1020);

    this.scoreP1 = 0;
    this.scoreP2 = 0;
    this.losePoint = 3;

    setInterval(() => {
      this.tick();
    }, 20);
  }


  tick() {

    if (this.menu == 0){
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.menuPrincipal()
    }

    if (this.menu == 1){
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.ligneSep();


      this.circles.forEach((circle: Circle) => {
        circle.movement();
        circle.setRectYD(this.rect1.getY());
        circle.setRectYG(this.rect2.getY());
      });


      this.rect1.followPosY(this.posY);

      this.rect2.setBally(this.circles[0].getY());
      this.rect2.follow();



      if (this.circles[0].getX() > 1110) {
        this.scoreP1 = this.scorePoint(this.scoreP1);
        const circle = new Circle(this.ctx);
        this.circles[0] = circle;
      }

      if (this.circles[0].getX() < -30) {
        this.scoreP2 = this.scorePoint(this.scoreP2);
        const circle = new Circle(this.ctx);
        this.circles[0] = circle;
      }

      this.ecrireMot(this.scoreP1, 270, 30, 30);
      this.ecrireMot(this.scoreP2, 810, 30, 30);

      if (this.scoreP2 == this.losePoint){
        this.menu = 2;
      }
    }

    if (this.menu == 2) {
      let playerName = this.app.name.value;
      let playerScore = this.scoreP1

      this.menuGameOver();


      localStorage.setItem(playerName,playerName)
      if (this.ConvertStringToNumber(localStorage.getItem("score"+playerName)) < playerScore) {
        localStorage.removeItem("score"+playerName);
        localStorage.setItem("score"+playerName,this.ConvertNumberTostring(playerScore))

        this.app.Players.forEach(e => {
          if (e.getName() == playerName) {
            e.setScore(playerScore);
          }
        });
      }
    }
  }

  menuPrincipal () {
    this.ctx.font = '80px serif';
    this.ctx.fillText('Pong', 540, 360);
    this.ctx.font = '20px serif';
    this.ctx.fillText('click on the screen to lauch the game', 540, 420);
  }

  ligneSep() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'white';
    this.ctx.setLineDash([12, 25]);
    this.ctx.moveTo(540, 0);
    this.ctx.lineTo(540, 720);
    this.ctx.stroke();
  }

  menuGameOver () {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ecrireMot("you scored " + this.scoreP1 + " points", 540, 360, 50);
  }

  animate() {
    if (this.menu != 0)
      return ;
    const circle = new Circle(this.ctx);
    this.circles[0] = circle;
    this.menu = 1;
  }

  trackPosY (e) {
    this.posY = e.offsetY;
  }

  ecrireMot (phrase, x:number, y:number, t:number) {
    this.ctx.font = (t+'px serif');
    this.ctx.fillText(phrase, x, y);
  }

  scorePoint(scorePlayer : number) : number {
    const circle = new Circle(this.ctx);
    scorePlayer ++;
    this.circles[0] = circle;
    this.circles[0].setMoveX(-this.circles[0].getMoveX())
    this.circles[0].setMoveY(0);
    return scorePlayer;
  }

  ConvertNumberTostring(input: number) {
    return String(input);
  }

  ConvertStringToNumber(input: string) {
    if (!input) return NaN;

    if (input.trim().length==0) {
      return NaN;
    }
    return Number(input);
  }

  reload () {
    this.menu = 0;
    this.scoreP1 = 0;
    this.scoreP2 = 0;
  }
}
