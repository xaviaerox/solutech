---
title: "Portal de Soporte y Cliente"
date: 2026-05-29
draft: false
---

# Portal de Cliente Solutech

Bienvenido al área de soporte técnico de Solutech. Estamos aquí para garantizar que tu negocio no se detenga.

## ¿Tienes una incidencia?

Para que podamos ayudarte lo más rápido posible, por favor elige el canal adecuado:

### 1. Sistema de Tickets (Recomendado)
Envía un correo electrónico a **soporte@solutech.ejemplo**.
Automáticamente se generará un ticket en nuestro sistema y Xavi lo recibirá de inmediato.

*Por favor, incluye:*
- Descripción clara del problema.
- Si afecta a una persona o a toda la oficina.
- Cualquier mensaje de error o captura de pantalla.

### 2. Formulario Web
También puedes abrir una incidencia directamente rellenando este formulario:

<form action="https://n8n.solutech.blog/webhook/leads" method="POST">
  <label for="nombre">Nombre / Empresa:</label><br>
  <input type="text" id="nombre" name="nombre" required><br><br>
  <label for="email">Tu Email:</label><br>
  <input type="email" id="email" name="email" required><br><br>
  <label for="descripcion">Descripción del Problema:</label><br>
  <textarea id="descripcion" name="descripcion" rows="4" required></textarea><br><br>
  <input type="submit" value="Abrir Ticket">
</form>

*Nota técnica: Este formulario conecta de forma segura mediante nuestra infraestructura automatizada para generar tu ticket en tiempo real.*

---

<h2 id="reservas">Agenda una Llamada</h2>

Selecciona el día y la hora que mejor se adapte a tu disponibilidad para que podamos analizar tu infraestructura o resolver tus dudas en directo.

<!-- Cal inline embed code begins -->
<div style="width:100%;height:600px;overflow:scroll; margin-top: 30px; border-radius: 8px;" id="my-cal-inline"></div>
<script type="text/javascript">
  (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.cal = C.cal || function () { let cal = C.cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; typeof namespace === "string" ? (cal.ns[namespace] = cal.ns[namespace] || api) : p(cal, ar); return; } p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
Cal("init", {origin:"https://cal.com"});

  Cal("inline", {
    elementOrSelector:"#my-cal-inline",
    calLink: "francisco-javier-alonso-fondon-gjztl4", // Muestra todos los eventos (15min y 30min)
    layout: "month_view"
  });

  Cal("ui", {"styles":{"branding":{"brandColor":"#f87116"}},"hideEventTypeDetails":false,"layout":"month_view"});
</script>
<!-- Cal inline embed code ends -->

---

## Preguntas Frecuentes (FAQ)

**¿Cuál es el horario de soporte?**
Nuestro horario de atención habitual es de Lunes a Viernes de 09:00 a 18:00. Las alertas críticas monitorizadas por nuestros agentes (Tactical RMM) son atendidas en base a tu nivel de SLA contratado.

**¿Qué hago si hay una caída total de mi servidor o red?**
Si tu plan de servicio incluye soporte para incidencias críticas (P1), por favor utiliza el teléfono de contacto de emergencias que se te proporcionó durante el onboarding.

**¿Dónde consulto mis facturas o contratos?**
Todo tu historial documental está almacenado de forma segura en nuestro gestor interno. Solicita el acceso a tu carpeta compartida enviando un ticket.
