// Fish prefab
class Fish extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene, displayList, updateList
    }

    

    update() {
        // left/right movement
        
            if (keyLEFT.isDown && this.x >= 47) {
                this.x -= 3;
            } else if (keyRIGHT.isDown && this.x <= 598) {
                this.x += 3;
            }
        
        // 上下运动
            if (keyUP.isDown && this.y >= 140) {
                this.y -= 3;
            } else if (keyDOWN.isDown && this.y <= 430) {
                this.y += 3;
            }
    }

    reset(){
        this.x = 240;
        this.y = 350;
    }
}
