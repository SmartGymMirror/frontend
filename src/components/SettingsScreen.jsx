'use client'

import '@/styles/settings-screen.css'
import { useState } from 'react'

const SettingsScreen = () => {
  const [city, setCity] = useState(
    typeof window !== 'undefined' && localStorage.getItem('city')
      ? localStorage.getItem('city')
      : 'Madrid'
  );
  

  const handleCityChange = (event) => {
    setCity(event.target.value)
  }

  const submitLocation = () => {
    console.log(`ciudad a consultar: ${city}`)
    localStorage.setItem('city', city)
  }

  return (
    <div className="settings-screen-container">
      <h1>AJUSTES</h1>
      <label>Ciudad a consultar</label>
      <input
        type="text"
        value={city}
        onChange={handleCityChange}
        placeholder="Ingrese la ciudad"
      />
      <button onClick={submitLocation} type="submit" id='submit-location-button'>
        Consultar
      </button>
    </div>
  )
}

export default SettingsScreen
