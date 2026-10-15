const { ipcRenderer } = require('electron')
const characterImage = document.getElementById('character')

let lastKeyWasLeft = false
let idleTimer = null
let fireTimer = null

const IDLE_TIMEOUT = 0.5 * 1000
const FIRE_TIMEOUT = 3 * 1000

const ACTION_IMGS = {
  IDLE: './imgs/idle.png',
  LEFT: './imgs/left.png',
  RIGHT: './imgs/right.png',
  FIRE: './imgs/fire.png',
}

const handleKeyPress = (keyCode) => {
  lastKeyWasLeft = !lastKeyWasLeft
  characterImage.src = lastKeyWasLeft ? ACTION_IMGS.LEFT : ACTION_IMGS.RIGHT

  if (idleTimer) {
    clearTimeout(idleTimer)
  }

  if (fireTimer) {
    clearTimeout(fireTimer)
  }

  idleTimer = setTimeout(() => {
    characterImage.src = ACTION_IMGS.IDLE
    lastKeyWasLeft = false
  }, IDLE_TIMEOUT)

  fireTimer = setTimeout(() => {
    characterImage.src = ACTION_IMGS.FIRE
    lastKeyWasLeft = false
  }, FIRE_TIMEOUT)
}

ipcRenderer.on('key-press', (event, keyCode) => {
  handleKeyPress(keyCode)
})