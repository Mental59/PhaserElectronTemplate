import { BaseScene } from '@src/game/scenes/base';

export class BootScene extends BaseScene {
  public constructor() {
    super('boot');
  }

  public async create() {
    window.gameAPI.onStateUpdate(state => {
      this.setGameState(state);
      console.log(`Game state: ${JSON.stringify(this.getGameState())}`);
    });

    const state = await window.gameAPI.getState();
    this.setGameState(state);
    console.log(`Initial game state: ${JSON.stringify(this.getGameState())}`);

    this.startGameScene();
  }
}
