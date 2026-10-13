---
title: "Phishing Avanzado: Cómo los Ciberdelincuentes Usan Plataformas Cloud Legítimas para Eludir el MFA"
date: "2026-10-13T16:40:49+02:00"
slug: "phishing-plataformas-cloud-mfa-bypass"
description: "Descubre cómo los ciberdelincuentes explotan servicios cloud como Cloudflare Workers para lanzar ataques de phishing sofisticados que eluden la autenticación multifactor (MFA) y roban credenciales. Protege tu Pyme."
categories: ["Ciberseguridad", "Phishing"]
keywords: ["phishing avanzado", "seguridad cloud", "mfa bypass", "ataques pymes", "ciberseguridad almería", "solutech"]
business_impact: "La explotación de plataformas cloud legítimas para phishing representa un riesgo crítico de robo de credenciales y bypass de MFA, amenazando la continuidad operativa y la seguridad de datos de cualquier Pyme."
image: "images/news-phishing-plataformas-cloud-mfa-bypass.jpg"
draft: false
source_url: "https://cybersecuritynews.es/detectan-mas-de-390-000-ataques-de-phishing-a-traves-de-plataformas-cloud/"
---
Más de 390.000 ataques de phishing en los últimos doce meses han explotado la confianza en plataformas cloud legítimas como Cloudflare Workers o Vercel. Esta nueva ola de ciberdelincuencia no solo busca credenciales, sino que ha demostrado ser capaz de eludir la autenticación multifactor (MFA), elevando el riesgo para las Pymes a un nivel crítico.

## La nueva frontera del engaño: Phishing en plataformas cloud de confianza

Los ciberdelincuentes han perfeccionado sus tácticas, migrando sus operaciones de phishing a infraestructuras que gozan de alta reputación. Al utilizar servicios como Cloudflare Workers, Vercel o Netlify, los atacantes logran que sus páginas fraudulentas parezcan legítimas, dificultando su detección por parte de usuarios y soluciones de seguridad tradicionales.

Esta estrategia aprovecha la confianza inherente en estos dominios, que suelen tener certificados SSL válidos y una reputación intachable, para camuflar campañas masivas de robo de credenciales y datos sensibles. La legitimidad percibida es la clave de su éxito.

## Anatomía de un ataque multifase: Eludiendo defensas y MFA

Una investigación reciente de Kaspersky ha desvelado una campaña de phishing particularmente elaborada, diseñada para comprometer cuentas de Microsoft 365. Este ataque se despliega en varias fases, cada una con un objetivo específico para maximizar la probabilidad de éxito.

### El anzuelo inicial: Ingeniería social y CAPTCHA falsos

El ataque comienza con un correo electrónico cuidadosamente elaborado, que simula provenir de un contacto de confianza. Este mensaje incita a la víctima a hacer clic en un enlace que, aparentemente, requiere una verificación de seguridad.

Al acceder, el usuario es dirigido a una página que solicita su dirección de correo corporativa bajo la excusa de superar un CAPTCHA falso. Este paso inicial permite a los atacantes recopilar el email y filtrar bots, preparando el terreno para la siguiente fase.

### La sofisticación técnica: Cloudflare Workers y Browser-in-the-Browser (BiTB)

Una vez obtenida la dirección de correo, la víctima es redirigida a una página alojada en un subdominio legítimo de Cloudflare Workers. Aquí, un segundo CAPTCHA, esta vez auténtico y cargado dinámicamente, añade una capa de legitimidad que evade las herramientas de seguridad basadas en reputación.

Tras superar esta verificación, se presenta una ventana de inicio de sesión de Microsoft 365, recreada con gran fidelidad mediante la técnica **Browser-in-the-Browser (BiTB)**. Esta técnica crea una ventana falsa dentro del navegador real, imitando la interfaz de una aplicación legítima para capturar nombre de usuario, contraseña, código MFA y cookies de sesión.

La información robada se envía a los ciberdelincuentes, y el usuario es redirigido a una página de error genérica, ocultando el fraude. Este método es especialmente peligroso porque la URL real en la barra de direcciones del navegador permanece inalterada, engañando incluso a usuarios precavidos.

```
Flujo de Ataque Phishing Avanzado (BiTB + Cloudflare Workers)

[Email Phishing]
      |
      v
[Página Falsa 1: CAPTCHA Falso]
(Solicita email, filtra bots)
      |
      v
[Redirección a Cloudflare Workers]
(Subdominio legítimo, CAPTCHA real)
      |
      v
[Página Falsa 2: BiTB Login Microsoft 365]
(Captura credenciales, MFA, cookies)
      |
      v
[Servidor del Atacante] <--- (Datos robados)
      |
      v
[Redirección a Página de Error Genérica]
(Oculta el fraude)
```

> ⚠️ **Advertencia Crítica:** La técnica Browser-in-the-Browser (BiTB) es extremadamente engañosa. Aunque la ventana de inicio de sesión parezca legítima, la URL en la barra de direcciones principal del navegador es la única fuente fiable para verificar la autenticidad de un sitio.

## El impacto silente en Pymes: Más allá de la credencial robada

Para una Pyme, el robo de credenciales de Microsoft 365 no es solo la pérdida de un acceso. Implica la potencial exposición de correos electrónicos corporativos, documentos en SharePoint, datos de clientes y acceso a aplicaciones críticas. Esto puede derivar en fraudes financieros, suplantación de identidad corporativa o incluso la paralización operativa.

La capacidad de estos ataques para eludir el MFA, una de las defensas más robustas, significa que las empresas que confían únicamente en esta capa de seguridad están en riesgo. La formación del personal y la implementación de soluciones de seguridad avanzadas son ahora más cruciales que nunca para evitar ser víctima de [fraudes complejos](/blog/fraudes-paginas-grises-pymes-almeria-murcia/).

## Blindaje proactivo: Estrategias de defensa para su empresa

Protegerse contra este tipo de phishing avanzado requiere una estrategia multifacética que combine tecnología, formación y procesos. Solutech recomienda las siguientes acciones para fortalecer la postura de ciberseguridad de su Pyme:

*   **Formación Continua:** Eduque a sus empleados sobre las últimas técnicas de ingeniería social, incluyendo BiTB y la verificación de URLs reales.
*   **Soluciones de Seguridad Avanzadas:** Implemente filtros de correo electrónico y soluciones de seguridad de endpoints que analicen scripts dinámicos y no solo la reputación del dominio.
*   **Verificación de Identidad Rigurosa:** Establezca protocolos claros para solicitudes de inicio de sesión inesperadas, incluso si parecen provenir de fuentes legítimas.
*   **Auditorías de Seguridad Periódicas:** Revise regularmente la configuración de seguridad de sus servicios cloud y sistemas de identidad para detectar posibles brechas o configuraciones vulnerables.
*   **Hardening de Microsoft 365:** Configure políticas de acceso condicional y monitoreo de actividad sospechosa en su entorno de Microsoft 365.

En Solutech, ofrecemos un enfoque de ciberseguridad gestionada que incluye monitorización 24/7, formación de usuarios y la implementación de soluciones avanzadas para proteger a su Pyme de amenazas como el phishing multifase. Nuestro objetivo es ser su partner tecnológico de confianza en Almería y Murcia.

> 💡 **Profundiza en tu seguridad:** [Guía para Implementar MFA Obligatorio en Servidores SSH](/guias/implementar-mfa-obligatorio-servidor-ssh) (*Un paso esencial para blindar tus accesos críticos*).

## FAQ

### ¿Por qué los ciberdelincuentes usan plataformas cloud legítimas para phishing?
Utilizan la reputación y los certificados SSL válidos de estas plataformas para que sus páginas fraudulentas parezcan fiables, eludiendo las detecciones de seguridad basadas en dominios maliciosos y generando confianza en la víctima.

### ¿Qué es la técnica Browser-in-the-Browser (BiTB) y cómo me afecta?
BiTB crea una ventana de navegador falsa dentro de la ventana real, imitando una página de login legítima. Te afecta porque es muy difícil de distinguir de una página real, incluso para usuarios precavidos, facilitando el robo de credenciales y MFA.

### ¿Cómo puede Solutech ayudar a mi Pyme a protegerse de estos ataques?
Solutech implementa soluciones de seguridad avanzadas, ofrece formación continua a empleados, realiza auditorías de seguridad y gestiona la configuración de sus sistemas para detectar y mitigar proactivamente ataques de phishing sofisticados, asegurando la continuidad de su negocio.