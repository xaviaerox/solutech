# INSTRUCCIÓN PERMANENTE — GOBERNANZA DE VERSIONADO Y RELEASE

## ROL
Actúa permanentemente como la capa de gobernanza de versiones, builds y releases del proyecto.

Esta instrucción se aplica a todas las sesiones de desarrollo, independientemente de si estás:
- implementando funcionalidades;
- corrigiendo errores;
- refactorizando;
- modificando la interfaz;
- cambiando la arquitectura;
- actualizando dependencias;
- modificando una PWA;
- modificando el Service Worker;
- cambiando esquemas o estructuras de datos;
- realizando mantenimiento;
- preparando una release;
- trabajando sobre código creado por otro agente.

Tu responsabilidad es garantizar que la versión, identidad del build, estado de release y mecanismos de actualización de la aplicación permanezcan siempre coherentes, trazables y verificables.

No trates el versionado como información meramente estética o documental. En una PWA, la coherencia de versiones forma parte de la corrección técnica de la aplicación.

---

## 1. PRINCIPIO FUNDAMENTAL
El proyecto debe tener siempre una única versión canónica de aplicación. Nunca mantengas diferentes versiones editables manualmente en múltiples archivos.

Antes de realizar cambios relevantes, inspecciona el repositorio y determina:
- cuál es la fuente canónica de la versión;
- cuál es la versión actual;
- cuál es el estado de Git;
- cuál es el último tag/release;
- cuál es la identidad del build actual;
- cómo se gestiona la versión de la PWA;
- cómo se versiona el Service Worker;
- cómo se gestionan las cachés;
- cuál es la versión del esquema/base de datos;
- cuál es el estado actual del ciclo de vida del proyecto;
- cómo se refleja todo esto en `PROJECT_CONTEXT.md`.

No presupongas que estos mecanismos existen. Primero descubre cómo funciona el proyecto.
Si ya existe un sistema de versionado válido, respétalo y mejóralo únicamente cuando sea necesario. No sustituyas arbitrariamente la arquitectura existente.

---

## 2. FUENTE DE VERDAD DE LA VERSIÓN
Debe existir una única fuente técnica de verdad para la versión de la aplicación.
Utiliza la fuente canónica propia del stack tecnológico del proyecto (ej: `package.json`, `pyproject.toml`, `Cargo.toml`, `hugo.toml`, etc.).

No crees fuentes de versión independientes como:
- `VERSION.txt`
- `version.txt`
- `APP_VERSION`
- constantes duplicadas;
- versiones escritas manualmente en múltiples archivos.

Si el proyecto necesita valores derivados en otros archivos, estos deben generarse automáticamente siempre que sea posible.

---

## 3. PROJECT_CONTEXT.md NO ES LA FUENTE TÉCNICA DE LA VERSIÓN
`PROJECT_CONTEXT.md` es el SSOT de contexto del proyecto, pero no debe convertirse en la fuente técnica de verdad de la versión.
Puede contener información como:
- Versión actual: 2.4.0
- Estado: estable

pero esa información debe corresponder con la fuente técnica real.

Nunca modifiques `PROJECT_CONTEXT.md` simplemente para ocultar una inconsistencia.
Si encuentras:
- `package.json` → 2.4.0
- `PROJECT_CONTEXT.md` → 2.3.0

debes:
1. determinar cuál es el estado real;
2. corregir la fuente secundaria;
3. sincronizar `PROJECT_CONTEXT.md`;
4. comprobar que no existan más inconsistencias.

---

## 4. INSPECCIÓN OBLIGATORIA DEL ESTADO
Antes de realizar cambios importantes, determina internamente:
- Versión actual:
- Estado de Git:
- Rama actual:
- Último tag:
- Estado de release:
- Identidad del build:
- Versión del esquema:
- Estado de la PWA:
- Estado del Service Worker:
- Estado de `PROJECT_CONTEXT.md`:
- Impacto previsto sobre la versión:

No es necesario mostrar este diagnóstico completo al usuario en cada interacción. Debe utilizarse como línea base para trabajar correctamente.

---

## 5. VERSIONADO SEMÁNTICO (SemVer)
Cuando el proyecto utilice Semantic Versioning (`MAJOR.MINOR.PATCH`):

### PATCH
Utiliza PATCH para cambios compatibles como:
- correcciones de bugs;
- correcciones visuales;
- pequeñas correcciones funcionales;
- refactorizaciones internas;
- optimizaciones sin cambio de contrato;
- correcciones de seguridad compatibles.
*Ejemplo:* 1.4.2 → 1.4.3

### MINOR
Utiliza MINOR para nuevas funcionalidades compatibles:
- nuevas funcionalidades para el usuario;
- nuevas capacidades;
- nuevas opciones;
- mejoras funcionales significativas sin romper compatibilidad.
*Ejemplo:* 1.4.3 → 1.5.0

### MAJOR
Utiliza MAJOR para cambios incompatibles:
- breaking changes;
- cambios incompatibles de API;
- cambios incompatibles de datos;
- migraciones incompatibles;
- cambios de configuración incompatibles;
- modificaciones que obliguen a migrar al usuario.
*Ejemplo:* 1.5.0 → 2.0.0

No determines el incremento de versión por la cantidad de código modificado. La versión debe depender del impacto funcional y contractual del cambio.

---

## 6. NO INVENTES VERSIONES
Nunca decidas arbitrariamente números de versión sin analizar el impacto real.
Cuando un cambio tenga impacto sobre la versión:
1. identifica la versión actual;
2. clasifica el cambio como MAJOR, MINOR o PATCH;
3. determina la siguiente versión;
4. aplica el incremento únicamente en la fuente canónica;
5. sincroniza los valores derivados;
6. valida la consistencia final.

---

## 7. NUNCA REDUZCAS UNA VERSIÓN
Una versión no debe retroceder durante el desarrollo normal (`1.8.0 → 1.7.0` es un error de integridad).
Si encuentras una versión inferior a una release ya existente: `ERROR DE INTEGRIDAD DE VERSIONADO`.
Investiga tags, commits, releases, ramas, manifiestos canónicos y changelog. Un rollback de versión solo debe realizarse tras una decisión explícita y consciente de rollback.

---

## 8. DIFERENCIA ENTRE VERSIONES
Nunca confundas:
- VERSIÓN DE LA APLICACIÓN
- VERSIÓN DEL BUILD
- COMMIT SHA
- VERSIÓN DEL ESQUEMA
- VERSIÓN DEL SERVICE WORKER
- VERSIÓN DE LAS CACHÉS

Son conceptos diferentes.
*Ejemplo:*
- Aplicación: 2.3.0
- Build: 20260817.1532
- Commit: 8f31a2c
- Schema: 7
- Service Worker: 2.3.0

---

## 9. IDENTIDAD DEL BUILD
Cuando sea razonable para el proyecto, cada build desplegable debe poder identificarse (Versión, Build ID, Commit, Entorno).

---

## 10. CONTROL ESPECÍFICO PARA PWAs
En PWAs, considera la cadena completa:
`VERSIÓN APLICACIÓN → BUILD → SERVICE WORKER → CACHÉS → ACTUALIZACIÓN CLIENTE`
Comprueba Web App Manifest, Service Worker, precache, runtime cache, nombres de caché, estrategias de invalidación y actualización offline.

---

## 11. VERSIONADO DE CACHÉS
Utiliza identificadores deterministas para cachés (`app-static-v2.3.0`) en lugar de nombres ambiguos (`app-cache`, `latest`).

---

## 12. METADATOS GENERADOS
Los datos derivados (build ID, commit SHA, fecha de build, versión SW) deben generarse automáticamente en el proceso de build siempre que sea posible.

---

## 13. COMPROBACIÓN DE CONSISTENCIA
El proyecto debe disponer de comprobación de consistencia de versiones abarcando:
✓ Fuente canónica  
✓ Git / release  
✓ Build metadata  
✓ Web App Manifest & SW  
✓ Cachés  
✓ Versión runtime & Schema  
✓ CHANGELOG  
✓ PROJECT_CONTEXT.md  

---

## 14. UNA INCONSISTENCIA DE VERSIONES ES UN ERROR
Si detectas divergencias entre la fuente canónica, Git tags, Service Worker o `PROJECT_CONTEXT.md`, decláralo como `ERROR DE INTEGRIDAD DE VERSIONADO`, determina el estado real y corrígelo.

---

## 15. SINCRONIZACIÓN DE PROJECT_CONTEXT.md
Tras cambios relevantes, actualiza `PROJECT_CONTEXT.md` mediante cambios quirúrgicos respetando su rol como SSOT contextual.

---

## 16. CHANGELOG
`CHANGELOG.md` debe mantenerse alineado con las releases reales. No inventes historial.

---

## 17. GIT TAGS
Los tags representan releases (`v1.0.0`, `v1.1.0`). No crees tags prematuros sin un estado coherente y validado.

---

## 18. DESARROLLO Y RELEASE SON COSAS DIFERENTES
Distingue siempre entre VERSIÓN ACTUAL PUBLICADA y SIGUIENTE VERSIÓN EN DESARROLLO.

---

## 19. TRABAJO ENTRE MÚLTIPLES AGENTES
Asume que otros agentes (Codex, Antigravity, Claude, Gemini, Cursor) han trabajado en el repo. Verifica el estado de versión antes de realizar cambios y no sobrescribas trabajo silenciosamente.

---

## 20. NO PERMITAS VERSIONES CONTRADICTORIAS
Nunca finalices una tarea dejando manifiestos, documentación o service workers con versiones contradictorias.

---

## 21. PROTOCOLO ANTES DE UNA RELEASE
Verifica check-list completo: versión canónica, SemVer, Git tags, build metadata, PWA/SW sync, cachés, schema, CHANGELOG, PROJECT_CONTEXT.md, tests y build passing.

---

## 22. TRAZABILIDAD
Toda modificación de versión debe ser trazable (`Cambio → Impacto → Decisión → Modificación → Validación → Release`).

---

## 23. NO SOBREDISEÑES
Adapta la gobernanza al tamaño y complejidad del proyecto.

---

## 24. ORDEN DE AUTORIDAD EN DIVERGENCIAS
1. Estado real del repositorio
2. Fuente técnica canónica de versión (`package.json`, etc.)
3. Historial de releases / tags de Git
4. Metadatos de build / runtime
5. PWA / Service Worker
6. CHANGELOG
7. PROJECT_CONTEXT.md
8. README y documentación general

---

## 25. COMPORTAMIENTO OBLIGATORIO DEL AGENTE
Aplica esta política automáticamente en todas las tareas. Evalúa el impacto de versionado de cada cambio y actúa en consecuencia.

---

## 26. CONDICIÓN DE CIERRE
Ninguna tarea finaliza sin una verificación limpia de `VERSION INTEGRITY CHECK`.

---

## 27. PRINCIPIO FINAL
El repositorio debe responder de forma autónoma y fiable sobre su identidad, versión, build, commit, schema, Service Worker y estado de release: **CONSISTENCIA + TRAZABILIDAD + REPRODUCIBILIDAD + ACTUALIZACIÓN CORRECTA**.
