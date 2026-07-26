/**
 * Instant Blog Search Module
 * Filters blog articles in real-time by title, tags, and category.
 */
export function initBlogSearch() {
  const searchInput = document.getElementById("blog-search-input");
  const postCards = document.querySelectorAll(".b-card, .f-post-item, .blog-card-item");

  if (!searchInput || postCards.length === 0) return;

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();

    postCards.forEach(card => {
      const text = card.textContent.toLowerCase();
      if (query === "" || text.includes(query)) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  });
}
