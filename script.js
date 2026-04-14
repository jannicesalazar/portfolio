// 🌸 PAGE TRANSITIONS
function navigateTo(url) {
  const content = document.getElementById("page-content");

  if (!content) {
    window.location.href = url;
    return;
  }

  // exit animation
  content.classList.add("page-exit-active");

  setTimeout(() => {
    fetch(url)
      .then(res => res.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const newContent = doc.querySelector("#page-content");

        content.innerHTML = newContent.innerHTML;

        // enter animation
        content.classList.remove("page-exit-active");
        content.classList.add("page-enter");

        setTimeout(() => {
          content.classList.add("page-enter-active");
        }, 10);

        // re-bind button after page load
        attachEvents();
      });
  }, 400);
}

// 🔗 INTERCEPT LINKS
function interceptLinks() {
  document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", function(e) {
      if (this.hostname === window.location.hostname) {
        e.preventDefault();
        navigateTo(this.href);
      }
    });
  });
}

// 🎯 BUTTON ACTION
function attachEvents() {
  const button = document.getElementById("cta-button");

  if (button) {
    button.addEventListener("click", function() {
      navigateTo("portfolio.html");
    });
  }
}

// 🚀 INIT
document.addEventListener("DOMContentLoaded", () => {
  interceptLinks();
  attachEvents();
});