# Arquitectura Técnica: Soluciones & Solutech Labs (`SOLUTECH_SOLUTIONS_ARCHITECTURE.md`)

---

## 1. Propósito y Filosofía de Negocio

Solutech es una empresa tecnológica orientada primordialmente a servicios de gestión IT, ciberseguridad preventiva y continuidad operativa para pequeñas y medianas empresas.

La capa **Soluciones / Solutech Labs** no es un portfolio de desarrollador ni una oferta de agencia genérica de software bajo demanda. Su función estratégica dentro del sitio web corporativo es:

> **Servicios = lo que Solutech ofrece comercialmente (Planes MSP de gestión informática y seguridad).**
>
> **Soluciones / Labs = lo que Solutech sabe diseñar, investigar y construir (prueba de capacidad técnica y solvencia metodológica).**
>
> **Blog = donde Solutech documenta, analiza y comparte conocimiento técnico aplicado a negocio.**

Los proyectos propios actúan como **prueba irrefutable de competencia e innovación**, demostrando que Solutech domina arquitecturas de alta privacidad, sistemas distribuidos, inteligencia artificial en el borde y procesamiento de datos críticos.

---

## 2. Arquitectura y Enrutamiento (Routing)

La implementación se apoya de forma nativa en **Hugo v0.163+ Extended** para garantizar cero dependencias en tiempo de ejecución y preservar las puntuaciones de 98.5/100 en Google Lighthouse.

### 2.1. Rutas del Sistema
- **Índice de Soluciones:** `https://solutech.blog/soluciones/`
  - Archivo fuente: `content/soluciones/_index.md`
  - Plantilla: `layouts/soluciones/list.html`
- **Fichas Técnicas Individuales:**
  - `https://solutech.blog/soluciones/queryclin/` (`content/soluciones/queryclin.md`)
  - `https://solutech.blog/soluciones/miratea/` (`content/soluciones/miratea.md`)
  - `https://solutech.blog/soluciones/aerogym/` (`content/soluciones/aerogym.md`)
  - Plantilla: `layouts/soluciones/single.html`

### 2.2. Flujo de Navegación
- **Header Principal (`nav.html`):** El enlace huérfano anterior (`/#stack`) fue sustituido por `/soluciones/`, ubicándolo de forma equilibrada tras "Servicios":
  `Servicios | Soluciones | Proceso | Sobre mí | Blog | Guías | Diagnóstico IT` + CTA `Contacto`.
- **Footer Corporativo (`footer.html`):** Enlace canónico a "Soluciones & Labs" en la columna *Explorar*, reemplazando el antiguo enlace a portfolio personal externo.

---

## 3. Modelo de Contenido de una Solución

Cada solución se define como un archivo Markdown en `content/soluciones/<slug>.md` con el siguiente frontmatter estructurado:

```yaml
---
title: "Nombre Oficial del Proyecto"
slug: "slug-url"
tagline: "Subtítulo de alto nivel técnico"
description: "Descripción resumida optimizada para SEO (máx. 155 caracteres)"
status: "Demostración técnica | Producción activa | Validación comercial"
nature: "Solución Local-First | PWA de Rendimiento | Plataforma TEA"
version: "vX.Y.Z"
date: "2026-09-05T10:00:00+02:00"
image: "images/soluciones/imagen-destacada.jpg"
demo_url: "https://enlace-a-demo-si-existe.com" # Opcional
github_url: "https://github.com/usuario/repo"     # Opcional
stack: ["React 19", "TypeScript", "IndexedDB"]
architecture_pattern: "Clean Architecture / Offline-First / Multitenant RLS"
collaboration: "Entidad o coordinador clínico/técnico si aplica" # Opcional
draft: false
---
```

### Estados de Proyecto Permitidos
Para no presentar como producto comercial aquello que sea I+D o validación, se definen tres badges semánticos en CSS (`soluciones.css`):
1. `Producción activa` (`.sol-badge-prod` — Verde esmeralda): Software operativo, desplegado y mantenido activamente.
2. `Demostración técnica` (`.sol-badge-demo` — Cian): Prueba de concepto, motor open-source o entorno de demostración técnica con datos sintéticos.
3. `Validación comercial` (`.sol-badge-val` — Ámbar): Solución en fase de pruebas controladas con usuarios o instituciones antes de salida a mercado.

---

## 4. Integración Bidireccional: Solución ↔ Blog

El sistema implementa una relación bidireccional completamente desacoplada y calculada en build-time:

```text
       ┌────────────────────────┐
       │   SOLUCIÓN TÉCNICA     │
       │  /soluciones/queryclin │
       └───────────┬────────────┘
                   │
                   │ Consulta automática:
                   │ where Params.projects "intersect" "queryclin"
                   ▼
       ┌────────────────────────┐
       │ ARTÍCULOS RELACIONADOS │
       │ Artículos sobre BM25,  │
       │ Privacidad o Local-1st │
       └───────────▲────────────┘
                   │
                   │ Frontmatter en post:
                   │ projects: ["queryclin"]
                   │
       ┌───────────┴────────────┐
       │     ARTÍCULO BLOG      │
       │ Callout card hacia la  │
       │ Ficha de Solución      │
       └────────────────────────┘
```

### Cómo Asociar un Artículo del Blog a una Solución
En cualquier artículo nuevo o existente dentro de `content/blog/`, `content/guias/` o `content/news/`, añade el parámetro `projects` en su frontmatter con el slug del proyecto:

```yaml
---
title: "IA y Privacidad de Datos en la Pyme"
projects: ["queryclin", "miratea"]
---
```

**Resultado Automático:**
1. En el pie del artículo, Hugo inyecta el componente `.blog-project-callout` invitando a consultar la ficha técnica del proyecto.
2. En la ficha de `/soluciones/queryclin/`, el artículo aparece listado automáticamente en `"Artículos y Notas Técnicas Relacionadas"`.

---

## 5. SEO & Datos Estructurados

- **Breadcrumbs:** `Inicio > Soluciones > [Nombre del Proyecto]`
- **OpenGraph & Twitter Cards:** Generados dinámicamente según título, descripción e imagen.
- **Marcado JSON-LD Schema.org:** En cada ficha de solución, `layouts/partials/head.html` inyecta un esquema semántico `SoftwareApplication` que define:
  - Nombre y descripción técnica.
  - `applicationCategory`: `BusinessApplication`
  - `operatingSystem`: `Web, Modern Browser, PWA`
  - Autor corporativo: `Solutech`

---

## 6. Integración con Decap CMS

El archivo `static/admin/config.yml` ha sido actualizado para permitir la gestión visual de Soluciones:
- Colección `soluciones` (`content/soluciones/`): Permite añadir nuevos proyectos, actualizar estados y modificar stacks.
- Colección `blog` (`content/blog/`): Incorpora el selector `projects` (lista de slugs) para vincular artículos a soluciones sin tocar código.

---

## 7. Protocolo para Añadir Nuevos Proyectos

1. **Crear archivo Markdown:** Añadir `content/soluciones/<nuevo-slug>.md`.
2. **Definir Frontmatter:** Rellenar título, estado real, naturaleza, stack y URLs oficiales.
3. **Redactar Caso Técnico:** Describir el problema real, la arquitectura diseñada (incluyendo diagrama de flujo o bloques ASCII), los retos superados y el valor para los clientes de Solutech.
4. **Vincular Contenidos:** Asignar artículos existentes o redactar una nota técnica con `projects: ["<nuevo-slug>"]`.
5. **Validación:** Ejecutar `npm run lint` y `hugo -M`.
