const { app, BrowserWindow, Tray, Menu, nativeImage  } = require('electron')
const { uIOhook } = require('uiohook-napi')

let mainWindow
let tray
let isPositionLocked = false
let currentOpacity = 1.0

const ICON_IMG = './resources/imgs/icon.png'
const MAIN_HTML = './resources/main.html'

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 300,
    height: 300,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  mainWindow.setIgnoreMouseEvents(isPositionLocked)
  mainWindow.setAlwaysOnTop(true, 'screen-saver')
  mainWindow.loadFile(MAIN_HTML)

  return mainWindow
}

const setWindowOpacity = (app, tray, mainWindow, opacity) => {
  currentOpacity = opacity

  if (mainWindow) {
    mainWindow.setOpacity(opacity)
  }

  createTrayMenu(app, tray, mainWindow)
}

const createTray = () => {
  const tray = new Tray(ICON_IMG)

  return tray
}

const createTrayMenu = (app, tray, mainWindow) => {
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Opacity',
      type: 'submenu',
      submenu: [
        {
          label: '100% (default)',
          type: 'checkbox',
          checked: currentOpacity === 1.0,
          click: () => setWindowOpacity(app, tray, mainWindow, 1.0)
        },
        {
          label: '80%',
          type: 'checkbox',
          checked: currentOpacity === 0.8,
          click: () => setWindowOpacity(app, tray, mainWindow, 0.8)
        },
        {
          label: '50%',
          type: 'checkbox',
          checked: currentOpacity === 0.5,
          click: () => setWindowOpacity(app, tray, mainWindow, 0.5)
        },
        {
          label: '30%',
          type: 'checkbox',
          checked: currentOpacity === 0.3,
          click: () => setWindowOpacity(app, tray, mainWindow, 0.3)
        }
      ]
    },
    {
      label: 'Lock position',
      click: (menuItem) => {
        isPositionLocked = !isPositionLocked
        
        if (isPositionLocked) {
          mainWindow.setIgnoreMouseEvents(true, { forward: true })
        } else {
          mainWindow.setIgnoreMouseEvents(false)
        }

        menuItem.label = isPositionLocked ? 'Unlock position' : 'Lock position'
      }
    },
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => {
        app.quit()
      }
    }
  ])

  if (tray) {
    tray.setToolTip('Key Visor')
    tray.setContextMenu(contextMenu)
  }
}

const createAppEvents = (app, mainWindow) => {
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      mainWindow = createWindow()
    }
  })

  app.on('will-quit', () => {
    uIOhook.stop()
  })

  app.on('window-all-closed', (e) => {
    e.preventDefault()
  })
}

const createKeyboardListener = (mainWindow) => {
  uIOhook.on('keydown', (event) => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      const keyCode = event.keycode
      mainWindow.webContents.send('key-press', keyCode)
    }
  })

  uIOhook.start()
}

app.whenReady().then(() => {
  mainWindow = createWindow()
  tray = createTray()
  createTrayMenu(app, tray, mainWindow)
  createAppEvents(app, mainWindow)
  createKeyboardListener(mainWindow)
})
