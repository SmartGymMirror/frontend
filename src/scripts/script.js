window.addEventListener('load', () => {
  const body = document.querySelector('body')
  body.className = 'visible'

  const hora = document.getElementById("hora")
  const minuto = document.getElementById("minuto")
  const segundo = document.getElementById("segundo")
  const segundero = document.getElementById("segundero")
  const minutero = document.getElementById("minutero")
  const horario = document.getElementById("horario")
  const fecha = document.getElementById("fecha")

  handleScreenClick()

  loadTimestamp()

  setInterval(updateTime, 1000)
});

const handleScreenClick = () => {
  const screenClicker = document.getElementById("screen-clicker")
  const body = document.querySelector('body')
  screenClicker.addEventListener('click', () => {
    body.className = 'hidden'
    setTimeout(() => {window.location.replace('/home')}, 1000)
  })
}

const updateTime = () => {
  const fechaActual = new Date()
  const horaActual = fechaActual.getHours().toString().padStart(2, '0')
  const minutoActual = fechaActual.getMinutes().toString().padStart(2, '0')
  const segundoActual = fechaActual.getSeconds().toString().padStart(2, '0')

  hora.innerText = horaActual
  minuto.innerText = minutoActual
  segundo.innerText = segundoActual
  segundero.style.transform = `rotate(${fechaActual.getSeconds() * 6}deg)`
  minutero.style.transform = `rotate(${fechaActual.getMinutes() * 6}deg)`
  horario.style.transform = `rotate(${fechaActual.getHours() * 30 + Math.round(fechaActual.getMinutes() * 0.5)}deg)`
}

const loadTimestamp = () => {
  const fechaActual = new Date()
  const dia = fechaActual.getDate()
  const mes = fechaActual.getMonth()
  const año = fechaActual.getFullYear()

  const mesEnLetras = LITERAL_MONTHS[mes]

  fecha.innerText = `${dia} de ${mesEnLetras} de ${año}`
}