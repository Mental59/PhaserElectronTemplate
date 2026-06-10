import { GAME_HEIGHT, GAME_WIDTH } from '@src/config';
import { BaseScene } from '@src/game/scenes/base';

export class GameScene extends BaseScene {
  public constructor() {
    super('game');
  }

  public preload() {
    this.load.setPath('assets');

    this.load.image('background', 'bg.png');
    this.load.image('logo', 'logo.png');
  }

  public create() {
    this.add
      .image(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'background')
      .setInteractive();

    const logoImage = this.add
      .image(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'logo')
      .setDepth(100)
      .setInteractive();

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

    logoImage.on('pointerdown', () => {
      const state = this.getGameState();
      window.gameAPI.updateState({
        x: state.x + 1,
        y: state.y + 2,
        z: state.z + 3,
      });
    });
  }
}
