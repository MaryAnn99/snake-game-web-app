export default class Apple extends Phaser.GameObjects.Image{
    static GREEN = 0;
    static RED = 1; 
    constructor(scene, x, y, texture, color) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.world.enableBody(this);

        this.color = color;
    }
    change() {
        var image = this.texture.getSourceImage();
        var width = image.width;
        var height = image.height;
        let availableCoordinates = this.scene.getAvailableCoordinates(width, height);
        let {x, y} = Phaser.Math.RND.pick(Array.from(availableCoordinates));
        this.x = x, this.y = y;
    }
    move(snake) {
        let eatenApples = snake.greenApplesCounter + snake.redApplesCounter;
        // Occasionally red apples are moved.
        if (eatenApples % Phaser.Math.Between(5, 10) == 0) {
            this.change();
        }
    }
}