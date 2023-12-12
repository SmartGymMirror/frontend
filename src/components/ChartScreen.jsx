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
      const chartData = [
        {
          timestamp: '2023-12-11T08:18:20.665807Z',
          weight: '70.00',
          muscular_mass: '35.00',
          body_fat: '15.60',
        },
        {
          timestamp: '2023-12-12T08:18:34.566000Z',
          weight: '70.50',
          muscular_mass: '35.50',
          body_fat: '16.00',
        },
        {
          timestamp: '2023-12-13T08:18:49.527000Z',
          weight: '72.50',
          muscular_mass: '30.50',
          body_fat: '14.00',
        },
        {
          timestamp: '2023-12-14T08:18:59.103000Z',
          weight: '72.50',
          muscular_mass: '36.00',
          body_fat: '14.00',
        },
        {
          timestamp: '2023-12-15T08:19:07.082000Z',
          weight: '72.50',
          muscular_mass: '40.00',
          body_fat: '16.20',
        },
      ]
      const arrangedData = await processData(chartData)
      setProcessedData(arrangedData)
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
      <div className="grafico-progreso">
        <Chart plotData={plotData} plotSerie={currentSerie} />
      </div>
    </div>
  )
}

export default ChartScreen
