class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload(){
        //load image
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.image('UI old',  './assets/UI old.png');
        this.load.image('mainBack', './assets/mainback.png');
        this.load.image('textBack', './assets/textBack.png');
    }

    create(){
        //menu display
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#00000000',
            color: '#E0FFF6',
            align:'right',
            padding:{
                top:5,
                bottom:5,
            },
            fixedWidth:0
        }

        let titleConfig = {
            fontFamily: 'fantasy',
            fontSize: '27px',
            backgroundColor: '#00000000',
            color: '#E0FFF6',
            align: 'right',
            padding: {
                top:5,
                bottom:5,
            },
            fixedWidth:0
        }

        //show menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;


        this.mainBack = this.add.tileSprite(0, 0, 680, 480, 'mainBack').
        setOrigin(0,0);
        this.UI =  this.add.tileSprite(centerX, centerY - 130, 551, 64, 'UI old').
        setOrigin(0.5);
        this.textBack =  this.add.tileSprite(centerX, 270, 624, 130, 'textBack').
        setOrigin(0.5);

        this.add.text(centerX, centerY - 130, 'Where  is  my  play  yard', titleConfig).setOrigin(0.5);
        this.add.text(centerX, centerY, 'Press → for story and tutorial', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer, 'Press S to directly start the game', menuConfig).setOrigin(0.5);
    
        
        // define keys
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
        
        
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.sound.play('sfx_select');
            this.scene.start('bgStoryScene');    
        }

        if (Phaser.Input.Keyboard.JustDown(keyS)) {
            this.sound.play('sfx_select');
            this.scene.start('playScene');    
        }
    }
}