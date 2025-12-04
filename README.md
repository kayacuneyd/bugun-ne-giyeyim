# 👔 Bugün Ne Giyeyim?

Hava durumuna göre kıyafet önerisi veren eğlenceli bir Vue.js uygulaması.

## 🚀 Özellikler

- 🌡️ Gerçek zamanlı hava durumu bilgisi
- 👔 Sıcaklığa göre akıllı kıyafet önerileri
- 📍 Konum bazlı veya şehir adı ile arama
- 🔄 Son aramaları hatırlama
- 💨 Rüzgar, yağmur, kar uyarıları
- 📱 Responsive tasarım
- 🎨 Modern ve renkli UI

## 📦 Kurulum

### 1. Projeyi klonla
```bash
git clone <repo-url>
cd bugun-ne-giyeyim
```

### 2. Dependencies'i kur
```bash
npm install
```

### 3. API Key al
1. [OpenWeatherMap](https://openweathermap.org/api) sitesine git
2. Ücretsiz hesap oluştur
3. API key'ini al

### 4. Environment variables'ı ayarla
```bash
cp .env.example .env
```

`.env` dosyasını aç ve kendi API key'ini ekle:
```
VITE_OPENWEATHER_API_KEY=buraya_kendi_api_keyini_yaz
```

### 5. Geliştirme modunda çalıştır
```bash
npm run dev
```

Tarayıcında `http://localhost:5173` adresini aç.

## 🏗️ Production Build

```bash
npm run build
```

Build dosyaları `dist/` klasörüne oluşturulur.

## 🖥️ VPS'e Deploy

### Nginx ile deploy:

1. Build al:
```bash
npm run build
```

2. Dosyaları VPS'e aktar:
```bash
scp -r dist/* user@your-vps:/var/www/bugun-ne-giyeyim/
```

3. Nginx config:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/bugun-ne-giyeyim;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

4. SSL ekle (Let's Encrypt):
```bash
sudo certbot --nginx -d your-domain.com
```

### Docker ile deploy:

`Dockerfile` oluştur:
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build ve çalıştır:
```bash
docker build -t bugun-ne-giyeyim .
docker run -p 80:80 bugun-ne-giyeyim
```

## 🎨 Teknolojiler

- **Vue 3** - Composition API
- **Vite** - Build tool
- **Axios** - HTTP client
- **OpenWeatherMap API** - Hava durumu verisi

## 📝 Kıyafet Önerisi Mantığı

- **< 0°C**: Kalın mont, bere, eldiven
- **0-10°C**: Mont, kazak
- **10-15°C**: İnce ceket, hırka
- **15-20°C**: Sweatshirt, gömlek
- **20-25°C**: Tişört, pantolon
- **> 25°C**: Tişört, şort

**Ek uyarılar:**
- ☂️ Yağmur → Şemsiye/yağmurluk
- ❄️ Kar → Su geçirmez ayakkabı
- 💨 Kuvvetli rüzgar → Rüzgarlık

## 🤝 Katkıda Bulunma

Pull request'ler memnuniyetle karşılanır!

## 📄 Lisans

MIT

## 👨‍💻 Geliştirici

Cüneyt - [GitHub](https://github.com/yourusername)

---

**Not:** API key'ini public repository'lerde paylaşma!
