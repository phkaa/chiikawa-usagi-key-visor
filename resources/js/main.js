const { ipcRenderer } = require('electron')
const characterImage = document.getElementById('character')

let lastKeyWasLeft = false

const CHARACTER_STATES = {
  idle: {
    img: './imgs/idle.png',
    timeout: 0.5 * 1000,
    timer: null,
  },
  fire: {
    img: './imgs/fire.png',
    timeout: 10 * 1000,
    timer: null,
  },
  sleeping: {
    img: './imgs/sleeping.png',
    timeout: 30 * 1000,
    timer: null,
  },
}

const MOVE_IMGS = {
  LEFT: './imgs/left.png',
  RIGHT: './imgs/right.png',
}
// 2. 등록된 모든 상태의 타이머를 일괄 초기화
const clearAllTimers = () => {
  Object.values(CHARACTER_STATES).forEach((state) => {
    if (state.timer) {
      clearTimeout(state.timer)
      state.timer = null
    }
  })
}

const setAllTimers = () => {
  Object.values(CHARACTER_STATES).forEach((state) => {
    state.timer = setTimeout(() => {
      characterImage.src = state.img
      lastKeyWasLeft = false
    }, state.timeout)
  })
}

const handleKeyPress = (keyCode) => {
  lastKeyWasLeft = !lastKeyWasLeft
  characterImage.src = lastKeyWasLeft ? MOVE_IMGS.LEFT : MOVE_IMGS.RIGHT

  clearAllTimers()
  setAllTimers()
}

ipcRenderer.on('key-press', (event, keyCode) => {
  handleKeyPress(keyCode)
})