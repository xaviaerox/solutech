/**
 * Cookie Consent Module
 * Handles GDPR Consent Banner and Google Analytics Consent Mode v2 updates.
 */
export function initCookieConsent() {
  const banner = document.getElementById("cookie-banner");
  const btnAccept = document.getElementById("btn-accept-cookies");
  const btnReject = document.getElementById("btn-reject-cookies");

  if (banner && btnAccept && btnReject) {
    if (!localStorage.getItem("solutech_cookie_consent")) {
      banner.style.display = "block";
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
    });

    btnReject.addEventListener("click", function() {
      localStorage.setItem("solutech_cookie_consent", "denied");
      banner.style.display = "none";
    });
  }
}
