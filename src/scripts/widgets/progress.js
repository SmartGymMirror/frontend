let selectedSerie = CHART.DATA_SERIES.WEIGHT2

const groupDataBy = (data, type) => {
  const grouped = {}
  switch (type) {
    case 'daily':
      data.forEach(item => {
        const date = new Date(item.date)
        const day = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        if (!grouped[day]) {
          grouped[day] = []
        }
        grouped[day].push(item.value)
      })
      break
    case 'weekly':
      data.forEach(item => {
        const date = new Date(item.date)
        const weekNumber = getWeekNumber(date)
        if (!grouped[weekNumber]) {
          grouped[weekNumber] = []
        }
        grouped[weekNumber].push(item.value)
      })
      break
    case 'monthly':
      data.forEach(item => {
        const date = new Date(item.date)
        const year = date.getFullYear()
        const month = date.getMonth()
        const key = `${LITERAL_MONTHS[month]} ${year}`
        if (!grouped[key]) {
          grouped[key] = []
        }
        grouped[key].push(item.value)
      })
      break
    default:
      break
  }

  return grouped
}

const getWeekNumber = (date) => {
  const onejan = new Date(date.getFullYear(), 0, 1)
  const dayOffset = onejan.getDay() === 0 ? 7 : onejan.getDay()
  const firstMonday = new Date(date.getFullYear(), 0, 1 + (7 - dayOffset + 1))
  const weekNumber = Math.ceil(((date - firstMonday) / 86400000 + 1) / 7)

  return weekNumber
}

const calculateAverages = (groupedData) => {
  const averages = {}
  for (const [key, values] of Object.entries(groupedData)) {
    const sum = values.reduce((acc, val) => acc + val, 0)
    averages[key] = Math.round(sum * 100 / values.length) / 100
  }
  return averages
}

const updateChart = (myChart, interval, range) => {
  const newData = calculateAverages(groupDataBy(selectedSerie.SERIE.slice(0, range * 7), interval))

  let selectedData = Object.entries(newData).map(([key, value]) => {
    const formatter = CHART.SETTINGS.AXIS_FORMATS[interval]
    return formatter ? formatter(key, value) : null
  }).filter(Boolean)

  myChart.data.datasets = [
    {
      label: selectedSerie.LABEL,
      data: selectedData,
      borderColor: 'white',
      pointBackgroundColor: `${selectedSerie.PRIMARY_COLOR}`,
      pointBorderColor: `${selectedSerie.PRIMARY_COLOR}`,
      backgroundColor: `${selectedSerie.FILL_COLOR}`,
      borderWidth: 3,
      fill: true,
      lineTension: 0.2,
      pointRadius: 8,
    }
  ]

  yAxisMin = Math.round(Math.min(...selectedData.map(dataPoint => dataPoint.y)))
  yAxisMax = Math.round(Math.max(...selectedData.map(dataPoint => dataPoint.y)))
  myChart.options.scales = {
    y: {
      beginAtZero: false,
      min: yAxisMin - 1,
      max: yAxisMax + 1,
      stepSize: 0.5
    }
  }

  myChart.options = {
    scales: {
      x: {
        grid: {
          color: 'rgba(255,255,255,0.2)',
        },
        ticks: {
          color: 'white'
        }
      },
      y: {
        grid: {
          color: 'rgba(255,255,255,0.2)',
        },
        ticks: {
          color: 'white'
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'white',
        }
      }
    }
  }

  myChart.update()
}

const updateChartAndRangeValue = (myChart, selectedInterval, selectedRange) => {
  document.getElementById('time-range-value').textContent = `${selectedRange} ${selectedRange > 1 ? 'semanas' : 'semana'
    }`
  updateChart(myChart, selectedInterval, selectedRange)
}

const initFiltersHandler = (myChart) => {
  const dataSelector = document.getElementById('serie-select')
  dataSelector.addEventListener('change', () => {
    const selectedDataSerie = dataSelector.value
    switch (selectedDataSerie) {
      case 'weight':
        selectedSerie = CHART.DATA_SERIES.WEIGHT
        break
      case 'muscle':
        selectedSerie = CHART.DATA_SERIES.MUSCLE_MASS
        break
      case 'fat':
        selectedSerie = CHART.DATA_SERIES.BODY_FAT
        break
      default:
        break
    }
    redrawChart(myChart)
  })

  const intervalSelect = document.getElementById('interval-select')
  intervalSelect.addEventListener('change', () => {
    const selectedInterval = intervalSelect.value
    const selectedRange = document.getElementById('time-range').value
    updateChartAndRangeValue(myChart, selectedInterval, selectedRange)
  })

  const rangeSelector = document.getElementById('time-range')
  rangeSelector.addEventListener('input', () => {
    const selectedInterval = intervalSelect.value
    const selectedRange = rangeSelector.value
    updateChartAndRangeValue(myChart, selectedInterval, selectedRange)
  })
}

function redrawChart(myChart) {
  const totalWeeks = Math.ceil(selectedSerie.SERIE.length / 7)
  const rangeSelector = document.getElementById('time-range')
  const intervalSelector = document.getElementById('interval-select')
  intervalSelector.selectedIndex = 1
  rangeSelector.max = totalWeeks
  rangeSelector.value = totalWeeks
  updateChartAndRangeValue(myChart, 'weekly', totalWeeks)
}

const runProgress = () => {
  const chartCanvas = document.getElementById('main-chart')
  const chartContext = chartCanvas.getContext('2d')

  if (window.myChart) {
    window.myChart.destroy()
  }

  const myChart = new Chart(chartContext, {
    type: 'line',
    data: {
      labels: [],
      datasets: []
    }
  })

  window.myChart = myChart

  initFiltersHandler(myChart)
  redrawChart(myChart)
}
