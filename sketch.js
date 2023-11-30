class Player {
    x;
    y;
    points;
    highScore;
    lives;

    constructor() {
        this.x = width / 2
        this.y = height / 2 + 125
        this.points = 0;
        this.highScore = 0;
        this.lives = 3;
    }

    draw() {
        if(this.lives > 0) {
            rectMode(CORNER);
            rect(this.x, this.y, 50, 75)
        }
        else {
            this.highScore = this.points;
        }
    }

    move() {
        if (keyIsPressed) {
            if (key === "a") {
                this.x -= 3;
            }
            if (key === "d") {
                this.x += 3;
            }
        }
    }

    addPoints() {
        this.points++;
    }

    loseLife() {
        if(this.lives > 0) {
            this.lives -= 1;
        }
    }

    respawn() {
        this.lives = 3;
    }
}

class Gift {
    x;
    y;
    speed;
    isCollected;
    isOutOfBounds;

    constructor() {
        this.x = random(0, width - 40);
        this.y = 0;
        this.speed = 4;
        this.isCollected = false;
        this.isOutOfBounds = false;
    }

    draw() {
        if(!this.isCollected || !this.isOutOfBounds) {
            rectMode(CORNER);
            rect(this.x, this.y, 50, 50);

            this.y += this.speed;
        }
    }

    checkCollection(playerX, playerY) {
        if (this.x + 15 > playerX && this.x - 15 < playerX && this.y + 50 > playerY && this.y - 50 < playerY) {
            this.isCollected = true;
            return true;
        }
    }

    checkIsOutOfBounds() {
        if(this.y > height) {
            this.isOutOfBounds = true;
            return true;
        }
    }
}

let player;
let gift;

function setup() {
    createCanvas(500, 500);

    player = new Player();
    gift = new Gift();
}

function draw() {
    background(255);

    player.draw();
    player.move();

    gift.draw();

    if(gift.checkCollection(player.x, player.y)) {
        player.addPoints();
        gift = new Gift();
    }
    if(gift.checkIsOutOfBounds()) {
        player.loseLife();
        gift = new Gift();
    }

    textSize(15);
    textAlign(LEFT);
    text("Score: " + player.points, 5, 16)

    textAlign(CENTER);
    text("Highest Score: " + player.highScore, width / 2, 16)

    textAlign(RIGHT)
    text("Lives: " + player.lives, width - 10, 16)
}