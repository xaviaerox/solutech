# TASKS.md — Solutech Web Pública & Blog (`solutech`)

---

# Resumen

Resumen del estado operativo de la web pública y blog de Solutech:

- **Total de tareas registradas:** 22
- **Tareas pendientes:** 0
- **Tareas en progreso:** 0
- **Tareas bloqueadas:** 0
- **Tareas completadas:** 22
- **Tareas canceladas / descartadas:** 0
- **Última actualización:** 2026-08-27

---

# Tareas Activas

*No hay tareas activas pendientes en este momento.*

---

# Próximas Tareas

*No hay próximas tareas inmediatas.*

---

# Tareas Bloqueadas

*No hay tareas bloqueadas actualmente.*

---

# Deuda Técnica

*No existe deuda técnica pendiente.*

---

# Bugs Conocidos

*No existen bugs conocidos en el entorno actual.*

---

# Ideas / Mejoras Futuras

- Integrador visual de presupuesto en 3 pasos con opción de descarga inmediata de propuesta previa.
- Asistente conversacional flotante (Widget RAG) integrado en la landing page.

---

# Historial de Tareas

## TASK-022 — Depuración de Base de Datos Supabase & Autenticación de Webhook Anti-Spam

- **Estado:** COMPLETADA
- **Fecha:** 2026-08-27
- **Descripción:** Ejecución de depuración en la tabla `solutech_leads` en Supabase eliminando el 100% de los registros de spam (39 entradas de "RobertBlesk", "BobbyVah", etc.). Incorporación de la cabecera secreta de firma `X-Solutech-Webhook-Token: solutech-leads-v1-secure-token` en `assets/js/forms.js` para autorizar exclusivamente las peticiones emitidas desde el frontend real y proteger la reputación de la cuenta Gmail de autoresponder.
- **Archivos Modificados:**
  - `assets/js/forms.js`
  - `TASKS.md`

## TASK-021 — Hardening Anti-Spam: Sistema Invisible Cero-Captcha & Limpieza Estética

- **Estado:** COMPLETADA
- **Fecha:** 2026-08-27
- **Descripción:** Eliminación de Cloudflare Turnstile para restaurar el diseño visual prístino del formulario (eliminado texto "Troubleshoot" y widget iframe). Implementación del Sistema de Protección Invisible Híbrida en `assets/js/forms.js` (control de velocidad de rellenado <2.5s, doble honeypot `website` + `fax_number`, patrón `nombre == empresa` y cabecera de firma `X-Solutech-Source`).
- **Archivos Modificados:**
  - `layouts/partials/head.html`
  - `layouts/partials/contact-form-template.html`
  - `assets/js/forms.js`
  - `hugo.toml`
  - `TASKS.md`

## TASK-020 — Hardening Anti-Spam FASE 5: Propuesta & Documentación WAF Rate Limiting en Cloudflare

- **Estado:** COMPLETADA
- **Fecha:** 2026-08-25
- **Descripción:** Definición de la regla de Rate Limiting en Cloudflare WAF (`Protect-N8N-Leads-Webhook-RateLimit`) para mitigar peticiones excesivas por IP al endpoint `/webhook/leads`, incluyendo estrategia de pruebas progresivas sin falsos positivos para leads legítimos.
- **Archivos Modificados:**
  - `TASKS.md` (solutech)
  - `05_TECHNOLOGY/CONFIG_DNS_SEO.md` (solutech-knowledge-base)

## TASK-019 — Hardening Anti-Spam FASE 4: Integración Frontend & Server-Side Cloudflare Turnstile

- **Estado:** COMPLETADA
- **Fecha:** 2026-08-25
- **Descripción:** Integración de Cloudflare Turnstile CAPTCHA (0€ / privacy-first) en el formulario de captación (`contact-form-template.html`), actualización de cabeceras CSP en `head.html`, configuración de siteKey en `hugo.toml` y especificación del flujo de verificación server-side en n8n mediante la API `/siteverify`.
- **Archivos Modificados:**
  - `layouts/partials/head.html`
  - `layouts/partials/contact-form-template.html`
  - `hugo.toml`
  - `TASKS.md`

## TASK-018 — Hardening Anti-Spam FASE 2: Implementación de Honeypot Neutro

- **Estado:** COMPLETADA
- **Fecha:** 2026-08-25
- **Descripción:** Implementación de campo honeypot neutro (`website`) en el plantilla HTML central de formularios (`layouts/partials/contact-form-template.html`) y actualización de lógica de verificación client-side y server-side (n8n IF node) para descarte silencioso de bots.
- **Archivos Modificados:**
  - `layouts/partials/contact-form-template.html`
  - `assets/js/forms.js`
  - `TASKS.md`

## TASK-017 — Publicación Noticia Estafa WhatsApp Reserva Hotel (Caso Real)

- **Estado:** COMPLETADA
- **Fecha:** 2026-08-24
- **Descripción:** Adaptación de la noticia sobre la estafa de WhatsApp en reservas de hotel como un caso real personal vivido por el equipo (corrigiendo el matiz de llegada del mensaje a última hora en momento de cansancio extremo). Generación de cabecera visual de alto impacto tipo clickbait (16:9), inclusión de diagrama de flujo ASCII, datos oficiales de la campaña INCIBE-2026-526 y traslación del riesgo de ingeniería social a Pymes para servicios Solutech.
- **Archivos Modificados:**
  - `content/blog/2026-08-24-estafa-whatsapp-reserva-hotel-experiencia-real.md`
  - `static/images/news-estafa-whatsapp-reserva-hotel.jpg`

## TASK-016 — Publicación y Optimización Noticia Cyberleek & GTA VI

- **Estado:** COMPLETADA
- **Fecha:** 2026-08-23
- **Descripción:** Redacción, maquetación visual enriquecida y optimización para captación de tráfico/leads B2B del artículo sobre la filtración de Cyberleek a Rockstar Games. Incluye resumen ejecutivo, análisis de las 3 exigencias del manifiesto, amenaza de Dead Man's Switch, diagrama de flujo de phishing (Rockstar India), traslación de riesgos para Pymes de Almería y Murcia, llamada a la acción hacia CyberCheck y FAQs para rich snippets de SEO.
- **Archivos Modificados:**
  - `content/blog/2026-08-23-cyberleek-gta-vi-filtracion-lecciones-ciberseguridad-pymes.md`
  - `static/images/news-cyberleek-gta-vi-filtracion-lecciones-ciberseguridad-pymes.jpg`

## TASK-015 — Publicación de Noticia JabaROOT y Lecciones de Ciberseguridad para Pymes

- **Estado:** COMPLETADA
- **Fecha:** 2026-08-20
- **Descripción:** Redacción, maquetación visual enriquecida (resumen ejecutivo, tablas cronológicas, callouts de atención) y generación de cabecera gráfica libre de texto para la noticia sobre JabaROOT. Cierre reorientado a divulgación responsable e higiene de seguridad sin CTA comercial invasivo.
- **Archivos Modificados:**
  - `content/blog/2026-08-20-jabaroot-filtraciones-lecciones-pymes.md`
  - `static/images/news-jabaroot-filtraciones-lecciones-pymes.jpg`
  - `static/images/blog/jabaroot-filtracion-datos.jpg`

## TASK-014 — Actualización de Versión de Node.js en CI/CD (GitHub Actions)

- **Estado:** COMPLETADA
- **Tipo:** CI/CD / INFRAESTRUCTURA
- **Prioridad:** MEDIA
- **Creada:** 2026-08-17
- **Iniciada:** 2026-08-17
- **Completada:** 2026-08-17
- **Descripción:** Actualización del paso `Setup Node.js` en `.github/workflows/hugo.yaml` a `node-version: '22'` para resolver advertencias de deprecación de Node.js 20 en GitHub Actions runner.
- **Resultado:** Modificado `.github/workflows/hugo.yaml`. Pruebas estáticas y linter sin errores.

## TASK-013 — Rediseño Simétrico de Tarjetas de Reseñas / Testimonios

- **Estado:** COMPLETADA
- **Tipo:** UI / STYLING
- **Prioridad:** ALTA
- **Creada:** 2026-08-17
- **Iniciada:** 2026-08-17
- **Completada:** 2026-08-17
- **Descripción:** Rediseño del grid de testimonios (`.test-grid`) y tarjetas (`.test-card`) para lograr simetría perfecta alineada con las tarjetas de precios (estrellas superiores, cabecera alineada, flexbox con separadores perfectamente horizontales y bordes/radios uniformes).
- **Resultado:** Modificados `data/testimonials.yaml`, `layouts/index.html` y `assets/css/main.css`. Compilación estática Hugo limpia en 1.4s.

## TASK-012 — Navegación Automática y Formulario en Diagnóstico IT (Cyber-Check)

- **Estado:** COMPLETADA
- **Tipo:** UX / FEATURE
- **Prioridad:** ALTA
- **Creada:** 2026-08-17
- **Iniciada:** 2026-08-17
- **Completada:** 2026-08-17
- **Descripción:** Implementación del avance automático entre los 4 bloques del autodiagnóstico al completar las preguntas de cada sección, e integración del formulario de captación (`#contacto`) en la página `/autodiagnostico/`.
- **Resultado:** Modificados `assets/js/modules/cybercheck.js` y `layouts/partials/cybercheck.html`. Compilación del sitio con Hugo limpia en 2.8s.

## TASK-011 — Publicar Noticia y Artículo del Caso de Suplantación Biométrica con IA en Murcia

- **Estado:** COMPLETADA
- **Tipo:** PUBLICACIÓN / BLOG & NOTICIAS
- **Prioridad:** MEDIA
- **Creada:** 2026-08-12
- **Iniciada:** 2026-08-12
- **Completada:** 2026-08-12
- **Descripción:** Publicar artículo periodístico y análisis técnico en `content/blog/` y `content/news/` sobre la suplantación biométrica mediante live deepfakes en Murcia (2026), compilando el sitio estático Hugo con `hugo`.
- **Resultado:** Archivos `.md` creados y sitio regenerado en `public/blog/fallo-ia-suplantacion-biometrica-deepfake-murcia/` y `public/news/detenido-murcia-suplantacion-ia-firma-electronica/`.

## TASK-008 — Publicar Guía sobre Protección Frente a Ransomware y Continuidad de Negocio

- **Estado:** COMPLETADA
- **Tipo:** DOCUMENTACIÓN / CAPTACIÓN
- **Prioridad:** ALTA
- **Creada:** 2026-08-05
- **Iniciada:** 2026-08-10
- **Completada:** 2026-08-10
- **Descripción:** Publicación de guía completa sobre estrategia anti-ransomware 2026, arquitectura de backup inmutable WORM 3-2-1-1-0, EDR/MDR gestionado y DRP para Pymes de Almería y Murcia.
- **Resultado:** Publicado en `content/guias/2026-08-10-proteccion-ransomware-continuidad-negocio-pymes.md`.

## TASK-007 — Redactar Artículo sobre Auditorías RAG para Pymes

- **Estado:** COMPLETADA
- **Tipo:** DOCUMENTACIÓN / MARKETING
- **Prioridad:** MEDIA
- **Creada:** 2026-08-05
- **Iniciada:** 2026-08-10
- **Completada:** 2026-08-10
- **Descripción:** Redacción de artículo sobre auditorías RAG (Retrieval-Augmented Generation), privacidad de datos de empresa y 0 alucinaciones.
- **Resultado:** Publicado en `content/blog/2026-08-10-auditorias-rag-ia-pymes.md`.

## TASK-005 — Optimizar Tiempos de Carga de Imágenes WebP en el Blog

- **Estado:** COMPLETADA
- **Tipo:** PERFORMANCE / HUGO
- **Prioridad:** MEDIA
- **Creada:** 2026-08-01
- **Iniciada:** 2026-08-10
- **Completada:** 2026-08-10
- **Descripción:** Configurar módulo de assets en `hugo.toml` y render hooks/plantillas (`render-image.html`, `single.html`, `list.html`) para procesar dinámicamente las imágenes a formato WebP responsivo.
- **Resultado:** Integración completa en Hugo Extended, 88 imágenes procesadas automáticamente en compilación (1.4s).

## TASK-010 — Adaptación de Web Pública a Sistema Comercial V1 (Matriz MSP, Calculadora, Formulario con Municipio & Cyber-Check Pain Score Integrado)

- **Estado:** COMPLETADA
- **Tipo:** FEATURE / REFACTORING
- **Prioridad:** CRÍTICA
- **Creada:** 2026-08-10
- **Iniciada:** 2026-08-10
- **Completada:** 2026-08-10
- **Descripción:** Sincronización completa de la web pública con la Matriz Oficial MSP V1:
  1. Actualizado `data/pricing.yaml` con los 4 planes oficiales: S Essential (99€), S Pro (149€), M Basic (199€) y M Pro (299€).
  2. Rediseñada la Calculadora Micro-MSP (`calculator.html` y `calculator.js`) para calcular de forma transparente el plan oficial V1 según 1–15 puestos.
  3. Añadido campo obligatorio `población/municipio` en el formulario de captación (`contact-form-template.html`) para alimentar el motor de geolocalización del CRM (radio 30 km Lorca/Levante) y tramos de puestos.
  4. Conectado el resultado del autodiagnóstico `cybercheck.js` (*Pain Score*) con el formulario de captación para transmitir la cualificación técnica de vulnerabilidades al CRM.
  5. Ajustadas métricas de SLA contractual garantizado por plan en `index.html`.
- **Resultado:** Generación del sitio con Hugo limpia en 3.3s (194 páginas compiladas sin errores). Web 100% alineada con el CRM y la Knowledge Base.

## TASK-009 — Sincronización de Matriz Oficial de Servicios V1 y Tarifas Micro-MSP 2026

- **Estado:** COMPLETADA
- **Tipo:** MANTENIMIENTO
- **Prioridad:** CRÍTICA
- **Creada:** 2026-08-10
- **Iniciada:** 2026-08-10
- **Completada:** 2026-08-10
- **Descripción:** Alineación de la Calculadora Micro-MSP y contenidos públicos con los planes oficiales de la Matriz V1.
- **Resultado:** Alineación tarifaria y conceptual completada con la SSOT de la Knowledge Base.

## TASK-004 — Añadir Sitemap Dinámico y Metaetiquetas OpenGraph Avanzadas

- **Estado:** COMPLETADA
- **Tipo:** FEATURE
- **Prioridad:** ALTA
- **Creada:** 2026-08-01
- **Iniciada:** 2026-08-01
- **Completada:** 2026-08-10
- **Descripción:** Implementar sitemap dinámico (`enableRobotsTXT = true` en `hugo.toml`), OpenGraph, Twitter Cards y Schema.org.
- **Resultado:** Metadatos SEO, previsualizaciones sociales y schema.org JSON-LD verificados.

## TASK-006 — Configuración de Decap CMS en `/admin` con Autenticación OAuth

- **Estado:** COMPLETADA
- **Tipo:** INFRAESTRUCTURA
- **Prioridad:** ALTA
- **Creada:** 2026-08-02
- **Iniciada:** 2026-08-02
- **Completada:** 2026-08-04
- **Descripción:** Configurar Decap CMS en `/admin` con autenticación OAuth en GitHub.
- **Resultado:** Decap CMS operativo y securizado.

## TASK-003 — Crear Calculadora de Cuotas Micro-MSP en JS Vanilla

- **Estado:** COMPLETADA
- **Tipo:** FEATURE
- **Prioridad:** ALTA
- **Creada:** 2026-08-01
- **Iniciada:** 2026-08-01
- **Completada:** 2026-08-03
- **Descripción:** Calculadora interactiva en cliente para estimación de cuotas mensuales Micro-MSP.
- **Resultado:** Integrada en la web pública aumentando el engagement de prospectos.

## TASK-002 — Implementar Herramienta Cyber-Check de Autodiagnóstico

- **Estado:** COMPLETADA
- **Tipo:** FEATURE
- **Prioridad:** CRÍTICA
- **Creada:** 2026-07-28
- **Iniciada:** 2026-07-29
- **Completada:** 2026-07-31
- **Descripción:** Herramienta web interactiva para evaluación de ciberseguridad.
- **Resultado:** Lead magnet operativo generando prospectos de auditoría.

## TASK-001 — Configurar Hugo Extended v0.163+ con GitHub Pages CI/CD

- **Estado:** COMPLETADA
- **Tipo:** INFRAESTRUCTURA
- **Prioridad:** CRÍTICA
- **Creada:** 2026-07-25
- **Iniciada:** 2026-07-25
- **Completada:** 2026-07-27
- **Descripción:** Pipeline de integración y despliegue continuo con GitHub Actions para Hugo Extended en GitHub Pages.
- **Resultado:** Despliegue automatizado en cada push a la rama principal.
