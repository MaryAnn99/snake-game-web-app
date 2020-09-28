export default class Snake extends Phaser.Physics.Arcade.Group {
    static UP = 0;
    static LEFT = 1;
    static DOWN = 2;
    static RIGHT = 3;
    constructor(world, scene, x, y, texture) {
        super(world, scene);
        scene.add.existing(this);

        this.defaultKey = texture;
        this.head = this.create(x, y);
        // Width and height must be equal.
        this.px = this.scene.textures.get(this.defaultKey).getSourceImage().width; 
        // This creates the space between the snake's body segments.
        this.px += 5;
        this.headPosition = {x: x / this.px, y: y / this.px};
        this.tailPosition = {x: x / this.px, y: y / this.px};
        this.headDirection = Snake.UP;
        this.dead = false;
        this.redApplesCounter = 0;
        this.greenApplesCounter = 0;
        // This is the value the current game timestamp must have 
        // for the snake to move.
        this.time = 0;
        this.speed = 100;
    }
    // The snake dies if it collides with its own body
    checkCollisionWithBody() {
        var obj = Phaser.Actions.GetFirst(this.getChildren(), {
            x: this.head.x,
            y: this.head.y
        }, 1);
        if (obj != null) {
            this.dead = true;
        }
    }
    eatGreenApple() {
        // Multiply by px because tailPosition is scaled in the range
        // between [0 - game.width/px] and [0 - game.height/px]
        this.create(this.tailPosition.x * this.px, this.tailPosition.y * this.px);
        this.greenApplesCounter ++;
    }
    eatRedApple() {
        this.redApplesCounter += 2;
        // If the snake decreases more than its size it dies.
        if (this.getLength() <= 2) {
            this.dead = true;
            return;
        }
        // When the snake eats a red apple, its size decreases by 2 segments.
        this.remove(this.getLast(true), true, true);
        this.remove(this.getLast(true), true, true);
        let lastElement = this.getLast(true);
        this.tailPosition = {x: lastElement.x / this.px, y: lastElement.y / this.px};
    }
    changeDirection(newDirection) {
        // Changes the direction of the snake and does not allow it to 
        // return on itself. If the snake goes up it cannot go down and vice versa. 
        // If it goes to the right it cannot go to the left and vice versa.
        switch (newDirection) {
            case Snake.UP:
                if (this.headDirection != Snake.DOWN) {
                    this.headDirection = newDirection;
                }
            break;
            case Snake.LEFT:
                if (this.headDirection != Snake.RIGHT) {
                    this.headDirection = newDirection;
                } 
            break;
            case Snake.DOWN:
                if (this.headDirection !== Snake.UP) {
                    this.headDirection = newDirection;
                } 
            break;
            case Snake.RIGHT:
                if (this.headDirection != Snake.LEFT) {
                    this.headDirection = newDirection;
                } 
            break;
        }
    }
    move(time) {
        // The snake can move only if the current game timestamp is
        // greater or equal to the snake object time. 
        // This allows to control the snake's velocity.
        if (time < this.time) {
            return ;
        }
        // The next move it's going to happen after this.speed milliseconds.
        this.time = time + this.speed;

        let { width, height } = this.scene.sys.canvas;
        // Moves the snake one step forward in the head direction.
        if (this.headDirection == Snake.UP) {
            this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y - 1, 0, height/this.px);
        } else if (this.headDirection == Snake.DOWN) {
            this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y + 1, 0, height/this.px);
        } else if (this.headDirection == Snake.LEFT) {
            this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x - 1, 0, width/this.px);
        } else if (this.headDirection == Snake.RIGHT) {
            this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x + 1, 0, width/this.px);
        }
        Phaser.Actions.ShiftPosition(this.getChildren(), this.headPosition.x * this.px, this.headPosition.y * this.px, 1, this.tailPosition);
        this.tailPosition.x /= this.px;
        this.tailPosition.y /= this.px;
        
        this.checkCollisionWithBody();
    }
}
