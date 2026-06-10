export type GameState = {
  x: number;
  y: number;
  z: number;
};

let GAME_STATE: GameState = {
  x: 0,
  y: 0,
  z: 0,
};
let IS_DIRTY = false;

export const updateState = (state: Partial<GameState>): void => {
  GAME_STATE = { ...GAME_STATE, ...state };
};

export const getState = (): GameState => {
  return GAME_STATE;
};

export const setStateDirty = (dirty: boolean) => {
  IS_DIRTY = dirty;
};

export const isStateDirty = () => {
  return IS_DIRTY;
};
