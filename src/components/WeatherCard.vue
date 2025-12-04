<script setup>
const props = defineProps({
  weather: Object
})

const getWeatherEmoji = (condition) => {
  const conditions = {
    clear: '☀️',
    clouds: '☁️',
    rain: '🌧️',
    drizzle: '🌦️',
    thunderstorm: '⛈️',
    snow: '❄️',
    mist: '🌫️',
    fog: '🌫️',
    haze: '🌫️'
  }
  return conditions[condition.toLowerCase()] || '🌤️'
}
</script>

<template>
  <div class="weather-card">
    <div class="weather-header">
      <h2 class="city-name">📍 {{ weather.city }}</h2>
      <div class="weather-emoji">{{ getWeatherEmoji(weather.condition) }}</div>
    </div>

    <div class="weather-main">
      <div class="temperature">{{ Math.round(weather.temp) }}°C</div>
      <div class="feels-like">Hissedilen: {{ Math.round(weather.feelsLike) }}°C</div>
      <div class="condition">{{ weather.description }}</div>
    </div>

    <div class="weather-details">
      <div class="detail-item">
        <span class="detail-icon">💧</span>
        <span class="detail-label">Nem</span>
        <span class="detail-value">{{ weather.humidity }}%</span>
      </div>
      <div class="detail-item">
        <span class="detail-icon">💨</span>
        <span class="detail-label">Rüzgar</span>
        <span class="detail-value">{{ Math.round(weather.windSpeed) }} km/s</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weather-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.weather-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.city-name {
  font-size: 1.5rem;
  color: #333;
  font-weight: 600;
}

.weather-emoji {
  font-size: 3rem;
}

.weather-main {
  text-align: center;
  margin-bottom: 2rem;
}

.temperature {
  font-size: 4rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
}

.feels-like {
  font-size: 1rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.condition {
  font-size: 1.2rem;
  color: #888;
  text-transform: capitalize;
}

.weather-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 12px;
}

.detail-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.detail-label {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.25rem;
}

.detail-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
}

@media (max-width: 640px) {
  .weather-card {
    padding: 1.5rem;
  }
  
  .temperature {
    font-size: 3rem;
  }
  
  .city-name {
    font-size: 1.2rem;
  }
}
</style>
