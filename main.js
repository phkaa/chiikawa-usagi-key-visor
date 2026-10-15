const { app, BrowserWindow, Tray, Menu } = require('electron')
const { uIOhook } = require('uiohook-napi')

let mainWindow
let tray
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

  mainWindow.setAlwaysOnTop(true, 'screen-saver')
  mainWindow.loadFile(MAIN_HTML)

  return mainWindow
}

const createTray = () => {
  const tray = new Tray(ICON_IMG)

  return tray
}

const createTrayMenu = (app, tray) => {
  const contextMenu = Menu.buildFromTemplate([
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
  createTrayMenu(app, tray)
  createAppEvents(app, mainWindow)
  createKeyboardListener(mainWindow)
})
