---
title: "Ciberseguridad en hoteles: la campaña de falsas imágenes que amenaza al sector turístico en Almería y Murcia"
date: 2026-06-27T10:54:51+02:00
slug: "campana-phishing-fotos-hoteles-node-js"
description: "Analizamos la campaña de phishing que suplanta quejas de clientes para infectar hoteles con malware persistente. Protege tu negocio turístico hoy."
categories: ["Ciberseguridad", "Soporte IT"]
keywords: ["ciberseguridad hoteles", "phishing sector turístico", "seguridad informática Almería", "soporte informático Murcia"]
image: "images/news-campana-phishing-fotos-hoteles-node-js.png"
draft: false
business_impact: "Una infección de este tipo puede paralizar el sistema de reservas de un hotel, exponer datos de clientes y provocar pérdidas reputacionales y multas de protección de datos."
source_url: "https://www.microsoft.com/en-us/security/blog/2026/06/25/photo-zip-campaign-targeting-hospitality-industry-delivers-node-js-implant-persistent-access/"
---
## 🔍 Resumen Ejecutivo

**Una campaña de ciberataques está suplantando quejas de clientes y solicitudes de reserva para infectar los ordenadores de recepción de hoteles mediante archivos de imagen falsos.**

**El objetivo es instalar un implante oculto que permite a los atacantes controlar los sistemas de forma permanente, poniendo en riesgo los datos de los huéspedes y la facturación del negocio.**

---

## 🏨 Contexto

El sector turístico y hostelero en las provincias de Almería y Murcia es uno de los motores económicos más importantes, especialmente durante las campañas de temporada alta.

Los recepcionistas y el personal de reservas gestionan a diario decenas de correos electrónicos con peticiones de clientes, fotografías de documentos de identidad o capturas de pantallas de errores en las reservas.

Esta alta interacción con archivos adjuntos convierte a los hoteles en un objetivo habitual para los ciberdelincuentes, quienes aprovechan la urgencia del día a día para intentar eludir las barreras de seguridad.

---

## ⚠️ Qué ha ocurrido

El equipo de investigación de amenazas de Microsoft ha detectado una campaña activa que infecta ordenadores mediante correos de phishing dirigidos específicamente a personal de recepción y reservas.

Los atacantes envían correos electrónicos redactados en varios idiomas (incluyendo español, francés e inglés) simulando ser clientes descontentos o huéspedes con peticiones especiales.

Para ganarse la confianza del destinatario, los correos utilizan enlaces que abusan de plataformas legítimas como los sistemas de notificación de Calendly y redirecciones de Google, logrando esquivar los filtros de spam.

---

## ⚙️ Detalles técnicos

El ataque se ejecuta en varias fases diseñadas para pasar desapercibidas ante los antivirus comunes de oficina:

1. **Blanqueo de autenticación:** El atacante envía el correo a través de la infraestructura de Calendly, lo que hace que el email supere con éxito las comprobaciones de seguridad (SPF y DKIM).
2. **Descarga del archivo:** El enlace redirige al usuario a la descarga de un archivo comprimido en formato `.zip` que simula contener las "fotos" de la queja o de la reserva.
3. **El engaño del acceso directo:** Dentro del archivo no hay imágenes reales, sino archivos con extensión oculta `.lnk` (accesos directos) nombrados como `PHOTO-123456.png.lnk`.
4. **Infección silenciosa:** Al hacer doble clic, se activa un script oculto en PowerShell que descarga un implante basado en Node.js y compila código malicioso en tiempo real para tomar el control del equipo.

### 📊 Flujo de la Amenaza en Recepción

```text
[ Correo de Phishing ] (Suplanta queja de cliente vía Calendly/Google)
        │
        ▼
[ Enlace de Descarga ] ──► Descarga de archivo ZIP
                                │
                                ▼
                        [ Falsa Imagen .png.lnk ] (Doble clic del usuario)
                                │
                                ▼
                        [ Script PowerShell ] ──► Compilación .NET (csc.exe)
                                                        │
                                                        ▼
                                                [ Implante Node.js ] (Control total)
```

> ⚠️ **Advertencia de Seguridad:** Los atacantes buscan específicamente cuentas de usuario con nombres como `reception`, `frontdesk`, `reservations` o `recepcion`, asegurándose de golpear el punto de entrada de datos del hotel.

---

## 💼 Impacto empresarial

El impacto de esta amenaza para una Pyme hotelera o un alojamiento turístico en nuestra región puede ser grave.

Una infección de este tipo puede paralizar el sistema de reservas de un hotel, exponer datos de clientes y provocar pérdidas reputacionales y multas de protección de datos.

Si un atacante logra acceso persistente a la red del hotel, puede:
- **Secuestrar el sistema de gestión (PMS):** Impidiendo realizar check-ins, check-outs o procesar cobros.
- **Robar datos de tarjetas de crédito:** Exponiendo al hotel a sanciones por incumplimiento de la normativa PCI-DSS y RGPD.
- **Daño reputacional severo:** Las opiniones negativas en portales como Booking o TripAdvisor tras un incidente de seguridad pueden comprometer las reservas de toda la temporada.

---

## 🛠️ Recomendaciones para el lector

Para proteger tu hotel o negocio turístico hoy mismo, te recomendamos aplicar las siguientes medidas preventivas:

- **1. Bloquear la ejecución de archivos `.lnk` desde carpetas de descarga:** Configura tus sistemas para que los accesos directos no puedan ejecutarse directamente desde directorios temporales o de descarga.
- **2. Formación específica al personal de primera línea:** Concienciar a los recepcionistas de que nunca deben abrir archivos comprimidos `.zip` que contengan archivos de acceso directo, incluso si el remitente parece legítimo.
- **3. Implementar políticas de Zero-Trust:** Limitar los privilegios de las cuentas de usuario de recepción para que no puedan instalar software ni ejecutar scripts de PowerShell.
- **4. Monitorización activa de red:** Contar con un servicio de soporte informático gestionado que vigile conexiones sospechosas hacia puertos no estándar.

---

## 💡 Conclusión

La seguridad de tu hotel no puede depender de la suerte o de la intuición de un recepcionista durante un turno con alta carga de trabajo.

En Solutech ayudamos a los negocios turísticos de Almería y Murcia a proteger sus sistemas de reservas y salvaguardar la información de sus clientes con soluciones de ciberseguridad preventiva adaptadas a su presupuesto.

> 💡 **Accede aquí:** [Cómo implementar MFA obligatorio en tus servidores](/blog/implementar-mfa-obligatorio-servidor-ssh) (*Protege tus accesos críticos frente a intrusiones*).

---

## ❓ FAQ

### ¿Por qué los filtros de correo de mi hotel no detectaron este phishing?
Porque los atacantes utilizan una técnica llamada "blanqueo de autenticación", enviando los correos a través de servicios legítimos como Calendly. Para los filtros de correo, el mensaje proviene de una fuente de confianza.

### ¿Qué pasa si un empleado ya ha hecho clic en una de estas falsas fotos?
Se debe aislar inmediatamente el ordenador de la red local (desconectar el cable de red y el Wi-Fi) y contactar de urgencia con un equipo de soporte informático profesional para auditar el equipo y limpiar el implante.

### ¿Es muy costoso proteger un hotel pequeño frente a estas amenazas?
No. La mayor parte de la protección se logra mediante configuraciones correctas de seguridad en los sistemas actuales, políticas de permisos restringidos y formación básica del personal, medidas muy económicas y de alto impacto.

---