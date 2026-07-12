---
title: "AZ-900 en 2026: qué estudiar de verdad (y qué ignorar) si vienes de sysadmin"
date: 2026-07-11T09:00:00+02:00
slug: "az-900-en-2026-que-estudiar-de-verdad-si-vienes-de-sysadmin"
draft: false
description: "Resumen práctico de la certificación Azure Fundamentals para perfiles ASIR/sysadmin: los tres bloques que importan, las trampas más repetidas del examen, y guía de estudio completa en PDF para descargar."
tags: ["azure", "az-900", "certificaciones", "cloud", "microsoft"]
categories: ["Certificaciones"]
keywords: ["azure", "az-900", "certificaciones", "cloud", "microsoft", "sysadmin", "estudiar az-900"]
image: "images/bg/bg-network.png"
aliases:
  - /guias/guia-estudio-az900-azure-fundamentals
  - /guias/guia-estudio-az900-azure-fundamentals/
---

Si vienes de administración de sistemas, redes o Linux, **AZ-900 no te va a enseñar nada nuevo sobre informática** — te va a enseñar vocabulario y arquitectura de Azure. Ese es el primer ajuste mental que hay que hacer antes de abrir cualquier material: no es un curso de introducción a la nube, es un examen de **\"describe X\"**, no de \"configura X\".

Aquí va el resumen de lo que de verdad importa, después de repasar el temario oficial vigente de Microsoft Learn (actualización de enero 2026) de arriba a abajo.

## El examen se reparte en tres bloques

- **Conceptos Cloud** (25–30%) — modelo de responsabilidad compartida, IaaS/PaaS/SaaS, CapEx vs OpEx.
- **Arquitectura y Servicios de Azure** (35–40%) — el bloque más pesado: regiones, redes, storage, identidad, compute.
- **Gestión y Gobernanza** (30–35%) — costes, políticas, herramientas, monitorización.

Si solo tienes tiempo para un bloque, que sea el segundo.

## Lo que más se repite en el examen

**El modelo de responsabilidad compartida.** Da igual cómo lo disfracen en el enunciado: la pregunta trampa de fondo casi siempre es la misma. Datos, dispositivos e identidad son **siempre** responsabilidad del cliente, en on-prem, IaaS, PaaS o SaaS. Lo demás se va desplazando hacia Microsoft a medida que subes de capa.

**RBAC no es lo mismo que Azure Policy.** RBAC controla *quién* puede hacer algo. Policy controla *qué configuración* es válida, sin importar quién la aplique. Y ninguno de los dos se salta con un Resource Lock — ni siquiera si eres Owner.

**GRS no es RA-GRS.** Georreplicar no significa poder leer la copia — para eso necesitas la variante \"Read Access\".

**Availability Set, Availability Zone y Region Pair protegen de cosas distintas**: hardware dentro de un datacenter, un datacenter completo, y una región completa, respectivamente. Es la pregunta de arquitectura más habitual del examen.

## Lo que puedes ignorar (aunque otras guías no lo digan)

Buena parte de las guías de estudio que circulan por ahí arrastran contenido de versiones antiguas del temario. A día de hoy, **bases de datos (SQL/Cosmos DB), IA (OpenAI/Vision/Speech), analítica (Synapse/Databricks) e IoT no son objetivo oficial de AZ-900** — pertenecen a DP-900 y AI-900. Tampoco hace falta profundizar en NSG, Load Balancer o Application Gateway a nivel de configuración; eso es terreno de AZ-104. Dedicarles horas de estudio serio es tiempo que no se traduce en más probabilidad de aprobar.

## Cómo lo he estudiado yo

Con un plan de cinco días: un bloque temático por día, dejando el último para comparativas, preguntas trampa y un simulacro corto. Nada de vídeos de cuatro horas explicando qué es un servidor.

## La guía completa

Todo el detalle —tablas comparativas, diagramas, glosario, 15 preguntas trampa explicadas y un simulacro de 15 preguntas— está en el PDF de estudio que preparé para repasar antes del examen. Está pensado para leerse en un par de sesiones, no como curso.

📄 **[Descargar AZ-900 Study Guide 2026 (PDF)](/files/az900-study-guide-2026.pdf)**

---

*¿Vienes de sysadmin/ASIR y estás preparando certificaciones cloud? Cuéntame en qué punto estás — siempre viene bien comparar notas.*
