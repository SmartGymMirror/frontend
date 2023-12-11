window.addEventListener('load', () => {
  const body = document.querySelector('body')
  body.className = 'visible'

  initLocalStorage()

  initWidgets()

  handleStandby()
  
//  setInterval(updateTime, 1000)

})

/* const updateTime = () => {
  const hour = document.getElementById("hora")
  const minute = document.getElementById("minuto")
  const second = document.getElementById("segundo")
  const currentDate = new Date()
  const currentHour = currentDate.getHours().toString().padStart(2, '0')
  const currentMinute = currentDate.getMinutes().toString().padStart(2, '0')
  const currentSecond = currentDate.getSeconds().toString().padStart(2, '0')

  hour.innerText = currentHour
  minute.innerText = currentMinute
  second.innerText = currentSecond
}
 */