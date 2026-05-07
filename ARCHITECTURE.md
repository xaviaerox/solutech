# 🏗️ ARCHITECTURE: SOLUTECH

Este documento describe la estructura técnica y el flujo de datos de la web de Solutech.

## 1. Patrón de Diseño: Data-Driven Static Site
Aunque la web es estática (HTML/CSS/JS), funciona mediante un patrón de "datos dirigidos".

### El Flujo de Datos:
1.  **`data.js` (La Base de Datos)**: Contiene objetos JSON con toda la información (servicios, precios, portfolio).
2.  **`solutech.js` (El Motor)**: Al cargar el DOM, este script lee `data.js` e inyecta el contenido en los contenedores correspondientes (`#services-grid`, `#portfolio-grid`, etc.).
3.  **HTML**: Sirve como esqueleto estructural y contenedor de los scripts.

## 2. Componentes del Sistema

### Core (`/`)
- `index.html`: Portada y landing principal.
- `servicios.html`: Visualización de planes de precios.
- `nosotros.html`: Página de marca personal de Xavi.
- `soporte.html`: Centro de contacto y ayuda.

### Lógica (`/`)
- `solutech.js`: Maneja el renderizado, el modo oscuro, el menú móvil y las animaciones de scroll (Reveal).
- `data.js`: Fuente única de verdad. Para cambiar un precio o un cliente, solo se edita este archivo.

### Estilos y Diseño
- `style.css`: Estilos core, variables de diseño y animaciones complejas.
- Tailwind CSS: Usado vía CDN para utilidades de espaciado y layout rápido.

### Blog (`/blog/`)
- El blog tiene su propia estructura para permitir el crecimiento:
- `/index.html`: Listado dinámico de posts.
- `/posts/`: Contiene los artículos individuales como archivos HTML estáticos para mejor SEO.
- `/assets/blog.css`: Estilos específicos para la lectura de artículos largos.

## 3. Consideraciones Técnicas
- **Zero Dependencies**: El sitio funciona sin frameworks (React/Vue) para garantizar la máxima velocidad de carga.
- **PWA Ready**: Incluye `manifest.json` y `sw.js` para permitir la instalación en dispositivos móviles.
- **SEO Ready**: Estructura semántica diseñada para ser rastreada eficientemente por Google.
