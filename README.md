# Solutech: Frontend Architecture & Source Code

Este repositorio contiene el código fuente del portal público de **Solutech** (disponible en [solutech.blog](https://solutech.blog)). Funciona como la capa de presentación y captación de nuestro ecosistema Micro-MSP, orquestando la recolección de leads de manera segura antes de inyectarlos en nuestra red privada.

## 🏗️ Arquitectura Tecnológica

- **Generador de Sitios Estáticos (SSG):** [Hugo](https://gohugo.io/) (Extended Edition).
- **Estilos:** CSS Nativo (Vanilla CSS) bajo una arquitectura de variables modulares (Design Tokens). No se emplean frameworks externos para garantizar latencia cero y máxima eficiencia.
- **Hosting y CI/CD:** Desplegado mediante GitHub Actions (`.github/workflows/hugo.yaml`) hacia GitHub Pages con dominio personalizado.
- **Analítica:** Google Analytics con implementación estricta de *Consent Mode v2* (RGPD).
- **Agendamiento:** Integración nativa del widget de [Cal.com](https://cal.com) para videollamadas.

## 🔌 Integración Backend (Captación RLS)

Este frontend **no almacena estados ni tiene base de datos local**. El flujo de captación está completamente desacoplado:

1. Los formularios web (`/soporte`) envían peticiones `POST` directamente a un Webhook orquestado en nuestro **n8n** self-hosted.
2. N8n valida la petición y la inyecta mediante Service Key en nuestro **Supabase PostgreSQL**.
3. El frontend ignora el procesamiento de negocio; todo el CRM y lógica de notificaciones (Telegram/SMTP) ocurre a puerta cerrada en el backend.

## 🚀 Desarrollo Local

Para levantar el entorno de desarrollo en tu máquina local, necesitas [Hugo Extended](https://gohugo.io/installation/):

```bash
# Clonar el repositorio
git clone https://github.com/xaviaerox/solutech.git
cd solutech

# Arrancar el servidor de desarrollo en caliente
hugo server -D
```
El servidor estará disponible en `http://localhost:1313`.

## 📜 Normas de Contribución y Estilo

Todo cambio en el código debe adherirse a las directrices corporativas de Solutech:
- **Tono B2B:** Prohibido el uso de lenguaje publicitario vacío o generado por IA. El mensaje debe ser técnico, conciso y orientado a la mitigación de riesgos.
- **Rendimiento:** Cualquier script de terceros (analítica, calendarios) debe cargarse de forma asíncrona (`async` / `defer`) o activarse exclusivamente mediante interacción del usuario (Banner de Cookies).
- **Privacidad:** No introducir bajo ningún concepto credenciales en texto plano, rutas de la intranet, o referencias a la base de conocimiento (`/kb`) en este repositorio público.

---
*© 2026 Solutech · Gestión IT Continua.*
*Contacto oficial: xavi@solutech.blog*
