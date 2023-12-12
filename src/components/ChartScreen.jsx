'use client'

import '@/styles/chart-screen.css'
import { useEffect, useState } from 'react'
import { Chart } from './Chart'
import { filterData, processData } from '@/utils/progressData'

const ChartScreen = () => {
  const series = ['weight', 'muscular_mass', 'body_fat']

  const [currentSerie, setCurrentSerie] = useState(series[0])
  const [processedData, setProcessedData] = useState([])
  const [plotData, setPlotData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const chartData = await fetch('https://django-weather-api.vercel.app/api/datos-ficticios')
      chartData = await chartData.json()
      const arrangedData = await processData(chartData)
      setProcessedData(arrangedData)
      console.log(arrangedData)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const prepareData = async () => {
      try {
        if (processedData.length !== 0) {
          const filteredData = await filterData(processedData, currentSerie)
          setPlotData(filteredData)
        }
      } catch (error) {
        console.error('Error preparing data:', error)
      }
    }

    prepareData()
  }, [processedData, currentSerie])

  const nextChart = () => {
    const currentIndex = series.indexOf(currentSerie)
    const nextIndex = (currentIndex + 1) % series.length
    setCurrentSerie(series[nextIndex])
  }

  const previousChart = () => {
    const currentIndex = series.indexOf(currentSerie)
    const previousIndex = (currentIndex - 1 + series.length) % series.length
    setCurrentSerie(series[previousIndex])
  }

  return (
    <div className="chart-screen-container">
        <h1>Consulta tu progreso diario</h1>
      <div className='chart-controls'>
        <button onClick={previousChart}>{'<'}</button>
        <button onClick={nextChart}>{'>'}</button>
      </div>
      <div className="grafico-progreso">
        <Chart plotData={plotData} plotSerie={currentSerie} />
      </div>
    </div>
  )
}

export default ChartScreen
