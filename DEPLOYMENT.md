# 🚀 VPS'e Deploy Rehberi

## Hazırlık

### 1. OpenWeatherMap API Key Al
1. https://openweathermap.org/api adresine git
2. Sign up yap (ücretsiz)
3. API Keys bölümünden key'ini al
4. Key'in aktif olması 10-15 dakika sürebilir

---

## Yöntem 1: Docker ile Deploy (ÖNERİLEN)

### VPS Gereksinimleri
- Docker
- Docker Compose

### Adımlar:

1. **Projeyi VPS'e yükle:**
```bash
# Local makineden
scp bugun-ne-giyeyim.tar.gz user@your-vps:~/

# VPS'de
cd ~
mkdir bugun-ne-giyeyim
cd bugun-ne-giyeyim
tar -xzf ../bugun-ne-giyeyim.tar.gz
```

2. **API Key'i ekle:**
```bash
cp .env.example .env
nano .env  # API key'ini ekle
```

3. **Build ve başlat:**
```bash
# Docker build
docker build -t bugun-ne-giyeyim .

# Çalıştır
docker run -d -p 80:80 --name outfit-app bugun-ne-giyeyim

# Veya docker-compose ile
docker-compose up -d
```

4. **Test et:**
```bash
curl http://localhost
```

Tarayıcıdan `http://your-vps-ip` adresine git.

### SSL Ekle (Let's Encrypt):

1. **Nginx Proxy Manager kullan (en kolay):**
```bash
# docker-compose.yml dosyasını güncelle
version: '3.8'

services:
  web:
    build: .
    ports:
      - "8080:80"  # Port'u değiştir
    restart: unless-stopped

  nginx-proxy:
    image: 'jc21/nginx-proxy-manager:latest'
    ports:
      - '80:80'
      - '443:443'
      - '81:81'  # Admin panel
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
    restart: unless-stopped
```

2. **http://your-vps-ip:81 adresinden admin panel'e gir**
   - Email: admin@example.com
   - Password: changeme
   - Şifreyi değiştir

3. **Proxy Host ekle:**
   - Domain: your-domain.com
   - Forward Hostname/IP: web
   - Forward Port: 80
   - SSL sekmesinden Let's Encrypt SSL ekle

---

## Yöntem 2: Manuel Nginx Deploy

### VPS Gereksinimleri
- Node.js 18+
- Nginx

### Adımlar:

1. **Projeyi VPS'e yükle ve build al:**
```bash
# VPS'de
cd ~
mkdir bugun-ne-giyeyim
cd bugun-ne-giyeyim
tar -xzf ../bugun-ne-giyeyim.tar.gz

# API key ekle
cp .env.example .env
nano .env

# Dependencies kur
npm install

# Build al
npm run build
```

2. **Nginx config:**
```bash
sudo nano /etc/nginx/sites-available/bugun-ne-giyeyim
```

Config içeriği:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /home/user/bugun-ne-giyeyim/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

3. **Siteyi aktif et:**
```bash
sudo ln -s /etc/nginx/sites-available/bugun-ne-giyeyim /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

4. **SSL ekle (Certbot):**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## Yöntem 3: PM2 ile Dev Server Deploy (Hızlı Test İçin)

```bash
# PM2 kur
npm install -g pm2

# API key ekle
cp .env.example .env
nano .env

# Dependencies kur
npm install

# PM2 ile başlat
pm2 start "npm run dev -- --host 0.0.0.0 --port 3000" --name outfit-app

# Otomatik başlat
pm2 startup
pm2 save
```

Nginx reverse proxy ekle:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Güncelleme

### Docker:
```bash
cd ~/bugun-ne-giyeyim
git pull  # veya yeni dosyaları yükle
docker-compose down
docker-compose up -d --build
```

### Manuel:
```bash
cd ~/bugun-ne-giyeyim
git pull  # veya yeni dosyaları yükle
npm install
npm run build
# Nginx otomatik yeni build'i servis eder
```

---

## Sorun Giderme

### API key çalışmıyor:
- Key'in aktif olmasını bekle (10-15 dakika)
- .env dosyasının doğru yerde olduğundan emin ol
- Build'i yeniden al

### Port kullanımda:
```bash
# Port'u kullanan process'i bul
sudo lsof -i :80

# Durdur
sudo kill -9 <PID>
```

### Docker log:
```bash
docker logs outfit-app
docker-compose logs -f
```

### Nginx log:
```bash
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

---

## Performans İyileştirmeleri

1. **Gzip compression:** nginx.conf'ta zaten var
2. **Cache headers:** Statik dosyalar için 1 yıl
3. **CDN:** Cloudflare ücretsiz plan
4. **Image optimization:** Görseller optimize edilmiş

---

## Güvenlik

1. **Firewall:**
```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

2. **Fail2ban:**
```bash
sudo apt install fail2ban
sudo systemctl enable fail2ban
```

3. **Auto updates:**
```bash
sudo apt install unattended-upgrades
sudo dpkg-reconfigure unattended-upgrades
```

---

## Monitoring

### Uptime Robot:
- https://uptimerobot.com (ücretsiz)
- Her 5 dakikada bir check
- Email/SMS uyarısı

### Logs:
```bash
# Docker
docker stats outfit-app

# PM2
pm2 monit
```

---

**İyi deploy'lar! 🚀**
