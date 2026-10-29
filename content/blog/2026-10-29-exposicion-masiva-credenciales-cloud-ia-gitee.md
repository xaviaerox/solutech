---
title: "Exposición masiva de credenciales Cloud e IA en Git: 26.400 API Keys activas en repositorios públicos"
date: "2026-10-29T15:48:00+02:00"
slug: "exposicion-masiva-credenciales-cloud-ia-gitee"
description: "Un análisis técnico de la filtración de 26.400 API Keys activas de OpenAI, DeepSeek y Alibaba Cloud en Gitee, y las medidas de rotación obligatorias."
categories: ["Ciberseguridad", "Cloud"]
keywords: ["credenciales expuestas", "API keys leak", "seguridad cloud", "OpenAI API leak", "Gitee secret scan", "rotacion de secretos"]
business_impact: "Riesgo directo de robo de datos corporativos, suplantación de identidad, costes imprevistos por consumo ilícito de modelos de IA y compromiso total de entornos cloud."
image: "images/news-exposicion-masiva-credenciales-cloud-ia-gitee.jpg"
draft: false
source_url: "https://thehackernews.com/2026/10/26400-valid-cloud-and-ai-credentials.html"
---
## Exposición de 26.400 llaves maestras en la mayor plataforma de código de China

El análisis masivo de 7,25 millones de repositorios públicos en Gitee, la plataforma de alojamiento de código más grande de China, ha sacado a la luz la disponibilidad pública de 26.400 credenciales de producción plenamente válidas y operativas. La auditoría, realizada por el investigador independiente Ben Zimmermann mediante motores automatizados de detección de secretos, confirma que los tokens de acceso expuestos no corresponden a pruebas obsoletas, sino a llaves activas de infraestructura cloud y modelos de inteligencia artificial.

Entre los elementos comprometidos destacan 9.473 pares de claves de acceso (AccessKey) de Alibaba Cloud, 3.805 API Keys de servicios de Google y YouTube, 3.170 claves para modelos DeepSeek, 1.489 claves de la plataforma Zhipu BigModel y 1.348 tokens de OpenAI. Además, el escaneo identificó credenciales con privilegios de administración global de organización en una de las principales plataformas empresariales de IA del mercado.

Casi la mitad de las claves validadas (12.242 credenciales) proceden de desarrollos realizados durante el año 2025. Esto evidencia que, a pesar de la madurez de los marcos DevSecOps, la inserción accidental de secretos en controladores de versiones sigue siendo una brecha estructural activa en las cadenas de suministro de software.

## La persistencia del historial en Git y el mito del borrado de archivos

El principal factor de persistencia de esta vulnerabilidad radica en la propia naturaleza distribuida de Git. Un error común en los equipos de desarrollo consiste en asumir que eliminar un archivo con credenciales mediante un nuevo commit, o realizar un borrado del archivo en el árbol de trabajo actual, inhabilita el riesgo. 

Los motores de búsqueda de secretos no inspeccionan únicamente la versión más reciente del código (HEAD), sino que reconstruyen e indexan el árbol completo de commits históricos. Si una clave privada o un token de API fue subido al repositorio en cualquier momento de su historial, la credencial seguirá existiendo en la base de datos de objetos de Git a menos que se reescriba de forma destructiva el historial y se fuerce una purga en el servidor remoto.

```text
[ Desarrollador ] ---> [ Commit con API Key en código ] ---> [ Push a Repositorio Público ]
                                                                      |
                                                                      v
[ Borrado manual / Nuevo Commit ] <--- [ Objeto Git persistente en Historial ]
                                                      |
                                                      v
[ Secret Scanners (TruffleHog/Kingfisher) ] ---> [ Modulo de Validación de API ] ---> [ Explotación / Costes ]
```

> ⚠️ **Advertencia técnica crítica:** Borrar un token del código fuente o eliminar el repositorio no revoca la validez de la credencial en el proveedor. Una vez que una API Key entra en un repositorio público, debe considerarse comprometida inmediatamente y revocarse desde el panel de control del servicio emisor.

## Disparidad de motores de escaneo: TruffleHog frente a Kingfisher

Uno de los hallazgos técnicos más llamativos de la investigación radica en la baja tasa de coincidencia entre las herramientas de detección de secretos. El estudio empleó de forma paralela dos de los escáneres con validación activa más avanzados del mercado: TruffleHog y Kingfisher (desarrollado por MongoDB).

| Métrica / Herramienta | TruffleHog | Kingfisher | Coincidencia Mutua |
| :--- | :--- | :--- | :--- |
| Credenciales Válidas Detectadas | 12.737 | 14.664 | 1.001 (6,8%) |
| Cobertura Principal | Alibaba Cloud, AWS, GCP | Zhipu BigModel, Proveedores IA Asia | Cobertura en proveedores globales estándar |
| Tasa de Detección Individual | ~48,2% del total | ~55,5% del total | Solo el 3,79% del universo total |

La baja coincidencia (apenas 1.001 credenciales identificadas por ambos motores simultáneamente) demuestra que depender de una sola herramienta de auditoría de código genera un falso sentido de seguridad. Mientras que TruffleHog identificó la casi totalidad de claves de proveedores tradicionales de nube, Kingfisher localizó de forma exclusiva las 1.489 claves de Zhipu debido a la ausencia de detectores específicos para dicho proveedor en el primer motor.

## Consecuencias financieras y operativas del consumo no autorizado de API

La filtración de tokens de inteligencia artificial y almacenamiento en la nube acarrea consecuencias operativas y económicas inmediatas para las organizaciones afectadas. En el caso de plataformas como OpenAI o DeepSeek, un tercero que obtenga una API Key válida puede agotar la cuota mensual de la empresa en cuestión de minutos, provocando la denegación del servicio en aplicaciones productivas que dependan de dichos modelos.

Asimismo, la exposición de tokens de infraestructura como Alibaba Cloud AccessKeys permite a los atacantes desplegar instancias de computación no autorizadas para minado de criptomonedas, exfiltrar bases de datos alojadas en buckets de almacenamiento y realizar desplazamientos laterales hacia redes corporativas internas. 

Para evitar escenarios donde una fuga de credenciales permita la interceptación de sesiones administrativas, es imprescindible implementar controles de acceso reforzados y autenticación multifactor estricta en todos los vectores de acceso a la infraestructura, tal como detallamos en nuestra guía sobre [implementación de MFA obligatorio en servidores SSH](/guias/implementar-mfa-obligatorio-servidor-ssh/).

## Protocolo de rotación inmediata y fortalecimiento de canalizaciones CI/CD

Si existe la sospecha o certeza de que una clave de API ha sido incluida en un repositorio de código público o privado sin el debido aislamiento, los equipos de sistemas e infraestructura deben ejecutar un protocolo de contención en tres fases:

1. **Revocación y emisión en el proveedor:** Acceder de forma inmediata al panel de administración del emisor del servicio (Alibaba Cloud, Google Cloud, OpenAI, etc.), generar un nuevo par de llaves, actualizar las variables de entorno de producción y desactivar o eliminar de forma definitiva la clave anterior.
2. **Auditoría de registros de actividad (ActionTrail / CloudTrail):** Inspeccionar las llamadas a la API registradas durante los últimos 90 días asociadas a la clave expuesta para verificar si ha existido creación de recursos no autorizados, modificaciones de permisos IAM o descargas masivas de información.
3. **Bloqueo preventivo en el flujo de desarrollo (Pre-commit hooks):** Impedir que el código contenga cadenas con estructuras compatibles con tokens conocidos antes de consolidar los cambios en el repositorio local.

Para automatizar la verificación previa a cualquier commit, se recomienda configurar herramientas de análisis estático local mediante utilidades como `gitleaks`:

```bash
# Instalación y ejecución de escaneo preventivo en el repositorio local
gitleaks detect --source=. --verbose --redact

# Configuración del hook de Git para impedir commits con secretos expuestos
gitleaks protect --staged --verbose
```

La adopción de esquemas de almacenamiento seguro mediante una [bóveda corporativa de credenciales](/guias/proteccion-ransomware-continuidad-negocio-pymes/) y el uso de gestores de secretos en memoria para los procesos de despliegue evitan que las claves de producción residan en texto plano dentro del código fuente.

> 💡 **Accede aquí:** [Guía Definitiva de Protección frente a Ransomware y Continuidad de Negocio](/guias/proteccion-ransomware-continuidad-negocio-pymes/) (*Estrategias avanzadas de resiliencia e higiene de credenciales*).

## Preguntas frecuentes sobre seguridad de credenciales en Git

### ¿Es suficiente con cambiar la visibilidad de un repositorio de público a privado?
No. Cambiar la visibilidad del repositorio no invalida las API Keys ni los tokens que hayan sido expuestos previamente. Los motores de escaneo automatizados indexan los repositorios públicos en cuestión de segundos, por lo que la clave debe ser revocada inmediatamente en el proveedor.

### ¿Cómo se puede verificar si una credencial expuesta ha sido utilizada ilícitamente?
Es necesario revisar los registros de auditoría del proveedor de servicios (como ActionTrail en Alibaba Cloud o los paneles de uso de API en OpenAI). Se deben buscar direcciones IP anómalas, picos inusuales en el consumo de tokens o llamadas a funciones de modificación de infraestructura.

### ¿Qué técnica previene la inclusión accidental de claves en el repositorio?
La mejor práctica consiste en utilizar variables de entorno cargadas desde archivos externos definidos en el fichero `.gitignore`, combinadas con la ejecución obligatoria de ganchos de verificación (pre-commit hooks) que analicen el código antes de permitir la subida de datos al servidor remoto.