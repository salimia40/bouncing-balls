import { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import Canvas from './Canvas'
import useWindowSize from './useWindowsSize'
import useMousePosition from './useMousePosition'

var grav = 0.99;

function randomColor() {
  return (
    "rgba(" +
    Math.round(Math.random() * 250) +
    "," +
    Math.round(Math.random() * 250) +
    "," +
    Math.round(Math.random() * 250) +
    "," +
    Math.ceil(Math.random() * 10) / 10 +
    ")"
  );
}

class Ball {
  color: string;
  radius: number;
  startradius: number;
  x: number;
  y: number;
  dy: number;
  dx: number;
  vel: number;

  constructor(
    tx: number,
    ty: number
  ) {
    this.color = randomColor();
    this.radius = Math.random() * 20 + 14;
    this.startradius = this.radius;
    this.x = Math.random() * (tx - this.radius * 2) + this.radius;
    this.y = Math.random() * (ty - this.radius * 2);
    this.dy = Math.random() * 2;
    this.dx = Math.round((Math.random() - 0.5) * 10);
    this.vel = Math.random() / 5;
  }

  update(c: CanvasRenderingContext2D, tx: number, ty: number,
    mouseX: number, mouseY: number) {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    c.fillStyle = this.color;
    c.fill();

    this.y += this.dy;
    this.x += this.dx;
    if (this.y + this.radius >= ty) {
      this.dy = -this.dy * grav;
    }
    else {
      this.dy += this.vel;
    }
    if (this.x + this.radius > tx || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (
      mouseX > this.x - this.radius &&
      mouseX < this.x + this.radius &&
      mouseY > this.y - this.radius &&
      mouseY < this.y + this.radius
    ) {
      this.radius += 5;
    }
    else {
      if (this.radius > this.startradius) {
        this.radius -= 5;
      }
    }

  }
}

function App() {

  const {
    width: tx,
    height: ty
  } = useWindowSize();

  const mousePosition = useMousePosition();

  const [balls, setBalls] = useState<Ball[]>([]);

  useEffect(() => {

    for (let i = 0; i < 100; i++) {
      balls.push(new Ball(tx, ty));
    }
  }, [
    tx, ty
  ]);


  return (
    <div className="App">
      <Canvas
        width={tx}
        height={ty}
      >
        {(context, frameCount) => {
          context.clearRect(0, 0, tx, ty);
          balls.forEach(ball => {
            ball.update(context
              , tx, ty,
              mousePosition.x, mousePosition.y);
          }
          );
        }}
      </Canvas>
    </div>
  )
}

export default App
