function revealFadeElements() {
  const fadeElements = document.querySelectorAll(".fade-in");

  if (!fadeElements.length) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    fadeElements.forEach((element) => element.classList.add("show"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("show");
        currentObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  fadeElements.forEach((element) => observer.observe(element));
}

document.addEventListener("DOMContentLoaded", revealFadeElements);
