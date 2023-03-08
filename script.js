const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

class Base {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    c.fillStyle = this.color;
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fill();
  }
}

class Player {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  clear() {
    c.clearRect(this.x - 1, this.y - 1, this.width + 2, this.height + 2);
  }

  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, this.width, this.height);
  }
  getDistance(x1, x2, y1, y2) {
    let y = x2 - x1;
    let x = y2 - y1;
    x * x + y * y;
    let distance = Math.sqrt(x * x + y * y);
    return distance;
  }

  collisionCheck(distance) {
    //for window border
    if (player.width + player.x - 50 < 0) {
      this.clear();
      player.x = player.x + player.width;
    }
    if (player.x - player.width + 100 > canvas.width) {
      this.clear();
      player.x = player.x - player.width;
    }
    if (player.y + player.height - 50 < 0) {
      this.clear();
      player.y = player.y + player.height;
    }
    if (player.y - player.height + 100 > canvas.height) {
      this.clear();
      player.y = player.y - player.height;
    }

    //for base
    function isColliding(player, base);
    // calculate the distance between the center of the base and the player
    var distance = Math.sqrt(
      Math.pow(base.x - player.x - player.size / 2, 2) +
        Math.pow(base.y - player.y - player.size / 2, 2)
    );

    // if the distance is less than the radius of the base, then the player and the base are colliding
    return distance < base.radius;
  }

  update() {
    if (drag == 0) {
      drag += 10;
    }

    this.clear();
    this.x = this.x + (velocity.x / drag) * 1;
    this.y = this.y + (velocity.y / drag) * 1;
    this.draw();
  }
}

class PlayerProjectiles {
  constructor(x, y, radius, velocity, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocity = velocity;
    this.color = color;
  }

  draw() {
    c.fillStyle = this.color;
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fill();
  }

  update() {
    this.clear();
    this.x = this.x += velocity;
    this.y = this.y += velocity;
    this.draw();
  }
}

let projectile;
let player;
let base;

let velocity = {
  x: 0,
  y: 0,
};

let drag = 10;

let wIsPressed;
let sIsPressed;
let dIsPressed;
let aIsPressed;

setInterval(function test() {
  console.clear();
}, 1000);

//checking every 1 milliseconds if the wasd keys are pressed.
setInterval(function test() {
  if (wIsPressed == true) {
    velocity.y = -15;
    player.update();
  }

  if (sIsPressed == true) {
    velocity.y = 15;
    player.update();
  }
  if (dIsPressed == true) {
    velocity.x = 15;
    player.update();
  }
  if (aIsPressed == true) {
    velocity.x = -15;
    player.update();
  }
  player.collisionCheck(player.getDistance(player.x, base.x, player.y, base.y));
}, .001);

setInterval(function test() {
  console.log(
    player.collisionCheck(
      player.getDistance(player.x, base.x, player.y, base.y)
    )
  );
}, 1000);

// Press of the W key.
addEventListener('keydown', (event) => {
  if (event.keyCode === 87) {
    wIsPressed = true;
  }
});

addEventListener('keyup', (event) => {
  if (event.keyCode === 87) {
    wIsPressed = false;
    velocity.y = 0;
    player.update();
  }
});

//Press of the S key
addEventListener('keydown', (event) => {
  if (event.keyCode === 83) {
    sIsPressed = true;
  }
});

addEventListener('keyup', (event) => {
  if (event.keyCode === 83) {
    sIsPressed = false;
    velocity.y = 0;
    player.update();
  }
});

//Press of the D key
addEventListener('keydown', (event) => {
  if (event.keyCode === 68) {
    dIsPressed = true;
  }
});

addEventListener('keyup', (event) => {
  if (event.keyCode === 68) {
    dIsPressed = false;
    velocity.x = 0;
    player.update();
  }
});

//Press of the a key
addEventListener('keydown', (event) => {
  if (event.keyCode === 65) {
    aIsPressed = true;
  }
});

addEventListener('keyup', (event) => {
  if (event.keyCode === 65) {
    aIsPressed = false;
    velocity.x = 0;
    player.update();
  }
});

setInterval(function test() {
  let keysPressed = [wIsPressed, sIsPressed, dIsPressed, aIsPressed];
  var countOfTrueKeys = keysPressed.filter(function test(e) {
    if (e == true) {
      return true;
    }
  }).length;
  drag = 10 * countOfTrueKeys;
}, 0.001);

player = new Player(
  canvas.width / 4,
  canvas.height / 4,
  0.05 * canvas.width,
  0.05 * canvas.width,
  'white'
);
/*
projectile = new PlayerProjectiles(
  canvas.width / 2,
  canvas.height / 2,
  80,
  velocity,
  'white'
);*/
base = new Base(canvas.width / 2, canvas.height / 2, 80, '#ffffff');
base.draw();
setInterval(function test() {
  c.fill();
}, 0.001);
/* if player.x + player.width < 0 (meaning that the player is off the screen too the right), player.x = player.x + player.width.*/

player.draw();
