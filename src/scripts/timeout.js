let timeout

const initTimeout = () => {
  timeout = setTimeout(() => {
    const body = document.querySelector('body')
    body.className = 'hidden'
    setTimeout(() => {window.location.replace('/')}, 1000)
  }, STANDBY_TIMEOUT_DELAY*1000)
}

const resetTimeout = () => {
  clearTimeout(timeout)
  initTimeout()
}

const handleStandby = () => {
  const screenClicker = document.getElementById("screen-clicker")

  initTimeout()

  screenClicker.addEventListener('click', () => {
    resetTimeout()
  })  
}