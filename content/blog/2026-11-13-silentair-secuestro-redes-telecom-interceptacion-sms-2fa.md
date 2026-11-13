---
title: "Operación SilentAir: El secuestro de redes telecom que inutiliza la autenticación por SMS"
date: "2026-11-13T16:54:15+02:00"
slug: "silentair-secuestro-redes-telecom-interceptacion-sms-2fa"
description: "El grupo SilentAir ha comprometido la red IPX de múltiples operadores para interceptar SMS de autenticación 2FA en tiempo real. Análisis de la vulnerabilidad y plan de sustitución de MFA."
categories: ["Ciberseguridad"]
keywords: ["SilentAir", "MFA SMS", "SS7 Diameter", "Seguridad de Identidad", "Ciberseguridad Pymes", "FIDO2"]
business_impact: "Muestra la invalidez del SMS como segundo factor de autenticación corporativo y exige la transición a llaves de seguridad físicas o sistemas de autenticación basados en app."
image: "images/news-silentair-secuestro-redes-telecom-interceptacion-sms-2fa.jpg"
draft: false
source_url: "https://thehackernews.com/2026/11/silentair-hijacks-asian-telecom.html"
---
Una sofisticada operación de ciberespionaje atribuida al actor de amenaza estatal SilentAir ha comprometido la infraestructura de señalización de múltiples operadores de telefonía móvil. La intrusión no se ha llevado a cabo mediante malware en los dispositivos finales, sino manipulando el núcleo de transporte IPX (*IP Exchange*) que interconecta a las operadoras a nivel global.

El objetivo principal de esta campaña ha sido la interceptación activa de llamadas y mensajes de texto dirigidos a perfiles de alto valor. Tras establecer el desvío de tráfico, los atacantes capturaron códigos de doble autenticación (2FA) transmitidos por SMS en el mismo segundo en que eran emitidos por las plataformas corporativas y bancarias.

## Infiltración en la capa de señalización: la vulnerabilidad estructural de la red IPX

Las redes de telefonía móvil dependen de los protocolos SS7 (*Signaling System No. 7*) para tecnologías 2G/3G y Diameter para redes 4G/5G. Estos protocolos gestionan el enrutamiento de llamadas, la entrega de mensajes y la itinerancia (*roaming*) entre distintos operadores del mundo a través de la red privada de confianza IPX.

SilentAir logró tomar el control de equipos de red dentro de al menos seis operadores de telecomunicaciones. Desde esa posición privilegiada dentro del perímetro de confianza de la red IPX, el grupo inyectó instrucciones de señalización maliciosas haciéndose pasar por redes de destino legítimas.

> ⚠️ **Advertencia de Ciberseguridad:** Los protocolos de señalización SS7 y Diameter fueron diseñados bajo la premisa de una confianza implícita entre operadoras. Un equipo comprometido en cualquier operador del mundo puede emitir órdenes de enrutamiento válidas para números de teléfono de cualquier otro país.

## Anatomía del secuestro de tráfico: del mensaje UpdateLocation a la captura del código 2FA

Para lograr la interceptación sin generar alertas en el dispositivo de la víctima, SilentAir utilizó comandos `UpdateLocation` (o su equivalente en Diameter, `Location-Update-Request`). Este mensaje notifica a la red de origen del usuario que su teléfono se ha conectado a una nueva antena o red en el extranjero.

Una vez que la red del operador de la víctima acepta la actualización falsa, todo el tráfico de llamadas y mensajes dirigidos a esa línea se desvía automáticamente hacia el equipamiento controlado por el atacante.

```text
┌────────────────────────────────────────────────────────┐
│  Plataforma SaaS / Banco / Correo Corporativo          │
└──────────────────────────┬─────────────────────────────┘
                           │ (Emisión de SMS con código 2FA)
                           ▼
             ┌──────────────────────────┐
             │ Red de Origen del Usr    │
             └─────────────┬────────────┘
                           │
  ¿Dónde está ubicado el dispositivo del empleado?
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│  Mensaje UpdateLocation Falsificado (SilentAir en IPX) │
└──────────────────────────┬─────────────────────────────┘
                           │ (Redirección forzada del tráfico)
                           ▼
    ┌──────────────────────────────────────────────┐
    │  Equipo Comprometido en Operador de Tránsito │
    └──────────────────────┬───────────────────────┘
                           │
       ┌───────────────────┴───────────────────┐
       ▼                                       ▼
 [Copia de SMS interceptada]          [SMS Silencioso nocturno]
 (Captura instantánea del 2FA)        (Verificación de desvío activo)
```

Para confirmar que el desvío se mantenía operativo, los atacantes enviaron ráfagas masivas de "SMS silenciosos" (*ping SMS*), un tipo de mensaje que no genera notificación visual ni sonora en la pantalla del usuario. La mayoría de estas comprobaciones se ejecutaron en horario nocturno, aprovechando las horas en las que los teléfonos reducen su reasignación de ubicación por falta de movimiento.

## Implicaciones para la Pyme: por qué el SMS ya no es un factor de seguridad válido

La interceptación de señalización demuestra que la autenticación mediante SMS no puede garantizar la confidencialidad en entornos empresariales. Si un atacante intercepta el código enviado por SMS a un directivo o administrador de sistemas, el acceso a las aplicaciones en la nube de la empresa queda expuesto inmediatamente si la contraseña ya ha sido filtrada o deducida.

Este incidente pone de manifiesto los peligros analizados en nuestro estudio sobre el [abuso de credenciales y MFA deficiente en entornos corporativos](/blog/abuso-credenciales-mfa-deficiente-riesgo-pymes/), donde los vectores de bypass de identidad suponen la primera causa de intrusión en pequeñas y medianas empresas.

Las consecuencias de mantener la verificación por SMS en la empresa incluyen:

- **Intercepción invisible en tránsito:** Ni el departamento de IT ni el usuario final reciben ninguna alerta de que el SMS ha sido desviado en la red telefónica.
- **Vulnerabilidad ante ataques SIM Swapping y SS7:** La seguridad del acceso corporativo pasa a depender exclusivamente de la solidez técnica de operadoras de telecomunicaciones terceras.
- **Suplantación en accesos críticos:** Acceso no autorizado a paneles de administración de correo, banca online, entornos ERP y servicios de almacenamiento en la nube.

## Hoja de ruta para la eliminación del MFA por SMS en la infraestructura corporativa

Las organizaciones deben migrar de forma inmediata sus políticas de identidad hacia métodos de autenticación resistentes al interceptado en red. A continuación se detallan las medidas de hardening recomendadas:

### 1. Desactivar la verificación por SMS y voz en los proveedores de identidad
En consolas como Microsoft Entra ID o Google Workspace, deshabilite el SMS como método de verificación permitido en las directivas de autenticación.

```powershell
# Ejemplo de desactivación de SMS/Voz en Microsoft Entra ID mediante Graph PowerShell
Connect-MgGraph -Scopes "Policy.ReadWrite.AuthenticationMethod"

$params = @{
    state = "disabled"
}

Update-MgPolicyAuthenticationMethodPolicyAuthenticationMethodConfiguration `
    -AuthenticationMethodConfigurationId "SMS" `
    -BodyParameter $params
```

### 2. Implantar autenticación basada en aplicaciones (TOTP) o llaves físicas FIDO2
Reemplace la entrega de tokens por SMS por aplicaciones de autenticación basadas en tiempo (TOTP) con protección contra desalineación de ubicación, o bien mediante llaves de seguridad criptográficas (FIDO2/WebAuthn).

Para entornos de administración crítica de servidores y sistemas locales, recomendamos revisar nuestra guía sobre la [implementación de MFA obligatorio en servidores SSH](/guias/implementar-mfa-obligatorio-servidor-ssh/), donde detallamos la configuración de credenciales de conocimiento cero.

### 3. Establecer políticas de Acceso Condicional basadas en contexto
Configure reglas de acceso que evalúen la salud del dispositivo, la ubicación IP corporativa y el nivel de riesgo del usuario antes de conceder acceso a los recursos de la empresa.

> 💡 **Accede aquí:** [Implementación de MFA Obligatorio en Servidores SSH](/guias/implementar-mfa-obligatorio-servidor-ssh/) (*Guía técnica para eliminar factores de autenticación débiles en tu infraestructura*).

## FAQ

### ¿Cómo afecta el ciberespionaje a redes de telecomunicaciones a una Pyme local?
Aunque los ataques a la infraestructura SS7/Diameter suelen ser ejecutados por actores avanzados, las herramientas de interceptación terminan comercializándose en el mercado negro. Si la verificación de acceso a los sistemas de su empresa depende de un SMS, cualquier atacante con acceso a estos servicios puede interceptar sus credenciales corporativas.

### ¿Qué diferencia a un SMS tradicional de un "SMS silencioso"?
Un SMS tradicional muestra un texto e emite una notificación al usuario. Un SMS silencioso (Tipo 0) se procesa directamente en el chip SIM del teléfono sin mostrar ningún aviso en la pantalla. Los atacantes los utilizan para confirmar si una línea telefónica está activa o si un desvío de red ha tenido éxito.

### ¿Cuál es la alternativa más segura y económica al SMS para una Pyme?
La alternativa inmediata y sin coste adicional es el uso de aplicaciones de autenticación (TOTP) como Microsoft Authenticator o Google Authenticator. Para puestos críticos o directivos, la solución idónea es el despliegue de llaves de seguridad físicas con estándar FIDO2.

---