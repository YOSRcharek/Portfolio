const overlayCertif = document.getElementById("overlayCertif");
const overlayCertifImg = overlayCertif.querySelector(".overlay-certif-img");
const closeCertif = overlayCertif.querySelector(".close-certif");

// Sélection de tous les liens de certificats
const certifLinks = document.querySelectorAll(".blog-post-item a");

certifLinks.forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault(); // 🔒 Bloque le saut #href
    const img = this.querySelector("img");
    overlayCertif.style.display = "flex";  // Affiche l'overlay
    overlayCertifImg.src = img.src;        // Remplace l'image
    overlayCertifImg.alt = img.alt;
  });
});

// Fermer overlay avec la croix
closeCertif.addEventListener("click", () => {
  overlayCertif.style.display = "none";
});

// Fermer overlay en cliquant sur le fond
overlayCertif.addEventListener("click", e => {
  if(e.target === overlayCertif) {
    overlayCertif.style.display = "none";
  }
});
