<script setup>
import { onMounted, ref } from 'vue'
import LocationInput from './components/LocationInput.vue'
import WeatherCard from './components/WeatherCard.vue'
import OutfitSuggestion from './components/OutfitSuggestion.vue'
import { useWeather } from './composables/useWeather'

const { weatherData, loading, error, fetchWeather } = useWeather()
const showResult = ref(false)
const geolocationSupported = typeof navigator !== 'undefined' && 'geolocation' in navigator

const handleLocationSubmit = async (city) => {
  showResult.value = false
  await fetchWeather(city)
  if (weatherData.value) {
    showResult.value = true
  }
}

const tryAutoLocation = () => {
  if (!geolocationSupported) return

  navigator.geolocation.getCurrentPosition(
    (position) => {
      handleLocationSubmit({
        lat: position.coords.latitude,
        lon: position.coords.longitude
      })
    },
    (geoError) => {
      error.value = `Konum alınamadı: ${geoError.message}`
    }
  )
}

onMounted(() => {
  tryAutoLocation()
})
</script>

<template>
  <div class="app">
    <div class="container">
      <header class="header">
        <h1 class="title">👔 Bugün Ne Giyeyim?</h1>
        <p class="subtitle">Hava durumuna göre kıyafet önerisi al!</p>
      </header>

      <LocationInput @submit="handleLocationSubmit" :loading="loading" />

      <div v-if="error" class="error-message">
        ⚠️ {{ error }}
      </div>

      <transition name="fade">
        <div v-if="showResult && weatherData" class="results">
          <WeatherCard :weather="weatherData" />
          <OutfitSuggestion :weather="weatherData" />
        </div>
      </transition>
    </div>

    <footer class="footer">
      <p class="credit">
        Developed by
        <a href="https://kayacuneyt.com" target="_blank" rel="noreferrer noopener">Cüneyt Kaya</a>
        · Built in Kornwestheim
      </p>
    </footer>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 1rem;
}

.container {
  max-width: 600px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
  color: white;
}

.footer {
  text-align: center;
  margin-top: 3rem;
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.95rem;
}

.credit a {
  color: white;
  font-weight: 600;
  text-decoration: none;
}

.credit a:hover {
  text-decoration: underline;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
}

.error-message {
  background: #ff6b6b;
  color: white;
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 500;
}

.results {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@media (max-width: 640px) {
  .title {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
}
</style>
