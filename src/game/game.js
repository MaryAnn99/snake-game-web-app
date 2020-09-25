import Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import PlayScene from './scenes/PlayScene'
import GameOverScene from './scenes/GameOverScene'

function launch(containerId) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    width: 600,
    height: 600,
    parent: containerId,
    zoom: 1,
    pixelArt: true,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false
      }
    },
    backgroundColor: '#0400ff',
    scene: [BootScene, GameOverScene, PlayScene]
  })
}

export default launch
export { launch }
