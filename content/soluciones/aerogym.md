---
title: "AeroGym — PWA de Rendimiento Deportivo & Coach con IA"
slug: "aerogym"
tagline: "Entrenamiento de Fuerza, Ingesta Universal de Salud y Resiliencia Offline-First"
description: "Aplicación Web Progresiva con arquitectura limpia de 7 capas, motor analítico de fatiga diaria (Readiness Engine), ingesta de Xiaomi/Google Fit y tutoría inteligente con Llama 3.3."
status: "Producción activa"
nature: "PWA de Rendimiento Deportivo & Edge AI"
version: "v2.2.0 Enterprise"
date: "2026-09-05T10:00:00+02:00"
image: "images/soluciones/aerogym.jpg"
stack: ["React 19", "TypeScript", "Vite", "Zustand", "Supabase Postgres", "pgvector RAG", "Groq Llama 3.3", "IndexedDB", "WebCrypto AES-256"]
architecture_pattern: "Clean Architecture / Offline-First Queue / Inyección de Dependencias / Edge Proxy"
draft: false
---

### El Desafío: Rendimiento Deportivo en Entornos Desconectados

Los atletas y practicantes de calistenia, fuerza e hipertrofia se enfrentan a tres problemas recurrentes en las aplicaciones deportivas convencionales:
1. **Pérdida de Operatividad sin Conexión:** En sótanos o zonas de gimnasio sin cobertura móvil, la mayoría de aplicaciones se bloquean o impiden registrar series en tiempo real.
2. **Fragmentación de Métricas de Salud:** Los datos de sueño y pasos recogidos por pulseras inteligentes (Xiaomi, Zepp, Google Fit) quedan aislados del volumen real levantado en la sesión de entrenamiento.
3. **Falta de Ajuste Dinámico de Sobrecarga:** Entrenar con cargas elevadas en días de alta fatiga acumulada dispara el riesgo de lesiones y sobreentrenamiento crónico.

AeroGym fue diseñado y construido por Solutech como una **PWA de máximo rendimiento** (100/100 en auditoría técnica), aplicando patrones de ingeniería de software empresarial a la optimización deportiva.

---

### Arquitectura Limpia (Clean Architecture) y Resiliencia Offline-First

AeroGym implementa una arquitectura desacoplada en capas concéntricas con inversión de dependencias (`RepositoryContext`), almacenamiento local cifrado (`WebCrypto AES-256-GCM`) y un orquestador de sincronización en segundo plano (`SyncEngine`).

```text
  ┌─────────────────────────────────────────────────────────────┐
  │                   CLIENTE PWA (React 19)                    │
  │                                                             │
  │  ┌──────────────────────┐        ┌───────────────────────┐  │
  │  │ Presentación         │        │ Stores Zustand        │  │
  │  │ Views / SVG Muscle   │◄──────►│ useWorkoutStore       │  │
  │  │ Virtualized Lists    │        │ useHealthStore        │  │
  │  └──────────┬───────────┘        └───────────┬───────────┘  │
  │             │                                │              │
  │             ▼                                ▼              │
  │  ┌──────────────────────┐        ┌───────────────────────┐  │
  │  │ Motores de Dominio   │        │ Persistencia Offline  │  │
  │  │ - ReadinessEngine    │        │ IndexedDB Queue       │  │
  │  │ - ProgressiveOverload│        │ WebCrypto AES-256-GCM │  │
  │  │ - FatigueEngine (SVG)│        │ Sincronización fondo  │  │
  │  └──────────────────────┘        └───────────┬───────────┘  │
  └──────────────────────────────────────────────┼──────────────┘
                                                 │ (HTTPS / REST)
                                                 ▼
  ┌─────────────────────────────────────────────────────────────┐
  │                 BACKEND SERVIDO (Supabase)                  │
  │  - Base de datos relacional PostgreSQL con RLS              │
  │  - Extensión pgvector para memoria semántica RAG            │
  │  - Edge Function segura (groq-proxy) para Groq Llama 3.3    │
  └─────────────────────────────────────────────────────────────┘
```

---

### Capacidades Técnicas Destacadas

#### 1. Readiness Engine (Predisposición Diaria)
Algoritmo determinista que procesa la ingesta de sueño y pasos del usuario (mediante parseadores universales de Xiaomi Zepp y Google Fit Takeout) para calcular un índice objetivo (0-100) que calibra el volumen y la intensidad recomendada de la sesión.

#### 2. Visualizador Anatómico SVG de Fatiga Muscular
Componente de mapeo visual desarrollado en SVG dinámico sin librerías 3D pesadas, que refleja el nivel de estrés por grupo muscular según las series registradas en los últimos 7 días.

#### 3. Aero AI Coach con Memoria RAG Híbrida
Asistente técnico especializado en entrenamiento basado en evidencia y filosofía estoica:
- Búsqueda semántica híbrida: local en cliente (TF-IDF + Cosine Similarity) y remota en base de datos (`pgvector`).
- Invocación segura mediante función serverless *Edge Function* (`groq-proxy`) con Groq Llama 3.3 70B, aislando totalmente las credenciales y respetando la privacidad del usuario (Zero PII).

---

### Estado del Proyecto

AeroGym opera en **Producción Estable (Versión v2.2.0 Enterprise)**, con una suite completa de pruebas unitarias y de integración en Vitest (100% test pass), soporte PWA con Service Worker activo y actualización en segundo plano.
