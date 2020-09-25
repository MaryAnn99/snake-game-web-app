export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({key: 'GameOverScene', active: false});
    }
    init(data) {
        this.score = data.score;
    }
    create() {
        let { width, height } = this.sys.canvas;
        this.title = this.add.text(width/2, height/2, 'Game Over');
        this.scoreTxt = this.add.text(width/2 + 100, height/2+ 100, `Your Score: ${this.score}`);
        this.tryAgainButton = this.add.text(100, 100, 'Try Again!', { fill: '#0f0' });
        this.tryAgainButton.setInteractive();
        this.tryAgainButton.on('pointerdown', () => { this.events.emit('clickTryAgain') });
    }
}