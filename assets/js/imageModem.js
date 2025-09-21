let xPos = 0;

// Tableau contenant tes images locales
const myImages = [];
for (let i = 1; i <= 15; i++) {
  myImages.push(`./assets/images/modem${i}.jpg`);
}

gsap.timeline()
  .set('.ring', { rotationY: 180, cursor: 'grab' })
  .set('.img', {
    rotateY: (i) => i * -360 / myImages.length,
    transformOrigin: '50% 50% 2000px', // recule les images car elles sont plus grandes
    z: -2000,
    backgroundImage: (i) => `url(${myImages[i]})`,
    backfaceVisibility: 'hidden'
  })
  .from('.img', {
    duration: 1.5,
    y: 100,
    opacity: 0,
    stagger: 0.1,
    ease: 'expo'
  })
  .add(() => {
    $('.img').on('mouseenter', (e) => {
      let current = e.currentTarget;
      gsap.to('.img', { opacity: (i, t) => (t == current ? 1 : 0.5), ease: 'power3' });
    });
    $('.img').on('mouseleave', (e) => {
      gsap.to('.img', { opacity: 1, ease: 'power2.inOut' });
    });
  }, '-=0.5');

$(window).on('mousedown touchstart', dragStart);
$(window).on('mouseup touchend', dragEnd);

function dragStart(e) { 
  if (e.touches) e.clientX = e.touches[0].clientX;
  xPos = Math.round(e.clientX);
  gsap.set('.ring', { cursor: 'grabbing' });
  $(window).on('mousemove touchmove', drag);
}

function drag(e) {
  if (e.touches) e.clientX = e.touches[0].clientX;    

  gsap.to('.ring', {
    rotationY: '-=' + ((Math.round(e.clientX) - xPos) % 360),
    onUpdate: () => { gsap.set('.img', { backgroundPosition: (i) => getBgPos(i) }); }
  });
  
  xPos = Math.round(e.clientX);
}

function dragEnd(e) {
  $(window).off('mousemove touchmove', drag);
  gsap.set('.ring', { cursor: 'grab' });
}

function getBgPos(i) {
  return (100 - gsap.utils.wrap(0, 360, gsap.getProperty('.ring', 'rotationY') - 180 - i * 360 / myImages.length) / 360 * 300) + 'px 0px';
}
// Sélection des éléments
const modal = document.getElementById("carouselModal");
const eyeBtn = document.querySelector(".project-item-icon-box");
const closeBtn = document.querySelector(".close-btn");

// Ouvrir modal
eyeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "block";
});

// Fermer modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Fermer si on clique dehors
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});


