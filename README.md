# Solutech — MSP & Outsourcing IT Platform

**Plataforma web estática de alta gama para el negocio MSP de Solutech.**

🌐 **Producción:** [solutech.shop](https://solutech.shop)  
📦 **GitHub Pages:** activar en Settings → Pages → main branch → `/root`

---

## Arquitectura

```
solutech-clean/
├── index.html          # Inicio
├── servicios.html      # Planes y precios
├── nosotros.html       # Sobre Xavi Alonso
├── soporte.html        # Contacto
├── privacidad.html     # Política de privacidad
├── sitemap.xml
├── robots.txt
│
├── style.css           # Design System — fuente única de estilos
├── data.js             # Datos del negocio — fuente única de contenido
├── solutech.js         # Motor JS — sin dependencias externas
│
├── assets/
│   └── img/
│       ├── ICO.png
│       ├── xavi-alonso.jpg
│       └── banner.png
│
└── blog/
    ├── index.html
    ├── assets/
    │   └── blog.css
    └── posts/
        └── soporte-reactivo-coste.html
```

## Cómo actualizar contenido

**Cambiar precios o testimonios:**  
Editar únicamente `data.js` → objeto `SOLUTECH.pricing` o `SOLUTECH.testimonials`.

**Añadir un artículo del blog:**  
1. Crear `blog/posts/nuevo-articulo.html` (copiar estructura de `soporte-reactivo-coste.html`)
2. Añadir entrada al array `SOLUTECH.blog` en `data.js`

**Actualizar info de contacto o redes sociales:**  
Editar únicamente `data.js` → objetos `SOLUTECH.brand` y `SOLUTECH.social`.

## Stack técnico

- **HTML5** estático (SSR-style, cero build step)
- **Tailwind CSS CDN** (utilidades) + `style.css` (design tokens)
- **Vanilla JS** — Zero frameworks, zero dependencias externas
- **Google Analytics** G-Q14TRWX9LY
- **Fonts:** Inter + Space Grotesk via Google Fonts

## Deploy en GitHub Pages

```bash
# Desde el directorio solutech-clean:
git init
git add .
git commit -m "feat: Solutech clean deploy"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/solutech.git
git push -u origin main
```

Luego: Settings → Pages → Branch: main → Folder: / (root) → Save

> ⚠️ El VPS en solutech.shop sigue siendo independiente. Este repo es la copia limpia para GitHub Pages.
