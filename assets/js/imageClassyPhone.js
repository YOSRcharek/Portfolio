// ----- Images ClassyPhone -----
const myImagesClassyPhone = [];
for (let i = 1; i <= 6; i++) {
  myImagesClassyPhone.push(`./assets/images/classyMobile${i}.png`);
}

// ----- Fonction générique initCarousel -----
function initCarousel(modalId, ringClass, imgClass, imagesArray) {
  let xPos = 0;

  // Création des div.img si nécessaire
  const ring = document.querySelector(`.${ringClass}`);
  ring.innerHTML = "";
  imagesArray.forEach((src, i) => {
    const imgDiv = document.createElement("div");
    imgDiv.classList.add(imgClass);
    imgDiv.style.backgroundImage = `url(${src})`;
    imgDiv.style.transform = `rotateY(${i * (360 / imagesArray.length)}deg) translateZ(500px)`;
    ring.appendChild(imgDiv);
  });

  // Animation GSAP
  gsap.timeline()
    .set(`.${ringClass}`, { rotationY: 180, cursor: 'grab' })
    .set(`.${imgClass}`, {
      rotateY: (i) => i * -360 / imagesArray.length,
      transformOrigin: '50% 50% 200px',
      z: -200,
      backfaceVisibility: 'hidden'
    })
    .from(`.${imgClass}`, {
      duration: 1.5,
      y: 100,
      opacity: 0,
      stagger: 0.1,
      ease: 'expo'
    })
    .add(() => {
      $(`.${imgClass}`).on('mouseenter', (e) => {
        let current = e.currentTarget;
        gsap.to(`.${imgClass}`, { opacity: (i, t) => (t == current ? 1 : 0.5), ease: 'power3' });
      });
      $(`.${imgClass}`).on('mouseleave', () => {
        gsap.to(`.${imgClass}`, { opacity: 1, ease: 'power2.inOut' });
      });
    }, '-=0.5');

  // Drag rotation
  function dragStart(e) {
    if (e.touches) e.clientX = e.touches[0].clientX;
    xPos = Math.round(e.clientX);
    gsap.set(`.${ringClass}`, { cursor: 'grabbing' });
    $(window).on('mousemove touchmove', drag);
  }

  function drag(e) {
    if (e.touches) e.clientX = e.touches[0].clientX;
    gsap.to(`.${ringClass}`, {
      rotationY: '-=' + ((Math.round(e.clientX) - xPos) % 360),
      onUpdate: () => { gsap.set(`.${imgClass}`, { backgroundPosition: (i) => getBgPos(i) }); }
    });
    xPos = Math.round(e.clientX);
  }

  function dragEnd() {
    $(window).off('mousemove touchmove', drag);
    gsap.set(`.${ringClass}`, { cursor: 'grab' });
  }

  function getBgPos(i) {
    return (
      100 - gsap.utils.wrap(
        0,
        360,
        gsap.getProperty(`.${ringClass}`, 'rotationY') - 180 - (i * 360 / imagesArray.length)
      ) / 360 * 300
    ) + 'px 0px';
  }

  $(window).on('mousedown touchstart', dragStart);
  $(window).on('mouseup touchend', dragEnd);

  // Modal open/close
  const modal = document.getElementById(modalId);
  const openBtn = document.querySelector(`.project-item-icon-box[data-modal="${modalId}"]`);
  const closeBtn = modal.querySelector(`.close-btnClassyPhone`);

  openBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "block";
  });

  closeBtn.addEventListener("click", () => { modal.style.display = "none"; });
  window.addEventListener("click", (e) => { if(e.target === modal) modal.style.display = "none"; });


   // ---- Plein écran au clic ----
$(`#${modalId} .img`).on("click", function () {
  const bg = $(this).css("background-image");
  if (!bg || bg === "none") return; // sécurité

  const url = bg.slice(5, -2); // extrait l’URL de background-image

  const fullscreenModal = document.getElementById("imageFullscreenModal");
  const fullscreenImg = document.getElementById("fullscreenImage");

  fullscreenImg.src = url; // injecte l’image cliquée
  fullscreenModal.style.display = "flex";
});

// ---- Fermer le fullscreen ----
const closeFull = document.querySelector(".close-fullscreen");
closeFull.addEventListener("click", () => {
  const fullscreenModal = document.getElementById("imageFullscreenModal");
  const fullscreenImg = document.getElementById("fullscreenImage");

  fullscreenImg.src = ""; // 🔑 reset pour que ce soit null après fermeture
  fullscreenModal.style.display = "none";
});

}

// ----- Initialisation ClassyPhone -----
initCarousel("carouselModalClassyPhone", "ring-ClassyPhone", "img-ClassyPhone", myImagesClassyPhone);
