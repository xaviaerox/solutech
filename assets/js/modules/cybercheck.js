// CYBER-CHECK INTERACTIVE AUTODIAGNOSIS MODULE

export function initCyberCheck() {
  const sidebarLinks = document.querySelectorAll(".cc-nav-link");
  const sectionBlocks = document.querySelectorAll(".cc-section-block");
  const optionBtns = document.querySelectorAll(".cc-option-btn");
  const progressFill = document.getElementById("cc-progress-fill");
  const progressText = document.getElementById("cc-progress-text");
  const summaryCard = document.getElementById("cc-summary-card");
  const scoreBadge = document.getElementById("cc-score-badge");
  const riskTitle = document.getElementById("cc-risk-title");
  const riskDesc = document.getElementById("cc-risk-desc");
  const ctaBtn = document.querySelector(".cc-cta-btn");

  if (!sidebarLinks.length || !sectionBlocks.length) return;

  const totalQuestions = document.querySelectorAll(".cc-question-card").length;
  const userAnswers = {};
  let currentRiskLevel = "";
  let currentTotalPoints = 0;

  // Sidebar navigation switching
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const targetSection = link.getAttribute("data-target");

      sidebarLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      sectionBlocks.forEach((block) => {
        if (block.id === targetSection) {
          block.classList.add("active");
        } else {
          block.classList.remove("active");
        }
      });
    });
  });

  // Question option selection logic
  optionBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const qCard = btn.closest(".cc-question-card");
      const qId = qCard.getAttribute("data-question-id");
      const score = parseInt(btn.getAttribute("data-score"), 10);

      // Deselect sibling options
      qCard.querySelectorAll(".cc-option-btn").forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");

      userAnswers[qId] = score;

      updateProgressAndScore();

      // Check if all questions in the currently active section block are answered
      const activeSection = document.querySelector(".cc-section-block.active");
      if (activeSection) {
        const questionsInActiveSection = activeSection.querySelectorAll(".cc-question-card");
        const allAnswered = Array.from(questionsInActiveSection).every((q) => {
          const id = q.getAttribute("data-question-id");
          return userAnswers[id] !== undefined;
        });

        if (allAnswered) {
          const sectionBlocksArray = Array.from(sectionBlocks);
          const currentIndex = sectionBlocksArray.indexOf(activeSection);
          const nextSection = sectionBlocksArray[currentIndex + 1];

          if (nextSection) {
            setTimeout(() => {
              // Deactivate current section and links
              sectionBlocks.forEach((block) => block.classList.remove("active"));
              sidebarLinks.forEach((link) => link.classList.remove("active"));

              // Activate next section and corresponding link
              nextSection.classList.add("active");
              const nextLink = document.querySelector(`.cc-nav-link[data-target="${nextSection.id}"]`);
              if (nextLink) nextLink.classList.add("active");

              // Smoothly scroll to top of cybercheck main area
              const mainShell = document.querySelector(".cybercheck-main");
              if (mainShell) {
                mainShell.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }, 350);
          }
        }
      }
    });
  });

  function updateProgressAndScore() {
    const answeredCount = Object.keys(userAnswers).length;
    const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

    if (progressFill) progressFill.style.width = `${progressPercent}%`;
    if (progressText) progressText.textContent = `${answeredCount} / ${totalQuestions} evaluadas (${progressPercent}%)`;

    // When all questions answered, render summary
    if (answeredCount === totalQuestions && summaryCard) {
      let totalPoints = 0;
      Object.values(userAnswers).forEach((val) => {
        totalPoints += val;
      });
      currentTotalPoints = totalPoints;

      summaryCard.classList.add("active");

      if (totalPoints >= 12) {
        currentRiskLevel = "ALTO RIESGO";
        if (scoreBadge) {
          scoreBadge.className = "cc-score-badge crit";
          scoreBadge.textContent = "ALTO RIESGO";
        }
        if (riskTitle) riskTitle.textContent = "Nivel Crítico de Vulnerabilidad Operativa";
        if (riskDesc) riskDesc.textContent = "Su infraestructura carece de controles mínimos de acceso y respaldo inmutable. Existe un riesgo inminente de interrupción por ransomware o pérdida de datos.";
      } else if (totalPoints >= 6) {
        currentRiskLevel = "RIESGO MODERADO";
        if (scoreBadge) {
          scoreBadge.className = "cc-score-badge med";
          scoreBadge.textContent = "RIESGO MODERADO";
        }
        if (riskTitle) riskTitle.textContent = "Vulnerabilidades Parciales Detectadas";
        if (riskDesc) riskDesc.textContent = "Existen medidas básicas de seguridad pero carece de monitoreo proactivo 24/7 y verificación de restauración de backups.";
      } else {
        currentRiskLevel = "RIESGO BAJO";
        if (scoreBadge) {
          scoreBadge.className = "cc-score-badge low";
          scoreBadge.textContent = "BUEN NIVEL DE SEGURIDAD";
        }
        if (riskTitle) riskTitle.textContent = "Infraestructura Bien Protegida";
        if (riskDesc) riskDesc.textContent = "Su pyme cuenta con una postura sólida de ciberseguridad. Recomendamos auditorías periódicas para mantener el nivel.";
      }

      setTimeout(() => {
        summaryCard.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 350);
    }
  }

  // Pre-fill contact form when clicking on the mitigation report CTA
  if (ctaBtn) {
    ctaBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const msgInput = document.getElementById("mensaje-lead");
      const preocupacionInput = document.getElementById("preocupacion-lead");

      if (preocupacionInput && !preocupacionInput.value) {
        preocupacionInput.value = "seguridad";
      }

      if (msgInput && currentRiskLevel) {
        const diagPrefix = `[Autodiagnóstico Cyber-Check: ${currentRiskLevel} (${currentTotalPoints} pts)] `;
        if (!msgInput.value.includes(diagPrefix)) {
          msgInput.value = msgInput.value ? `${diagPrefix}\n${msgInput.value}` : diagPrefix;
        }
      }

      const contactSection = document.getElementById("contacto");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
        const firstInput = contactSection.querySelector("input:not([type='hidden']), textarea");
        if (firstInput) {
          setTimeout(() => firstInput.focus(), 600);
        }
      }
    });
  }
}
