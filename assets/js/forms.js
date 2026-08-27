document.addEventListener("DOMContentLoaded", function() {
  const pageLoadTime = Date.now();
  const forms = document.querySelectorAll(".cta-form");
  
  forms.forEach(form => {
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      
      const type = form.getAttribute("data-type") || "lead";
      const btn = form.querySelector('button[type="submit"]');
      const status = form.querySelector(".form-status") || form.nextElementSibling;
      const action = form.getAttribute("action");
      const method = form.getAttribute("method") || "POST";
      
      if (!btn || !status) return;

      const originalBtnText = btn.innerHTML;
      btn.innerHTML = "Enviando... <svg class='spin' width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' style='animation: spin 1s linear infinite;'><path d='M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83'/></svg>";
      btn.style.opacity = "0.7";
      btn.disabled = true;
      status.style.display = "none";

      const data = new FormData(form);
      data.append("form_source", "website-form");
      data.append("security_token", "solutech-leads-v1-secure-token");

      const timeSpent = Date.now() - pageLoadTime;

      // 1. Honeypots anti-spam (website / fax_number / website_url)
      const honeypotVal = (data.get("website") || data.get("website_url") || data.get("fax_number") || "").toString().trim();
      
      const nombre = (data.get("nombre") || "").toString().trim().toLowerCase();
      const empresa = (data.get("empresa") || "").toString().trim().toLowerCase();
      const telefonoRaw = (data.get("telefono") || "").toString().trim();
      const telefonoDigits = telefonoRaw.replace(/\D/g, "");

      // 2. Patrón de bot: coincidencia exacta nombre igual a empresa
      const isDuplicatePattern = nombre.length > 0 && empresa.length > 0 && nombre === empresa;

      // 3. Ban por teléfonos raros: números de menos de 8 dígitos, más de 15, letras en el teléfono, o repeticiones falsas (ej. 11111111, 00000000)
      const isWeirdPhone = telefonoRaw.length > 0 && (
        telefonoDigits.length < 8 || 
        telefonoDigits.length > 15 || 
        /^(\d)\1+$/.test(telefonoDigits) || 
        /[a-zA-Z]/.test(telefonoRaw)
      );

      // 4. Control de velocidad: rellenar en menos de 2.5 segundos es comportamiento de bot
      const isTooFast = timeSpent < 2500;

      if (honeypotVal !== "" || isDuplicatePattern || isWeirdPhone || isTooFast) {
        // Simulamos respuesta exitosa para el bot sin realizar llamada a n8n
        setTimeout(() => {
          status.className = "form-status form-status-success";
          status.innerHTML = "✓ Solicitud enviada correctamente.<br>He recibido tu información. En menos de 24h me pondré en contacto contigo.";
          status.style.display = "block";
          form.reset();
          btn.innerHTML = originalBtnText;
          btn.style.opacity = "1";
          btn.disabled = false;
          btn.style.display = "none";
        }, 600);
        return;
      }

      fetch(action, {
        method: method,
        body: data,
        headers: {
          "Accept": "application/json"
        }
      }).then(response => {
        if (response.ok) {
          status.className = "form-status form-status-success";
          if (type === "support") {
            status.innerHTML = "✓ Incidencia registrada correctamente.<br>He recibido los detalles del problema. Nos pondremos en contacto contigo de inmediato.";
          } else {
            status.innerHTML = "✓ Solicitud enviada correctamente.<br>He recibido tu información. En menos de 24h me pondré en contacto contigo.";
          }
          status.style.display = "block";
          form.reset();
          btn.innerHTML = originalBtnText;
          btn.style.opacity = "1";
          btn.disabled = false;
          btn.style.display = "none"; // Hide button after success
        } else {
          status.className = "form-status form-status-error";
          response.json().then(resData => {
            if (resData && Object.hasOwn(resData, "errors")) {
              status.innerHTML = "Error al enviar: Revisa los campos requeridos.";
            } else {
              status.innerHTML = "Hubo un problema al enviar el formulario.";
            }
            status.style.display = "block";
            btn.innerHTML = originalBtnText;
            btn.style.opacity = "1";
            btn.disabled = false;
          }).catch(() => {
            status.className = "form-status form-status-error";
            status.innerHTML = "Hubo un problema al enviar el formulario.";
            status.style.display = "block";
            btn.innerHTML = originalBtnText;
            btn.style.opacity = "1";
            btn.disabled = false;
          });
        }
      }).catch(() => {
        status.className = "form-status form-status-error";
        status.innerHTML = "Hubo un error de conexión. Inténtalo de nuevo.";
        status.style.display = "block";
        btn.innerHTML = originalBtnText;
        btn.style.opacity = "1";
        btn.disabled = false;
      });
    });
  });
});
