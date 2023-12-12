//TODO: Add difficulty select, add start and game over screens, Add new background

class Player {
    x;
    y;
    points;
    highScore;
    lives;
    speed;

    constructor() {
        this.x = width / 2 - 25
        this.y = height / 2 + 125
        this.points = 0;
        this.highScore = 0;
        this.lives = 3;
        this.speed = 3;
    }

    draw() {
        if(this.lives > 0) {
            rectMode(CORNER);
            fill(255);
            image(imgSanta, this.x, this.y, 50, 75)
        }
        else {
            this.highScore = this.points;
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
        console.log(random(1, 2))

        this.imgSelect = floor(random(1, 3));
    }

    draw() {
        if(!this.isCollected || !this.isOutOfBounds) {
            rectMode(CORNER);

            if (this.isFake) {
                //fill(255, 0, 0);

                //rect(this.x, this.y, 50, 50);
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

let btnRestart;
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
    //imgBg = loadImage("assets/background.png");
    imgStart = loadImage("assets/start.png");
    //imgGameOver = loadImage("assets/gameover.png");
}

function setup() {
    createCanvas(500, 500);

    player = new Player();
    gift = new Gift("Normal");

    gameStart = true;
    gameOver = false;
    
    const mainContainer = select("main");

    btnRestart = createButton("Restart");
    btnRestart.parent(mainContainer);
    btnRestart.position(width / 2 - 25, height - 30);
    btnRestart.mousePressed(restart);

    radioDifficulty = createRadio();
    radioDifficulty.parent(mainContainer);
    radioDifficulty.position(0, height - 20);
    radioDifficulty.option("Easy");
    radioDifficulty.option("Normal");
    radioDifficulty.option("Hard");
    radioDifficulty.selected("Normal");
}

function draw() {
    background(255);

    //image(imgBg, 0, 0, width, height);

    player.draw();
    player.move();

    gift.draw();

    //gift.setDifficulty(radioDifficulty.value());
    difficulty = radioDifficulty.value();

    if (player.lives === 0) {
        gameOver = true;
    }

    if (gameOver === false) {
        btnRestart.hide();
        radioDifficulty.hide();

        fill(0);
        textSize(15);
        textAlign(LEFT);
        text("Score: " + player.points, 5, 16)

        textAlign(CENTER);
        text("Highest Score: " + player.highScore, width / 2, 16)

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
    else {
        image(imgGameOver, 0, 0, width, height);
        btnRestart.show();
        radioDifficulty.show();

        fill(0);
        textSize(15);
        textAlign(LEFT);
        text("Score: " + player.points, 5, 16)

        textAlign(CENTER);
        text("Highest Score: " + player.highScore, width / 2, 16)

        textAlign(RIGHT)
        text("Lives: " + player.lives, width - 10, 16)
    }
}

function restart() {
    gameOver = false;
    player.restart();
    gift = new Gift(difficulty);
}