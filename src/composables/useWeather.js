import { ref } from 'vue'
import axios from 'axios'

export function useWeather() {
  const weatherData = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // OpenWeatherMap API Key - .env dosyasından okunur
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

  const fetchWeather = async (location) => {
    loading.value = true
    error.value = null
    weatherData.value = null

    try {
      let params = {
        appid: API_KEY,
        units: 'metric',
        lang: 'tr'
      }

      // Location object (lat/lon) or string (city name)
      if (typeof location === 'object') {
        params.lat = location.lat
        params.lon = location.lon
      } else {
        params.q = location
      }

      const response = await axios.get(BASE_URL, { params })

      weatherData.value = {
        city: response.data.name,
        temp: response.data.main.temp,
        feelsLike: response.data.main.feels_like,
        condition: response.data.weather[0].main,
        description: response.data.weather[0].description,
        humidity: response.data.main.humidity,
        windSpeed: response.data.wind.speed,
        isRaining: response.data.weather[0].main.toLowerCase().includes('rain'),
        isSnowing: response.data.weather[0].main.toLowerCase().includes('snow')
      }
    } catch (err) {
      if (err.response?.status === 401) {
        error.value = 'API key geçersiz. Lütfen kendi OpenWeatherMap API key\'inizi ekleyin.'
      } else if (err.response?.status === 404) {
        error.value = 'Şehir bulunamadı. Lütfen farklı bir şehir deneyin.'
      } else {
        error.value = 'Hava durumu bilgisi alınamadı. Lütfen tekrar deneyin.'
      }
      console.error('Weather API Error:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    weatherData,
    loading,
    error,
    fetchWeather
  }
}
