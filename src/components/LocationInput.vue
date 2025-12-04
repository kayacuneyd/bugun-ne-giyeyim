<script setup>
import { ref } from 'vue'

const emit = defineEmits(['submit'])
const props = defineProps({
  loading: Boolean
})

const city = ref('')
const recentCities = ref(JSON.parse(localStorage.getItem('recentCities') || '[]'))

const handleSubmit = () => {
  if (city.value.trim()) {
    emit('submit', city.value.trim())
    
    // Save to recent cities
    const cities = recentCities.value.filter(c => c !== city.value.trim())
    cities.unshift(city.value.trim())
    recentCities.value = cities.slice(0, 5)
    localStorage.setItem('recentCities', JSON.stringify(recentCities.value))
  }
}

const selectRecentCity = (selectedCity) => {
  city.value = selectedCity
  handleSubmit()
}

const useCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        emit('submit', {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        })
      },
      (error) => {
        alert('Konum alınamadı: ' + error.message)
      }
    )
  } else {
    alert('Tarayıcınız konum özelliğini desteklemiyor.')
  }
}
</script>

<template>
  <div class="location-input">
    <div class="input-group">
      <input
        v-model="city"
        @keyup.enter="handleSubmit"
        type="text"
        placeholder="Şehir adı gir (örn: Stuttgart, Istanbul)"
        :disabled="loading"
        class="input"
      />
      <button @click="handleSubmit" :disabled="loading || !city.trim()" class="btn-submit">
        {{ loading ? '🔄' : '🔍' }}
      </button>
      <button @click="useCurrentLocation" :disabled="loading" class="btn-location" title="Konumumu kullan">
        📍
      </button>
    </div>

    <div v-if="recentCities.length > 0" class="recent-cities">
      <span class="recent-label">Son aramalar:</span>
      <button
        v-for="recentCity in recentCities"
        :key="recentCity"
        @click="selectRecentCity(recentCity)"
        class="recent-city-btn"
      >
        {{ recentCity }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.location-input {
  margin-bottom: 2rem;
}

.input-group {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.input {
  flex: 1;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.input:focus {
  outline: none;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-submit,
.btn-location {
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-size: 1.5rem;
  cursor: pointer;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.btn-submit:hover:not(:disabled),
.btn-location:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.btn-submit:disabled,
.btn-location:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.recent-cities {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.recent-label {
  color: white;
  font-size: 0.9rem;
  opacity: 0.9;
}

.recent-city-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
}

.recent-city-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

@media (max-width: 640px) {
  .input-group {
    flex-direction: column;
  }
  
  .btn-submit,
  .btn-location {
    width: 100%;
  }
}
</style>
