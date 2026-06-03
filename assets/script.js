let lang = "es";

function toggleLang() {
  lang = lang === "es" ? "en" : "es";

  document.querySelectorAll("[data-es]").forEach(el => {
    el.innerText = el.getAttribute("data-" + lang);
  });
}

document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    card.style.transform = `
      rotateX(${y * -6}deg)
      rotateY(${x * 6}deg)
      scale(1.02)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
  });
});