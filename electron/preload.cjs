const { contextBridge } = require('electron');

const api = {};

contextBridge.exposeInMainWorld('gameAPI', api);
