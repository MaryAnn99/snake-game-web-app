import { Scene } from 'phaser'
import Apple from '@/game/models/Apple'
import Snake from '@/game/models/Snake'
import Obstacle from '@/game/models/Obstacle'

export default class PlayScene extends Scene {
  constructor () {
    super({ key: 'PlayScene' })
  }

  create() {
    this.gameOverSceneOpen = false;
    let { width } = this.sys.canvas;
    this.scoreText = this.add.text(width - 200, 0, 'Score: 0', {
      fontFamily: 'font1',
      fontSize: '30px'
    });
    this.snake = new Snake(this.physics.world, this, 300, 400, 'snakeBody');
    this.greenApple = new Apple(this, 200, 100, 'greenApple', Apple.GREEN);
    this.redApple = new Apple(this, 100, 50, 'redApple', Apple.RED);
    this.obstacles = new Obstacle(this.physics.world, this, 'box');
    this.cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.overlap(this.snake, this.greenApple, this.snakeEatApple, null, this);
    this.physics.add.overlap(this.snake, this.redApple, this.snakeEatApple, null, this);
    // The snake dies if it collides with an obstacle
    this.physics.add.overlap(this.snake, this.obstacles, this.killSnake, null, this);
  }
  killSnake() {
    this.snake.dead = true;
  }
  snakeEatApple(apple) {
    if(apple.color === Apple.RED) {
          this.snake.eatRedApple();
    } else {
        this.snake.eatGreenApple();
        this.redApple.move(this.snake);
    }
    this.obstacles.tryChangeObstacles(this.snake);
    apple.change();
    let score = Phaser.Math.MinSub(this.snake.greenApplesCounter, this.snake.redApplesCounter, 0);
    this.scoreText.setText('Score: ' + score);
  }
  getLimits(element) {
    let { width } = this.sys.canvas;
    let xStart = Phaser.Math.MinSub(element.x, element.width * 1.5, 0);
    let xEnd = Phaser.Math.MaxAdd(element.x, element.width * 1.5, width);
    let yStart = Phaser.Math.MinSub(element.y, element.width * 1.5, 0);
    let yEnd = Phaser.Math.MaxAdd(element.y, element.width * 1.5, width);
    return {xStart, xEnd, yStart, yEnd}
  }
  getAvailableCoordinates(widthTexture, heightTexture) {
    var occupiedCoordinates = [];
    var availableCoordinates = new Set();
    let { width, height } = this.sys.canvas;
    let gameObjs = [
        ...this.snake.getChildren(), 
        ...this.obstacles.getChildren(), 
        this.redApple, 
        this.greenApple
    ];
    gameObjs.forEach(element => {
        // make sure the obj doesn't reposition anywhere near to the snake
        // so the physics overlap function do not triggered.
        let {xStart, xEnd, yStart, yEnd} = this.getLimits(element);

        for(let x = xStart; x <= xEnd; x ++) {
          for(let y = yStart; y <= yEnd; y ++) {
              if(!occupiedCoordinates[x]) {
                occupiedCoordinates[x] = [];
              }
              occupiedCoordinates[x][y] = true;
          }
        }
    });
    // fill the array with all the possible coordinates.
    Array.from({length: width - widthTexture}, (_, x) => {
      if (x >= widthTexture) {
        Array.from({length: height - heightTexture}, (_, y) => {
          if (y >= heightTexture) {
            if (occupiedCoordinates[x]) {
              if (occupiedCoordinates[x][y] === true) {
                return;
              }
            }
            availableCoordinates.add({x, y});
          }
        });
      }
    });
    return availableCoordinates;
  }
  showGameOver() {
    var score = Phaser.Math.MinSub(this.snake.greenApplesCounter, this.snake.redApplesCounter, 0);
    this.scene.launch('GameOverScene', {score});
    var panel = this.scene.get('GameOverScene');
    panel.events.on('clickTryAgain', this.handleTryAgain, this);
  }
  handleTryAgain() {
    this.scene.stop('GameOverScene');
    this.scene.restart();
  }
  update(time) {
    if (this.snake.dead) {
        if (this.gameOverSceneOpen) {
            return;
        }
        this.gameOverSceneOpen = true;
        this.showGameOver();
    }
    if (this.cursors.left.isDown)
    {
        this.snake.changeDirection(Snake.LEFT);
    }
    else if (this.cursors.right.isDown)
    {
        this.snake.changeDirection(Snake.RIGHT);
    }
    else if (this.cursors.up.isDown)
    {
        this.snake.changeDirection(Snake.UP);
    } 
    else if (this.cursors.down.isDown) {
        this.snake.changeDirection(Snake.DOWN);
    }
    this.snake.move(time);
  }
}
