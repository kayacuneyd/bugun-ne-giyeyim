export function getOutfitSuggestion(weather) {
  const { temp, condition, isRaining, isSnowing, windSpeed } = weather
  
  let outfit = {
    emoji: '👔',
    category: '',
    items: [],
    warnings: [],
    tip: ''
  }

  // Temperature based outfit
  if (temp < 0) {
    outfit.emoji = '🧥'
    outfit.category = 'Çok Soğuk - Katmanlı Giyinin!'
    outfit.items = [
      { emoji: '🧥', text: 'Kalın kış montu' },
      { emoji: '🧣', text: 'Atkı ve bere' },
      { emoji: '🧤', text: 'Eldiven' },
      { emoji: '👖', text: 'Kalın pantolon veya termal' },
      { emoji: '👢', text: 'Kışlık bot' }
    ]
    outfit.tip = 'Katmanlı giyinin, içerde sıcak olabilir!'
  } else if (temp >= 0 && temp < 10) {
    outfit.emoji = '🧥'
    outfit.category = 'Soğuk - Mont Şart!'
    outfit.items = [
      { emoji: '🧥', text: 'Kalın mont veya kaban' },
      { emoji: '👕', text: 'Kazak veya sweatshirt' },
      { emoji: '👖', text: 'Pantolon' },
      { emoji: '👟', text: 'Kapalı ayakkabı' }
    ]
    outfit.tip = 'Üşümeyi sevmiyorsan yanında hafif bir kazak bulundur.'
  } else if (temp >= 10 && temp < 15) {
    outfit.emoji = '🧥'
    outfit.category = 'Serin - Hafif Ceket'
    outfit.items = [
      { emoji: '🧥', text: 'İnce ceket veya hırka' },
      { emoji: '👕', text: 'Uzun kollu tişört' },
      { emoji: '👖', text: 'Kot pantolon' },
      { emoji: '👟', text: 'Spor ayakkabı' }
    ]
    outfit.tip = 'Akşam serinleyebilir, yanında hafif bir şey bulundur.'
  } else if (temp >= 15 && temp < 20) {
    outfit.emoji = '👕'
    outfit.category = 'İlıman - Rahat Giyim'
    outfit.items = [
      { emoji: '👕', text: 'Sweatshirt veya gömlek' },
      { emoji: '👖', text: 'Kot pantolon veya kumaş pantolon' },
      { emoji: '👟', text: 'Rahat ayakkabı' }
    ]
    outfit.tip = 'İdeal hava! İstersen ince bir şey al yanına.'
  } else if (temp >= 20 && temp < 25) {
    outfit.emoji = '👕'
    outfit.category = 'Güzel - Hafif Kıyafetler'
    outfit.items = [
      { emoji: '👕', text: 'Tişört veya polo' },
      { emoji: '👖', text: 'Kot veya kumaş pantolon' },
      { emoji: '👟', text: 'Spor ayakkabı veya ayakkabı' }
    ]
    outfit.tip = 'Mükemmel hava! Rahat ne varsa giy.'
  } else if (temp >= 25 && temp < 30) {
    outfit.emoji = '🩳'
    outfit.category = 'Sıcak - Hafif Giyin'
    outfit.items = [
      { emoji: '👕', text: 'İnce tişört' },
      { emoji: '🩳', text: 'Şort veya ince pantolon' },
      { emoji: '👡', text: 'Sandalet veya hafif ayakkabı' },
      { emoji: '🧢', text: 'Şapka (opsiyonel)' }
    ]
    outfit.tip = 'Bol bol su iç ve güneşten korun!'
  } else {
    outfit.emoji = '🩳'
    outfit.category = 'Çok Sıcak - Minimalist Yaklaşım!'
    outfit.items = [
      { emoji: '👕', text: 'En ince tişört' },
      { emoji: '🩳', text: 'Şort' },
      { emoji: '👡', text: 'Terlik veya sandalet' },
      { emoji: '🧢', text: 'Şapka (zorunlu!)' },
      { emoji: '🕶️', text: 'Güneş gözlüğü' }
    ]
    outfit.warnings.push('⚠️ Çok sıcak! Mümkünse dışarı çıkma.')
    outfit.tip = 'Güneş kremi kullan ve bol su iç!'
  }

  // Weather condition warnings
  if (isRaining) {
    outfit.warnings.push('☂️ Yağmur var! Şemsiye veya yağmurluk al.')
    outfit.items.push({ emoji: '☂️', text: 'Şemsiye veya yağmurluk' })
  }

  if (isSnowing) {
    outfit.warnings.push('❄️ Kar yağıyor! Su geçirmez ayakkabı giy.')
    outfit.items.push({ emoji: '👢', text: 'Su geçirmez bot' })
  }

  if (windSpeed > 20) {
    outfit.warnings.push('💨 Rüzgar çok kuvvetli! Rüzgarlık giy.')
    if (!outfit.items.find(item => item.text.includes('Rüzgarlık'))) {
      outfit.items.push({ emoji: '🧥', text: 'Rüzgarlık' })
    }
  }

  return outfit
}
