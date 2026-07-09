---
title: "Portal de Soporte y Cliente"
description: "Portal de cliente y soporte técnico de Solutech. Acceso a asistencia remota con RustDesk, herramientas Quick Support y contacto para resolución de incidencias IT."
date: 2026-05-29
draft: false
---

# Portal de Cliente Solutech

Bienvenido al área de soporte técnico de Solutech. Estamos aquí para garantizar que tu negocio no se detenga.

## ¿Tienes una incidencia?

Para que podamos ayudarte lo más rápido posible, por favor elige el canal adecuado:

### 1. Sistema de Tickets (Recomendado)
Envía un correo electrónico a **soporte@solutech.blog**.
Automáticamente se generará un ticket en nuestro sistema y Xavi lo recibirá de inmediato.

*Por favor, incluye:*
- Descripción clara del problema.
- Si afecta a una persona o a toda la oficina.
- Cualquier mensaje de error o captura de pantalla.

### 2. Formulario Web
También puedes abrir una incidencia directamente rellenando este formulario:

<form id="solutech-support-form" action="https://n8n.solutech.blog/webhook/leads" method="POST" class="cta-form">
  <div class="form-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
    <div>
      <label for="nombre" style="font-family: var(--f-m); font-size: 11px; color: var(--ts); text-transform: uppercase; margin-bottom: 6px; display: block;">Nombre / Empresa:</label>
      <input type="text" id="nombre" name="nombre" placeholder="Tu nombre o empresa" required class="cta-input">
    </div>
    <div>
      <label for="email" style="font-family: var(--f-m); font-size: 11px; color: var(--ts); text-transform: uppercase; margin-bottom: 6px; display: block;">Tu Email:</label>
      <input type="email" id="email" name="email" placeholder="Tu correo electrónico" required class="cta-input">
    </div>
  </div>
  
  <div style="margin-bottom: 24px;">
    <label for="descripcion" style="font-family: var(--f-m); font-size: 11px; color: var(--ts); text-transform: uppercase; margin-bottom: 6px; display: block;">Descripción del Problema:</label>
    <textarea id="descripcion" name="descripcion" placeholder="Explica detalladamente la incidencia técnica..." rows="5" required class="cta-input cta-textarea"></textarea>
  </div>
  
  <button type="submit" class="cta-btn" id="support-submit-btn" style="width: 100%;">
    Abrir Ticket 
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
  </button>
  <div id="support-status" style="margin-top: 16px; font-size: 14px; text-align: center; display: none; font-family: var(--f-b);"></div>
</form>

<script>
  document.getElementById("solutech-support-form").addEventListener("submit", function(event) {
    event.preventDefault();
    var form = event.target;
    var btn = document.getElementById("support-submit-btn");
    var status = document.getElementById("support-status");
    
    btn.innerHTML = "Enviando... <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83'/></svg>";
    btn.style.opacity = "0.7";
    btn.disabled = true;

    var data = new FormData(form);
    fetch(form.action, {
      method: form.method,
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        status.innerHTML = "<strong style='color: #4ade80;'>✓ Incidencia registrada correctamente.</strong><br>He recibido los detalles del problema. Nos pondremos en contacto contigo de inmediato.";
        status.style.display = "block";
        form.reset();
        btn.innerHTML = "Abrir Ticket <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M5 12h14M12 5l7 7-7 7'/></svg>";
        btn.style.opacity = "1";
        btn.disabled = false;
        btn.style.display = "none";
      } else {
        status.innerHTML = "<span style='color: #f87116;'>Error al registrar la incidencia. Inténtalo de nuevo.</span>";
        status.style.display = "block";
        btn.innerHTML = "Abrir Ticket <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M5 12h14M12 5l7 7-7 7'/></svg>";
        btn.style.opacity = "1";
        btn.disabled = false;
      }
    }).catch(error => {
      status.innerHTML = "<span style='color: #f87116;'>Error de conexión. Inténtalo de nuevo.</span>";
      status.style.display = "block";
      btn.innerHTML = "Abrir Ticket <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M5 12h14M12 5l7 7-7 7'/></svg>";
      btn.style.opacity = "1";
      btn.disabled = false;
    });
  });
</script>

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
