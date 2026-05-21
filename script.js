window.addEventListener("pageshow", () => {
  document.body.classList.add("is-loaded");
  document.body.classList.remove("is-leaving");
});

document.querySelectorAll('a[href]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    const target = link.getAttribute("target");

    if (!href || href.startsWith("#") || target === "_blank") return;

    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin) return;

    event.preventDefault();
    document.body.classList.add("is-leaving");
    window.setTimeout(() => {
      window.location.href = url.href;
    }, 220);
  });
});

const cards = document.querySelectorAll(".feature-card, .character-card, .episode-card, .dash-panel");

cards.forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
    card.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});
