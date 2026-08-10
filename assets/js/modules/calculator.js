/**
 * Calculator Module — Solutech MSP Plans
 * Selects the exact official plan based on number of endpoints and coverage tier.
 */
export function initCalculator() {
  const endpointsInput = document.getElementById("input-endpoints");
  const valEndpoints = document.getElementById("val-endpoints");
  const priceDisplay = document.getElementById("calc-total-price");
  const planNameDisplay = document.getElementById("calc-plan-name");
  const benefitsList = document.getElementById("calc-benefits-list");
  const slaCards = document.querySelectorAll(".sla-card");
  const levelGroup = document.getElementById("calc-level-group");

  if (!endpointsInput || !priceDisplay || !planNameDisplay) return;

  let currentTier = "essential";

  const PLANS = {
    s_essential: {
      name: "S Essential",
      price: 99,
      benefits: [
        "Soporte remoto ilimitado (SLA 48h)",
        "Parches y actualizaciones gestionadas",
        "Seguridad básica de endpoints",
        "Backup verificado incluido",
        "1 visita preventiva al trimestre"
      ]
    },
    s_pro: {
      name: "S Pro",
      price: 149,
      benefits: [
        "Monitorización activa 24/7 (SLA 24h)",
        "Ciberseguridad y backup ampliados",
        "Gestión de red y WiFi corporativa",
        "Inventario y documentación IT",
        "1 visita preventiva al mes"
      ]
    },
    m_basic: {
      name: "M Basic",
      price: 199,
      benefits: [
        "Seguridad y backup totalmente gestionados",
        "SLA de respuesta < 24h laborables",
        "Documentación e inventario completos",
        "Automatizaciones IT básicas",
        "2 visitas preventivas al mes"
      ]
    },
    m_pro: {
      name: "M Pro",
      price: 299,
      benefits: [
        "SLA prioritario < 8h laborables",
        "Seguridad y backup nivel avanzado",
        "Informe ejecutivo mensual",
        "Roadmap y reunión tecnológica",
        "2 visitas preventivas al mes"
      ]
    }
  };

  function updateCalculator() {
    const endpoints = parseInt(endpointsInput.value, 10) || 1;
    valEndpoints.textContent = String(endpoints);

    let selectedPlan;
    const isGamaS = endpoints <= 5;

    // Show/hide the level selector — only relevant for Gama S
    if (levelGroup) {
      levelGroup.style.display = isGamaS ? "" : "none";
    }

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
        .map(b => `<li>✓ ${b}</li>`)
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
