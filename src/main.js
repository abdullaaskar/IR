// game configuration object
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, BgStory, Play ]
}

// main game object
let game = new Phaser.Game(config);

// define game settings
game.settings = {
    spaceshipSpeed: 2,
    rocketSpeed: 3,
    gameTimer: 30000  
}

// reserve keyboard vars
let keyR, keyLEFT, keyRIGHT, keyUP, keyDOWN, keyS;