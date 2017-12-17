// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.dimensions = {
        width: 101,
        height: 171
    };
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (this.x < 505) {
        this.x += this.speed * dt;
    } else {
        this.x = -100;
    }

    if(this.x < (player.x + player.dimensions.width / 2) && this.x + (this.dimensions.width / 2) > player.x && this.y < (player.y + player.dimensions.height / 2) && this.y + (this.dimensions.height / 2) > player.y) {
        console.log('lost');
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.x = 200;
    this.y = 320;
    this.dimensions = {
        width: 101,
        height: 171
    }
};

// Update the player's position
Player.prototype.update = function(dt) {
    if(this.y < 20) {
        console.log('won');
    }
};

Player.prototype.setChar = function(char) {
    this.sprite = 'images/char-' + char + '.png';
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handle user input
Player.prototype.handleInput = function(direction) {
    if(direction == 'left' && this.x > 0) {
        this.x -= 50;
    }
    if(direction == 'right' && this.x < 400) {
        this.x += 50;
    }
    if(direction == 'up' && this.y > 3) {
        this.y -= 50;
    }
    if(direction == 'down' && this.y < 400) {
        this.y += 50;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Store enemies
let allEnemies = [];

// create enemies
for (var i = 0; i < 9; i++) { //  should place the enemies randomly on the board
    let enemy;

    if (i <= 3) {
        enemy = new Enemy(-100, 60, Math.floor(Math.random() * 100));
    }
    if (i > 3 && i <= 6) {
        enemy = new Enemy(-100, 140, Math.floor(Math.random() * 100));
    }
    if (i > 6) {
        enemy = new Enemy(-100, 225, Math.floor(Math.random() * 100));
    }
    allEnemies.push(enemy);
}

// init player
let player = new Player();
player.setChar('boy');

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
