/**
 * Calculator Module — Solutech Official MSP Matrix V1
 * Calculates official flat-rate plans: S Essential (99€), S Pro (149€), M Basic (199€), M Pro (299€).
 */
export function initCalculator() {
  const endpointsInput = document.getElementById("input-endpoints");
  const valEndpoints = document.getElementById("val-endpoints");
  const priceDisplay = document.getElementById("calc-total-price");
  const planNameDisplay = document.getElementById("calc-plan-name");
  const benefitsList = document.getElementById("calc-benefits-list");
  const slaCards = document.querySelectorAll(".sla-card");

  if (!endpointsInput || !priceDisplay || !planNameDisplay) return;

  let currentTier = "essential";

  const PLANS = {
    s_essential: {
      name: "S Essential",
      price: 99,
      benefits: [
        "✓ 1 a 5 equipos informáticos cubiertos",
        "✓ Soporte remoto & atención de incidencias (SLA 48h)",
        "✓ Parches de seguridad y mantenimiento básico",
        "✓ 1 Visita preventiva programada / trimestre"
      ]
    },
    s_pro: {
      name: "S Pro",
      price: 149,
      benefits: [
        "✓ 1 a 5 equipos informáticos cubiertos",
        "✓ Monitorización activa 24/7 & Ciberseguridad ampliada",
        "✓ SLA de primera respuesta < 24h laborables",
        "✓ 1 Visita preventiva programada / mes"
      ]
    },
    m_basic: {
      name: "M Basic",
      price: 199,
      benefits: [
        "✓ 6 a 10 equipos informáticos cubiertos",
        "✓ Ciberseguridad & Backup Gestionados",
        "✓ Documentación IT & Inventario completo",
        "✓ 2 Visitas preventivas programadas / mes"
      ]
    },
    m_pro: {
      name: "M Pro",
      price: 299,
      benefits: [
        "✓ 11 a 15 equipos informáticos cubiertos",
        "✓ SLA prioritario < 8h laborables",
        "✓ Ciberseguridad & Backup nivel avanzado",
        "✓ Informe mensual + 2 Visitas preventivas / mes"
      ]
    }
  };

  function updateCalculator() {
    const endpoints = parseInt(endpointsInput.value, 10) || 1;
    valEndpoints.textContent = String(endpoints);

    let selectedPlan = PLANS.s_essential;

    if (endpoints <= 5) {
      selectedPlan = currentTier === "pro" ? PLANS.s_pro : PLANS.s_essential;
    } else if (endpoints <= 10) {
      selectedPlan = PLANS.m_basic;
    } else {
      selectedPlan = PLANS.m_pro;
    }

    planNameDisplay.textContent = selectedPlan.name;
    priceDisplay.textContent = String(selectedPlan.price);

    if (benefitsList) {
      benefitsList.innerHTML = selectedPlan.benefits
        .map(b => `<li>${b}</li>`)
        .join("");
    }
  }

  endpointsInput.addEventListener("input", updateCalculator);

  slaCards.forEach(card => {
    card.addEventListener("click", () => {
      slaCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      currentTier = card.dataset.tier || "essential";
      const radio = card.querySelector("input[type='radio']");
      if (radio) radio.checked = true;
      updateCalculator();
    });
  });

  // Initial render
  updateCalculator();
}
