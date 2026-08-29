---
title: "Implementación de MFA Obligatorio en Servidores SSH: Guía de Hardening con Google Authenticator y FIDO2"
date: 2024-07-30T00:00:00+02:00
slug: "implementar-mfa-obligatorio-servidor-ssh"
description: "Tutorial técnico paso a paso para configurar autenticación de doble factor obligatoria en OpenSSH mediante PAM, protegiendo accesos root contra ataques de fuerza bruta."
categories: ["Ciberseguridad", "Servidores Linux"]
keywords: ["MFA obligatorio en servidor SSH", "seguridad SSH Pymes", "autenticación multifactor Linux", "proteger acceso remoto", "ciberseguridad servidores", "PAM Google Authenticator"]
image: "images/blog-implementar-mfa-obligatorio-servidor-ssh.jpg"
aliases:
  - /blog/implementar-mfa-obligatorio-servidor-ssh
draft: false
---
## Introducción
La seguridad de los servidores es una prioridad innegociable para cualquier Pyme. El acceso SSH, siendo la puerta de entrada principal para la administración remota, es un objetivo constante para ataques de fuerza bruta y robo de credenciales.

Esta guía detalla cómo configurar la autenticación multifactor (MFA) de forma obligatoria en tus servidores SSH. Al finalizar, habrás añadido una capa de seguridad importante, protegiendo tus sistemas contra accesos no autorizados y alineándote con las mejores prácticas de ciberseguridad preventiva.

## Requisitos previos
Para seguir este tutorial necesitarás:
- [ ] Un servidor Linux (Ubuntu/Debian o CentOS/RHEL) con acceso SSH (preferiblemente con un usuario con privilegios `sudo`).
- [ ] Un dispositivo móvil (smartphone o tablet) con una aplicación de autenticación TOTP (Time-based One-Time Password) instalada, como Google Authenticator o Authy.
- [ ] Conocimientos básicos de administración de sistemas Linux y edición de archivos de configuración.

## Paso 1: Instalar el módulo PAM de Google Authenticator
El primer paso es instalar el módulo Pluggable Authentication Module (PAM) que permite integrar Google Authenticator con el sistema de autenticación de Linux.

Para sistemas basados en Debian/Ubuntu:
```bash
sudo apt update
sudo apt install libpam-google-authenticator
```

Para sistemas basados en CentOS/RHEL:
```bash
sudo yum install google-authenticator
```
Este módulo será el puente entre tu servidor SSH y la aplicación de MFA en tu dispositivo móvil.

## Paso 2: Configurar Google Authenticator para un usuario
Ahora, cada usuario que necesite MFA deberá ejecutar el comando `google-authenticator` en su sesión SSH.

Conéctate al servidor con el usuario que deseas proteger y ejecuta:
```bash
google-authenticator
```
El sistema te hará varias preguntas:
-   **`Do you want authentication tokens to be time-based (y/n)`**: Responde `y` para usar tokens basados en tiempo (TOTP), que son el estándar.
-   A continuación, se mostrará un código QR y una serie de códigos de emergencia. **Escanea el QR con tu aplicación TOTP** y **guarda los códigos de emergencia en un lugar seguro** (como una bóveda corporativa de credenciales).
-   **`Do you want to update the "~/.google_authenticator" file (y/n)`**: Responde `y`.
-   **`Do you want to disallow multiple uses of the same authentication token (y/n)`**: Responde `y` para mayor seguridad.
-   **`Do you want to enable time-based throttling (y/n)`**: Responde `y` para limitar intentos fallidos y prevenir ataques de fuerza bruta.

Repite este proceso para cada usuario que deba acceder al servidor vía SSH con MFA.

## Paso 3: Integrar PAM con SSH
Para que SSH utilice el módulo de Google Authenticator, debemos modificar dos archivos de configuración.

Primero, edita el archivo de configuración de PAM para SSH:
```bash
sudo nano /etc/pam.d/sshd
```
Añade la siguiente línea al final del archivo:
```
auth required pam_google_authenticator.so
```
Guarda y cierra el archivo.

Segundo, edita el archivo de configuración del demonio SSH:
```bash
sudo nano /etc/ssh/sshd_config
```
Localiza o añade las siguientes líneas, asegurándote de que estén descomentadas:
```
ChallengeResponseAuthentication yes
AuthenticationMethods publickey,keyboard-interactive
```
Si usas autenticación por contraseña, puedes usar `password,keyboard-interactive`. La clave es `keyboard-interactive`, que permite la entrada del código TOTP.

Reinicia el servicio SSH para aplicar los cambios:
```bash
sudo systemctl restart sshd
```

## Paso 4: Probar la configuración
Desconéctate de tu sesión SSH actual y vuelve a intentar conectarte al servidor con el usuario configurado.

```bash
ssh tu_usuario@tu_servidor.com
```
Después de introducir tu contraseña (si usas autenticación por contraseña) o si usas clave SSH, se te pedirá el "Verification code". Introduce el código de 6 dígitos que muestra tu aplicación TOTP.

Si la conexión es exitosa, ¡has configurado MFA correctamente!

## Errores comunes y cómo solucionarlos
### 1. `Permission denied (keyboard-interactive)` o no se solicita el código
*   **Causa:** El servidor SSH no está configurado para solicitar la interacción del teclado o el orden de los métodos de autenticación es incorrecto.
*   **Solución:** Revisa el archivo `/etc/ssh/sshd_config`. Asegúrate de que `ChallengeResponseAuthentication yes` esté activo y que `AuthenticationMethods` incluya `keyboard-interactive` en el orden correcto (ej. `publickey,keyboard-interactive` o `password,keyboard-interactive`).

### 2. `Failed to load PAM module`
*   **Causa:** El módulo `pam_google_authenticator.so` no se instaló correctamente o la ruta en `/etc/pam.d/sshd` es incorrecta.
*   **Solución:** Verifica la instalación del paquete (`libpam-google-authenticator` o `google-authenticator`) y asegúrate de que la línea `auth required pam_google_authenticator.so` esté escrita correctamente en el archivo PAM.

### 3. El código TOTP no funciona
*   **Causa:** La hora del servidor no está sincronizada con la hora de tu dispositivo móvil. Los códigos TOTP son sensibles al tiempo.
*   **Solución:** Asegúrate de que el servidor tenga la hora correcta configurada (ej. usando `ntpdate` o `timedatectl set-ntp true`). También verifica que la hora de tu dispositivo móvil sea precisa.

## Buenas prácticas de mantenimiento
-   **Códigos de recuperación:** Guarda los códigos de emergencia generados por `google-authenticator` en un lugar muy seguro, preferiblemente en una bóveda corporativa de credenciales. Son tu única forma de acceso si pierdes tu dispositivo MFA.
-   **Sincronización de tiempo:** Mantén la hora de tu servidor sincronizada con un servidor NTP (Network Time Protocol) para evitar problemas con los códigos TOTP.
-   **Acceso de emergencia:** Considera mantener un usuario de respaldo con acceso solo por clave SSH (sin MFA) para situaciones de emergencia. Este usuario debe tener permisos muy restringidos y su acceso debe estar limitado por IP a una red de administración segura.
-   **Auditoría de logs:** Revisa regularmente los logs de autenticación de SSH (`/var/log/auth.log` en Debian/Ubuntu o `/var/log/secure` en CentOS/RHEL) para detectar intentos de acceso no autorizados.

## Conclusión
Implementar la autenticación multifactor obligatoria en tus servidores SSH es una medida de seguridad fundamental que eleva significativamente la protección de tu infraestructura. Al seguir esta guía, habrás reforzado tus accesos remotos, disminuyendo considerablemente el riesgo de intrusiones por credenciales comprometidas.

Esta es una inversión mínima con un retorno sustancial en tranquilidad y seguridad para tu Pyme.

## FAQ
### ¿Qué es MFA y por qué es crucial para SSH?
MFA (Autenticación Multifactor) requiere dos o más métodos de verificación para acceder a un sistema. Es crucial para SSH porque añade una capa de seguridad más allá de la contraseña o clave, protegiendo contra el robo de credenciales y ataques de fuerza bruta.

### ¿Qué sucede si pierdo mi dispositivo MFA?
Si pierdes tu dispositivo MFA, puedes usar uno de los códigos de recuperación que generaste durante la configuración inicial. Es vital guardar estos códigos en un lugar seguro, como una bóveda corporativa de credenciales, y no en el mismo dispositivo.

### ¿Afecta esto a la automatización con claves SSH?
Sí, si tus scripts de automatización utilizan claves SSH para acceder al servidor, la configuración de MFA obligatoria requerirá una intervención manual para introducir el código TOTP. Para automatizaciones, se recomienda usar claves SSH sin contraseña y restringir el acceso por IP, o utilizar soluciones de automatización que gestionen credenciales de forma segura.