const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // App info
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  getSystemInfo: () => ipcRenderer.invoke('get-system-info'),
  
  // Navigation
  onNavigate: (callback) => ipcRenderer.on('navigate', callback),
  removeNavigateListener: (callback) => ipcRenderer.removeListener('navigate', callback),
  
  // System optimization
  requestSystemOptimization: (settings) => ipcRenderer.invoke('optimize-system', settings),
  getSystemMetrics: () => ipcRenderer.invoke('get-system-metrics'),
  
  // File operations
  exportOptimizations: (data) => ipcRenderer.invoke('export-optimizations', data),
  importOptimizations: () => ipcRenderer.invoke('import-optimizations'),
  
  // License management
  validateLicense: (key) => ipcRenderer.invoke('validate-license', key),
  storeLicense: (key, data) => ipcRenderer.invoke('store-license', key, data),
  getLicense: () => ipcRenderer.invoke('get-license'),
  
  // Window management
  minimizeWindow: () => ipcRenderer.invoke('minimize-window'),
  maximizeWindow: () => ipcRenderer.invoke('maximize-window'),
  closeWindow: () => ipcRenderer.invoke('close-window'),
  
  // Notifications
  showNotification: (title, body) => ipcRenderer.invoke('show-notification', title, body),
  
  // Platform detection
  getPlatform: () => process.platform,
  isElectron: () => true
});