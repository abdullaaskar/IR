// Hook prefab
class Fishhook extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene, displayList, updateList
    }

    update() {
        // move hook left
        this.x -= game.settings.spaceshipSpeed-0.997555;
        this.y += game.settings.spaceshipSpeed-1.5;

        // wraparound from left to right edge
        if (this.x <= 0-this.width) {
            this.reset();
        }

        if (this.y >= 420){
            this.y = 150;
        }
    }

    reset() {
        this.x = 590;
    }
}