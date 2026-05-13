# 🕒 Historial de Cambios (CHANGELOG) — Solutech

Este documento registra de manera evolutiva todas las decisiones, cambios y razonamientos técnicos aplicados al proyecto Solutech V4.

## [V4.0.0] - 2026-05-13
### 🏗️ Fase: Limpieza y Reconstrucción Total

#### Añadido
- **Encapsulación de Legado**: Movidas todas las versiones previas (Astro 5, Claude v3, etc.) a la carpeta `.old/` para trabajar sobre un lienzo en blanco.
- **Sistema de Privacidad**: Creadas carpetas `private/` y configurado `.env` maestro para credenciales, excluidos de Git por seguridad.
- **Seguridad VPS (IONOS)**: 
    - Generación de llaves SSH (Ed25519) y autorización en servidor.
    - Desactivación total del acceso por contraseña (root).
    - Configuración de Firewall (UFW) permitiendo solo puertos 22, 80, 443 y 3001.
    - Instalación de Fail2Ban para prevención de intrusiones.
- **Núcleo Hugo**: Inicializado proyecto Hugo (Extended) para máxima velocidad de carga y modularidad.
- **Conversión de Diseño**: Migrado el HTML base (`solutech_home_v3`) a la arquitectura de Hugo (layouts, partials, assets/css).
- **Despliegue Automático**: Configurado GitHub Actions para publicación en GitHub Pages con soporte de CNAME (`solutech.shop`).
- **Monitorización**: Desplegado contenedor Docker con Uptime Kuma en el VPS, protegido tras un proxy inverso de Nginx (`status.solutech.shop`).
- **Formulario de Contacto**: Integración con Formspree para envío directo a email sin necesidad de backend propio.
- **Documentación para IA**: Creada carpeta `.docs_ai/` con reglas, guía de estilo y contexto de negocio para facilitar el trabajo de asistentes IA.

#### Cambiado
- **Estrategia de Precios**: Se ha decidido mostrar precios directos ("Desde X€") para aumentar la transparencia y el valor de marca técnica.
- **Stack**: Migración de Astro a Hugo por requerimiento de simplicidad y eficiencia en un sitio de consultoría técnica.

#### Razón del Cambio
La infraestructura previa de Astro 5 acumulaba "deuda técnica" y archivos de configuración mezclados con el código. La migración a Hugo y el blindaje del VPS responden a la necesidad de profesionalizar Solutech como una plataforma de élite segura, rápida y fácil de mantener.

---
*Última actualización: 13/05/2026*
