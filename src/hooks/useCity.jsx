import {useState} from 'react'

export const useCity = () => {
  const [city, setCity] = useState('Madrid')

  return {city, setCity}
}
