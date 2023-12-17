'use client'

import '@/styles/mirror.css'
import ChartScreen from '@/components/ChartScreen'
import SettingsScreen from '@/components/SettingsScreen'
import WeatherScreen from '@/components/WeatherScreen'
import Widget from '@/components/Widget'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

const SUSPENSION_DELAY = 20000

const Mirror = () => {
  const router = useRouter()
  const redirectTimer = useRef(null)

  const redirectToStandby = () => {
    router.push('/')
  }

  const resetTimer = () => {
    console.log('reset timer')
    if (redirectTimer.current) {
      clearTimeout(redirectTimer.current)
    }
    redirectTimer.current = setTimeout(redirectToStandby, SUSPENSION_DELAY)
  }

  const handleInteraction = () => {
    resetTimer()
  }

  useEffect(() => {
    resetTimer()

      window.addEventListener('ontouchstart', handleInteraction)
      window.addEventListener('keydown', handleInteraction)
      window.addEventListener('click', handleInteraction)

    return () => {
      if (redirectTimer.current) {
        clearTimeout(redirectTimer.current)
      }
      window.removeEventListener('ontouchstart', handleInteraction)
      window.removeEventListener('keydown', handleInteraction)
      window.removeEventListener('click', handleInteraction)
    }
  }, [router])

  const widgets = {
    weather: { src: '/icons/weather.svg', component: WeatherScreen },
    progress: { src: '/icons/chart.svg', component: ChartScreen },
    settings: { src: '/icons/settings.svg', component: SettingsScreen },
  }

  const [activeWidget, setActiveWidget] = useState(widgets.weather)

  const renderActiveScreen = () => {
    const ScreenComponent = activeWidget.component
    return (
      <ScreenComponent />
    )
  }

  return (
    <div className="mirror-container">
      <div className="screen-container">
        {renderActiveScreen()}
      </div>
      <div className="widgets-container">
        <Widget widget={widgets.weather} activeWidget={setActiveWidget} />
        <Widget widget={widgets.progress} activeWidget={setActiveWidget} />
        <Widget widget={widgets.settings} activeWidget={setActiveWidget} />
      </div>
    </div>
  )
}

export default Mirror
