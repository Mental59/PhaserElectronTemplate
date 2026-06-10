import { GameState } from '@electron/ipc/state';

declare global {
  interface Window {
    gameAPI: {
      getState: () => Promise<GameState>;
      updateState: (state: Partial<GameState>) => void;
      onStateUpdate: (callback: (state: GameState) => void) => void;
    };
  }
}
