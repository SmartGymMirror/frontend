'use client'

import '@/styles/settings-screen.css'
import { useState, useEffect } from 'react'

const SettingsScreen = () => {
  const [city, setCity] = useState(
    typeof window !== 'undefined' && localStorage.getItem('city')
      ? localStorage.getItem('city')
      : 'Madrid'
  );

  const searchingStates = {
    buscar: 'buscar',
    buscando: 'buscando',
    encontrado: 'encontrado',
    error: 'error',
  }

  const [searchState, setSearchState] = useState(searchingStates.buscar)

  useEffect(() => {
    setSearchState(searchingStates.buscar)
  }, [])
  
  const handleCityChange = (event) => {
    setCity(event.target.value)
  }

  const submitLocation = () => {
    if(checkLocation(city))
      localStorage.setItem('city', city)
  }

  const checkLocation = async () => {
    setSearchState(searchingStates.buscando)
    try{

      const res = await fetch(`https://django-weather-api.vercel.app/api/weather/?localizacion=${city}`)
      const json = await res.json
      console.log(json)
      if (res.ok)
        setSearchState(searchingStates.encontrado)
    }catch (error){
      console.error(error)
      setSearchState(searchingStates.error)
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
      <button onClick={submitLocation} type="submit" id='submit-location-button' className={searchState}>
        {searchState}
      </button>
    </div>
  )
}

export default SettingsScreen
