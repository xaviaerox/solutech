# 📜 Reglas del Proyecto: SOLUTECH

Este documento contiene las reglas de oro que deben seguirse a rajatabla en el desarrollo y mantenimiento de la web de Solutech.

## 1. Identidad Visual (Aesthetics)
- **Paleta**: Negro puro (#000000), Gris oscuro (#0a0a0a) y Naranja Solutech (#ff6b00).
- **Estilo**: Glassmorphism avanzado. Uso de `backdrop-filter: blur(16px)` y bordes sutiles con transparencia (`rgba(255,255,255,0.1)`).
- **Interactividad**: Todas las tarjetas deben tener la clase `card-hover` para animaciones de elevación y glow.
- **Revelación**: Usar el sistema de `reveal` para que los elementos aparezcan suavemente al hacer scroll.

## 2. Arquitectura de Código
- **Single Source of Truth**: Todos los datos variables (precios, servicios, portfolio, blog) DEBEN residir en `data.js`. No se permite hardcodear contenido dinámico en los HTML.
- **Vanilla JS**: No añadir librerías externas (jQuery, React, etc.). Todo debe ser JavaScript puro en `solutech.js`.
- **CSS**: Se usa Tailwind CSS vía CDN para prototipado rápido, pero los estilos core y animaciones complejas van en `style.css`.

## 3. Gestión de Activos (Assets)
- **Imágenes**: No usar enlaces externos (Unsplash, etc.) para imágenes finales. Deben guardarse en `assets/img/`.
- **Formatos**: Preferiblemente PNG o JPG de alta calidad optimizados.
- **Rutas**: Mantener la coherencia de rutas relativas para que el sitio funcione en subdirectorios (ej: `../assets/` desde el blog).

## 4. Marca Personal y Enlaces
- **LinkedIn**: El enlace oficial siempre debe ser el perfil personal: `https://www.linkedin.com/in/xaviaerox`.
- **Tono**: Profesional, experto, pero cercano. Solutech es Xavi Alonso.
- **Contacto**: El correo principal es `xavi@solutech.shop`.
## 5. Control de Cambios Estéticos
- **Inmutabilidad**: La estética general (colores, fuentes, radios de borde, efectos de cristal) es definitiva.
- **Control del Usuario**: NO se deben realizar cambios estéticos, rediseños o "mejoras" visuales de forma espontánea o aleatoria. Cualquier modificación en la apariencia debe venir derivada de una petición explícita del usuario.
- **Preservación**: El objetivo es mantener una imagen de marca estable y profesional en todo momento.

## 6. Estructura de Archivos
- **Raíz**: Contiene las páginas principales (`index`, `servicios`, `nosotros`, `soporte`).
- **Blog**: Los artículos van en `/blog/posts/` y el índice en `/blog/`.
- **Assets**: Organizados en `/assets/img/` y `/assets/fonts/`.

## 7. SEO y Rendimiento
- **SEO**: Cada página debe tener `title`, `meta description` y `canonical URL` únicos.
- **Rendimiento**: Imágenes con `loading="lazy"` excepto la Hero. Mantener el CSS y JS lo más ligeros posible.
