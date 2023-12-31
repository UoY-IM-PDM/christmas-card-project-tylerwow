class Player {
    x;
    y;
    points;
    highScore;
    lives;
    speed;

    constructor() {
        this.x = width / 2 - 25;
        this.y = height / 2 + 125;
        this.points = 0;
        this.highScore = 0;
        this.lives = 3;
        this.speed = 3;
    }

    draw() {
        if(this.lives > 0) {
            rectMode(CORNER);
            fill(255);
            image(imgSanta, this.x, this.y, 75, 110);
        }
        else {
            if (this.points > this.highScore) {
                this.highScore = this.points;
            }
            
        }
    }

    move() {
        if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) {
            this.x -= this.speed;
        }
        if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) {
            this.x += this.speed;
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
    imgSelect;

    constructor(difficulty) {
        this.x = random(0, width - 40);
        this.y = 0;

        if (difficulty === "Easy") {
            this.speed = 2;
        }
        else if (difficulty === "Normal") {
            this.speed = 3;
        }
        else if (difficulty === "Hard") {
            this.speed = 4;
        }

        this.isCollected = false;
        this.isOutOfBounds = false;

        if (floor(random(1, 5)) === 1) {
            this.isFake = true;
        }
        else {
            this.isFake = false;
        }

        this.imgSelect = floor(random(1, 3));
    }

    draw() {
        if(!this.isCollected || !this.isOutOfBounds) {
            rectMode(CORNER);

            if (this.isFake) {
                image(imgBomb, this.x, this.y, 50, 50);
            }
            else {
                if (this.imgSelect === 1) {
                    image(imgPresent1, this.x, this.y, 50, 50);
                }
                else if (this.imgSelect === 2) {
                    image(imgPresent2, this.x, this.y, 50, 50);
                }
                else if (this.imgSelect === 3) {
                    image(imgPresent3, this.x, this.y, 50, 50);
                }
            }

            this.y += this.speed;
        }
    }

    checkCollection(playerX, playerY) {
        if(this.x > playerX && this.x + 50 < playerX + 75 && this.y > playerY && this.y + 50 < playerY + 100) {
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

    setDifficulty(difficulty) {
        if (difficulty === "Easy") {
            this.speed === 2;
        }
        if (difficulty === "Normal") {
            this.speed === 3;
        }
        if (difficulty === "Hard") {
            this.speed === 4;
        }
    }
}

let player;
let gift;

let difficulty;

let gameStart;
let gameOver;


let radioDifficulty;

let imgSanta;
let imgPresent1;
let imgPresent2;
let imgPresent3;
let imgBomb;
let imgBg;
let imgStart;
let imgGameOver;

function preload() {
    imgSanta = loadImage("assets/santa.png");
    imgPresent1 = loadImage("assets/present1.png");
    imgPresent2 = loadImage("assets/present2.png");
    imgPresent3 = loadImage("assets/present3.png");
    imgBomb = loadImage("assets/bomb.png");
    imgBg = loadImage("assets/background.png");
    imgStart = loadImage("assets/start.png");
    imgGameOver = loadImage("assets/gameover.png");
}

function setup() {
    createCanvas(500, 500);

    player = new Player();
    gift = new Gift("Normal");

    gameStart = true;
    gameOver = false;
    
    const mainContainer = select("main");

    radioDifficulty = createRadio();
    radioDifficulty.parent(mainContainer);
    radioDifficulty.position(width / 2 - 90, height + 10);
    radioDifficulty.option("Easy");
    radioDifficulty.option("Normal");
    radioDifficulty.option("Hard");
    radioDifficulty.selected("Normal");
}

function draw() {
    background(255);
    difficulty = radioDifficulty.value();
    image(imgBg, 0, 0, width, height);

    if (gameStart === true) {
        radioDifficulty.show();
        image(imgStart, 0, 0, width, height);
    }

    if (gameOver === false && gameStart === false) {
        player.draw();
        player.move();

        gift.draw();


        if (player.lives === 0) {
            gameOver = true;
        }

        radioDifficulty.hide();

        fill(255);
        noStroke();
        textSize(15);
        textAlign(LEFT);
        text("Score: " + player.points, 5, 16)

        textAlign(CENTER);
        text("High Score: " + player.highScore, width / 2, 16)

        textAlign(RIGHT)
        text("Lives: " + player.lives, width - 10, 16)
        
        if(gift.checkCollection(player.x, player.y)) {
            if (!gift.isFake) {
                player.addPoints();
                gift = new Gift(difficulty);
            }
            else {
                player.loseLife();
                gift = new Gift(difficulty);
            }
        }
        if(gift.checkIsOutOfBounds()) {
            if (!gift.isFake) {
                player.loseLife();
                gift = new Gift(difficulty);
            }
            else {
                player.addPoints();
                gift = new Gift(difficulty);
            }
        }
    }
    if (gameStart === false && gameOver === true) {
        image(imgGameOver, 0, 0, width, height);
        radioDifficulty.show();

        fill(255);
        stroke(0);
        strokeWeight(2);
        textSize(30);
        textAlign(CENTER);
        text("Score: " + player.points, width / 2, 120);

        textAlign(CENTER);
        text("High Score: " + player.highScore, width / 2, 150);
    }
}

function keyPressed() {
    if (gameStart) {
        restart();
    }
    if (gameOver && !keyIsDown(65) && !keyIsDown(68) && !keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW)) {
        restart();
    }
}

function restart() {
    gameOver = false;
    gameStart = false;
    player.restart();
    gift = new Gift(difficulty);
}