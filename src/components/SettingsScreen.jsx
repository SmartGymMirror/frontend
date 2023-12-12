'use client'

import '@/styles/settings-screen.css'
import { useState, useEffect } from 'react'

const SettingsScreen = () => {
  const searchingStates = {
    buscar: 'buscar',
    buscando: 'buscando',
    encontrado: 'encontrado',
    error: 'error',
  }

  const [currentCity, setCurrentCity] = useState('')

  const [searchState, setSearchState] = useState(searchingStates.buscar)
  
  const handleCityChange = (event) => {
    setCurrentCity(event.target.value)
    setSearchState(searchingStates.buscar)
  }



  const checkLocation = async () => {
    setSearchState(searchingStates.buscando)
    try{

      const res = await fetch(`https://django-weather-api.vercel.app/api/weather/?localizacion=${currentCity}`)
      const json = await res.json()
      if (json['message'] === 'city not found'){
        setSearchState(searchingStates.error)
        return false
      }
      else{
        setSearchState(searchingStates.encontrado)
        return true
      }
    }catch (error){
      console.error(error)
      setSearchState(searchingStates.error)
      return false
    }

  }

  const submitLocation = async () => {
    const resultado = await checkLocation(currentCity)
    if(resultado === true){
      localStorage.setItem('city', currentCity)
    }
  }

  return (
    <div className="settings-screen-container">
      <h1>AJUSTES</h1>
      <label>Ciudad a consultar</label>
      <input
        type="text"
        value={currentCity}
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
