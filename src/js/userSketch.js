import { dft } from "./fourier.js";
import { epiCycles } from "./epicycles.js";

export let userSketch = function (p5) {
  const USER = 0;
  const FOURIER = 1;
  //2 states eitehr we are taking user input or we completing a fourier transform.

  let x = [];
  let y = [];
  let fourierX = [];
  let fourierY = [];
  let time = 0;
  let path = [];
  let drawing = [];
  let state = -1; //To begin width state is negative one i.e. not in user or fft.

  p5.mouseDown = function () {
    state = USER; //Click mouse state user.
    drawing = [];
    x = [];
    y = [];
    time = 0;
    path = [];
  };

  p5.mouseUp = function () {
    state = FOURIER; //release mouse state fourier.
    const skip = 1;
    for (let i = 0; i < drawing.length; i += skip) {
      x.push(drawing[i].x);
      y.push(drawing[i].y);
    }
    //TODO: Add scale for users to dictate how many epicycles.
    const scale = 1; //A number in the interval (0, 1].
    const minAmplitude = 0.01;
    const maxAmplitude = 120;

    fourierX = dft(p5, x).filter(
      (f) => f.amp > minAmplitude && f.amp < maxAmplitude
    );
    fourierY = dft(p5, y).filter(
      (f) => f.amp > minAmplitude && f.amp < maxAmplitude
    );

    fourierX = fourierX.slice(0, Math.floor(scale * fourierX.length));
    fourierY = fourierY.slice(0, Math.floor(scale * fourierY.length));

    fourierX.sort((a, b) => b.amp - a.amp);
    fourierY.sort((a, b) => b.amp - a.amp);
  };

  p5.setup = function () {
    let cnv = p5.createCanvas(700, 600);
    cnv.parent("draw-yourself");
    p5.frameRate(30);
    cnv.mousePressed(p5.mouseDown);
    cnv.mouseReleased(p5.mouseUp);
  };

  p5.draw = function () {
    p5.background(47, 72, 88);

    if (state == USER) {
      //If drawing need to record the points relative to window. i.e. center.
      let point = p5.createVector(
        p5.mouseX - p5.width / 2,
        p5.mouseY - p5.height / 2
      );
      drawing.push(point); //Push point to drawing.
      p5.stroke(255);
      p5.noFill();
      p5.beginShape(); //Render what the user is drawing.
      for (let p of drawing) {
        p5.vertex(p.x + p5.width / 2, p.y + p5.height / 2);
      }
      p5.endShape();
    } else if (state == FOURIER) {
      let vx = epiCycles(p5, time, p5.width / 2, 100, 0, fourierX, true);
      let vy = epiCycles(
        p5,
        time,
        100,
        p5.height / 2,
        p5.HALF_PI,
        fourierY,
        true
      );
      let v = p5.createVector(vx.x, vy.y);
      path.push(v);
      p5.line(vx.x, vx.y, v.x, v.y);
      p5.line(vy.x, vy.y, v.x, v.y);

      p5.beginShape();
      p5.noFill();
      for (let i = 0; i < path.length; i++) {
        p5.vertex(path[i].x, path[i].y);
      }
      p5.endShape();

      const dt = p5.TWO_PI / fourierY.length;
      time += dt;

      if (time > p5.TWO_PI) {
        time = 0;
        path = [];
      }
    }
  };
};
