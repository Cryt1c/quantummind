PImage safeBg, lockBg, lock, driverPin, quantum, spring;
boolean mode; // true = safe, false = lock
int counter = 120;
PFont f;

float springDelta = 1;

void setup() {
  size(400, 500);

  safeBg = loadImage("metallic_texture.jpg");
  lockBg = loadImage("gold_texture.jpg");
  driverPin = loadImage("driver_pin.png");
  quantum = loadImage("quantum_spin.png");
  spring = loadImage("coil_spring.png");
  lock = loadImage("lock.png");

  f = createFont("Arial", 20, true);
  mode = true;
}

void draw() {
  if (mode) {
    background(safeBg);
  } else {
    background(lockBg);
    image(lock, width/2 - 100, height/2 - 150, 200, 325);
    image(spring, width/2 - 15, height/2 - (25 + 35 * springDelta), 30, 25 + 35 * springDelta);
    image(driverPin, width/2 - 15, height/2 - (75 + 45 * springDelta), 30, 50);
  }

  fill(0);
  textFont(f);
  textAlign(CENTER);
  if (mode) {
    text("Press 'w' or 'd' to rotate the knob, \n'space' to switch between views.", width/2, 50);
  } else {
    text("Press 'space' to switch between views.\nRotation is only possible in other view.", width/2, 50);
  }

  // rotation
  translate(width/2, height/2);
  if (mode) {
    rotate(radians(counter % 360));
    image(quantum, -30, -50, 60, 100);
  } else {
    rotate(radians(counter % 360 + 180));
    image(quantum, -30, -50, 60, 100);
  }
  
  int pos = counter + 180 % 360;
  if (pos > -10 && pos < 10) {
    // draw back spring and driver pin
    if (springDelta > 0) {
      springDelta -= 0.01;
      springDelta = max(springDelta, 0);
    }
  } else {
    springDelta = 1;
  }
}

void keyReleased() {
  if (key == ' ') {
    mode = !mode;
  } else if (mode) {
    // alow rotation
    if (key == 'a') {
      // rotate left
      counter -= 20;
    } else if (key == 'd') {
      // rotate right
      counter += 20;
    }
  }
}