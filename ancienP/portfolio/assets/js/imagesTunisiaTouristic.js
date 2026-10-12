// ----- Images TunisiaTouristic -----
const myImagesTn = [];
for (let i = 1; i <= 12; i++) {
  myImagesTn.push(`./assets/images/tunisiaTouristic${i}.png`);
}

// ----- Initialisation carousel générique -----
function initCarouselTn(modalId, ringClass, imgClass, imagesArray) {
  let xPos = 0;

  // Récupère le ring et vide-le
  const ring = document.querySelector(`#${modalId} .${ringClass}`);
  ring.innerHTML = "";

  // Crée les div.img dynamiquement
  imagesArray.forEach((src, i) => {
    const imgDiv = document.createElement("div");
    imgDiv.classList.add(imgClass);
    imgDiv.style.backgroundImage = `url(${src})`;
    imgDiv.style.transform = `rotateY(${i * (360 / imagesArray.length)}deg) translateZ(1000px)`;
    ring.appendChild(imgDiv);

    // Clic sur image -> plein écran
    imgDiv.addEventListener("click", () => {
      const fullscreenModal = document.getElementById("imageFullscreenModal");
      const fullscreenImg = document.getElementById("fullscreenImage");
      fullscreenImg.src = src;
      fullscreenModal.style.display = "flex";
    });
  });

  // Animation GSAP
  gsap.timeline()
    .set(`#${modalId} .${ringClass}`, { rotationY: 180, cursor: 'grab' })
    .set(`#${modalId} .${imgClass}`, {
      rotateY: (i) => i * -360 / imagesArray.length,
      transformOrigin: '50% 50% 1000px',
      z: -1000,
      backfaceVisibility: 'hidden'
    })
    .from(`#${modalId} .${imgClass}`, {
      duration: 1.5,
      y: 100,
      opacity: 0,
      stagger: 0.1,
      ease: 'expo'
    })
    .add(() => {
      $(`#${modalId} .${imgClass}`).on('mouseenter', (e) => {
        let current = e.currentTarget;
        gsap.to(`#${modalId} .${imgClass}`, { opacity: (i, t) => (t == current ? 1 : 0.5), ease: 'power3' });
      });
      $(`#${modalId} .${imgClass}`).on('mouseleave', () => {
        gsap.to(`#${modalId} .${imgClass}`, { opacity: 1, ease: 'power2.inOut' });
      });
    }, '-=0.5');

  // Drag rotation
  function dragStart(e) {
    if (e.touches) e.clientX = e.touches[0].clientX;
    xPos = Math.round(e.clientX);
    gsap.set(`#${modalId} .${ringClass}`, { cursor: 'grabbing' });
    $(window).on('mousemove touchmove', drag);
  }

  function drag(e) {
    if (e.touches) e.clientX = e.touches[0].clientX;
    gsap.to(`#${modalId} .${ringClass}`, {
      rotationY: '-=' + ((Math.round(e.clientX) - xPos) % 360),
      onUpdate: () => { gsap.set(`#${modalId} .${imgClass}`, { backgroundPosition: (i) => getBgPos(i) }); }
    });
    xPos = Math.round(e.clientX);
  }

  function dragEnd() {
    $(window).off('mousemove touchmove', drag);
    gsap.set(`#${modalId} .${ringClass}`, { cursor: 'grab' });
  }

  function getBgPos(i) {
    return (
      100 - gsap.utils.wrap(
        0,
        360,
        gsap.getProperty(`#${modalId} .${ringClass}`, 'rotationY') - 180 - (i * 360 / imagesArray.length)
      ) / 360 * 300
    ) + 'px 0px';
  }

  $(window).on('mousedown touchstart', dragStart);
  $(window).on('mouseup touchend', dragEnd);

  // Modal classique
  const modal = document.getElementById(modalId);
  const eyeBtn = document.querySelector(`.project-item-icon-box[data-modal="${modalId}"]`);
  const closeBtn = modal.querySelector(".close-btnTn");

  eyeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "block";
  });

  closeBtn.addEventListener("click", () => { modal.style.display = "none"; });
  window.addEventListener("click", (e) => { if(e.target === modal) modal.style.display = "none"; });

  // Modal plein écran
  const fullscreenModal = document.getElementById("imageFullscreenModal");
  const fullscreenClose = fullscreenModal.querySelector(".close-fullscreen");
  fullscreenClose.addEventListener("click", () => {
    fullscreenModal.style.display = "none";
    document.getElementById("fullscreenImage").src = "";
  });
}

// ----- Initialisation TunisiaTouristic -----
initCarouselTn("carouselModalTn", "ring-tn", "img-tn", myImagesTn);
