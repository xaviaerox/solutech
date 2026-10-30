# Arquitectura Técnica: Sección Soluciones & Paquetes (`SOLUTECH_SOLUTIONS_ARCHITECTURE.md`)

---

## 1. Propósito y Filosofía de Negocio (`v1.4.0` / ADR-024)

Solutech es una empresa tecnológica orientada a servicios de gestión IT, ciberseguridad preventiva y continuidad operativa para pequeñas y medianas empresas y particulares.

A partir de la versión `1.4.0` (**ADR-024**), se ha eliminado la denominación **"Solutech Labs"** y se han retirado de la visualización y navegación los proyectos experimentales o de corte personal/portfolio (`Queryclin`, `MiraTEA`, `AeroGym`), diferenciando estrictamente la identidad corporativa de Solutech frente a un portfolio personal.

La función estratégica de cada sección del portal es:

> **Servicios (`/servicios/`) = Planes MSP de mantenimiento recurrente, proceso de onboarding y preguntas frecuentes.**
>
> **Soluciones (`/soluciones/`) = Paquetes cerrados (*bundles*) asociados a herramientas concretas para pymes y particulares, con un enfoque directo, acotado y llave en mano.**
>
> **Quiénes somos (`/quienes-somos/`) = Identidad corporativa de Solutech, liderazgo técnico directo y reseñas reales de clientes.**
>
> **Autodiagnóstico (`/autodiagnostico/`) = Herramienta interactiva *Cyber-Check* aislada para evaluar el nivel de riesgo IT.**
>
> **Contacto (`/contacto/`) = Punto único y aislado de conversión con formulario protegido de 5 capas anti-spam para métricas limpias.**

---

## 2. Arquitectura y Enrutamiento (Routing)

La implementación se apoya de forma nativa en **Hugo v0.163+ Extended** para garantizar cero dependencias en tiempo de ejecución y preservar las puntuaciones de 98.5/100 en Google Lighthouse.

### 2.1. Rutas Principales del Sistema (`v1.4.0`)
- **Portada (`/`):** `layouts/index.html` — Vista ejecutiva ligera (Hero, métricas de impacto, problemas frecuentes, buscador + últimos artículos del blog y CTA limpio sin formularios incrustados).
- **Servicios (`/servicios/`):** `content/servicios.md` + `layouts/servicios/single.html` — Planes MSP (`data/pricing.yaml`), Proceso de Onboarding (`layouts/partials/onboarding.html`) y FAQs desplegables (`<details class="svc-faq-item">`).
- **Soluciones (`/soluciones/`):** `content/soluciones/_index.md` + `layouts/soluciones/list.html` — Cabecera enfocada en paquetes cerrados (*bundles*) para pymes y particulares y botón de Call to Action directo hacia `/contacto/`.
- **Quiénes somos (`/quienes-somos/`):** `content/quienes-somos.md` + `layouts/quienes-somos/single.html` — Presentación empresarial de Solutech (`data/founder.yaml`) y bloque de reseñas verificadas de clientes (`data/testimonials.yaml`).
- **Diagnóstico IT (`/autodiagnostico/`):** `content/autodiagnostico.md` + `layouts/partials/cybercheck.html` — Test interactivo de 8 preguntas críticas que redirige al finalizar a `/contacto/?riesgo=...&pts=...`.
- **Contacto (`/contacto/`):** `content/contacto.md` + `layouts/contacto/single.html` — Canales de atención directa y formulario de captación aislado (`layouts/partials/contact-form.html`).

### 2.2. Flujo de Navegación
- **Header Principal (`layouts/partials/nav.html`):**
  `Servicios | Soluciones | Quiénes somos | Blog | Guías | Diagnóstico IT` + CTA `Contacto` (`/contacto/`).
- **Footer Corporativo (`layouts/partials/footer.html`):** Enlaces directos a `Planes MSP`, `Soluciones`, `Quiénes somos`, `Blog Técnico`, `Guías`, `Autodiagnóstico IT` y `Contacto`.

---

## 3. Reglas de Privacidad Operacional (OPSEC) y Stack Interno

Por directriz estricta de negocio y seguridad operacional:
1. **No divulgación de herramientas internas:** En ninguna página comercial (`/servicios/`, `/soporte/`, `/`, etc.) se deben mencionar los nombres de las herramientas internas de administración remota, VPN o RMM (como `RustDesk`, `Tailscale`, `Tactical RMM`, `Proxmox`, `Docker` o `n8n`).
2. **Preaviso simplificado:** En las condiciones y preguntas frecuentes de `/servicios/` se indica la ausencia de permanencia con baja mediante *preaviso general*, sin exigir plazos de 30 días.
3. **Calculadora MSP desactivada en navegación:** Los componentes `layouts/partials/calculator.html`, `assets/js/modules/calculator.js` y `assets/css/components/calculator.css` se conservan en el código fuente pero no se renderizan ni enlazan en ninguna vista pública.

---

## 4. Evolución Futura de `/soluciones/` (Paquetes / Bundles)

Cuando se incorporen los paquetes cerrados (*bundles*) para pymes y particulares en `/soluciones/`:
1. Cada paquete deberá representar una solución acotada, directa y llave en mano asociada a una necesidad o herramienta concreta (ej. *Pack Backup Inmutable*, *Pack Seguridad de Correo & Identidades*, *Pack Puesto de Trabajo Seguro*).
2. Su conversión apuntará siempre a `/contacto/` para mantener centralizada la analítica de leads.
