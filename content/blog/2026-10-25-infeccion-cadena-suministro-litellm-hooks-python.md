---
title: "Infección en la cadena de suministro de LiteLLM: cómo un hook de Python compromete credenciales sin ser importado"
date: "2026-10-25T13:31:02+02:00"
slug: "infeccion-cadena-suministro-litellm-hooks-python"
description: "Análisis técnico de la brecha en LiteLLM 1.107.0 en PyPI. Descubre cómo el código malicioso se ejecuta en Python sin importar la librería y el impacto en Pymes."
categories: ["Ciberseguridad", "Desarrollo y Cloud"]
keywords: ["LiteLLM", "cadena de suministro", "seguridad python", "robo de credenciales", "ciberseguridad pymes"]
business_impact: "El malware instalado a través del paquete comprometido exfiltra claves cloud, credenciales SSH y bases de datos corporativas, haciendo obligatoria una rotación completa de claves de acceso."
image: "images/news-infeccion-cadena-suministro-litellm-hooks-python.jpg"
draft: false
source_url: "https://www.microsoft.com/en-us/security/blog/2026/10/23/inside-the-litellm-1-107-0-supply-chain-compromise-credential-theft-through-python-startup-hooks/"
---
## El ataque a LiteLLM 1.107.0: la amenaza silente que no requiere ser importada

El pasado 21 de octubre de 2026, la distribución oficial de la versión 1.107.0 del paquete **LiteLLM** en el repositorio PyPI (Python Package Index) y sus imágenes oficiales de contenedor sufrieron un compromiso de la cadena de suministro. Este incidente no fue un fallo de código habitual: el atacante modificó la estructura del paquete para forzar la ejecución del payload malicioso en cuanto el intérprete de Python se inicia en el entorno.

A diferencia de las vulnerabilidades tradicionales donde el código peligroso solo actúa al invocar una función específica, en esta ocasión **no fue necesario importar la librería LiteLLM** para que la amenaza se activase. Bastó con iniciar cualquier proceso de Python o ejecutar utilidades habituales en un entorno infectado para desencadenar el robo masivo de datos.

Este vector de ataque afecta directamente a pasarelas de inteligencia artificial, servidores de integración continua (CI/CD), contenedores de producción y estaciones de trabajo de desarrolladores. Para las empresas, esto supone una exposición inmediata de claves de infraestructura en la nube, credenciales de bases de datos y accesos administrativos.

> ⚠️ **Advertencia crítica de contención:** No ejecutes `python` ni `pip` dentro de un entorno sospechoso para auditar o desinstalar el paquete. La simple activación del interprete volverá a disparar el script de recolección de credenciales.

## Anatomía de la intrusión: redirección de flujo en GitHub y hooks en el intérprete

El origen de la brecha se localiza en la cadena de publicación del proyecto. Según confirmaron los mantenedores de LiteLLM, el atacante utilizó credenciales robadas de la cuenta de un desarrollador en GitHub para alterar el flujo de trabajo de release (GitHub Actions). Con esta modificación, redirigieron la fuente de construcción hacia un repositorio espejo engañoso (`Berri-AI/litellm` en lugar del legítimo `BerriAI/litellm`).

Posteriormente, los atacantes hicieron uso de una segunda credencial comprometida para superar la etapa de aprobación manual requerida antes del despliegue en producción. Una vez validada la versión, el paquete malicioso fue distribuido de forma masiva a través de PyPI y los repositorios oficiales de imágenes Docker.

```
+------------------+      1. Credenciales robadas      +----------------------+
| Atacante Remoto  | --------------------------------> | GitHub Actions       |
+------------------+                                   | Workflow Modificado  |
         |                                             +----------------------+
         |                                                        |
         | 2. Redirección a repo falso                            v
         |    (Berri-AI/litellm)                       +----------------------+
         +-------------------------------------------> | PyPI / Docker Hub    |
                                                       | Release 1.107.0      |
                                                       +----------------------+
```

La técnica clave utilizada para garantizar la ejecución inadvertida se basó en los archivos de inicialización del sitio de Python (*site initialization*). En lugar de ubicar el código malicioso dentro de la carpeta estándar del módulo `litellm`, el archivo compilado (*wheel*) colocó tres archivos clave en el directorio `site-packages` global de la biblioteca estándar:

1. **`cook.pth`**: Archivo de ruta ejecutable que contiene una sentencia de importación automática al arrancar Python (`import cook`).
2. **`cook.py`**: Script responsable de descodificar en memoria el troyano de recolección de credenciales (**PRIVCOLLECT**).
3. **`sitecustomize.py`**: Módulo de configuración de Python que crea un segundo camino de ejecución en sistemas Unix para persistencia y descarga remota de payloads adicionales.

## Vector de ejecución y persistencia de PRIVCOLLECT

Cuando el intérprete de Python arranca, procesa en primer lugar todos los archivos `.pth` del directorio de librerías. Al procesar `cook.pth`, la instrucción de importación ejecuta inmediatamente el envoltorio de `cook.py`. Este archivo descomprime mediante `zlib` y descodifica una cadena en Base64 que contiene la lógica completa del malware PRIVCOLLECT.

El colector inicia un hilo secundario en segundo plano (*daemon thread*) para recopilar información sensible de forma asíncrona, evitando que la aplicación principal sufra retrasos apreciables en su tiempo de arranque o muestre errores que alerten al usuario.

```
[ Arranque del Intérprete Python ]
                │
                ▼
[ Lectura de 'cook.pth' en site-packages ]
                │
                ▼
[ Importación automática de 'cook.py' ]
                │
                ▼
[ Descodificación Base64 + Decompresión zlib ]
                │
                ▼
[ Inicio del Hilo Daemon 'PRIVCOLLECT' ]
                │
        ┌───────┴────────────────────────┐
        ▼                                ▼
[ Búsqueda de Credenciales ]   [ Comprobación /tmp Marker ]
        │                                │
        ▼                                ▼
[ Exfiltración Cifra C2 ]      [ Supresión de duplicados ]
```

Para evitar saturar la red con múltiples peticiones cuando se invocan subsistemas de Python de forma consecutiva, PRIVCOLLECT comprueba la variable de entorno `PRIVCOLLECT_ACTIVE`. Si no está configurada, la establece y procede con la extracción. Además, tras enviar con éxito los datos exfiltrados y recibir una respuesta HTTP 200, intenta escribir el marcador `/tmp/.pc_once_72129118c59f5636c0bb` en el sistema de archivos.

## Alcance del saqueo de información y riesgos para la Pyme

PRIVCOLLECT cuenta con módulos de recolección independientes con tratamiento de errores aislado. Si la búsqueda de una credencial específica falla o carece de permisos, el malware pasa de inmediato al siguiente objetivo sin interrumpir la ejecución.

La siguiente tabla resume los activos críticos que el payload analiza y extrae del entorno afectado:

| Categoría de Activo | Archivos y Entornos Objetivo | Impacto Directo en la Empresa |
| :--- | :--- | :--- |
| **Credenciales Nube** | Archivos de configuración de AWS (`~/.aws`), Azure CLI, Google Cloud, Docker y Kubernetes Service Accounts. | Acceso completo de lectura y escritura a la infraestructura cloud, creación de instancias no autorizadas y robo de datos. |
| **Desarrollo e IA** | Claves de API en agentes de IA, GitHub Copilot, integraciones VS Code y variables de entorno `.env`. | Filtración del código fuente de la empresa y abuso de las cuotas de modelos de lenguaje pagados. |
| **Infraestructura SSH** | Llaves privadas SSH (`~/.ssh/id_rsa`, `id_ed25519`), configuraciones de Vault y certificados TLS. | Movimiento lateral hacia servidores internos y posibilidad de secuestro de red por ransomware. |
| **Navegadores y Shell** | Historiales de terminal, credenciales guardadas en navegadores Chromium/Firefox y clientes de base de datos. | Robo de sesiones activas en portales corporativos y servicios SaaS de la empresa. |

Si tus entornos de desarrollo o producción utilizan claves SSH sin autenticación reforzada, la exfiltración de estos activos deja abierta la puerta a intrusiones de red graves. Es imprescindible auditar la identidad y aplicar mecanismos como el [MFA obligatorio en servidores SSH](/guias/implementar-mfa-obligatorio-servidor-ssh/) para bloquear el uso de claves robadas.

## Protocolo de erradicación y respuesta ante incidentes

Dado que la instalación del paquete `litellm` infectado coloca archivos ejecutables fuera del directorio propio de la librería, **eliminar el paquete con `pip uninstall litellm` o borrando la carpeta no corrige la brecha**. Los archivos `cook.pth`, `cook.py` y `sitecustomize.py` permanecerán intactos en el directorio global de librerías, listos para ejecutarse en el siguiente arranque de Python.

Para garantizar la erradicación completa de la amenaza en los sistemas de la empresa, es necesario seguir un procedimiento estricto:

1. **Aislamiento del entorno:** Detén de inmediato los contenedores infectados, agentes de CI/CD o entornos virtuales de Python. No intentes ejecutar scripts de limpieza en caliente usando el intérprete afectado.
2. **Destrucción y reconstrucción de entornos:** Elimina por completo los entornos virtuales (`venv`, `conda`) o destruye las imágenes Docker afectadas. Vuelve a desplegar la infraestructura partiendo de una imagen limpia y asegurándote de fijar dependencias validadas.
3. **Revocación masiva de credenciales:** Asume que todas las credenciales presentes en la máquina o accesibles a través de variables de entorno han sido comprometidas. Es obligatorio:
   - Rotar las claves de API de los proveedores de LLM (OpenAI, Anthropic, Google Vertex AI).
   - Invalidar y regenerar claves de acceso a la nube (AWS, Azure, GCP).
   - Rotar las claves SSH y los tokens de acceso personal de GitHub/GitLab.
   - Forzar el cierre de sesiones en el gestor de identidades corporativo.

> 💡 **Accede aquí:** [Implementación de MFA Obligatorio en Servidores SSH](/guias/implementar-mfa-obligatorio-servidor-ssh/) (*Guía técnica para mitigar accesos no autorizados a tu infraestructura*).

## Preguntas frecuentes sobre la brecha de LiteLLM

### ¿Mi empresa está afectada si solo usamos LiteLLM en un entorno de pruebas?
Sí. El malware exfiltra claves corporativas de AWS, GCP, claves SSH y credenciales de navegadores guardadas en la máquina o servidor donde se instaló el paquete, independientemente de si el entorno era de pruebas o de producción.

### ¿Basta con actualizar a una versión limpia de LiteLLM para estar protegidos?
No. La actualización no elimina los archivos de arranque maliciosos (`cook.pth`, `sitecustomize.py`) depositados en la carpeta global de librerías. Debes destruir el entorno virtual o contenedor por completo y rotar todas las credenciales accesibles.

### ¿Cómo puedo verificar si el colector malicioso llegó a ejecutarse en mi servidor?
Comprueba la presencia del archivo marcador `/tmp/.pc_once_72129118c59f5636c0bb` o analiza los registros de red en busca de conexiones salientes sospechosas hacia direcciones IP desconocidas iniciadas por procesos de Python.

---