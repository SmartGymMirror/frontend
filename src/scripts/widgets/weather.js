const isValidLocation = async (location) => {
  if (location === null || location === undefined) {
    return false
  }

  try{
    const apiResponse = await fetch(`https://vercel.com/smart-gym-mirror/django-weather-api/5pZFsR119Fy3WjHwUPxzB5G23F6X/api/weather/?localizacion=${location}`)
    const json = await apiResponse.json()
    return json.cod === WEATHER_API.VALID_LOCATION_CODE
  }catch (error){
    return false
  }
}

const runWeather = (weatherWindow) => {
  let validLocation = false

  isValidLocation(localStorage.getItem('weather-city'))
  .then((result) => {
    validLocation = result
    const city = validLocation ? localStorage.getItem('weather-city') : WEATHER_API.DEFAULT_LOCATION
    weatherWindow.style.setProperty("--bg-img",`url('https://source.unsplash.com/1400x700/?"${city}"')`)
    const apiUrl = `${WEATHER_API.API_ENDPOINT}&lang=es&q=${city}&appid=${WEATHER_API.API_KEY}`
    return fetch(apiUrl)
  })
  .then(body => body.json())
  .then(data => {
    const {name} = data
    const {icon, description} = data.weather[0]
    const {temp, humidity} = data.main
    const {speed} = data.wind
    const cityElement = document.getElementById('weather-city')
    const temperatureElement = document.getElementById('weather-temperature')
    const iconElement = document.getElementById('weather-icon')
    const castElement = document.getElementById('weather-cast')
    const humidityElement = document.getElementById('weather-humidity')
    const windElement = document.getElementById('weather-wind')
    cityElement.innerText = validLocation ? `${name}` : `${name} (default)`
    temperatureElement.innerText = temp
    iconElement.src = `https://openweathermap.org/img/wn/${icon}@2x.png`
    castElement.innerText = description.charAt(0).toUpperCase() + description.slice(1);
    humidityElement.innerText = humidity
    windElement.innerText = speed
  })
}