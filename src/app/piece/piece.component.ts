import { ThrowStmt } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Injectable, OnInit } from '@angular/core';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.css']
})
export class PieceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

export class Rectangle {
  private color = "white"
  private height = 80;
  private width = 15;
  private y = 360;
  private x;
  private moveY = 6;

  private ballY = 360;

  constructor(private ctx: CanvasRenderingContext2D, x : number) {
    this.x = x;
  }

  follow(){
    if (this.y + 45 < this.ballY + 30) {
      this.y += this.moveY;
    }
    if (this.y + 45 > this.ballY - 30) {
      this.y -= this.moveY;
    }

    this.draw();
  }


  public draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y + 10, this.width, this.height);
    this.ctx.fill()
  }

  public getY () : number {
    return this.y;
  }
  public getBorderRight () : number {
    return (this.x + this.width);
  }
  public getHeight () : number {
    return this.height;
  }

  public followPosY (y :number){
    this.y = y;
    this.draw();
  }

  public setBally (Bally : number){
    this.ballY = Bally;
  }
}


export class Circle {
  private color = "white"
  private x = 540;
  private y = 360;
  private z = 30;
  private moveY = this.getRandomInt(-3,3);
  private moveX = 8;

  private rectYD;
  private rectYG;



  constructor(private ctx: CanvasRenderingContext2D) {}

  movement() {
    this.bounce();
    this.y+=this.moveY;

    this.draw();
  }

  private draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.z/2, 0, 2 * Math.PI);
    this.ctx.fill()
  }

  private bounce() {
    let maxX = this.ctx.canvas.width;
    let maxY = this.ctx.canvas.height;

    this.x+=this.moveX;

    if (this.y >= maxY-15 || this.y < 15){
      this.moveY = -this.moveY;
    }

    if (this.x == 60 && this.y >= this.rectYD && this.y <= this.rectYD + 100){
      this.moveX = -this.moveX;
      this.moveY = ((this.y - this.rectYD)/6.25) - 8;
    }
    if (this.x == 1020 && this.y >= this.rectYG && this.y <= this.rectYG + 100){
      this.moveX = -this.moveX;
      this.moveY = ((this.y - this.rectYG)/6.25) - 8;
    }
  }

  private getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  public getY() {
    return this.y;
  }
  public getX() {
    return this.x;
  }
  public getMoveX(){
    return this.moveX;
  }

  public setMoveY(moveY: number) {
    this.moveY = moveY;
  }
  public setMoveX(moveX: number) {
    this.moveX = moveX;
  }
  public setRectYD(Recty : number) {
    this.rectYD = Recty;
  }
  public setRectYG(Recty : number) {
    this.rectYG = Recty;
  }
}
