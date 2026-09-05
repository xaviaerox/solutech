---
title: "Queryclin — HCE Intelligence & Admin Studio"
slug: "queryclin"
tagline: "Exploración y Auditoría de Historias Clínicas Electrónicas con Privacidad Local-First"
description: "Motor de búsqueda semántica Okapi BM25 y estudio declarativo de formularios hospitalarios capaz de procesar más de 100.000 registros clínicos en el navegador sin fuga de datos."
status: "Demostración técnica"
nature: "Solución Local-First & Admin Studio"
version: "v7.x Stable"
date: "2026-09-05T10:00:00+02:00"
image: "images/soluciones/queryclin.jpg"
demo_url: "https://xaviaerox.github.io/Queryclin/"
github_url: "https://github.com/xaviaerox/Queryclin"
stack: ["React 19", "TypeScript", "Vite", "IndexedDB", "Web Workers", "Okapi BM25", "TailwindCSS"]
architecture_pattern: "Local-First / Parallel Streaming Workers / Clean Architecture"
collaboration: "Coordinación técnica y clínica con D. Ignacio Martínez Soriano (Jefe de Análisis de Datos, Hospital Rafael Méndez de Lorca)"
draft: false
---

### El Desafío Clínico y Tecnológico

La digitalización hospitalaria ha generado volúmenes masivos de datos clínicos, pero con frecuencia estos se exportan en formatos planos y desestructurados (CSV, hojas de cálculo o volcados de texto libre). Durante auditorías clínicas, revisiones farmacológicas o investigaciones retrospectivas, los profesionales sanitarios sufren una elevada carga cognitiva para localizar información longitudinal dispersa.

A este reto se suma una restricción legal y ética insalvable: **los datos sanitarios son de máxima sensibilidad y no pueden subirse a la nube pública ni a servidores de terceros** sin complejos protocolos de anonimización y riesgo de sanciones severas bajo el RGPD.

Queryclin nació como respuesta de ingeniería a este dilema: ¿es posible indexar, procesar y buscar en milisegundos más de 100.000 historias clínicas completas directamente en la memoria del navegador, garantizando privacidad absoluta por diseño?

---

### Arquitectura Local-First y Privacidad por Diseño

Queryclin opera bajo una arquitectura estrictamente **Local-First**. Todo el ciclo de vida del dato —ingesta, parseo sintáctico, indexación semántica y persistencia estructurada— se ejecuta de forma local en el cliente.

```text
  [ Dataset Clínico (CSV / JSON) ]
                 │
                 ▼  (File Streaming API)
  ┌─────────────────────────────────────────────────────────────┐
  │                    NAVEGADOR DEL CLIENTE                    │
  │                                                             │
  │  ┌──────────────────────┐        ┌───────────────────────┐  │
  │  │   UI & Components    │        │  Web Workers (Paral.) │  │
  │  │   React 19 / Clean   │◄──────►│  Parseo & Normalizac. │  │
  │  └──────────┬───────────┘        └───────────┬───────────┘  │
  │             │                                │              │
  │             ▼                                ▼              │
  │  ┌──────────────────────┐        ┌───────────────────────┐  │
  │  │ Motor Semántico      │        │ Persistencia Local    │  │
  │  │ Okapi BM25 + Boosting│        │ IndexedDB Chunks      │  │
  │  │ Negation Shielding   │        │ Cero Servidores Ext.  │  │
  │  └──────────────────────┘        └───────────────────────┘  │
  └─────────────────────────────────────────────────────────────┘
                 │
                 X  CERO TRANSMISIÓN AL EXTERIOR (Zero Telemetry)
```

---

### Componentes Clave del Sistema

#### 1. Queryclin Core Engine & Clinical Viewer
- **Búsqueda Booleana Avanzada:** Operadores lógicos compuestos (`AND`, `OR`, `NOT`) con agrupamiento por tomas y episodios clínicos.
- **Motor Okapi BM25 con Field Boosting:** Ponderación diferenciada según el campo clínico (diagnósticos principales, juicio clínico, antecedentes personales o farmacología).
- **Negation Shielding:** Detección de negaciones contextuales en castellano médico ("sin antecedentes de cardiopatía", "niega disnea") para evitar falsos positivos críticos en auditorías.
- **Línea Temporal Longitudinal:** Navegación cronológica que conserva la visión evolutiva completa del paciente mientras se aíslan hallazgos concretos.

#### 2. Queryclin Admin Studio
Entorno visual de gobernanza del dato que permite a coordinadores clínicos diseñar formularios hospitalarios estructurados mediante una interfaz declarativa *Drag-and-Drop*:
- Modelado visual de taxonomías clínicas estándar (MIR, OBS, ALG).
- Compilación dinámica de esquemas a estructuras validadas en TypeScript.
- Persistencia desacoplada en IndexedDB con soporte para exportación JSON reproducible.

---

### Retos de Ingeniería Superados

1. **Prevención de Out-of-Memory (OOM) en Navegador:** Para procesar más de 100.000 episodios sin saturar la pestaña del navegador, se implementó un pipeline de streaming fragmentado con Web Workers y asignación controlada de bloques de memoria en IndexedDB.
2. **Normalización No Destructiva:** Manejo resiliente de exportaciones hospitalarias heterogéneas con inconsistencias en cabeceras, saltos de línea irregulares y codificaciones heredadas.
3. **Desacoplamiento Clean Architecture:** Separación total entre el dominio clínico, el motor de indexación, la capa de persistencia y la interfaz visual.

---

### Aplicación y Valor para Clientes de Solutech

Queryclin no se comercializa como un SaaS genérico para pymes; funciona como **prueba fehaciente de nuestra competencia en ingeniería de sistemas**:
- **Tratamiento Seguro de Información:** La misma filosofía de aislamiento estricto y privacidad de Queryclin es la que Solutech aplica al proteger bases de datos corporativas y diseñar arquitecturas Zero-Trust para empresas.
- **Optimización de Rendimiento:** Demuestra nuestra capacidad para extraer el máximo rendimiento de hardware y software estándar sin requerir costes astronómicos de infraestructura en la nube.
