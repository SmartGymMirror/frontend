'use server'

function getFormattedDate(timestamp) {
  const date = new Date(timestamp)
  return date.toISOString().split('T')[0]
}

export async function processData(data) {
  const processedData = {}

  data.forEach((entry) => {
    const fecha = getFormattedDate(entry.timestamp)

    if (!processedData[fecha]) {
      processedData[fecha] = {
        fecha,
        weight: [],
        muscular_mass: [],
        body_fat: [],
      }
    }

    if (entry.weight !== null) {
      processedData[fecha].weight.push(parseFloat(entry.weight))
    }
    if (entry.muscular_mass !== null) {
      processedData[fecha].muscular_mass.push(parseFloat(entry.muscular_mass))
    }
    if (entry.body_fat !== null) {
      processedData[fecha].body_fat.push(parseFloat(entry.body_fat))
    }
  })

  const result = []
  for (const fecha in processedData) {
    const values = processedData[fecha]

    const weightAvg =
      values.weight.length > 0
        ? values.weight.reduce((a, b) => a + b, 0) / values.weight.length
        : null
    const massAvg =
      values.muscular_mass.length > 0
        ? values.muscular_mass.reduce((a, b) => a + b, 0) /
          values.muscular_mass.length
        : null
    const fatAvg =
      values.body_fat.length > 0
        ? values.body_fat.reduce((a, b) => a + b, 0) / values.body_fat.length
        : null

    result.push({
      fecha,
      weight: weightAvg,
      muscular_mass: massAvg,
      body_fat: fatAvg,
    })
  }

  return result
}

export const filterData = async (processedData, plotSerie) => {
  const filteredData = processedData
    .filter((entry) => entry[plotSerie] !== null)
    .map((entry) => ({
      day: entry.fecha,
      value: entry[plotSerie],
    }))

  return filteredData
}