import { app, BrowserWindow, screen } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const port = Number(process.env.PORT || '9009');

const isDev = !app.isPackaged;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

  if (isDev) {
    await window.loadURL(devAppUrl);
    window.webContents.openDevTools();
  } else {
    await window.loadFile(indexFilePath);
  }

  return window;
}

async function initializeApp(): Promise<void> {
  const displays = screen.getAllDisplays();
  const primary = screen.getPrimaryDisplay();
  const secondary = displays.find(d => d.id !== primary.id) || primary;

  const preload = path.join(__dirname, 'preload.cjs');

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
    devAppUrl: `http://localhost:${port}/index1.html`,
    indexFilePath: path.join(__dirname, '../dist/index1.html'),
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
    devAppUrl: `http://localhost:${port}/index2.html`,
    indexFilePath: path.join(__dirname, '../dist/index2.html'),
  });

  void window1;
  void window2;
}

void app.whenReady().then(initializeApp);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
