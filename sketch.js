class Player {
    x;

    constructor() {
        this.x = width / 2
    }

    draw() {
        rectMode(CENTER);
        rect(width / 2, height / 2 + 125, 50, 75)
    }

    move() {
        
    }
}

let player;

function setup() {
    createCanvas(500, 500);

    player = new Player();
}

function draw() {
    background(255);

    player.draw();
}

function keyPressed() {
    
}