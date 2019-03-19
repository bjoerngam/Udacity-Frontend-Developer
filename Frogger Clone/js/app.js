// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;

    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.
this.x += 100 * this.speed * dt;
// Check for collisions
 // Keep moving enemies from left to right
if (player.x < this.x + 70 && player.x + 60 > this.x && player.y < this.y + 50 && 70 + player.y > this.y)
{
     console.log("Treffer");
     player.x = 205;
     player.y = 380;
}
   else if (this.x > 390) {
     this.x = -500;
   }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/char-boy.png';
};

// End of game
Player.prototype.update = function(replay) {
  if (this.y === -20 ) {
    // Add new enemy
    // allEnemies.push(new Enemy(5, 140, 2));

    // Reset player to starting position
    this.x = 205;
    this.y = 380;
    // Show modal at end of game
    document.querySelector('#message').classList.remove('hide');
  }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Moves player around
Player.prototype.handleInput = function(move) {
  hideModal(move);
  if (move === "left" && this.x > 5) {
    this.x = this.x - 100;
  } else if (move === "up" && this.y > -20) {
    this.y = this.y - 80;
  } else if (move === "right" && this.x < 400) {
    this.x = this.x + 100;
  } else if (move === "down" && this.y < 310) {
    this.y = this.y + 80;
  }
};

// Hides modal that shows up at the end of the game
function hideModal(move) {
  if (move === "left" ||  move === "up" || move === "right" || move === "down") {
    document.querySelector('#message').classList.add('hide');
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
  new Enemy(5, 60, 1),
  new Enemy(5, 220, 3),
];
var player = new Player(205, 380);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
