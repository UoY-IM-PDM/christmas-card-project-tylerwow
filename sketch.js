class Player {
    x;
    y;

    constructor() {
        this.x = width / 2
        this.y = height / 2 + 125
    }

    draw() {
        rectMode(CORNER);
        rect(this.x, this.y, 50, 75)
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
}

class Gift {
    x;
    y;
    isCollected;
    isMissed;

    constructor() {
        this.x = random(0, width - 40);
        this.y = 0;
        this.isCollected = false;
        this.isMissed = false;
    }

    draw() {
        if(!this.isCollected) {
            rectMode(CORNER);
            rect(this.x, this.y, 50, 50);

            this.y++;
        }
    }

    checkCollection(playerX, playerY) {
        if (this.x + 15 > playerX && this.x - 15 < playerX && this.y + 50 > playerY ) {
            this.isCollected = true;
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
    gift.checkCollection(player.x, player.y);
}
