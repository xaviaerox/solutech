import { initNavigation } from "./modules/nav.js";
import { initCookieConsent } from "./modules/cookies.js";
import { initScrollEffects } from "./modules/scroll.js";
import { initCalculator } from "./modules/calculator.js";
import { initBlogSearch } from "./modules/search.js";

document.addEventListener("DOMContentLoaded", function() {
  // Initialize modular sub-systems
  initNavigation();
  initCookieConsent();
  initScrollEffects();
  initCalculator();
  initBlogSearch();
});
