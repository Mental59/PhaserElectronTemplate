import { GAME_HEIGHT, GAME_WIDTH } from '@/config';
import { Scene } from 'phaser';

export class Game extends Scene {
  public constructor() {
    super('Game');
  }

  public preload() {
    this.load.setPath('assets');

    this.load.image('background', 'bg.png');
    this.load.image('logo', 'logo.png');
  }

  public create() {
    this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'background');
    this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'logo').setDepth(100);
    this.add
      .text(
        GAME_WIDTH / 2,
        GAME_HEIGHT / 2 + 150,
        'Make something fun!\nand share it with us:\nsupport@phaser.io',
        {
          fontFamily: 'Arial Black',
          fontSize: 38,
          color: '#ffffff',
          stroke: '#000000',
          strokeThickness: 8,
          align: 'center',
        },
      )
      .setOrigin(0.5)
      .setDepth(100);
  }
}
