const initLocationFinder = (inputElement, buttonElement) => {
  buttonElement.className = ''
  const lastCity = localStorage.getItem('weather-city')
  isValidLocation(lastCity)
  .then(isValid => {
    inputElement.value = isValid ? lastCity : ''
  })
}

const handleLocationChange = (event, buttonElement) => {
  const {value} = event.target
  buttonElement.className = ''
  if(event.key === 'Enter'){
    event.preventDefault()
    submitLocation(event.target, buttonElement)
  }
  if (value.length === 0) {
    localStorage.removeItem('weather-city')
  }
}

const submitLocation = (inputElement, buttonElement) => {
  const currentCity = inputElement.value
  
  isValidLocation(currentCity)
  .then(isValid => {
    if (isValid) {
      localStorage.setItem('weather-city',currentCity)
      buttonElement.className = 'check'
    }else{
      buttonElement.className = 'cross'
    }
  })
}

const runSettings = () => {
  const inputElement = document.getElementById('location-input')
  const validateLocationButton = document.getElementById('validate-location-button')
  initLocationFinder(inputElement, validateLocationButton)
  inputElement.addEventListener('keydown', (event) => {handleLocationChange(event, validateLocationButton)})
  validateLocationButton.addEventListener('click', () => {submitLocation(inputElement, validateLocationButton)})
}