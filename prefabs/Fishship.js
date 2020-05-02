// Fishship prefab
class Fishship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene, displayList, updateList
    }

    update() {
        // move ship right
        this.x -= 0.1;
        // wraparound from left to right edge
        if (this.x <= 60-this.width) {
            this.reset();
        }
    }

    reset() {
        this.x = 550;

    }
}