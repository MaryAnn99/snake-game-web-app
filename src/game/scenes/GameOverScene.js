import {eventBus} from '../../main';
export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({key: 'GameOverScene', active: false});
    }
    init(data) {
        this.score = data.score;
        eventBus.changeScore(this.score);
    }
    create() {
        let fontStyle = {
            fontFamily: 'font1',
            fontSize: '40px'
        };
        let { width, height } = this.sys.canvas;
        this.title = this.add.text(width/2 - 100, height/2 - 100, 'Game Over', fontStyle);
        this.scoreTxt = this.add.text(width/2 - 100, height/2, `Score: ${this.score}`, fontStyle);
        this.tryAgainButton = this.add.text(width/2 - 100, height/2 + 100, 'Try Again!', { 
            fontFamily: 'font1',
            fontSize: '40px',
            fill: '#0f0' });
        
        this.tryAgainButton.setInteractive();
        this.tryAgainButton.on('pointerdown', () => { this.events.emit('clickTryAgain') });
    }
}