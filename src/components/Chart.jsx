'use client'

import { Line } from 'react-chartjs-2'

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler,
} from 'chart.js'

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler
)

export const Chart = ({ plotData, plotSerie }) => {

  const series = {
    weight: {
      label: 'Peso',
      colors: { main: '#259d93', border: '#1d847e' },
      min: 50,
    },
    muscular_mass: {
      label: 'Masa muscular',
      colors: { main: '#fabe25', border: '#d87607' },
      min: 10,
    },
    body_fat: {
      label: 'Grasa corporal (%)',
      colors: { main: '#da70ff', border: '#c014ff' },
      min: 5,
    },
  }

  const serieData = {
    labels: plotData.map((data) => data.day),
    datasets: [
      {
        label: series[plotSerie].label,
        data: plotData.map((data) => data.value),
        borderColor: series[plotSerie].colors.border,
        borderWidth: 3,
        pointBorderColor: series[plotSerie].colors.border,
        pointBorderWidth: 3,
        pointHoverRadius: 10,
        pointHitRadius: 10,
        pointRadius: 6,
        tension: 0.3,
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx
          const gradient = ctx.createLinearGradient(0, 0, 0, 300)
          gradient.addColorStop(0, series[plotSerie].colors.main)
          gradient.addColorStop(1, 'rgba(255,255,255,0.3)')
          return gradient
        },
      },
    ],
  }

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          font: {
            size: 30,
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          font: {
            size: 15,
          },
        },
        title: {
          display: true,
          text: '',
          padding: {
            bottom: 10,
          },
          font: {
            size: 30,
            style: 'italic',
            family: 'Arial',
          },
        },
        min: series[plotSerie].min,
      },
      x: {
        ticks: {
          font: {
            size: 15,
          },
        },
        title: {
          display: true,
          text: '',
          padding: {
            top: 10,
          },
          font: {
            size: 30,
            style: 'italic',
            family: 'Arial',
          },
        },
      },
    },
  }

  return <Line data={serieData} options={options}></Line>
}
