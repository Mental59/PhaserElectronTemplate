import { GAME_HEIGHT, GAME_WIDTH } from '@src/config';
import { BootScene } from '@src/game/scenes/boot';
import { GameScene } from '@src/game/scenes/game';
import { AUTO, Game, Scale, Types } from 'phaser';

const config: Types.Core.GameConfig = {
  type: AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  backgroundColor: '#028af8',
  scale: {
    mode: Scale.FIT,
    autoCenter: Scale.CENTER_BOTH,
  },
  scene: [BootScene, GameScene],
};

const startGame = (parent: string) => {
  const game = new Game({ ...config, parent });
  return game;
};

export default startGame;
