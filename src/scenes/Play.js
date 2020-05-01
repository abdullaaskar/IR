class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('bottle', './assets/bottle.png');
        this.load.image('fishship', './assets/fishship.png');
        this.load.image('wire', './assets/wire.png');
        this.load.image('hook', './assets/hook.png');
        this.load.image('net', './assets/net.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('starfield1', './assets/starfield1.png');
        this.load.image('starfield2', './assets/starfield2.png');
        this.load.image('starfield3', './assets/starfield3.png');
        this.load.image('starfield4', './assets/starfield4.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', { frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9 });
    }

    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').
            setOrigin(0, 0);
        this.starfield0 = this.add.tileSprite(0, 50, 640, 70, 'starfield1').
            setOrigin(0, 0);
        this.starfield1 = this.add.tileSprite(0, 120, 640, 70, 'starfield1').
            setOrigin(0, 0);
        this.starfield2 = this.add.tileSprite(0, 190, 640, 70, 'starfield2').
            setOrigin(0, 0);
        this.starfield3 = this.add.tileSprite(0, 260, 640, 70, 'starfield3').
            setOrigin(0, 0);
        this.starfield4 = this.add.tileSprite(0, 330, 640, 73, 'starfield4').
            setOrigin(0, 0);

        // white rectangle borders
        this.add.rectangle(5, 5, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 443, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(603, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        // green UI background
        // this.add.rectangle(37, 42, 566, 64, 0x00FF00).setOrigin(0, 0);

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width / 2 - 8, 350, 'rocket').setOrigin(0, 0);

        // add spaceships (x4)
        this.ship01 = new Spaceship(this, 4000, 132, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, 8000, 196, 'bottle', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, 12000, 260, 'net', 0, 10).setOrigin(0, 0);
        this.ship04 = new Spaceship(this, game.config.width - 96, 340, 'bottle', 0, 10).setOrigin(0, 0);

        //船的运动
        this.ship05 = new Fishship(this, 550, 70, 'fishship').setOrigin(0, 0);
        //鱼线
        this.ship06 = new Fishwire(this, 600, -90, 'wire').setOrigin(this.x, this.y);
        //鱼钩
        this.ship07 = new Fishhook(this, 595, 140, 'hook').setOrigin(0, 0);

        // define keys
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0 }),
            frameRate: 30
        });

        //score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.p1Score = 0;
        var timedEvent;
        // 每1000ms使用onEvent()一次
        timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true});
        this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);

        //typeface for ending
        let endConfig = {
            fontFamily: 'fantasy',
            fontSize: '28px',
            backgroundColor: '#5DDEDE',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        //get timer
        //timer tutorial: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/timer/
        var timer = this.time.addEvent({
            delay: 1000,
            callback: this.isTiming,
            callbackScope: this,
            repeat: (game.settings.gameTimer / 1000) + 1,
        });

        //game over flag
        this.gameOver = false;

        this.add.text(game.config.width / 2, game.config.height / 2 - 180, 'LEVEL1', endConfig).setOrigin(0.5);

        //四段加速
        endConfig.fixedWidth = 0;

        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width / 2, game.config.height / 2 - 180, 'LEVEL2', endConfig).setOrigin(0.5);
            game.settings = {
                spaceshipSpeed: game.settings.spaceshipSpeed + 1.5,
            }
        }, null, this);

        this.clock = this.time.delayedCall(game.settings.gameTimer + 30000, () => {
            this.add.text(game.config.width / 2, game.config.height / 2 - 180, 'LEVEL3', endConfig).setOrigin(0.5);
            game.settings = {
                spaceshipSpeed: game.settings.spaceshipSpeed + 2.5,
            }
        }, null, this);

        this.clock = this.time.delayedCall(game.settings.gameTimer + 60000, () => {
            this.add.text(game.config.width / 2, game.config.height / 2 - 180, 'LEVEL4', endConfig).setOrigin(0.5);
            game.settings = {
                spaceshipSpeed: game.settings.spaceshipSpeed + 3.5,
            }
        }, null, this);

        this.clock = this.time.delayedCall(game.settings.gameTimer + 90000, () => {
            this.add.text(game.config.width / 2, game.config.height / 2 - 180, 'LEVEL5', endConfig).setOrigin(0.5);
            game.settings = {
                spaceshipSpeed: game.settings.spaceshipSpeed + 4.5,
            }
        }, null, this);

    }

    update() {
        // check key input for restart / menu
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // 当玩家爆炸，游戏结束
        if (this.gameOver) {
            this.p1Score = -1; // 重置score为0（这边用-1是因为每1s刷新一次）
            this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press R to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
        }

        //scroll starfield
        this.starfield0.tilePositionX -= 3;
        this.starfield1.tilePositionX -= 2.5;
        this.starfield2.tilePositionX -= 2;
        this.starfield3.tilePositionX -= 1.5;
        this.starfield4.tilePositionX -= 1;

        this.starfield0.tilePositionY -= 0.3;
        this.starfield1.tilePositionY -= 0.3;
        this.starfield2.tilePositionY -= 0.3;
        this.starfield3.tilePositionY -= 0.3;
        this.starfield4.tilePositionY -= 0.3;

        if (!this.gameOver) {
            this.p1Rocket.update();         // update rocket sprite
            this.ship01.update();           // update spaceships (x4)
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
            this.ship05.update();
            this.ship06.update();
            this.ship07.update();
        }
        // check collisions
        if (this.checkCollision(this.p1Rocket, this.ship07)) {
            //this.shipExplode(this.ship07); 
            this.rocketExplode(this.p1Rocket.x, this.p1Rocket.y);
        }
        if (this.checkCollision(this.p1Rocket, this.ship04)) {
            //this.shipExplode(this.ship04); 
            this.rocketExplode(this.p1Rocket.x, this.p1Rocket.y);
        }
        if (this.checkCollision(this.p1Rocket, this.ship03)) {
            //this.shipExplode(this.ship03); 
            this.rocketExplode(this.p1Rocket.x, this.p1Rocket.y);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            //this.shipExplode(this.ship02);
            this.rocketExplode(this.p1Rocket.x, this.p1Rocket.y);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            //this.shipExplode(this.ship01);
            this.rocketExplode(this.p1Rocket.x, this.p1Rocket.y);
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
            return true;
        } else {
            return false;
        }
    }


    // 玩家爆炸
    rocketExplode(x, y) {
        this.p1Rocket.alpha = 0;
        let boom = this.add.sprite(x, y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            this.p1Rocket.reset();
            boom.destroy();
            this.gameOver = true;
        });
        this.sound.play('sfx_explosion');
    }

    // change score
    onEvent(){
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.p1Score += 1; // 每次使用该function的时候， p1score + 1
        this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);
    }
}