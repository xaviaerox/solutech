---
title: "Fraude del 'Ratón Activado': La Estafa de Soporte Técnico que Bloquea su Navegador"
date: "2026-09-29T15:18:10+02:00"
slug: "fraude-raton-activado-estafa-soporte-tecnico-navegador"
description: "Descubra cómo una estafa de soporte técnico simula el bloqueo de su navegador al mover el ratón, afectando a Pymes y cómo protegerse."
categories: ["Ciberseguridad", "Ingeniería Social"]
keywords: ["fraude soporte técnico", "estafa navegador", "phishing pymes", "ciberseguridad almería", "ciberseguridad murcia", "ingeniería social"]
business_impact: "Este fraude puede paralizar la operativa de una Pyme, generar costes por falsas asistencias y comprometer datos sensibles si los empleados caen en la trampa."
image: "images/news-fraude-raton-activado-estafa-soporte-tecnico-navegador.jpg"
draft: false
source_url: "https://cybersecuritynews.es/alertan-del-fraude-que-se-activa-al-mover-el-raton-y-simula-el-bloqueo-del-navegador/"
---
Un simple movimiento del ratón puede ser la puerta de entrada a una sofisticada estafa de soporte técnico, diseñada para simular el bloqueo total de su navegador y generar pánico. Esta campaña, recientemente analizada por Netskope Threat Labs, transforma un clic publicitario inofensivo en una falsa alerta crítica, buscando la reacción inmediata del usuario.

El objetivo no es cifrar archivos ni comprometer el sistema operativo, sino manipular la interfaz visible para ocultar referencias habituales y forzar una llamada a un número fraudulento.

## La fachada comercial y el engaño interactivo

El recorrido de la estafa comienza con anuncios distribuidos a través de inventario publicitario ordinario en sitios web legítimos de alto tráfico. Estos incluyen páginas de mapas, meteorología, inmobiliarias o deportes, sin que sus editores estén comprometidos.

Tras hacer clic en el anuncio, el usuario es redirigido inicialmente a una tienda electrónica ficticia, denominada "ShopEase". Esta apariencia comercial actúa como un señuelo, haciendo que la página parezca inofensiva si el contenido malicioso no llega a ejecutarse.

## Anatomía de un engaño interactivo: del anuncio al falso bloqueo

La fase maliciosa se activa de forma sutil: al detectar un único movimiento del ratón. Esta técnica es crucial para evadir rastreadores automatizados y entornos de análisis de seguridad.

Una vez detectado el movimiento, el código descifra la infraestructura de mando y control (C2), descarga una segunda carga útil adaptada al sistema operativo (Windows o macOS) y construye la interfaz fraudulenta directamente en la memoria del navegador.

```
Flujo de la Estafa de Soporte Técnico (Mouse-Activated)

Usuario navega por sitio legítimo
       |
       V
[Clic en Anuncio Malicioso]
       |
       V
[Redirección a "ShopEase" (Falsa Tienda)]
       |
       V
[Detección de Movimiento del Ratón]
       |
       V
[Descifrado de C2 y Carga de Payload (JS)]
       |
       V
[Construcción de Interfaz Fraudulenta en Navegador]
       |
       V
[Activación de Pantalla Completa, Ocultación UI, Bloqueo Teclado (Simulado)]
       |
       V
[Mensajes de Alerta Falsos (Defender/Apple), Sonidos, Ralentización]
       |
       V
[Demanda de Llamada a Número Fraudulento]
       |
       V
[Extorsión: Pago, Credenciales, Instalación de Acceso Remoto]
```

### La doble capa de ofuscación y la personalización del ataque

El uso de dos etapas de descifrado AES y la carga dinámica del contenido dificultan el análisis superficial de la amenaza. Si la conexión con el C2 falla, la tienda falsa permanece visible, sin levantar sospechas.

Si la conexión es exitosa, la víctima recibe una simulación coherente con su sistema operativo, como falsos avisos de Microsoft Defender en Windows o mensajes con estética de Apple en macOS. Esta personalización aumenta la credibilidad del engaño.

> ⚠️ **Advertencia clave:** Una alerta legítima de su sistema operativo o navegador nunca le exigirá que llame a un número de teléfono que aparece en una ventana emergente. Desconfíe siempre de cualquier mensaje que le inste a contactar un número de soporte.

## El impacto silencioso en la Pyme: parálisis operativa y extorsión

Aunque este ataque no compromete directamente el sistema operativo, su objetivo es generar una percepción de bloqueo total. Activa la pantalla completa, oculta la barra de direcciones, las pestañas y el cursor, e intenta bloquear atajos de teclado habituales.

Esta puesta en escena, combinada con alarmas sonoras, mensajes intermitentes y una ralentización deliberada, refuerza la sensación de que el equipo está inutilizado. La pérdida temporal de referencias visuales puede llevar a un empleado a creer que su ordenador está realmente infectado o bloqueado.

El propósito final es conducir a la víctima a una llamada telefónica. En esta llamada, el atacante puede solicitar el pago de una asistencia inexistente, obtener credenciales corporativas o datos financieros, o incluso promover la instalación de una herramienta de acceso remoto, comprometiendo la seguridad de la red de la Pyme.

Para una Pyme, un incidente de este tipo puede significar:
*   **Parálisis operativa:** Un empleado bloqueado, aunque sea solo a nivel de navegador, es un empleado improductivo.
*   **Costes ocultos:** Pagos por "asistencia" fraudulenta o la instalación de software malicioso.
*   **Riesgo de fuga de datos:** Si se entregan credenciales o se permite acceso remoto, la empresa queda expuesta.

Este tipo de ingeniería social es una amenaza constante. Recientemente, hemos visto cómo campañas de phishing más elaboradas, como la [Campaña de Phishing con Node.js en el Sector Turístico](/news/campana-phishing-fotos-hoteles-node-js/), buscan vectores de persistencia más complejos, pero el objetivo final es el mismo: engañar al usuario.

## Blindaje proactivo: Estrategias de defensa y respuesta inmediata

La clave para proteger a su Pyme de este tipo de fraudes reside en una combinación de tecnología y formación. Netskope Threat Labs recomienda detectar la campaña por su cadena de comportamiento, que es más estable que los dominios o números de teléfono cambiantes.

Entre las señales de alerta destacan:
*   Interacción del usuario seguida de nuevas conexiones.
*   Descifrado de código mediante JavaScript.
*   Carga dinámica de la interfaz.
*   Identificación del sistema operativo para personalizar el ataque.
*   Entrada en pantalla completa y uso anómalo del bloqueo de teclado.

### Detección por comportamiento: más allá de los dominios

En el ámbito corporativo, es fundamental combinar la **protección del endpoint**, un **filtrado DNS robusto**, la **inspección o aislamiento de la navegación web** y un **control estricto del tráfico web**.

Además, la **formación del usuario** es la primera línea de defensa. Los empleados deben saber que:
*   Nunca deben llamar a un número indicado en una ventana emergente de alerta.
*   Nunca deben introducir datos personales o corporativos en estas ventanas.
*   Nunca deben instalar herramientas de acceso remoto a petición de un "soporte técnico" no verificado.

Para salir de un bloqueo aparente, el usuario puede mantener pulsada la tecla `Escape` durante unos segundos o cerrar el navegador desde el Administrador de tareas de Windows (`Ctrl + Shift + Esc`) o la opción "Forzar salida" de macOS (`Cmd + Option + Esc`). Al reiniciar el navegador, es crucial evitar la restauración automática de la sesión anterior.

Si un empleado ha caído en la trampa (ha llamado, pagado o permitido acceso remoto), es vital comunicarlo de inmediato al equipo de seguridad o a su partner tecnológico.

> 💡 **Accede aquí:** [El 81% de estafas en tiendas online: ¿Cómo proteger la facturación de tu Pyme en Almería y Murcia?](/blog/estafas-tiendas-online-pymes-almeria-murcia/) (*Aprende a identificar y prevenir los fraudes más comunes que afectan a tu negocio*).

## FAQ

### ¿Cómo puedo saber si una alerta de seguridad es legítima o una estafa?
Las alertas legítimas de su sistema operativo o navegador nunca le pedirán que llame a un número de teléfono. Suelen ser informativas y le guiarán a través de opciones dentro del propio sistema o navegador para resolver el problema.

### ¿Qué debo hacer si mi navegador se bloquea con una alerta de soporte técnico?
No interactúe con la ventana. Intente cerrar el navegador forzadamente (Administrador de tareas en Windows, Forzar salida en macOS) o mantenga pulsada la tecla `Escape`. Evite restaurar la sesión anterior al reabrir el navegador.

### ¿Cómo puede Solutech ayudar a mi Pyme a prevenir estas estafas?
En Solutech implementamos soluciones de seguridad perimetral, filtrado DNS avanzado y protección de endpoint. Además, ofrecemos formación continua a sus empleados para que identifiquen y reporten intentos de ingeniería social, blindando su negocio contra estas amenazas.