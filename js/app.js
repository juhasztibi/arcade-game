// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * 100) * 4;
    this.dimensions = {
        width: 99,
        height: 70
    };
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// Check the collision and reset or finish the game
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (this.x < 505) {
        this.x += this.speed * dt;
    } else {
        this.x = -100;
    }

    if((this.x >= (player.x - player.dimensions.width) && this.x <= (player.x + player.dimensions.width)) && (this.y >= player.y && this.y <= (player.y + player.dimensions.height / 2))) {
        game.decriseLife();
        if (game.getLife() > 0) {
            game.restart();
        } else {
            alert('Game over!')
            game.reset();
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Define player start position and dimesions
var Player = function() {
    this.x = 200;
    this.y = 380;
    this.dimensions = {
        width: 66,
        height: 84
    }
};

// Update the player's position
Player.prototype.update = function(dt) {
    if(this.y < 20) {
        game.setScore();
        game.restart();
    }
};

// Set the character
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
        this.x -= 100;
    }
    if(direction == 'right' && this.x < 380) {
        this.x += 100;
    }
    if(direction == 'up' && this.y > 3) {
        this.y -= 80;
    }
    if(direction == 'down' && this.y < 380) {
        this.y += 80;
    }
};

var scoreElement = document.getElementById('score');
var lifeElement = document.getElementById('life');

// Create game class to store the given game's score and lifes
var Game = function() {
    this.score = 0;
    this.life = 5;
};

// Set the score of player
Game.prototype.setScore = function() {
    scoreElement.innerHTML = ++this.score;
};

// Decrise the life of player
Game.prototype.decriseLife = function() {
    lifeElement.innerHTML = --this.life;
};

// Get the current life of player
Game.prototype.getLife = function() {
    return this.life;
}

// Move the given player back to the start point
Game.prototype.restart = function() {
    player.x = 200;
    player.y = 380;
}

// Reset the whole game, score, player position, life back to default, update the view of score and life
Game.prototype.reset = function() {
    this.life = 5;
    this.score = 0;
    player.x = 200;
    player.y = 380;

    scoreElement.innerHTML = this.score;
    lifeElement.innerHTML = this.life;
};

// Create new game instance
var game = new Game();

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Store enemies
let allEnemies = [];

// Create enemies and store them in the allEnemies array
for (var i = 0; i < 6; i++) {
    let enemy;

    if (i < 2) {
        enemy = new Enemy(-100, 60);
    }
    if (i >= 2 && i < 4) {
        enemy = new Enemy(-100, 140);
    }
    if (i >= 4) {
        enemy = new Enemy(-100, 225);
    }
    allEnemies.push(enemy);
}

// init player with boy character
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
