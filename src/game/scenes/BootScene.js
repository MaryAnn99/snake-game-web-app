import { Scene } from 'phaser'
import greenApple from '@/game/assets/imgs/greenApple.png'
import redApple from '@/game/assets/imgs/redApple.png'
import snakeBody from '@/game/assets/imgs/snakeBody2.png'
import box from '@/game/assets/imgs/box.png'

export default class BootScene extends Scene {
  constructor () {
    super({ key: 'BootScene' })
  }

  preload () {

    this.load.image('greenApple', greenApple);
    this.load.image('redApple', redApple);
    this.load.image('snakeBody', snakeBody);
    this.load.image('box', box);
    // this.load.bitmapFont('myFont', 'src/game/assets/fonts/font.png', 'src/game/assets/fonts/font.fnt');
  }

  create () {
    this.scene.start('PlayScene')
  }
}
