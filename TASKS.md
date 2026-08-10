# TASKS.md — Solutech Web Pública & Blog (`solutech`)

---

# Resumen

Resumen del estado operativo de la web pública y blog de Solutech:

- **Total de tareas registradas:** 10
- **Tareas pendientes:** 0
- **Tareas en progreso:** 0
- **Tareas bloqueadas:** 0
- **Tareas completadas:** 10
- **Tareas canceladas / descartadas:** 0
- **Última actualización:** 2026-08-10

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
