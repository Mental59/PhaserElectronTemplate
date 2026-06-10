const { contextBridge, ipcRenderer } = require('electron');

const api = {
  getState: () => {
    return ipcRenderer.invoke('state.get');
  },

  updateState: state => {
    ipcRenderer.send('state.update', state);
  },

  onStateUpdate: callback => {
    ipcRenderer.on('state.updated', (_, state) => callback(state));
  },
};

contextBridge.exposeInMainWorld('gameAPI', api);
