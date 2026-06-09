import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const port = Number(process.env.PORT || '9009');
const isDev = !app.isPackaged;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createWindows(): Promise<void> {
  const window = new BrowserWindow({
    width: 1280,
    height: 720,

    show: false,
    fullscreen: false,

    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  window.once('ready-to-show', () => {
    window.show();
  });

  if (isDev) {
    await window.loadURL(`http://localhost:${port}`);

    window.webContents.openDevTools();
  } else {
    await window.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

void app.whenReady().then(createWindows);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
