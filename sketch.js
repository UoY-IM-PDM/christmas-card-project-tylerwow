class Player {
    x;
    y;
    points;
    highScore;
    lives;

    constructor() {
        this.x = width / 2 - 25
        this.y = height / 2 + 125
        this.points = 0;
        this.highScore = 0;
        this.lives = 3;
    }

    draw() {
        if(this.lives > 0) {
            rectMode(CORNER);
            fill(255);
            rect(this.x, this.y, 50, 75)
        }
        else {
            this.highScore = this.points;
        }
    }

    move() {
        if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) {
            this.x -= 3;
        }
        if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) {
            this.x += 3;
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

    restart() {
        console.log("restart");
        this.x = width / 2 - 25;
        this.y = height / 2 + 125;
        this.points = 0;
        this.lives = 3;
    }
}

class Gift {
    x;
    y;
    speed;
    isCollected;
    isOutOfBounds;
    isFalling;
    isFake;

    constructor() {
        this.x = random(0, width - 40);
        this.y = 0;
        this.speed = 3;
        this.isCollected = false;
        this.isOutOfBounds = false;

        if (floor(random(1, 5)) === 1) {
            this.isFake = true;
        }
        else {
            this.isFake = false;
        }
        console.log(random(1, 2))
    }

    draw() {
        if(!this.isCollected || !this.isOutOfBounds) {
            rectMode(CORNER);

            if (this.isFake) {
                fill(255, 0, 0);
            }
            else {
                fill(255);
            }

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

let gameOver;

let btnRestart;

function setup() {
    createCanvas(500, 500);

    player = new Player();
    gift = new Gift();

    gameOver = false;
    
    const mainContainer = select("main");
    btnRestart = createButton("Restart");
    btnRestart.parent(mainContainer);
    btnRestart.position(width / 2 - 25, height - 30);
    btnRestart.mousePressed(restart);
}

function draw() {
    background(255);

    player.draw();
    player.move();

    gift.draw();

    if (player.lives === 0) {
        gameOver = true;
    }

    if (gameOver === false) {
        btnRestart.hide();
        
        if(gift.checkCollection(player.x, player.y)) {
            if (!gift.isFake) {
                player.addPoints();
                gift = new Gift();
            }
            else {
                player.loseLife();
                gift = new Gift();
            }
        }
        if(gift.checkIsOutOfBounds()) {
            if (!gift.isFake) {
                player.loseLife();
                gift = new Gift();
            }
            else {
                player.addPoints();
                gift = new Gift();
            }
        }
    }
    else {
        btnRestart.show();
    }

    fill(0);
    textSize(15);
    textAlign(LEFT);
    text("Score: " + player.points, 5, 16)

    textAlign(CENTER);
    text("Highest Score: " + player.highScore, width / 2, 16)

    textAlign(RIGHT)
    text("Lives: " + player.lives, width - 10, 16)
}

function restart() {
    gameOver = false;
    player.restart();
    gift = new Gift();
}