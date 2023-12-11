'use client'

import ChartScreen from '@/components/ChartScreen'
import SettingsScreen from '@/components/SettingsScreen'
import WeatherScreen from '@/components/WeatherScreen'
import Widget from '@/components/Widget'
import '@/styles/mirror.css'
import { useState } from 'react'

const Mirror = () => {
  const widgets = {
    weather: { src: '/icons/weather.svg', component: WeatherScreen},
    progress: { src: '/icons/chart.svg', component: ChartScreen},
    settings: { src: '/icons/settings.svg', component: SettingsScreen},
  }

  const [activeWidget, setActiveWidget] = useState(widgets.weather)

  const renderActiveScreen = () => {
    const ScreenComponent = activeWidget.component
    return <ScreenComponent />
  }

  return (
    <div className="mirror-container">
      <div className="screen-container">
        {renderActiveScreen()}
      </div>
      <div className="widgets-container">
        <Widget widget={widgets.weather} activeWidget={setActiveWidget}/>
        <Widget widget={widgets.progress} activeWidget={setActiveWidget}/>
        <Widget widget={widgets.settings} activeWidget={setActiveWidget}/>
      </div>
    </div>
  )
}

export default Mirror
