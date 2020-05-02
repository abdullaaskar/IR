// Hook prefab
class Fishhook extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene, displayList, updateList
    }

    update() {
        // move hook left
        this.x -= 0.09;
        this.y += game.settings.spaceshipSpeed-1.51;

        // wraparound from left to right edge
        if (this.x <= 0-this.width) {
            this.reset();
        }

        if (this.y >= 420){
            this.y = 137.5555;
        }
    }

    reset() {
        this.x = 593;
    }
}

