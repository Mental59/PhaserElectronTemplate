import { app, BrowserWindow, screen, ipcMain } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';
import {
  type GameState,
  getState,
  isStateDirty,
  setStateDirty,
  updateState,
} from './ipc/state.ts';
import { EventEnum } from './ipc/events.ts';

const PORT = Number(process.env.PORT || '9009');
const IS_DEV = !app.isPackaged;
const DIRNAME = path.dirname(fileURLToPath(import.meta.url));
const SAVE_STATE_INTERVAL_MS = 1000;

async function initializeApp(): Promise<void> {
  const displays = screen.getAllDisplays();
  const primary = screen.getPrimaryDisplay();
  const secondary = displays.find(d => d.id !== primary.id) || primary;

  const preload = path.join(DIRNAME, 'preload.cjs');

  await loadState();

  registerIPCHandlers();

  const window1 = await createWindow({
    windowOptions: {
      width: 1280,
      height: 720,
      x: primary.bounds.x,
      y: primary.bounds.y,
      show: false,
      fullscreen: false,
      frame: true,
      autoHideMenuBar: true,
      webPreferences: {
        preload,
        contextIsolation: true,
        nodeIntegration: false,
      },
    },
    devAppUrl: `http://localhost:${PORT}/index1.html`,
    indexFilePath: path.join(DIRNAME, '../dist/index1.html'),
  });

  const window2 = await createWindow({
    windowOptions: {
      width: 1280,
      height: 720,
      x: secondary.bounds.x,
      y: secondary.bounds.y,
      show: false,
      fullscreen: false,
      frame: true,
      autoHideMenuBar: true,
      webPreferences: {
        preload,
        contextIsolation: true,
        nodeIntegration: false,
      },
    },
    devAppUrl: `http://localhost:${PORT}/index2.html`,
    indexFilePath: path.join(DIRNAME, '../dist/index2.html'),
  });

  void window1;
  void window2;

  setInterval(() => {
    if (isStateDirty()) {
      setStateDirty(false);
      saveState().catch(error => {
        console.error('Failed to save the state:');
        console.error(error);
      });
    }
  }, SAVE_STATE_INTERVAL_MS);
}

async function createWindow({
  windowOptions,
  devAppUrl,
  indexFilePath,
}: {
  windowOptions: Electron.BrowserViewConstructorOptions;
  devAppUrl: string;
  indexFilePath: string;
}) {
  const window = new BrowserWindow(windowOptions);

  window.once('ready-to-show', () => window.show());

  if (IS_DEV) {
    await window.loadURL(devAppUrl);
    window.webContents.openDevTools();
  } else {
    await window.loadFile(indexFilePath);
  }

  return window;
}

function registerIPCHandlers() {
  ipcMain.handle(EventEnum.STATE_GET, () => getState());

  ipcMain.on(EventEnum.STATE_UPDATE, (event, state: Partial<GameState>) => {
    void event;
    updateState(state);
    setStateDirty(true);
    BrowserWindow.getAllWindows().forEach(window => {
      window.webContents.send(EventEnum.STATE_UPDATED, getState());
    });
  });
}

async function saveState() {
  const filePath = getStateFilePath();
  const payload = JSON.stringify(getState(), null, 2);
  await fs.writeFile(filePath, payload, 'utf-8');
  console.log(`The state is saved at "${filePath}"`);
}

async function loadState() {
  try {
    const data = await fs.readFile(getStateFilePath(), 'utf-8');
    // TODO: should be validated
    const state: GameState = JSON.parse(data);
    updateState(state);
  } catch (error) {
    console.error(`Failed to load state, error=${String(error)}`);
  }
}

function getStateFilePath() {
  const filePath = path.join(app.getPath('userData'), 'state.data');
  return filePath;
}

void app.whenReady().then(initializeApp);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
