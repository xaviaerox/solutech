/**
 * Cookie Consent Module
 * Handles GDPR Consent Banner, Google Analytics Consent Mode v2 updates, and revocation.
 */
export function initCookieConsent() {
  const banner = document.getElementById("cookie-banner");
  const btnAccept = document.getElementById("btn-accept-cookies");
  const btnReject = document.getElementById("btn-reject-cookies");
  const btnManage = document.getElementById("btn-manage-cookies");

  function loadAnalyticsScript() {
    if (!document.getElementById("gtag-script") && window.solutechGaId) {
      const script = document.createElement("script");
      script.id = "gtag-script";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${window.solutechGaId}`;
      document.head.appendChild(script);
    }
  }

  if (banner && btnAccept && btnReject) {
    const currentConsent = localStorage.getItem("solutech_cookie_consent");

    if (!currentConsent) {
      banner.style.display = "block";
    } else if (currentConsent === "granted") {
      loadAnalyticsScript();
    }

    btnAccept.addEventListener("click", function() {
      localStorage.setItem("solutech_cookie_consent", "granted");
      banner.style.display = "none";
      if (typeof window.gtag === "function") {
        window.gtag("consent", "update", {
          "analytics_storage": "granted",
          "ad_storage": "granted",
          "ad_user_data": "granted",
          "ad_personalization": "granted"
        });
      }
      loadAnalyticsScript();
    });

    btnReject.addEventListener("click", function() {
      localStorage.setItem("solutech_cookie_consent", "denied");
      banner.style.display = "none";
      if (typeof window.gtag === "function") {
        window.gtag("consent", "update", {
          "analytics_storage": "denied",
          "ad_storage": "denied",
          "ad_user_data": "denied",
          "ad_personalization": "denied"
        });
      }
    });

    if (btnManage) {
      btnManage.addEventListener("click", function(e) {
        e.preventDefault();
        banner.style.display = "block";
        banner.scrollIntoView({ behavior: "smooth", block: "end" });
      });
    }
  }
}
