---
title: "Coexistencia de Múltiples Atacantes en una Misma Red: Protocolo de Respuesta Forense Avanzada"
date: 2026-06-23T12:33:13+02:00
slug: "doble-amenaza-ciberatacantes-paralelo-red"
description: "Qué hacer cuando dos grupos criminales operan en tus servidores al mismo tiempo tras la filtración de credenciales en la Dark Web."
categories: ["Ciberseguridad", "Análisis de Amenazas"]
keywords: ["ciberataque paralelo", "detección de amenazas", "respuesta a incidentes", "seguridad Pymes", "vulnerabilidades SharePoint", "MFA"]
image: "images/blog-doble-amenaza-ciberatacantes-paralelo-red.jpg"
draft: false
source_url: "https://www.microsoft.com/en-us/security/blog/2026/06/22/one-intrusion-two-cyberattackers-uncovering-parallel-threat-activity/"
---
## 🔍 Resumen Ejecutivo
Un reciente informe de Microsoft revela un escenario complejo: dos grupos de ciberatacantes operando simultáneamente en la misma red.

Esta táctica de 'doble intrusión' dificulta la detección y exige una estrategia de ciberseguridad más robusta para las Pymes.

## 🔒 Introducción
En el panorama actual de la ciberseguridad, las amenazas evolucionan constantemente. Lo que antes era un ataque lineal, ahora puede ser una intrusión multifacética.

El último informe de Microsoft Incident Response (DART) subraya esta complejidad, revelando un caso donde dos actores de amenazas no relacionados operaron en paralelo dentro de una misma infraestructura.

## 📰 Qué ha ocurrido
La investigación, que comenzó como una rutina de ransomware, desveló una intrusión de múltiples etapas. El grupo Storm-2603 había estado explotando vulnerabilidades conocidas en servidores SharePoint locales desde mediados de 2025.

Realizaron actividades de reconocimiento, buscando puntos de entrada adicionales mediante solicitudes de archivos de configuración sensibles, como `win.ini` y `web.config`.

Una vez dentro, Storm-2603 se centró en la persistencia y el control. Desplegaron Velociraptor con privilegios de SYSTEM para mapear el entorno.

Luego, establecieron múltiples canales de acceso remoto a través de túneles de Cloudflare, Zoho Assist y conexiones SSH configuradas mediante Visual Studio Code.

La escalada de privilegios siguió, creando nuevas cuentas de administrador locales y de dominio. También utilizaron técnicas de evasión de defensa, incluyendo un controlador vulnerable para manipular la memoria y deshabilitar protecciones.

Durante la correlación de actividades, los investigadores de DART descubrieron un segundo actor de amenazas, no relacionado, operando en paralelo. Este segundo grupo empleó técnicas como el *DLL sideloading* malicioso y *backdoors* personalizados, lo que añadió una capa de complejidad y dificultó la atribución y detección.

## 🛠️ Detalles técnicos
La intrusión inicial de Storm-2603 se centró en vulnerabilidades de SharePoint, buscando archivos de configuración para validar debilidades de *local file inclusion* (LFI).

Una vez dentro, el uso de herramientas legítimas como Velociraptor (una herramienta forense) con privilegios de SYSTEM les permitió pasar desapercibidos, mezclando actividad maliciosa con comportamiento administrativo de confianza.

Para la persistencia, se observó el uso de túneles de Cloudflare, Zoho Assist y SSH a través de Visual Studio Code. Estos métodos permiten el acceso remoto sin levantar sospechas inmediatas, ya que son herramientas de uso común.

La escalada de privilegios se logró mediante la creación de nuevas cuentas de administrador y el uso de un controlador vulnerable para deshabilitar las protecciones de seguridad.

La aparición del segundo actor complicó la situación. Sus técnicas de *DLL sideloading* y *backdoors* personalizados son particularmente insidiosas.

El *DLL sideloading* permite a los atacantes ejecutar código malicioso ocultándose detrás de software de confianza, evadiendo la detección al ejecutarse dentro de aplicaciones conocidas y manteniendo la persistencia.

La coexistencia de ambos actores creó un 'ruido' que enmascaraba sus actividades individuales, haciendo que la detección y la respuesta fueran mucho más desafiantes.

```
┌───────────────────────────┐
│   RED DE LA ORGANIZACIÓN  │
└───────────┬───────────────┘
            │
┌───────────┴───────────┐
│   Punto de Entrada    │
│ (Vulnerabilidad SP)   │
└───────────┬───────────┘
            │
┌───────────┴───────────┐
│   ACTOR 1 (Storm-2603)│
│ ⚙️ Reconocimiento      │
│ 🛠️ Velociraptor (SYSTEM)│
│ 🌐 Túneles (CF, Zoho, SSH)│
│ 🔑 Escalada Privilegios│
│ 🛡️ Evasión Defensas    │
└───────────┬───────────┘
            │
┌───────────┴───────────┐
│   ACTOR 2 (Desconocido)│
│ 📚 DLL Sideloading    │
│ 🚪 Backdoors Personal.│
└───────────┬───────────┘
            │
┌───────────┴───────────┐
│   ACTIVIDAD PARALELA  │
│   (Ofuscación Mutua)  │
└───────────────────────┘
```

## 📈 Por qué importa
Este caso subraya la necesidad crítica de una visibilidad continua y exhaustiva en toda la infraestructura. Para las Pymes, la detección de múltiples actores operando en paralelo es un desafío enorme, ya que las señales de uno pueden ser confundidas con las del otro, o simplemente enmascaradas por el volumen de actividad.

La confianza en herramientas legítimas, como Velociraptor o Zoho Assist, puede ser un arma de doble filo. Los atacantes las utilizan para mezclarse con el tráfico normal, haciendo que las detecciones basadas únicamente en firmas sean ineficaces.

Esto aumenta el tiempo de permanencia (*dwell time*) de los atacantes en la red, incrementando el riesgo de exfiltración de datos o despliegue de ransomware.

La falta de una respuesta coordinada y de inteligencia de amenazas puede llevar a una contención incompleta, dejando puertas traseras abiertas para futuras intrusiones. La inversión en soluciones de detección y respuesta de endpoints (EDR) y una gestión proactiva de identidades es más crucial que nunca.

> ⚠️ **Advertencia de Solutech:** "La creencia de que 'solo un atacante' está en tu red puede ser tu mayor vulnerabilidad. Asume siempre la posibilidad de múltiples amenazas y busca señales correlacionadas."

## 💡 Recomendaciones para el lector
Para fortalecer sus defensas contra este tipo de ataques complejos, las Pymes deben priorizar las siguientes acciones:

*   **Patching Riguroso y Gestión de Vulnerabilidades:** ⚙️ Mantenga todos los sistemas, especialmente los expuestos a internet como SharePoint, actualizados con los últimos parches de seguridad. Un programa de gestión de vulnerabilidades es esencial.
*   **Seguridad de Identidades Robusta:** 🔑 Implemente autenticación multifactor (MFA) obligatoria en todas las cuentas, especialmente las de administrador. Utilice una bóveda segura de credenciales para gestionar contraseñas de forma segura y auditable.
*   **Visibilidad Continua y Centralizada:** 🔍 Despliegue protección de endpoints (EDR) en todos los dispositivos y centralice la telemetría. Esto permite correlacionar actividades sospechosas a través de identidades, endpoints y recursos en la nube.
*   **Monitorización de Herramientas Legítimas:** 🛠️ Supervise y restrinja el uso de herramientas de acceso remoto, túneles y administrativas. Establezca alertas para usos inusuales o no autorizados de estas herramientas.
*   **Planes de Respuesta a Incidentes:** 🚨 Mantenga y pruebe regularmente planes de respuesta a incidentes. Asegúrese de que su equipo pueda aislar rápidamente usuarios, dispositivos y rutas de acceso comprometidos para reducir el tiempo de permanencia del atacante.
*   **Segmentación de Redes:** 🌐 Implemente una segmentación de red para limitar el movimiento lateral de los atacantes, incluso si logran una intrusión inicial.

## ✅ Conclusión
El informe de Microsoft es un recordatorio contundente de que los ciberataques modernos son cada vez más sofisticados y multifacéticos.

La capacidad de dos actores de amenazas para operar en paralelo en una misma red, enmascarando sus actividades, exige un cambio de paradigma en la estrategia de ciberseguridad.

La visibilidad, la prevención proactiva y una respuesta rápida y coordinada son la clave para proteger su negocio en este entorno complejo.

> 💡 **Accede aquí:** [Implementar MFA Obligatorio en tu Servidor SSH](/guias/implementar-mfa-obligatorio-servidor-ssh) (*Un paso crucial para blindar tus accesos remotos*).

## ❓ FAQ
### ¿Qué significa que dos ciberatacantes operen en paralelo?
Significa que dos grupos de atacantes, sin relación entre sí, logran acceder a la misma red y llevan a cabo sus propias actividades maliciosas de forma simultánea.

Esto complica enormemente la detección y atribución, ya que sus acciones pueden enmascararse mutuamente.

### ¿Cómo pueden los atacantes usar herramientas legítimas para pasar desapercibidos?
Los ciberatacantes a menudo abusan de herramientas de administración de sistemas, monitoreo o acceso remoto legítimas (como Velociraptor, Zoho Assist o Cloudflare Tunneling).

Al utilizarlas, sus actividades se mezclan con el tráfico de red normal, dificultando que los sistemas de seguridad los identifiquen como amenazas.

### ¿Qué es el DLL sideloading y por qué es peligroso?
El *DLL sideloading* es una técnica donde un atacante coloca una DLL maliciosa en una ubicación específica para que un programa legítimo la cargue en lugar de la DLL original.

Es peligroso porque permite ejecutar código malicioso bajo el paraguas de un proceso de confianza, evadiendo la detección y manteniendo la persistencia en el sistema.