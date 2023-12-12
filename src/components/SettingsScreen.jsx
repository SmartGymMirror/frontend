'use client'

import '@/styles/settings-screen.css'
import { useState, useEffect } from 'react'

const SettingsScreen = ({city, setCity, validCity, setValidCity}) => {
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
    setSearchState(searchingStates.buscar)
  }

  const submitLocation = () => {
    checkLocation(city)
    localStorage.setItem('city', city)
  }

  const checkLocation = async () => {
    setSearchState(searchingStates.buscando)
    try{

      const res = await fetch(`https://django-weather-api.vercel.app/api/weather/?localizacion=${city}`)
      const json = await res.json()
      if (json['message'] === 'city not found'){
        setSearchState(searchingStates.error)
        setValidCity(false)
      }
      else{
        setSearchState(searchingStates.encontrado)
        setValidCity(true)
      }
    }catch (error){
      console.error(error)
      setSearchState(searchingStates.error)
      setValidCity(false)
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
