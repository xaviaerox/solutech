/**
 * Calculator Module
 * Real-time IT support quote estimator for Micro-MSP plans.
 */
export function initCalculator() {
  const endpointsInput = document.getElementById("input-endpoints");
  const serversInput = document.getElementById("input-servers");
  const valEndpoints = document.getElementById("val-endpoints");
  const valServers = document.getElementById("val-servers");
  const priceDisplay = document.getElementById("calc-total-price");
  const slaCards = document.querySelectorAll(".sla-card");

  if (!endpointsInput || !serversInput || !priceDisplay) return;

  const PRICE_PER_ENDPOINT = 20; // €/month per PC
  const PRICE_PER_SERVER = 60;   // €/month per Server
  const BASE_FEE = 45;           // €/month base management & EDR
  const CRITICAL_MULTIPLIER = 1.35; // 24/7 SLA multiplier

  let currentSla = "standard";

  function calculateTotal() {
    const endpoints = parseInt(endpointsInput.value, 10) || 0;
    const servers = parseInt(serversInput.value, 10) || 0;

    valEndpoints.textContent = String(endpoints);
    valServers.textContent = String(servers);

    let rawTotal = BASE_FEE + (endpoints * PRICE_PER_ENDPOINT) + (servers * PRICE_PER_SERVER);

    if (currentSla === "critical") {
      rawTotal *= CRITICAL_MULTIPLIER;
    }

    const finalTotal = Math.round(rawTotal);

    // Animate number change smoothly
    priceDisplay.textContent = String(finalTotal);
  }

  endpointsInput.addEventListener("input", calculateTotal);
  serversInput.addEventListener("input", calculateTotal);

  slaCards.forEach(card => {
    card.addEventListener("click", () => {
      slaCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      currentSla = card.dataset.sla || "standard";
      const radio = card.querySelector("input[type='radio']");
      if (radio) radio.checked = true;
      calculateTotal();
    });
  });

  // Initial calculation
  calculateTotal();
}
