---
title: "MiraTEA — Plataforma Digital TEA & Neurodiversity-First"
slug: "miratea"
tagline: "Acompañamiento, Autonomía y Autorregulación Emocional en Entornos TEA"
description: "Solución tecnológica especializada para menores en el Espectro Autista, familias y terapeutas. Arquitectura sin castigos punitivos, síntesis de audio sensorial 432Hz y filtrado PII local."
status: "Validación comercial"
nature: "Plataforma Digital TEA / Neurodiversity-First"
version: "v1.4.0 (Enterprise Release)"
date: "2026-09-05T10:00:00+02:00"
image: "images/soluciones/miratea.jpg"
stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL RLS", "Web Audio API", "pgvector RAG", "PWA"]
architecture_pattern: "Dual-Adapter (Offline Static + Cloud Supabase) / Multitenant RLS"
draft: false
---

### El Desafío: Tecnología Amable vs. Dinámicas de Ansiedad

La gran mayoría de aplicaciones convencionales de gestión de hábitos y tareas incorporan mecánicas de gamificación agresivas: rachas obligatorias que se pierden si no se accede un día, penalizaciones punitivas, comparaciones sociales y elementos visuales estresantes. Para un menor con Trastorno del Espectro Autista (TEA) o TDAH, este enfoque genera fricción, rechazo y sobrecarga sensorial.

Familias y profesionales sociosanitarios necesitan un entorno digital que favorezca la **autonomía predecible y la autorregulación emocional**, eliminando la ansiedad y garantizando la privacidad absoluta de datos médicos y personales de menores de edad.

MiraTEA fue concebida y desarrollada por Solutech como una plataforma **Neurodiversity-First**: diseñada desde sus cimientos para respetar los ritmos neurológicos de cada menor sin frustración ni castigos digitales.

---

### Arquitectura Neurodiversity-First y Protección de Privacidad

La plataforma implementa un patrón **Dual-Adapter** que permite a la aplicación operar de forma completamente aislada (modo offline local con persistencia cifrada) o sincronizada en la nube mediante Supabase multitenant con aislamiento estricto por unidad familiar (`family_id`).

```text
  ┌─────────────────────────────────────────────────────────────┐
  │                   CLIENTE WEB / PWA (Next.js)               │
  │                                                             │
  │  ┌──────────────────────┐        ┌───────────────────────┐  │
  │  │ Visual Routines &    │        │ Web Audio API (432Hz) │  │
  │  │ Emotional Check-in   │        │ Box Breathing 4-4-4-4 │  │
  │  └──────────┬───────────┘        └───────────────────────┘  │
  │             │                                               │
  │             ▼                                               │
  │  ┌──────────────────────┐        ┌───────────────────────┐  │
  │  │ PiiSanitizer Guard   │───────►│ Lumi AI Companion     │  │
  │  │ Anonimización Local  │        │ pgvector RAG Seguro   │  │
  │  └──────────┬───────────┘        └───────────────────────┘  │
  └─────────────┼───────────────────────────────────────────────┘
                │
                ▼ (HTTPS / JWT con Row Level Security)
  ┌─────────────────────────────────────────────────────────────┐
  │              INFRAESTRUCTURA BACKEND (Supabase)             │
  │  - Multitenant estricto por family_id con políticas RLS     │
  │  - Base de datos PostgreSQL con extensión pgvector          │
  │  - Cumplimiento íntegro RGPD Art. 20 (Portabilidad total)   │
  └─────────────────────────────────────────────────────────────┘
```

---

### Pilares de Producto y Diseño Inmutable

1. **Ausencia de Rachas Punitivas (No Streaks):** Cero penalizaciones por periodos de inactividad; los avances se consolidan y celebran, nunca se destruyen.
2. **Mascota Inmutable (*Lumi*):** El avatar evoluciona positivamente con cada meta, sin posibilidad de regresión, castigos gráficos ni degradación de estado.
3. **Respiración Guiada con Audio Sensorial 432Hz:** Espacio de calma en 1-clic con armonización acústica mediante Web Audio API con osciladores puros (432Hz + 216Hz) y señal de finalización no invasiva.
4. **Descomposición Inteligente en Micropasos:** Módulo de asistencia que desglosa objetivos complejos en secuencias lineales de 2 a 6 pasos estructurados.
5. **Métricas Estructuradas para Terapeutas:** Generación de informes clínicos objetivos (PDF y CSV) en 6 dimensiones conductuales sin invadir la intimidad del menor.

---

### Seguridad y Blindaje de Datos Sensibles de Menores

- **Filtro PiiSanitizer en Cliente:** Todos los datos identificativos, nombres y referencias familiares se anonimizan localmente en el dispositivo antes de consultar cualquier motor semántico de IA.
- **Aislamiento Multitenant con RLS:** Políticas de PostgreSQL Row Level Security garantizan que ninguna familia o centro pueda consultar ni inferir información de otros entornos.
- **Portabilidad y Soberanía:** Exportación íntegra de historiales en formato estándar para facilitar el cambio de terapeuta o el almacenamiento seguro en el hogar.

---

### Estado Actual: Validación Comercial

MiraTEA se encuentra en fase de **Validación Comercial (Release v1.4.0 Enterprise)**, con pruebas estructuradas junto a familias y centros terapéuticos colaboradores. Cuenta con una suite de 50 pruebas unitarias en Vitest y arquitectura auditada.
