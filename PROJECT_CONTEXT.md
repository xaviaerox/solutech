# PROJECT_CONTEXT.md

---

# Proyecto

**Nombre:** Solutech Web Pública & Blog Comercial (`solutech`)

**Descripción:** Portal web corporativo, blog técnico de ciberseguridad/TI y herramientas interactivas de autodiagnóstico comercial para Solutech (Micro-MSP). Construido como un sitio estático ultrapotente con Hugo v0.163+ Extended, alojado en GitHub Pages con despliegue CI/CD automatizado y gestión de contenidos mediante Decap CMS (`/admin`).

**Objetivo principal:** Captar leads de Pymes locales en Almería y Murcia, ofrecer autodiagnóstico de vulnerabilidades (*Cyber-Check*) y presupuestos de soporte en tiempo real (*Calculadora Micro-MSP*), y publicar artículos técnicos optimizados para SEO sin dependencias pesadas ni riesgos de seguridad.

**Problema que resuelve:** Elimina los problemas de rendimiento, costes de hosting y vulnerabilidades asociadas a CMS tradicionales (como WordPress), ofreciendo un sitio que carga en milisegundos con puntuaciones auditadas de 98.5/100 en Google Lighthouse.

**Usuarios objetivo:** Pymes locales (clientes), prospectos B2B, consultores IT y redactores de contenidos del blog.

**Estado del proyecto:** En Producción (Operativo en `https://solutech.blog`).

**Nivel de madurez:** Producción Estable y Madura (Auditoría 98.5/100).

**Repositorio:** `xaviaerox/solutech` (PÚBLICO en GitHub).

**Versión actual:** `1.2.0`.

**Última actualización:** 2026-09-05.

---

# Visión General

Explicación de alto nivel del sistema:
El repositorio `solutech` gestiona el frontend comercial público de Solutech. Utiliza Hugo para generar HTML estático empaquetado a partir de plantillas en `layouts/` y archivos Markdown en `content/`. Incluye un sistema modular de estilos CSS Vanilla y módulos JavaScript ES6 puros. La edición de contenidos se realiza vía Decap CMS (`static/admin/config.yml`) conectándose a un servidor OAuth en VPS, y mediante publicación automatizada desde `content-system` a través de GitHub Actions (`.github/workflows/auto-blog.yml`).

**Qué hace:**
- Presenta los servicios de soporte Micro-MSP y la filosofía de continuidad de negocio de Solutech.
- Presenta la capa **Soluciones / Solutech Labs** (`/soluciones/`), mostrando desarrollos propios, herramientas de software y proyectos experimentales (Queryclin, MiraTEA, AeroGym) como prueba de rigor técnico y capacidad arquitectónica.
- Conecta bidireccionalmente proyectos y artículos del blog mediante el parámetro `projects` en el frontmatter.
- Proporciona la herramienta *Cyber-Check* (autodiagnóstico interactivo de 8 preguntas críticas con interfaz Dark Terminal).
- Proporciona la *Calculadora Micro-MSP* para estimar presupuestos de soporte mensual en tiempo real según la Matriz Oficial de Servicios V1 (S Essential 99€/mes, S Pro 149€/mes, M Basic 199€/mes, M Pro 299€/mes).
- Captura leads comerciales a través de un formulario protegido con un pipeline anti-spam de 5 capas en cliente y servidor (`assets/js/forms.js` -> `https://n8n.solutech.blog/webhook/leads`).
- Publica automáticamente artículos técnicos optimizados para SEO y redes sociales mediante el motor de IA `content-system`.
- Permite la búsqueda en tiempo real client-side de artículos del blog.
- Integra Decap CMS para publicar contenidos sin tocar código.

**Qué no hace:**
- No ejecuta código dinámico de servidor (es 100% estático Jamstack).
- No utiliza frameworks pesados como React o Vue en la capa pública.
- No almacena datos sensibles, claves ni credenciales en el cliente o repositorio.

---

# Arquitectura

### Diagrama ASCII

```
 +-----------------------------------------------------------------------------------+
 |                         Sitio Estático Hugo (Jamstack)                           |
 |  HTML5 Semántico + CSS Vanilla Modular + JavaScript ES6 Nativo                    |
 +-------------------------+-----------------------------------+---------------------+
                           |                                   ^
                           | Publicado vía GitHub Actions      | Auto-Blog Workflow
                           v                                   | (content-system IA)
 +-------------------------+-----------------------------------+---------------------+
 |                        GitHub Pages (https://solutech.blog)                       |
 |  CDN Global, HTTPS SSL Automático, SRI Integrity, CSP Cabeceras Strict            |
 +-----------------+-----------------+-----------------+-----------------+-----------+
                   |                 |                 |                 |
                   v                 v                 v                 v
        +----------+----+   +--------+-------+   +-----+---------+   +---+-----------+
        | Cyber-Check   |   | Calculadora    |   | Decap CMS     |   | Formulario    |
        | Autotest OSINT|   | Cuotas MSP     |   | OAuth VPS     |   | Leads (5-Capas|
        +---------------+   +----------------+   +---------------+   | Anti-Spam n8n)|
                                                                     +-------+-------+
                                                                             |
                                                                             v
                                                                     +-------+-------+
                                                                     | n8n Webhook   |
                                                                     | + Supabase DB |
                                                                     +---------------+
```

---

# Stack Tecnológico

- **Generador Estático:** Hugo v0.163+ (Extended).
- **Hosting & Despliegue:** GitHub Pages + GitHub Actions CI/CD (`hugo.yaml` y `auto-blog.yml`).
- **Frontend:** HTML5, Vanilla CSS (Variables & CSS Modules), JavaScript ES6 Vanilla.
- **CMS Admin:** Decap CMS (`/admin`) + Servidor OAuth Node.js en VPS.
- **Captación de Leads:** Formulario en `assets/js/forms.js` con pipeline anti-spam (Honeypot, Timestamp build-time `form_rendered_at`, baneo de bots/RobertBlesk, validator regex) conectado a `https://n8n.solutech.blog/webhook/leads`.
- **Seguridad HTTP:** CSP estricto (`connect-src` autorizado para n8n y Google Analytics), HSTS (`max-age=31536000`), SRI Integrity.
- **Automatización Editorial:** Motor de contenidos IA (`solutech-knowledge-base/content-system`) con Gemini 3.1 Pro, Google Imagen 3 y RAG semántico.

---

# Estructura del Repositorio

```
solutech/
├── archetypes/               # Plantillas para nuevos artículos de Hugo
├── assets/                   # Vanilla CSS (`main.css`, `soluciones.css`, etc.) y JS
├── content/                  # Contenidos Markdown
│   ├── blog/                 # Artículos de noticias y ciberseguridad
│   ├── guias/                # Guías técnicas y tutoriales
│   └── soluciones/           # Fichas técnicas de Soluciones / Solutech Labs
├── docs/                     # Documentación técnica (`SOLUTECH_SOLUTIONS_ARCHITECTURE.md`)
├── layouts/                  # Plantillas HTML de Hugo (homepage, single, list, partials, soluciones)
├── static/                   # Assets estáticos directos (imágenes, favicons)
│   └── admin/                # Configuración de Decap CMS (`config.yml`, `index.html`)
├── hugo.toml                 # Configuración general de Hugo (URL, idioma, menú)
└── PROJECT_CONTEXT.md        # Single Source of Truth (SSOT) de este proyecto
```

---

# Seguridad & Protección de Datos Sensibles

> [!CAUTION]
> **REPOSITO PÚBLICO - REGLA DE SEGURIDAD STRICT-ZERO DISCLOSURE:**
> Este repositorio (`xaviaerox/solutech`) es **PÚBLICO**. Bajo ninguna circunstancia se debe incluir ni commitear información sensible, incluyendo:
> - Claves API o tokens privados.
> - Contraseñas o credenciales de correo.
> - Direcciones IP públicas o privadas de servidores VPS.
> - Cadenas de conexión a bases de datos o claves Supabase `service_role`.
> - Rutas de almacenamiento privado de backups.
>
> Todas las credenciales deben mantenerse exclusivamente en `C:\Users\Xaviaerox\Documents\GitHub\.env` (el cual está estrictamente ignorado por `.gitignore`).

---

# Guía para Agentes IA

1. **Protección de Datos:** Verificar SIEMPRE que no se añadan credenciales, IPs ni datos privados en ningún archivo de este repositorio público.
2. **Cero Frameworks Pesados:** Todo código UI en este repositorio debe mantenerse en **Vanilla CSS** y **JS ES6 nativo**. No instales ni utilices React, Vue, Tailwind ni Bootstrap.
3. **Preservar la Puntuación Lighthouse:** Mantener la optimización de activos y huellas SRI (`js.Build` / `resources.Minify`).
4. **Mantener la SSOT Actualizada:** Ante cualquier cambio en las rutas, diseño o integración de Decap CMS, actualiza este archivo y el SSOT global en `C:\Users\Xaviaerox\Documents\GitHub\PROJECT_CONTEXT.md`.

---

# Resumen Ejecutivo

`solutech` es el portal web público y blog comercial de **Solutech** (`https://solutech.blog`), construido con **Hugo** y **Decap CMS** para ofrecer máxima velocidad (98.5/100 Lighthouse), seguridad y herramientas interactivas de captación de Pymes (*Cyber-Check* y *Calculadora Micro-MSP*).
