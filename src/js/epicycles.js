// keep track if it's the first call, since the first call is always X epiCycles
let first = true;
// keep track of how many we printed out
let iter = 0;
// print out the first 4 circles (the absolute first is always stationary)
export const MAX_ITERATIONS = 3;

export function epiCycles(
  pFIVE,
  time,
  runningX,
  runningY,
  rotation,
  fourier,
  flag
) {
  let color = "#2f4858";
  if (flag) {
    color = "#ffffff";
  }
  for (let i = 0; i < fourier.length; i++) {
    //Retrieve fourier constant.
    let prevx = runningX;
    let prevy = runningY;
    let freq = fourier[i].freq;
    let radius = fourier[i].amp;
    let phase = fourier[i].phase;
    if (first && iter < (MAX_ITERATIONS + 1) * 2) {
      console.log(
        `(X) X ${prevx.toFixed(2)} Y ${prevy.toFixed(
          2
        )} radius ${radius.toFixed(2)} Phase ${phase.toFixed(
          2
        )}  rotation ${rotation.toFixed(2)}`
      );
      console.log(fourier[i]);
    } else if (!first && iter < (MAX_ITERATIONS + 1) * 2) {
      console.log(
        `(Y) X ${prevx.toFixed(2)} Y ${prevy.toFixed(
          2
        )} radius ${radius.toFixed(2)} Phase ${phase.toFixed(
          2
        )}  rotation ${rotation.toFixed(2)}`
      );
      console.log(fourier[i]);
    }
    iter++;
    runningX += radius * Math.cos(freq * time + phase + rotation);
    runningY += radius * Math.sin(freq * time + phase + rotation);

    pFIVE.stroke(color);
    pFIVE.noFill();
    pFIVE.ellipse(prevx, prevy, radius * 2);
    pFIVE.stroke(color);
    pFIVE.line(prevx, prevy, runningX, runningY);
  }
  first = false;
  return pFIVE.createVector(runningX, runningY); //Returns the total of the sum. i.e. The coordinate to draw.
}
