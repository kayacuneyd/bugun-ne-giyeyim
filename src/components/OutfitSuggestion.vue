<script setup>
import { computed } from 'vue'
import { getOutfitSuggestion } from '../utils/outfitLogic'

const props = defineProps({
  weather: Object
})

const outfit = computed(() => getOutfitSuggestion(props.weather))
</script>

<template>
  <div class="outfit-card">
    <h2 class="outfit-title">👔 Kıyafet Önerisi</h2>
    
    <div class="outfit-main">
      <div class="outfit-emoji">{{ outfit.emoji }}</div>
      <h3 class="outfit-category">{{ outfit.category }}</h3>
    </div>

    <div class="outfit-items">
      <div v-for="(item, index) in outfit.items" :key="index" class="outfit-item">
        <span class="item-emoji">{{ item.emoji }}</span>
        <span class="item-text">{{ item.text }}</span>
      </div>
    </div>

    <div v-if="outfit.warnings.length > 0" class="outfit-warnings">
      <div v-for="(warning, index) in outfit.warnings" :key="index" class="warning-item">
        {{ warning }}
      </div>
    </div>

    <div class="outfit-tip">
      <span class="tip-icon">💡</span>
      <span class="tip-text">{{ outfit.tip }}</span>
    </div>
  </div>
</template>

<style scoped>
.outfit-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.outfit-title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.outfit-main {
  text-align: center;
  margin-bottom: 2rem;
}

.outfit-emoji {
  font-size: 5rem;
  margin-bottom: 1rem;
}

.outfit-category {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.outfit-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.outfit-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.item-emoji {
  font-size: 2rem;
}

.item-text {
  font-size: 1.1rem;
  flex: 1;
}

.outfit-warnings {
  margin-bottom: 1.5rem;
}

.warning-item {
  padding: 0.75rem 1rem;
  background: rgba(255, 107, 107, 0.3);
  border-radius: 8px;
  margin-bottom: 0.5rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
}

.outfit-tip {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.tip-icon {
  font-size: 1.5rem;
}

.tip-text {
  font-size: 0.95rem;
  line-height: 1.5;
}

@media (max-width: 640px) {
  .outfit-card {
    padding: 1.5rem;
  }
  
  .outfit-emoji {
    font-size: 4rem;
  }
  
  .outfit-category {
    font-size: 1.5rem;
  }
}
</style>
