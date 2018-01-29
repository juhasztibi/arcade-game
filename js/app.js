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
        width: 99,
        height: 70
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

var Game = function() {
    this.score = 0;
    this.life = 5;
};

Game.prototype.setScore = function() {
    scoreElement.innerHTML = ++this.score;
};

Game.prototype.decriseLife = function() {
    lifeElement.innerHTML = --this.life;
};

Game.prototype.getLife = function() {
    return this.life;
}

Game.prototype.restart = function() {
    player.x = 200;
    player.y = 380;
}

Game.prototype.reset = function() {
    this.life = 5;
    this.score = 0;
    player.x = 200;
    player.y = 380;

    scoreElement.innerHTML = this.score;
    lifeElement.innerHTML = this.life;
};

var game = new Game();

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Store enemies
let allEnemies = [];

// Create enemies
let enemyFirstRow1 = new Enemy(-100, 60, 50);
let enemyFirstRow2 = new Enemy(-100, 60, 90);

let enemySecondRow1 = new Enemy(-100, 140, 30);
let enemySecondRow2 = new Enemy(-100, 140, 110);

let enemyThirdRow1 = new Enemy(-100, 225, 100);
let enemyThirdRow2 = new Enemy(-100, 225, 20);

allEnemies.push(enemyFirstRow1);
allEnemies.push(enemyFirstRow2);

allEnemies.push(enemySecondRow1);
allEnemies.push(enemySecondRow2);

allEnemies.push(enemyThirdRow1);
allEnemies.push(enemyThirdRow2);

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
