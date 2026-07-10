---
title: "Guía de Estudio Completa de Azure Fundamentals (AZ-900) - Edición 2026"
date: 2026-07-10T08:00:00+02:00
slug: "guia-estudio-az900-azure-fundamentals"
description: "Prepárate para la certificación oficial AZ-900 con este resumen intensivo actualizado a 2026. Conceptos cloud, servicios clave, seguridad y simulacro."
categories: ["Ciberseguridad", "Cloud"]
keywords: ["AZ-900", "Azure Fundamentals", "guía de estudio AZ-900", "certificación Microsoft", "nube híbrida", "Entra ID"]
image: "images/bg/bg-network.png"
draft: false
---

## Introducción al examen AZ-900

El examen **AZ-900 (Azure Fundamentals)** no evalúa tu capacidad para administrar Azure de forma avanzada. Su objetivo principal es verificar si eres capaz de describir conceptos fundamentales, servicios clave y herramientas de gobernanza en la nube de Microsoft.

El verbo que aparece en la práctica totalidad de los objetivos oficiales es siempre **"Describe..."** (describir), y rara vez encontrarás "Configure..." (configurar) o "Implement..." (implementar). Tu estrategia de estudio debe centrarse en memorizar **para qué sirve cada recurso y cuándo se utiliza**, dejando a un lado la sintaxis de comandos o los asistentes de configuración paso a paso.

> ⚠️ **Consejo de Examen:** Si en un simulador te obligan a recordar un parámetro exacto de CLI o el nombre de una casilla de creación, estás ante una pregunta desactualizada. El examen real es 100% conceptual y de lógica de negocio.

> 📥 **Recurso de Estudio:** [Descargar AZ-900 Study Guide en PDF](/recursos/az-900-guia-estudio-azure.pdf) (*Consigue la versión original en PDF completa, optimizada para imprimir y repasar sin conexión*).

---

## Formato del examen y distribución de dominios

El examen cuenta con los siguientes parámetros aproximados:

| Parámetro | Valor aproximado |
| :--- | :--- |
| **Preguntas** | ~40–60 preguntas (según el formulario asignado) |
| **Duración** | ~45–60 minutos de examen puro |
| **Puntuación** | Escala de 1 a 1000, con un aprobado exigido de **700** |
| **Tipo de preguntas** | Opción única, opción múltiple, arrastrar y soltar, simulaciones y casos de estudio cortos |
| **Caducidad** | Renovación anual gratuita a través de Microsoft Learn (ya no expira de por vida) |

### Los Tres Dominios Oficiales (Temario Enero 2026)

```text
┌─────────────────────────────────────────────────────────────┐
│ Describe Cloud Concepts ................. 25–30%          │
│ Describe Azure Architecture & Services .... 35–40% ⭐⭐⭐⭐⭐ │
│ Describe Azure Management & Governance .... 30–35% ⭐⭐⭐⭐  │
└─────────────────────────────────────────────────────────────┘
```

El dominio de **Arquitectura y Servicios** es el más extenso. Invierte ahí la mayor parte de tu tiempo de estudio.

---

## 1. Conceptos Cloud (25–30%)

### 1.1 Definición de Cloud Computing
Consiste en la entrega de recursos de computación (servidores, almacenamiento, bases de datos, redes y software) **bajo demanda** a través de internet, bajo un modelo de **pago por uso**.

Las cinco características esenciales que debes reconocer en el examen son:
- **Autoservicio bajo demanda:** Provisionas recursos de forma autónoma sin intervención humana de Microsoft.
- **Acceso amplio a la red:** Recursos disponibles desde cualquier lugar y dispositivo con conexión.
- **Pool de recursos:** Los datacenters se comparten en un entorno de multi-inquilino (multi-tenant) asignado dinámicamente.
- **Elasticidad rápida:** Los recursos escalan hacia arriba o hacia abajo casi al instante según la demanda.
- **Servicio medido:** Pagas basándote en el consumo real medido de forma transparente.

---

### 1.2 El Modelo de Responsabilidad Compartida
Este es el pilar central del examen. La regla de oro determina qué tareas recaen sobre ti (el cliente) y cuáles sobre Microsoft (el proveedor).

```text
               ON-PREM      IaaS        PaaS        SaaS
┌─────────────┬───────────┬───────────┬───────────┬───────────┐
│ Datos       │    TÚ     │    TÚ     │    TÚ     │    TÚ     │
│ Dispositivos│    TÚ     │    TÚ     │    TÚ     │    TÚ     │
│ Identidades │    TÚ     │    TÚ     │    TÚ     │    TÚ     │ <-- SIEMPRE del cliente
├─────────────┼───────────┼───────────┼───────────┼───────────┤
│ Aplicación  │    TÚ     │    TÚ     │    TÚ     │ PROVEEDOR │
│ Runtime     │    TÚ     │    TÚ     │ PROVEEDOR │ PROVEEDOR │
│ S. Operativo│    TÚ     │    TÚ     │ PROVEEDOR │ PROVEEDOR │
├─────────────┼───────────┼───────────┼───────────┼───────────┤
│ Virtualizac.│    TÚ     │ PROVEEDOR │ PROVEEDOR │ PROVEEDOR │
│ Hardware    │    TÚ     │ PROVEEDOR │ PROVEEDOR │ PROVEEDOR │
│ Datacenter  │    TÚ     │ PROVEEDOR │ PROVEEDOR │ PROVEEDOR │
└─────────────┴───────────┴───────────┴───────────┴───────────┘
```

> 💡 **Regla Mnemotécnica:** A medida que subes en el tipo de servicio (IaaS → PaaS → SaaS), gestionas menos infraestructura. Sin embargo, tus **datos, dispositivos y accesos son siempre tu responsabilidad**, incluso en SaaS puro (como Microsoft 365).

---

### 1.3 Modelos de Nube: Público, Privado e Híbrido

- **Nube Pública:** Infraestructura compartida entre múltiples clientes (multi-tenant). Idónea para startups y cargas de trabajo variables sin costes de inversión inicial (CapEx).
- **Nube Privada:** Infraestructura dedicada exclusivamente a una única organización. Utilizada por banca y sanidad con regulaciones muy estrictas.
- **Nube Híbrida:** Conecta entornos de nube pública con localizaciones privadas (on-premises). Es el escenario típico en proyectos de mantenimiento y soporte de sistemas híbridos.

---

### 1.4 Gastos de Capital (CapEx) vs Gastos Operativos (OpEx)

- **CapEx (Capital Expenditure):** Inversión inicial en infraestructura física. Pagos por adelantado con un aprovisionamiento lento y riesgo de sobredimensionamiento.
- **OpEx (Operational Expenditure):** Gasto recurrente operativo. Modelo de pago por uso sin costes iniciales, flexible y escalable de forma inmediata. **Azure opera bajo un modelo puramente OpEx.**

---

### 1.5 Beneficios del Cloud B2B

- **Alta disponibilidad (HA):** Capacidad para mantener el servicio activo en caso de fallo de hardware local.
- **Escalabilidad:** Modificación de recursos. Puede ser **Vertical** (añadir más potencia a la misma máquina - *scale up*) u **Horizontal** (añadir más réplicas de máquinas idénticas - *scale out*).
- **Elasticidad:** Escalado **automático y dinámico** en base a la demanda en tiempo real.
- **Fiabilidad (Reliability):** Tolerancia a fallos que permite al sistema recuperarse y continuar operando según su diseño.
- **Previsibilidad (Predictability):** Costes e infraestructura estables que eliminan desviaciones de presupuesto.

---

## 2. Arquitectura de Azure (35–40%)

### 2.1 Jerarquía Organizativa
Para estructurar y aplicar gobernanza en Azure, Microsoft implementa cinco niveles jerárquicos:

```text
┌───────────────────────┐
│  Microsoft Entra ID   │ <-- Tenant (Límite de identidad y seguridad)
└───────────┬───────────┘
            │
┌───────────▼───────────┐
│   Management Groups   │ <-- Agrupación masiva para aplicar directivas y accesos
└───────────┬───────────┘
            │
┌───────────▼───────────┐
│     Subscriptions     │ <-- Límite de facturación y cuotas de uso
└───────────┬───────────┘
            │
┌───────────▼───────────┐
│    Resource Groups    │ <-- Contenedores lógicos de ciclo de vida conjunto
└───────────┬───────────┘
            │
┌───────────▼───────────┐
│       Resources       │ <-- VM, VNet, Storage Account (unidad mínima)
└───────────────────────┘
```

> ⚠️ **Advertencia de Examen:** Un recurso pertenece únicamente a un Resource Group. Sin embargo, los recursos dentro de un Resource Group **no tienen por qué estar en la misma región** que el contenedor. El Resource Group solo almacena metadatos del ciclo de vida.

---

### 2.2 Regiones y Zonas de Disponibilidad (Availability Zones)

- **Región:** Conjunto de datacenters interconectados mediante una red de bajísima latencia en un perímetro geográfico.
- **Region Pair (Regiones Emparejadas):** Regiones en la misma geografía separadas por un mínimo de 300 millas de distancia. En caso de fallo total de una región, la recuperación de desastres prioriza restaurar la región emparejada. Las actualizaciones del sistema se realizan de manera secuencial para evitar caídas globales.
- **Availability Zone (Zonas de Disponibilidad):** Datacenters físicamente independientes con alimentación, refrigeración y conectividad propia dentro de la misma región. Protegen ante fallos de un edificio completo.
- **Availability Set (Conjunto de Disponibilidad):** Agrupa recursos dentro de un mismo datacenter en **Fault Domains** (hardware/alimentación común) y **Update Domains** (ventanas de mantenimiento) para evitar que fallos físicos de racks afecten a todo tu sistema.

---

## 3. Computación y Redes en Azure

### 3.1 Servicios de Compute Principales

- **Azure Virtual Machines (VM):** Infraestructura como Servicio (IaaS). Te otorga el control absoluto sobre el sistema operativo. Recomendado para migraciones *lift-and-shift*.
- **Azure App Service:** Plataforma como Servicio (PaaS) optimizada para alojar aplicaciones web y APIs sin lidiar con servidores ni parches de S.O.
- **Azure Container Instances (ACI):** La manera más rápida de levantar contenedores de forma puntual sin tener que orquestar un clúster complejo como Kubernetes (AKS).
- **Azure Functions:** Computación sin servidor (Serverless). Permite ejecutar código basado puramente en eventos con costes que escalan a cero si no hay uso.

---

### 3.2 Componentes de Networking

- **Virtual Network (VNet):** El límite lógico de aislamiento de red privada por defecto en Azure.
- **Subred (Subnet):** Segmentación dentro de una VNet para aislar capas de tu arquitectura (ej. base de datos separada de la web).
- **VNet Peering:** Conectividad directa entre dos VNets mediante la red troncal privada de Microsoft, sin tráfico saliente a internet.
- **VPN Gateway:** Enlace cifrado mediante internet público para interconectar oficinas (red híbrida).
- **ExpressRoute:** Línea física privada dedicada mediante un proveedor de conectividad local. No pasa por internet público, ofreciendo la máxima velocidad y el menor retardo (latencia) posible.
- **Private Endpoint:** Asigna una IP interna de tu subred a un recurso PaaS (como Storage Account) para bloquear accesos desde direcciones públicas.

---

## 4. Almacenamiento en Azure (Storage)

### 4.1 Servicios de Azure Storage

- **Blob Storage:** Almacenamiento optimizado para datos no estructurados en masa (archivos binarios, imágenes, backups y logs).
- **Azure Files:** Carpetas de archivos compartidos accesibles mediante protocolos estándar del sector como SMB o NFS.
- **Managed Disks:** Los discos duros persistentes asociados directamente a tus máquinas virtuales.

### 4.2 Tiers de Acceso a Blob Storage
Seleccionar el tier de acceso adecuado optimiza radicalmente los costes OpEx de almacenamiento:

| Tier | Coste Almacenamiento | Coste Acceso | Latencia de Lectura | Retención Mínima |
| :--- | :--- | :--- | :--- | :--- |
| **Hot (Caliente)** | Alto | Muy Bajo | Milisegundos | N/A |
| **Cool (Frío)** | Medio | Medio | Milisegundos | $\ge$ 30 días |
| **Cold (Muy Frío)** | Bajo | Alto | Milisegundos | $\ge$ 90 días |
| **Archive (Archivo)**| Mínimo | Máximo | Horas (requiere rehidratación) | $\ge$ 180 días |

> ⚠️ **Trampa Frecuente:** El nivel *Archive* no permite accesos inmediatos. Requiere un proceso de rehidratación que tarda horas. Si la pregunta indica accesos inmediatos ocasionales, la opción correcta debe ser *Cool* o *Cold*.

---

### 4.3 Opciones de Redundancia y Réplica

- **LRS (Locally Redundant Storage):** 3 copias dentro de un único datacenter físico en la región primaria.
- **ZRS (Zone Redundant Storage):** 3 copias distribuidas en distintas Availability Zones de la misma región.
- **GRS (Geo Redundant Storage):** 6 copias (3 en la región primaria y 3 réplicas asíncronas en la región secundaria emparejada).
- **RA-GRS:** Idéntico a GRS pero permitiendo el acceso de solo lectura continuo a la región secundaria sin necesidad de iniciar un proceso de failover por caída.

---

## 5. Identidad, Acceso y Seguridad

### 5.1 Microsoft Entra ID (antes Azure Active Directory)
Es el motor de gestión de identidades **cloud-native** de Microsoft. A diferencia del Active Directory clásico (on-premises), no opera bajo LDAP ni Kerberos; se basa en protocolos modernos web como **SAML, OAuth 2.0 y OpenID Connect (OIDC)**.

- **B2B (Business to Business):** Permite invitar a partners o colaboradores externos a acceder a tus recursos usando sus propias credenciales corporativas externas.
- **B2C (Business to Consumer):** Orientado a gestionar el login y registro de clientes finales para aplicaciones propias.
- **Conditional Access (Acceso Condicional):** Motor de políticas basadas en señales condicionales ("si esto, entonces aquello"). Permite exigir MFA solo si el inicio de sesión se realiza desde una ubicación inusual o un dispositivo no corporativo.

---

### 5.2 Control de Acceso Basado en Roles (RBAC)
Mecanismo que limita **quién (Identidad) puede hacer qué (Rol) en un lugar específico (Ámbito/Scope)**.

```text
RBAC = Identidad + Rol + Ámbito
```

Los cuatro roles de acceso integrados más preguntados son:
- **Owner (Propietario):** Control total de los recursos, incluyendo la capacidad de asignar permisos a otros usuarios.
- **Contributor (Colaborador):** Capacidad para crear y gestionar recursos, pero no puede conceder permisos a terceros.
- **Reader (Lector):** Solo visualización de recursos, sin capacidad de modificación.
- **User Access Administrator:** Gestión exclusiva de permisos y roles, sin acceso directo a los recursos técnicos.

---

### 5.3 Filosofía Zero Trust y Seguridad Centralizada
El modelo de seguridad Zero Trust opera bajo la máxima: **"Nunca confíes, verifica siempre"**. Se asienta en tres pilares fundamentales:
1. **Verificar explícitamente:** Autenticar en base a identidad, ubicación y salud del dispositivo.
2. **Acceso de mínimo privilegio:** Utilizar accesos temporales y limitados (JIT / JEA).
3. **Asumir la brecha:** Minimizar el radio de impacto segmentando redes y cifrando datos en tránsito y reposo.

- **Microsoft Defender for Cloud:** Consola centralizada CSPM (Cloud Security Posture Management) que analiza la seguridad de tus entornos y te aporta una puntuación de salud de seguridad (**Secure Score**).

---

## 6. Gestión de Costes y Gobernanza (30–35%)

### 6.1 Estimación de Costes

- **Pricing Calculator:** Herramienta para estimar el coste de recursos de Azure **antes de realizar el despliegue**.
- **TCO (Total Cost of Ownership) Calculator:** Compara los costes financieros de mantener tu propia infraestructura local (on-premises) frente a migrar esos recursos a Azure a medio/largo plazo.
- **Cost Management + Billing:** Panel de control de análisis y control para monitorizar los costes **después del despliegue**.

---

### 6.2 Gobernanza y Cumplimiento

- **Azure Policy:** Evalúa los recursos en Azure frente a reglas y estándares corporativos. Permite bloquear accesos o marcar recursos que no cumplan las normas (ej. exigir que toda máquina virtual se despliegue únicamente en la región de Europa Occidental).
- **Resource Locks:** Bloqueos aplicados a nivel de suscripción, grupo o recurso para evitar modificaciones accidentales:
  - **CanNotDelete (No Eliminar):** Se puede leer y modificar, pero no borrar.
  - **ReadOnly (Solo Lectura):** Solo lectura, bloqueando modificaciones y borrado.
  
> ⚠️ **Regla de Oro:** Los Resource Locks tienen precedencia absoluta sobre los permisos RBAC. Incluso un administrador con rol de *Owner* no puede eliminar un recurso con un bloqueo activo; debe eliminar el bloqueo primero.

---

## 7. Herramientas de Gestión y Monitorización

- **Azure Arc:** Herramienta que extiende la gobernanza de Azure (Policy, Defender, RBAC) a servidores, clústeres o nubes de terceros **que viven fuera de Azure**. Mantiene los datos en tus propios servidores locales pero gestionados desde el panel centralizado de Azure.
- **Bicep / ARM Templates:** Infraestructura como Código (IaC) para desplegar recursos mediante plantillas de configuración declarativas.
- **Azure Advisor:** Motor inteligente de recomendaciones de mejora gratuitas centradas en 5 áreas: **Coste, Fiabilidad, Seguridad, Rendimiento y Excelencia Operacional**.
- **Azure Monitor:** Plataforma central de telemetría:
  - **Log Analytics:** Realiza consultas avanzadas a logs de infraestructura usando KQL (Kusto Query Language).
  - **Application Insights:** Analiza de forma específica el comportamiento del código de tu aplicación (APM), identificando cuellos de botella y errores en vivo.

---

## 8. Simulacro Rápido de Examen (15 Preguntas)

Ponte a prueba con este simulacro conceptual rápido. Intenta responder a cada pregunta en menos de 60 segundos antes de leer la solución.

#### 1. Una pyme quiere reutilizar licencias de Windows Server de las que ya dispone en local para reducir el coste de sus nuevas máquinas virtuales en Azure. ¿Qué beneficio de precios aplica?
> 💡 **Solución:** **Azure Hybrid Benefit**. Permite transferir licencias locales a la nube para obtener descuentos masivos en computación.

#### 2. ¿Qué herramienta de Azure Monitor monitoriza el rendimiento interno de tu código web, identificando retrasos y excepciones?
> 💡 **Solución:** **Application Insights**. Es la solución APM específica de Azure Monitor para código de aplicación.

#### 3. Un equipo de sistemas quiere obligar a que ninguna suscripción de la corporación pueda crear bases de datos sin cifrado. ¿Qué nivel de jerarquía y qué servicio usarías?
> 💡 **Solución:** Aplicar una política con **Azure Policy** a nivel de **Management Group** para que se herede a todas las suscripciones inferiores.

#### 4. ¿Qué tipo de redundancia de almacenamiento (Storage Account) ofrece la máxima protección física sin que los datos abandonen la región primaria?
> 💡 **Solución:** **ZRS (Zone Redundant Storage)**. Replica la información en 3 Availability Zones de la misma región.

#### 5. Un desarrollador de software necesita desplegar una imagen de contenedor aislada de forma rápida para una tarea de computación simple. No requiere balanceadores ni escalado automatizado complejo. ¿Qué servicio PaaS es el más adecuado?
> 💡 **Solución:** **Azure Container Instances (ACI)**. Permite levantar contenedores al instante sin gestionar clústeres.

#### 6. ¿Verdadero o falso? Un bloqueo de tipo ReadOnly aplicado a una máquina virtual impide que la herramienta de Azure Monitor recopile métricas del recurso.
> 💡 **Solución:** **Falso**. Un bloqueo *ReadOnly* detiene modificaciones de configuración y borrados, pero no interrumpe la telemetría ni la lectura de datos.

#### 7. ¿Qué tipo de modelo de servicio desplaza la mayor cantidad de responsabilidades administrativas al proveedor: IaaS o PaaS?
> 💡 **Solución:** **PaaS**. Bajo PaaS, el proveedor se encarga de la gestión de parches de S.O., almacenamiento y hardware subyacente.

#### 8. La gerencia de una empresa quiere saber si económicamente les conviene migrar su CPD actual a la nube en un horizonte temporal de 5 años. ¿Qué herramienta gratuita deben utilizar para este análisis comparativo?
> 💡 **Solución:** **TCO Calculator (Total Cost of Ownership)**. Compara los costes ocultos locales (electricidad, mantenimiento, personal) frente a la nube.

#### 9. ¿Qué solución de Microsoft Entra permite a usuarios externos colaborar de forma segura usando sus cuentas corporativas de origen?
> 💡 **Solución:** **External Identities B2B (Business to Business)**.

#### 10. ¿Qué diferencia de comportamiento hay entre aplicar una regla de Azure Policy configurada como "Audit" frente a otra configurada como "Deny"?
> 💡 **Solución:** *Audit* permite crear el recurso pero lo cataloga como no conforme en los reportes de cumplimiento; *Deny* bloquea por completo la creación del recurso no válido.

#### 11. Para desplegar una aplicación web que requiere autoescalar horizontalmente según la demanda agregando réplicas de forma dinámica, ¿qué recurso de computación de base deberías utilizar?
> 💡 **Solución:** **Virtual Machine Scale Sets (VMSS)**.

#### 12. ¿Qué tipo de cuenta de almacenamiento por defecto recomienda Microsoft para el 95% de los escenarios generales (archivos, colas, blobs)?
> 💡 **Solución:** **Standard general-purpose v2**.

#### 13. ¿Cuál es el canal de tráfico de red cuando conectamos un servidor local con una base de datos en Azure mediante Private Endpoint?
> 💡 **Solución:** El tráfico fluye a través de una IP privada interna de la red de la VNet (usando **Azure Private Link**), sin salir nunca a internet público.

#### 14. Un usuario con permisos de administrador borró sin querer una red virtual crítica para producción. ¿Qué configuración lo habría evitado sin restringir los accesos RBAC del administrador?
> 💡 **Solución:** Disponer de un **Resource Lock de tipo CanNotDelete** en la VNet de producción.

#### 15. ¿Qué pilar de la filosofía de seguridad Zero Trust aplicamos al restringir los accesos de un técnico únicamente durante su jornada de guardia y limitando sus permisos?
> 💡 **Solución:** **Acceso de mínimo privilegio** (mediante metodologías JIT - *Just-In-Time* y JEA - *Just-Enough-Access*).

---

> 💡 **Accede aquí:** [Guía para implementar MFA obligatorio en tu servidor SSH](/guias/implementar-mfa-obligatorio-servidor-ssh) (*Protege tus accesos remotos y evita intrusiones críticas*).

---

## Preguntas Frecuentes (FAQ)

### ¿Cuál es la diferencia entre Alta Disponibilidad (HA) y Recuperación ante Desastres (DR)?
La **Alta Disponibilidad** está pensada para mitigar fallos locales menores (caída de un rack o un disco en un datacenter) manteniendo el servicio activo sin interrupción aparente. La **Recuperación ante Desastres** enfoca planes de restauración a gran escala en caso de caída completa de una región geográfica (ej. terremoto o inundación).

### ¿En qué se diferencian Azure Policy y RBAC?
**RBAC** gestiona los accesos a nivel de usuarios (quién puede realizar una acción en la suscripción). **Azure Policy** restringe y valida las configuraciones de los recursos en sí mismos (qué características o regiones se pueden seleccionar al crear un recurso), sin importar qué usuario intente realizar la acción.

### ¿Se pueden saltar los Resource Locks si soy el propietario (Owner) de la suscripción?
No. Ningún permiso RBAC se superpone a los bloqueos de recursos. Si un propietario desea eliminar o editar un recurso bloqueado, **está obligado a eliminar manualmente el bloqueo de recurso en primer lugar** antes de realizar la acción.
