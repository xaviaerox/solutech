# 📜 Reglas de Desarrollo (Solutech)

Este documento es la ley para cualquier IA o desarrollador que trabaje en este proyecto.

## 1. Estilo de Código y Estructura
- **Framework**: Siempre usar Hugo (Extended) para la web estática.
- **Modulariad**: Mantener el `baseof.html` lo más limpio posible. Usar `partials/` para componentes repetibles.
- **CSS**: No usar frameworks externos (Tailwind, Bootstrap) a menos que el usuario lo pida. Usar el sistema de variables definido en `assets/css/main.css`.
- **Nombres**: Usar nombres descriptivos en español para el contenido (`blog/nombre-del-post.md`) y en inglés para la arquitectura técnica.

## 2. Seguridad Crítica
- **NUNCA** subir el archivo `.env` o la carpeta `private/` al repositorio.
- **SSH**: El acceso al VPS es exclusivamente mediante llave. No intentar reactivar contraseñas.
- **Proxy**: No modificar la configuración de Nginx sin verificar primero que el servicio interno (puerto 3001) responde.

## 3. Flujo de Trabajo
- **Deploy**: Cualquier cambio pusheado a la rama `main` se desplegará automáticamente vía GitHub Actions.
- **Contenido**: Los posts deben seguir el front-matter definido: `title`, `date`, `description`, `categories`, `image`.

## 4. Comunicación
- Mantener un tono profesional, directo y tecnológico. Solutech es una consultoría de élite para pymes, no una agencia de marketing genérica.
