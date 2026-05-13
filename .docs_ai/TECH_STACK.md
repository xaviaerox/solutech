# 🛠️ Stack Tecnológico Detallado

Guía técnica de la infraestructura Solutech V4.

## 🏗️ Frontend: Hugo
- **Versión**: Hugo Extended (mínimo 0.130+).
- **Lógica**: Generación estática pura.
- **Templating**: 
  - `layouts/_default/baseof.html`: Esqueleto.
  - `layouts/index.html`: Home dinámica.
  - `layouts/_default/single.html`: Vista de post individual.
- **Assets**: El CSS se procesa con Hugo Pipes (minify y fingerprinting).

## 🖥️ Backend / VPS
- **SO**: Ubuntu 24.04 LTS.
- **Contenedores**: Docker Engine (gestionando Uptime Kuma).
- **Proxy**: Nginx configurado como Reverse Proxy en `/etc/nginx/sites-available/uptime-kuma`.
- **Monitorización**: Uptime Kuma corriendo en el puerto 3001.

## 🚀 DevOps & CI/CD
- **GitHub Actions**: Automatiza el build de Hugo y publica en la rama `gh-pages`.
- **Certificados**: El SSL del dominio principal lo gestiona GitHub Pages. El del subdominio status lo gestiona Certbot en el VPS.

## 📬 Integraciones
- **Contacto**: Formspree (POST a endpoint con email de Xavi).
- **DNS**: Hostinger gestionando el dominio `solutech.shop`.
