// 🌸 PAGE TRANSITIONS
function navigateTo(url) {
  const content = document.getElementById("page-content");

  // fallback if no container
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

        if (!newContent) {
          window.location.href = url;
          return;
        }

        content.innerHTML = newContent.innerHTML;

        // reset animation classes
        content.classList.remove("page-exit-active");
        content.classList.add("page-enter");

        setTimeout(() => {
          content.classList.add("page-enter-active");
        }, 10);

        // re-bind events after page load
        attachEvents();
        interceptLinks();
      });
  }, 400);
}

// 🔗 INTERCEPT LINKS
function interceptLinks() {
  document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", function (e) {
      const sameSite = this.hostname === window.location.hostname;

      if (sameSite) {
        e.preventDefault();
        navigateTo(this.href);
      }
    });
  });
}

function attachEvents() {
  const button = document.getElementById("cta-button");

  if (button && !button.dataset.bound) {
    button.dataset.bound = "true";

    button.addEventListener("click", function () {
      window.location.href = "portfolio.html";
    });
  }
}

// 🚀 INIT
document.addEventListener("DOMContentLoaded", () => {
  interceptLinks();
  attachEvents();
});
