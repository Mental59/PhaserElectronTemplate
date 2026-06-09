import { GAME_HEIGHT, GAME_WIDTH } from '@/config';
import { Game as MainGame } from './scenes/game';
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
  scene: [MainGame],
};

const startGame = (parent: string) => {
  const game = new Game({ ...config, parent });
  return game;
};

export default startGame;
