import { GameState } from '@electron/ipc/state';
import { Scene } from 'phaser';

export class BaseScene extends Scene {
  public getGameState(): GameState {
    return this.registry.get('gameState');
  }

  public setGameState(state: GameState): void {
    this.registry.set('gameState', state);
  }

  public startGameScene() {
    this.scene.start('game');
  }
}
