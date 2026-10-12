const carouselModal = document.getElementById("carouselModal");
const videoModal = document.getElementById("videoModal");
const youtubeFrame = document.getElementById("youtubeVideo");

document.querySelectorAll(".project-item-icon-box").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const modalId = btn.getAttribute("data-modal");

    if(modalId === "carouselModal") {
      carouselModal.style.display = "flex";
    }

    if(modalId === "videoModal") {
      const videoUrl = btn.getAttribute("data-video");
      youtubeFrame.src = videoUrl;
      videoModal.style.display = "flex";
    }
  });
});

// Fermeture carousel
carouselModal.querySelector(".close-btn").addEventListener("click", () => {
  carouselModal.style.display = "none";
});

// Fermeture vidéo
videoModal.querySelector(".close-btn2").addEventListener("click", () => {
  videoModal.style.display = "none";
  youtubeFrame.src = ""; // stop video
});

// Fermeture si clic en dehors
window.addEventListener("click", (e) => {
  if(e.target === carouselModal) carouselModal.style.display = "none";
  if(e.target === videoModal) {
    videoModal.style.display = "none";
    youtubeFrame.src = "";
  }
});
