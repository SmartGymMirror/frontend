'use client'

import '@/styles/weather-screen.css'
import { useEffect, useState } from 'react'

const WeatherScreen = () => {

  const [city, setCity] = useState('Madrid')

  useEffect(() => {
    const storedCity = localStorage.getItem('city');
    if (typeof window !== 'undefined' && storedCity) {
      setCity(storedCity);
    }
  }, []);

  const [loadingWeatherInfo, setLoadingWeatherInfo] = useState(true)

  const [weatherInfo, setWeatherInfo] = useState('')

  useEffect(() => {
    const fetchWeather = async () => {
      setLoadingWeatherInfo(true)
      try {
        const res = await fetch(
          `https://django-weather-api.vercel.app/api/weather/?localizacion=${city}`
        )
        if (res.ok) {
          const data = await res.json()
          setWeatherInfo(data)
          setLoadingWeatherInfo(false)
        } else {
          throw new Error('Failed to fetch')
        }
      } catch (error) {
        console.error('Error fetching weather data:', error)
      }
    }

    fetchWeather()
  }, [])

  return (
    <div className="weather-screen-container">
      <h1>Pronóstico meteorológico</h1>
      <h2>Ciudad actual: {city}</h2>
      <div className="pronostico-meteorologico">
        {loadingWeatherInfo ? (
          'Cargando...'
        ) : (
          <>
            <div className="left-data">
              <p>
                Temperatura actual:{' '}
                {weatherInfo?.main?.temp
                  ? `${weatherInfo.main.temp} ºC`
                  : 'Buscando...'}
              </p>
              <p>
                Temperatura máxima:{' '}
                {weatherInfo?.main?.temp_max
                  ? `${weatherInfo.main.temp_max} ºC`
                  : 'Buscando...'}
              </p>
              <p>
                Temperatura mínima:{' '}
                {weatherInfo?.main?.temp_min
                  ? `${weatherInfo.main.temp_min} ºC`
                  : 'Buscando...'}
              </p>
              <p>
                Sensación térmica:{' '}
                {weatherInfo?.main?.feels_like
                  ? `${weatherInfo.main.feels_like} ºC`
                  : 'Buscando...'}
              </p>
            </div>
            <div className="right-data">
{/*               <p>
                Descripción:{' '}
                {weatherInfo?.weather
                  ? weatherInfo.weather[0].description
                  : 'Buscando...'}
              </p> */}
              <p>
                Humedad:{' '}
                {weatherInfo?.main?.humidity
                  ? `${weatherInfo.main.humidity} %`
                  : 'Buscando...'}
              </p>
              <p>
                Presión:{' '}
                {weatherInfo?.main?.pressure
                  ? `${weatherInfo.main.pressure} hPa`
                  : 'Buscando...'}
              </p>
              <p>
                Viento:{' '}
                {weatherInfo?.wind?.speed
                  ? `${weatherInfo.wind.speed} m/s`
                  : 'Buscando...'}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default WeatherScreen
