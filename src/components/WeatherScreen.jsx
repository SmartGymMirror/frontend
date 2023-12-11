'use client'

import '@/styles/weather-screen.css'
import { useEffect, useState } from "react"

const WeatherScreen = () => {
  const [city, setCity] = useState(
    typeof window !== 'undefined' && localStorage.getItem('city')
      ? localStorage.getItem('city')
      : 'Madrid'
  );
  
  const [weatherInfo, setWeatherInfo] = useState('')

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(`https://vercel.com/smart-gym-mirror/django-weather-api/7g5qmfdxLxePXhPzXDbHq1A28UZ4/api/weather/?localizacion=${city}`)
        if (res.ok) {
          const data = await res.json()
          setWeatherInfo(JSON.stringify(data))
        } else {
          throw new Error('Failed to fetch')
        }
      } catch (error) {
        console.error('Error fetching weather data:', error)
      }
    }

    fetchWeather()
  }, [city])

  return (
    <div className="weather-screen-container">
      <h1>Pronóstico meteorológico</h1>
      <h2>Ciudad actual: {city}</h2>
      <h3>Pronóstico: {weatherInfo}</h3>
    </div>
  )
}

export default WeatherScreen
