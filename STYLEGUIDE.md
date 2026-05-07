# 🎨 Guía de Estilo: SOLUTECH

Esta guía define los estándares visuales y técnicos para mantener la integridad estética de Solutech. Cualquier cambio en estos valores debe ser solicitado explícitamente.

## 1. Paleta de Colores
| Uso | Variable CSS | Color Hex/RGBA |
| :--- | :--- | :--- |
| **Primario (Naranja)** | `--primary` | `#ff6b00` |
| **Primario Dark** | `--primary-dark` | `#e65100` |
| **Fondo Base (Negro)** | `--bg` | `#0a0a0a` |
| **Superficie (Glass)** | `--bg-card` | `rgba(25, 25, 25, 0.6)` |
| **Borde Sutil** | `--border` | `rgba(255, 107, 0, 0.15)` |
| **Texto Principal** | `--text` | `#ffffff` |
| **Texto Secundario**| `--text-muted` | `rgba(255, 255, 255, 0.5)` |

## 2. Tipografía
- **Títulos (Headings)**: `Space Grotesk`, sans-serif.
  - Uso: H1, H2, H3 y destacados.
  - Look: `font-bold` con `tracking-tighter`.
- **Cuerpo (Body)**: `Inter`, sans-serif.
  - Uso: Párrafos, descripciones y navegación.
  - Pesos: `font-light` (300) para descripciones, `font-normal` (400) para lectura general.

## 3. Efecto Glassmorphism (Core)
Es la firma visual de Solutech. Debe aplicarse a todas las tarjetas (`.glass`):
- **Efecto**: `backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);`
- **Fondo**: `rgba(25, 25, 25, 0.6)`
- **Borde**: `1px solid rgba(255, 255, 255, 0.07)` o `var(--border)` según el contexto.
- **Sombra**: `0 4px 24px -1px rgba(0, 0, 0, 0.4)`

## 4. Componentes y Estados
- **Botón Primario (`.btn-primary`)**:
  - Gradiente: `linear-gradient(135deg, #ff6b00 0%, #e65100 100%)`.
  - Efecto: Sombra naranja difusa.
  - Hover: `transform: translateY(-3px) scale(1.02)`.
- **Tarjetas (`.card-hover`)**:
  - Radio: `rounded-[32px]`.
  - Hover: Elevación, aumento de brillo en el fondo y borde naranja más intenso.

## 5. Iconografía
- **Estilo**: Heroicons (Outline/Solid) integrados como SVG.
- **Color**: Siempre en naranja (`text-orange-500`) o blanco con opacidad baja.

## 6. Layout y Estructura
- **Ancho máximo**: `max-w-7xl` (1280px).
- **Padding horizontal**: `px-6` o `px-8`.
- **Separación de secciones**: `py-24` a `py-32`.
