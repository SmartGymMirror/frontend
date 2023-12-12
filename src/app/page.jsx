'use client'

import { Logo } from '@/components/Logo'
import '@/styles/home.css'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const Home = () => {
  const LITERAL_MONTHS = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']
  const [fecha, setFecha] = useState('')
  const [hora, setHora] = useState('')
  const [minuto, setMinuto] = useState('')
  const [segundo, setSegundo] = useState('')

  useEffect(() => {
    setInterval(() => {
      const fechaActual = new Date()
      const dia = fechaActual.getDate()
      const mes = fechaActual.getMonth()
      const año = fechaActual.getFullYear()
      const horaActual = fechaActual.getHours().toString().padStart(2, '0')
      const minutoActual = fechaActual.getMinutes().toString().padStart(2, '0')
      const segundoActual = fechaActual.getSeconds().toString().padStart(2, '0')

      const mesEnLetras = LITERAL_MONTHS[mes]
      setHora(horaActual)
      setMinuto(minutoActual)
      setSegundo(segundoActual)

      const fechaLiteral = `${dia} de ${mesEnLetras} de ${año}`
      setFecha(fechaLiteral)
    }, 1000)
  }, [])

  const router = useRouter()
  const goToMirror = () => {
    router.push('/mirror')
  }

  return (
    <div className="home-container">
      <div id="fecha">{fecha}</div>
      <div id="logo-container" onClick={goToMirror}>
        <Logo />
      </div>
      <div id="reloj-digital">
        <span id="hora">{hora !== '' ? hora : '00'}</span>:<span id="minuto">{minuto !== '' ? minuto : '00'}</span>:
        <span id="segundo">{segundo !== '' ? segundo : '00'}</span>
      </div>
    </div>
  )
}

export default Home
