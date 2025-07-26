import { app, BrowserWindow, Menu, shell, ipcMain, screen } from 'electron';
import * as path from 'path';
import { spawn, ChildProcess } from 'child_process';
import log from 'electron-log';
import { autoUpdater } from 'electron-updater';
import Store from 'electron-store';

// Configure logging
log.transports.file.level = 'info';
log.transports.console.level = 'debug';

// Initialize store for settings
const store = new Store();

let mainWindow: BrowserWindow | null = null;
let overlayWindow: BrowserWindow | null = null;
let presentMonProcess: ChildProcess | null = null;
let fpsValue = 0;
let systemStats = {
  cpu: 0,
  gpu: 0,
  ram: 0,
  temp: 0,
  ping: 0
};

// Configure auto-updater
autoUpdater.logger = log;
autoUpdater.checkForUpdatesAndNotify();

const isDev = process.env.NODE_ENV === 'development';
const RESOURCES_PATH = app.isPackaged
  ? path.join(process.resourcesPath, 'assets')
  : path.join(__dirname, '../../assets');

const getAssetPath = (...paths: string[]): string => {
  return path.join(RESOURCES_PATH, ...paths);
};

function createMainWindow(): void {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  
  mainWindow = new BrowserWindow({
    width: Math.min(1400, width - 100),
    height: Math.min(900, height - 100),
    minWidth: 1200,
    minHeight: 800,
    backgroundColor: '#0a0a0f',
    titleBarStyle: 'hiddenInset',
    trafficLightPosition: { x: 20, y: 20 },
    icon: getAssetPath('icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: true,
      allowRunningInsecureContent: false,
    },
    show: false,
  });

  const startUrl = isDev 
    ? 'http://localhost:3000' 
    : `file://${path.join(__dirname, '../build/index.html')}`;

  mainWindow.loadURL(startUrl);

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    if (!mainWindow) return;
    
    mainWindow.show();
    
    if (isDev) {
      mainWindow.webContents.openDevTools();
    }
  });

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
    if (overlayWindow) {
      overlayWindow.close();
      overlayWindow = null;
    }
  });

  // Prevent navigation to external URLs
  mainWindow.webContents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
    
    if (parsedUrl.origin !== startUrl) {
      event.preventDefault();
    }
  });

  // Handle external links
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

function createOverlayWindow(): void {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  
  overlayWindow = new BrowserWindow({
    width: 280,
    height: 200,
    x: 20,
    y: 20,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    focusable: false,
    skipTaskbar: true,
    resizable: false,
    movable: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    show: false,
  });

  // Make overlay click-through but draggable
  overlayWindow.setIgnoreMouseEvents(true, { forward: true });
  
  const overlayUrl = isDev 
    ? 'http://localhost:3000/overlay' 
    : `file://${path.join(__dirname, '../build/overlay.html')}`;

  overlayWindow.loadURL(overlayUrl);
  
  overlayWindow.once('ready-to-show', () => {
    if (overlayWindow) {
      overlayWindow.show();
    }
  });
}

function createApplicationMenu(): void {
  const template: Electron.MenuItemConstructorOptions[] = [
    {
      label: 'NexusPlay',
      submenu: [
        {
          label: 'About NexusPlay',
          role: 'about'
        },
        { type: 'separator' },
        {
          label: 'Preferences...',
          accelerator: 'Cmd+,',
          click: () => {
            mainWindow?.webContents.send('show-preferences');
          }
        },
        { type: 'separator' },
        {
          label: 'Hide NexusPlay',
          accelerator: 'Cmd+H',
          role: 'hide'
        },
        {
          label: 'Hide Others',
          accelerator: 'Cmd+Alt+H',
          role: 'hideOthers'
        },
        {
          label: 'Show All',
          role: 'unhide'
        },
        { type: 'separator' },
        {
          label: 'Quit',
          accelerator: 'Cmd+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'Cmd+R',
          click: () => {
            mainWindow?.reload();
          }
        },
        {
          label: 'Force Reload',
          accelerator: 'Cmd+Shift+R',
          click: () => {
            mainWindow?.webContents.reloadIgnoringCache();
          }
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: 'F12',
          click: () => {
            mainWindow?.webContents.toggleDevTools();
          }
        },
        { type: 'separator' },
        {
          label: 'Actual Size',
          accelerator: 'Cmd+0',
          role: 'resetZoom'
        },
        {
          label: 'Zoom In',
          accelerator: 'Cmd+Plus',
          role: 'zoomIn'
        },
        {
          label: 'Zoom Out',
          accelerator: 'Cmd+-',
          role: 'zoomOut'
        },
        { type: 'separator' },
        {
          label: 'Toggle FPS Overlay',
          accelerator: 'Cmd+Shift+F',
          click: () => {
            toggleFPSOverlay();
          }
        },
        {
          label: 'Toggle Fullscreen',
          accelerator: 'F11',
          role: 'togglefullscreen'
        }
      ]
    },
    {
      label: 'Optimization',
      submenu: [
        {
          label: 'One-Click Optimize',
          accelerator: 'Cmd+Shift+O',
          click: () => {
            mainWindow?.webContents.send('one-click-optimize');
          }
        },
        {
          label: 'Reset Settings',
          accelerator: 'Cmd+Shift+R',
          click: () => {
            mainWindow?.webContents.send('reset-settings');
          }
        },
        { type: 'separator' },
        {
          label: 'Export Settings',
          click: () => {
            mainWindow?.webContents.send('export-settings');
          }
        },
        {
          label: 'Import Settings',
          click: () => {
            mainWindow?.webContents.send('import-settings');
          }
        }
      ]
    },
    {
      label: 'Window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'Cmd+M',
          role: 'minimize'
        },
        {
          label: 'Close',
          accelerator: 'Cmd+W',
          role: 'close'
        }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Learn More',
          click: () => {
            shell.openExternal('https://nexusplay.app');
          }
        },
        {
          label: 'Documentation',
          click: () => {
            shell.openExternal('https://docs.nexusplay.app');
          }
        },
        {
          label: 'Report Issue',
          click: () => {
            shell.openExternal('https://github.com/nexusplay/platform/issues');
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function toggleFPSOverlay(): void {
  if (overlayWindow) {
    if (overlayWindow.isVisible()) {
      overlayWindow.hide();
    } else {
      overlayWindow.show();
    }
  } else {
    createOverlayWindow();
  }
}

function startPresentMon(): void {
  if (process.platform !== 'win32') {
    log.info('PresentMon only supported on Windows');
    return;
  }

  const presentMonPath = path.join(process.resourcesPath, 'bin', 'PresentMon.exe');
  
  try {
    presentMonProcess = spawn(presentMonPath, [
      '-output_stdout',
      '-dont_restart_as_admin',
      '-terminate_after_proc',
      '-process_name', 'all'
    ]);

    let buffer = '';

    presentMonProcess.stdout?.on('data', (data) => {
      buffer += data.toString();
      
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        try {
          const json = JSON.parse(line);
          if (json.msBetweenPresents) {
            fpsValue = Math.round(1000 / json.msBetweenPresents);
            
            // Send FPS update to overlay
            if (overlayWindow && !overlayWindow.isDestroyed()) {
              overlayWindow.webContents.send('fps-update', fpsValue);
            }
          }
        } catch (e) {
          // Ignore JSON parse errors
        }
      }
    });

    presentMonProcess.on('error', (error) => {
      log.error('PresentMon error:', error);
    });

    presentMonProcess.on('close', (code) => {
      log.info(`PresentMon exited with code ${code}`);
      presentMonProcess = null;
    });

  } catch (error) {
    log.error('Failed to start PresentMon:', error);
  }
}

function getSystemStats(): Promise<typeof systemStats> {
  return new Promise((resolve) => {
    // Mock system stats - in production, use native modules
    systemStats = {
      cpu: Math.random() * 100,
      gpu: Math.random() * 100,
      ram: Math.random() * 100,
      temp: 45 + Math.random() * 40,
      ping: 20 + Math.random() * 50
    };
    
    resolve(systemStats);
  });
}

// IPC Handlers
ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});

ipcMain.handle('get-system-info', async () => {
  const stats = await getSystemStats();
  return {
    ...stats,
    fps: fpsValue,
    platform: process.platform,
    arch: process.arch,
    version: process.getSystemVersion()
  };
});

ipcMain.handle('toggle-fps-overlay', () => {
  toggleFPSOverlay();
  return overlayWindow?.isVisible() || false;
});

ipcMain.handle('get-store-value', (_, key: string) => {
  return store.get(key);
});

ipcMain.handle('set-store-value', (_, key: string, value: any) => {
  store.set(key, value);
});

ipcMain.handle('validate-license', async (_, licenseKey: string) => {
  // Mock license validation - replace with real API
  const demoKeys: Record<string, { tier: number; valid: boolean }> = {
    'NEXUS-PRO-DEMO': { tier: 1, valid: true },
    'NEXUS-PRO-T2-DEMO': { tier: 2, valid: true },
  };
  
  const result = demoKeys[licenseKey];
  return result || { tier: 0, valid: false };
});

ipcMain.on('minimize-window', () => {
  mainWindow?.minimize();
});

ipcMain.on('maximize-window', () => {
  if (mainWindow?.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow?.maximize();
  }
});

ipcMain.on('close-window', () => {
  mainWindow?.close();
});

// App Event Handlers
app.whenReady().then(() => {
  createMainWindow();
  createApplicationMenu();
  
  // Start system monitoring
  startPresentMon();
  
  // Update system stats every 2 seconds
  setInterval(async () => {
    await getSystemStats();
    
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('system-stats-update', {
        ...systemStats,
        fps: fpsValue
      });
    }
  }, 2000);
});

app.on('window-all-closed', () => {
  if (presentMonProcess) {
    presentMonProcess.kill();
  }
  
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

// Security: Prevent new window creation
app.on('web-contents-created', (_, contents) => {
  contents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });
});

// Handle app updates
autoUpdater.on('update-available', () => {
  log.info('Update available');
  mainWindow?.webContents.send('update-available');
});

autoUpdater.on('update-downloaded', () => {
  log.info('Update downloaded');
  mainWindow?.webContents.send('update-downloaded');
});

export { mainWindow, overlayWindow };