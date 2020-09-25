export default class Obstacle extends Phaser.Physics.Arcade.Group  {
    static MAX_CAPACITY = 10;
    constructor(world, scene, texture) {
        super(world, scene);
        scene.add.existing(this);

        this.defaultKey = texture;
    } 
    addObstacle(availableCoordinates) {
        if (this.getLength() >= Obstacle.MAX_CAPACITY) {
            return false;
        }
        let {x, y} = Phaser.Math.RND.pick(Array.from(availableCoordinates));
        this.create(x, y);
    }
    moveObstacles(availableCoordinates) {
        this.getChildren().forEach(element => {
            // TODO: if this returns an object, you can delete it directly, 
            // but keep the risk of putting the boxes around apples
            let {x, y} = Phaser.Math.RND.pick(Array.from(availableCoordinates));
            element.x = x, element.y = y;
            this.removeSelectedCoordinate(availableCoordinates, x, y);
        })
    }
    removeSelectedCoordinate(availableCoordinates, element) {
        let {xStart, xEnd, yStart, yEnd} = this.scene.getLimits(element);
        availableCoordinates.forEach(coordinate => {
            if(coordinate.x >= xStart && coordinate.x <= xEnd && 
                coordinate.y >= yStart && coordinate.y <= yEnd) {
                    availableCoordinates.delete(coordinate);
                }
        });
    }
    tryChangeObstacles(snake) {
        let eatenApples = snake.greenApplesCounter + snake.redApplesCounter;
        // Obstacles are added or changed for every 10 apples eaten.
        if (eatenApples % 10 == 0) {
            var image = this.scene.textures.get(this.defaultKey).getSourceImage();
            var width = image.width;
            var height = image.height;
            var availableCoordinates = this.scene.getAvailableCoordinates(width, height);
            this.addObstacle(availableCoordinates);
            this.moveObstacles(availableCoordinates);
        }
    }
}