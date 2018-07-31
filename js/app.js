const TILE_WIDTH = 101;
const TOTAL_WIDTH = 505;
const TILE_HEIGHT = 83;

// Base game objects
class Character {
    constructor(x, y, sprite) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
    }

    update(dt) {
        // do nothing
    }

    // Draw the character on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Enemies our player must avoid
class Enemy extends Character {
    constructor(lane, x, speed) {
        // Variables applied to each of our instances go here
        // The image/sprite for our enemies, this uses
        // a helper to easily load images
        super(x, TILE_HEIGHT * lane - 20, `images/enemy-bug.png`);
        this.speed = speed;
    };

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x = this.x + dt * this.speed;
        if (this.x > 0) {
            this.x = this.x % TOTAL_WIDTH;
        }
        this.y = this.y;
    };
}

// Player class
class Player extends Character {
    constructor() {
        super(TILE_WIDTH * 2, TILE_HEIGHT * 5, `images/char-boy.png`);
        this.row = 5;
        this.column = 2;
        this.score = 0;
    }

    // Update the player's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        this.x = 101 * this.column;
        this.y = 83 * this.row;
        this.score = this.score + dt;

        const scoreElement = document.querySelector(".score");
        scoreElement.innerHTML = `${this.score}`;
    }

    // Move the player left, right, up and down 
    handleInput(direction) {
        if (direction === "left") {
            if (this.column >= 1) {
                this.column--;
            }
        } else if (direction === "right") {
            if (this.column < 4) {
                this.column++;
            }
        } else if (direction === "up") {
            if (this.row >= 1) {
                this.row--;
            }
        } else {
            if (this.row < 5) {
                this.row++;
            }
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let player;
let allEnemies;

function initializeEnemyObjects() {
    return [new Enemy(1, -500, 100), new Enemy(1, 80, 120), new Enemy(2, -800, 130),
        new Enemy(2, -400, 110), new Enemy(3, 0, 125), new Enemy(3, -80, 140)
    ];

}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
