'use client'

import '@/styles/settings-screen.css'
import { useState, useEffect } from 'react'

const SettingsScreen = () => {
  const [city, setCity] = useState(
    typeof window !== 'undefined' && localStorage.getItem('city')
      ? localStorage.getItem('city')
      : 'Madrid'
  );

  const [searchingCity, setSearchingCity] = useState(false)
  const [isCorrectLocation, setIsCorrectLocation] = useState(null)

  useEffect(() => {
    setIsCorrectLocation(null)
  }, [])
  
  const handleCityChange = (event) => {
    setCity(event.target.value)
  }

  const submitLocation = () => {
    if(checkLocation(city))
      localStorage.setItem('city', city)
  }

  const checkLocation = async () => {
    setSearchingCity(true)
    const res = await fetch(
      `https://django-weather-api.vercel.app/api/weather/?localizacion=${city}`
    )
    setSearchingCity(false)
    if (res.ok) {
      setIsCorrectLocation(true)
      return true
    } else {
      setIsCorrectLocation(false)
      return false
    }
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
      <button onClick={submitLocation} type="submit" id='submit-location-button' className={isCorrectLocation == true ? 'correct' : (isCorrectLocation == false ? 'incorrect' : '')}>
        {searchingCity ? 'Buscando...' : 'Buscar'}
      </button>
    </div>
  )
}

export default SettingsScreen
