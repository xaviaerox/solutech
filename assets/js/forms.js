document.addEventListener("DOMContentLoaded", function() {
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

      // Honeypot anti-spam: si el campo oculto tiene valor, es un bot
      if (data.get("website_url") && data.get("website_url").trim() !== "") {
        // Simulamos éxito sin hacer la llamada real
        setTimeout(() => {
          status.innerHTML = "<strong style='color: #4ade80;'>✓ Solicitud enviada correctamente.</strong><br>He recibido tu información. En menos de 24h me pondré en contacto contigo.";
          status.style.display = "block";
          form.reset();
          btn.innerHTML = originalBtnText;
          btn.style.opacity = "1";
          btn.disabled = false;
          btn.style.display = "none";
        }, 800);
        return;
      }

      fetch(action, {
        method: method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          if (type === "support") {
            status.innerHTML = "<strong style='color: #4ade80;'>✓ Incidencia registrada correctamente.</strong><br>He recibido los detalles del problema. Nos pondremos en contacto contigo de inmediato.";
          } else {
            status.innerHTML = "<strong style='color: #4ade80;'>✓ Solicitud enviada correctamente.</strong><br>He recibido tu información. En menos de 24h me pondré en contacto contigo.";
          }
          status.style.display = "block";
          form.reset();
          btn.innerHTML = originalBtnText;
          btn.style.opacity = "1";
          btn.disabled = false;
          btn.style.display = "none"; // Hide button after success
        } else {
          response.json().then(data => {
            if (data && Object.hasOwn(data, 'errors')) {
              status.innerHTML = "<span style='color: #f87116;'>Error al enviar: Revisa los campos requeridos.</span>";
            } else {
              status.innerHTML = "<span style='color: #f87116;'>Hubo un problema al enviar el formulario.</span>";
            }
            status.style.display = "block";
            btn.innerHTML = originalBtnText;
            btn.style.opacity = "1";
            btn.disabled = false;
          }).catch(() => {
            status.innerHTML = "<span style='color: #f87116;'>Hubo un problema al enviar el formulario.</span>";
            status.style.display = "block";
            btn.innerHTML = originalBtnText;
            btn.style.opacity = "1";
            btn.disabled = false;
          });
        }
      }).catch(error => {
        status.innerHTML = "<span style='color: #f87116;'>Hubo un error de conexión. Inténtalo de nuevo.</span>";
        status.style.display = "block";
        btn.innerHTML = originalBtnText;
        btn.style.opacity = "1";
        btn.disabled = false;
      });
    });
  });
});
