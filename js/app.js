// Enemies our player must avoid
var Enemy = function(lane, x, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = 83 * lane - 20;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + dt * this.speed;
    if (this.x > 0) {
        this.x = this.x % 505;
    }
    this.y = this.y;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.row = 5;
    this.column = 2;
    this.x = 101 * this.column;
    this.y = 83 * this.row;
    this.score = 0;
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = 101 * this.column;
    this.y = 83 * this.row;
    this.score = this.score + dt;
    
    const scoreElement = document.querySelector(".score");
    scoreElement.innerHTML = `${this.score}`;
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Move the player left, right, up and down 
Player.prototype.handleInput = function(direction) {
    if (direction === "left") {
        if (this.column >= 1) {
            this.column--;
        }
    }
    else if (direction === "right") {
        if (this.column < 4) {
            this.column++;
        }
    }
    else if (direction === "up") {
        if (this.row >= 1) {
            this.row--;
        }
    }
    else {
        if (this.row < 5) {
            this.row++;
        }
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let player;
let allEnemies;

function initializeEnemyObjects() {
   return [new Enemy(1, -500, 100), new Enemy(1, 80, 120), new Enemy(2, -800, 130), 
    new Enemy(2, -400, 110), new Enemy(3, 0, 125), new Enemy(3, -80, 140)];
   
}

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
