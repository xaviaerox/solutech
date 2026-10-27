---
title: "La desactivación masiva de Amadey: cómo el robo de cookies expone a las Pymes tras el fin de una botnet"
date: "2026-10-27T15:04:52+02:00"
slug: "desactivacion-amadey-robo-cookies-riesgo-pymes"
description: "El ASD de Australia neutraliza 180.000 equipos infectados por Amadey. Analizamos el impacto de este infostealer y cómo proteger los accesos corporativos."
categories: ["Ciberseguridad"]
keywords: ["Amadey malware", "infostealer", "ciberseguridad pymes", "robo de cookies de sesion", "seguridad microsoft 365"]
business_impact: "La desconexión pública de una red de malware no invalida la información exfiltrada previamente. Las credenciales y galletas de sesión robadas siguen activas en mercados clandestinos, permitiendo a los atacantes eludir el MFA sin ser detectados."
image: "images/news-desactivacion-amadey-robo-cookies-riesgo-pymes.jpg"
draft: false
source_url: "https://thehackernews.com/2026/10/australia-gets-into-amadey-malware.html"
---
## Golpe de mano de la inteligencia australiana: 180.000 equipos liberados del control de Amadey

En una intervención ofensiva de cibernética, el Australian Signals Directorate (ASD) ha logrado penetrar la infraestructura de control (C2) de un operador del malware Amadey. Esta maniobra ha cortado en seco la conexión con más de 180.000 ordenadores infectados en todo el mundo.

Amadey opera bajo el modelo de Crimeware-as-a-Service (CaaS) desde 2018. Cada comprador adquiere su propio panel de administración independiente. Las investigaciones de firmas de ciberseguridad han identificado hasta 53 botnets distintas de Amadey funcionando de forma aislada, lo que demuestra la fragmentación de este ecosistema criminal.

A pesar del éxito operativo de la agencia gubernamental, la neutralización de un servidor de mando no resuelve el problema de fondo para las empresas afectadas. La información sustraída con anterioridad continúa estando expuesta en foros de cibercrimen.

## Anatomía de la intrusión: el camino desde un parche falso hasta la fuga de datos

El vector de entrada de Amadey rara vez utiliza vulnerabilidades complejas de día cero. Los atacantes confían en la ingeniería social, distribuyendo el código malicioso a través de actualizaciones de software falsas, instaladores de programas no autorizados o cargas ocultas en documentos adjuntos.

Como hemos analizado previamente al examinar cómo los [archivos descargados son la puerta de entrada al robo de credenciales en Pymes](/blog/archivos-descargados-robo-credenciales-pyme/), la falta de restricciones en la ejecución de binarios en el puesto de trabajo permite que el malware se instale de manera silenciosa en el sistema.

Una vez ejecutado, Amadey no se limita a monitorear el equipo local. Su función principal es actuar como un cargador (*loader*) de segundo nivel, desplegando herramientas especializadas en la extracción de datos como StealC.

## Flujo técnico de ejecución y exfiltración de credenciales

El comportamiento del malware sigue una secuencia automatizada diseñada para evitar los controles antivirus tradicionales basados en firmas de archivos:

```
[ Puesto de Trabajo ]
         │
         ├── (1) Ejecución de instalador o actualización falsa
         ▼
[ Proceso Amadey ]
         │
         ├── (2) Persistencia local y check-in con C2 (vía HTTP/HTTPS)
         ▼
[ Descarga de Payload (StealC Infostealer) ]
         │
         ├── (3) Extracción de Passwords del navegador y Session Cookies
         ▼
[ Servidor C2 del Atacante ] ── (4) Exfiltración y venta a Access Brokers
         │
         ▼
[ Acceso Ilícito a Microsoft 365 / ERP corporativo (Bypass de MFA) ]
```

El riesgo crítico de esta secuencia radica en la recolección de las galletas de sesión (*session cookies*). Cuando un atacante obtiene estos tokens almacenados en el navegador del usuario, puede importarlos en su propio equipo y tomar el control de servicios en la nube como Microsoft 365 o el ERP de la empresa.

> ⚠️ **Advertencia de Seguridad:** El uso de Autenticación de Doble Factor (MFA) basado en SMS o aplicaciones de autenticación estándar no impide el acceso no autorizado si el atacante utiliza una galleta de sesión robada (*Pass-the-Cookie*), ya que la identidad ya ha sido validada previamente por el usuario legítimo.

## El espejismo de la desarticulación: por qué su empresa sigue en riesgo

El desmantelamiento de servidores por parte de agencias policiales u operaciones internacionales como *Operation Endgame* interrumpe el canal de comunicación del cibercriminal, pero no limpia el equipo infectado ni revoca las credenciales sustraídas.

Los datos analizados por equipos de inteligencia revelan que las credenciales e identidades robadas por *infostealers* pueden permanecer inactivas en bases de datos ilegales durante meses antes de ser utilizadas para perpetrar un ataque de ransomware o un fraude bancario.

En la misma intervención, el ASD reveló haber interceptado y destruido un lote de 5 terabytes de información corporativa robada a una entidad privada que ni siquiera era consciente de haber sufrido una brecha de seguridad. Este escenario es habitual en el segmento de la Pyme, donde la falta de monitorización oculta las intrusiones durante más de 200 días de media.

## Estrategia de defensa activa y hardening para entornos corporativos

Para bloquear de forma definitiva el vector de riesgo que explotan herramientas como Amadey, la estrategia de IT no debe centrarse únicamente en la detección del archivo malicioso, sino en el control del contexto de la identidad y la ejecución.

1. **Políticas de Control de Aplicaciones:** Restringir la ejecución de archivos ejecutables y scripts desde carpetas temporales (`%AppData%`, `%Temp%`) mediante directivas AppLocker o Software Restriction Policies.
2. **Cierre explícito de sesiones e inmutabilidad de tokens:** Configurar tiempos de vida cortos para las sesiones en servicios SaaS y exigir verificación contextual de red o dispositivo (Acceso Condicional en Microsoft Entra ID).
3. **Gestión centralizada de credenciales corporativas:** Prohibir el guardado de contraseñas de trabajo en los navegadores web convencionales, migrando hacia una bóveda corporativa de credenciales protegida y cifrada en origen.
4. **Monitorización de endpoints (EDR/SOC):** Desplegar supervisión continua en los puestos de trabajo para detectar llamadas sospechosas a APIs del sistema operativo asociadas a la lectura de memoria de navegadores.

Desde la perspectiva del soporte gestionado MSP de Solutech, la implementación de un Centro de Operaciones de Seguridad (SOC) proactivo y la auditoría continua de las identidades digitales garantizan que, ante la fuga de un token de acceso, el intento de uso externo sea bloqueado de inmediato por ubicación o comportamiento anómalo.

> 💡 **Accede aquí:** [Archivos Descargados: La Puerta de Entrada al Robo de Credenciales](/blog/archivos-descargados-robo-credenciales-pyme/) (*Descubra cómo los troyanos de descarga eluden la seguridad tradicional en equipos de empresa*).

## Preguntas frecuentes sobre Amadey e infostealers

### ¿Si el antivirus no ha detectado alertas, puedo estar seguro de que no hay un infostealer?
No. Los *infostealers* modernos emplean técnicas de ofuscación que cambian su firma digital constantemente, logrando ejecutarse durante minutos u horas de forma invisible antes de ser catalogados por las bases de datos antivirus.

### ¿Cambiar la contraseña de Microsoft 365 invalida una cookie de sesión robada?
No siempre de forma inmediata. Dependiendo de la configuración del proveedor Cloud, la cookie de sesión sigue siendo válida hasta su expiración nativa a menos que se fuerce explícitamente la revocación de todos los tokens de inicio de sesión desde la consola de administración.

### ¿Cómo puede una Pyme saber si sus credenciales están en venta en la Dark Web?
A través de servicios de monitorización de vigilancia de identidades y auditorías de exposición de credenciales, los cuales rastrean de forma continuada las fugas de datos y bases de datos comercializadas por cibercriminales.

---