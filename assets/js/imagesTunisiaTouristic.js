// ---------------- TunisiaTouristic ----------------
let xPosTn = 0;
const myImagesTn = [];
for (let i = 1; i <= 12; i++) {
  myImagesTn.push(`./assets/images/tunisiaTouristic${i}.png`);
}

gsap.timeline()
  .set('.ring-tn', { rotationY: 180, cursor: 'grab' })
  .set('.img-tn', {
    rotateY: (i) => i * -360 / myImagesTn.length,
    transformOrigin: '50% 50% 1000px',
    z: -1000,
    backgroundImage: (i) => `url(${myImagesTn[i]})`,
    backfaceVisibility: 'hidden'
  })
  .from('.img-tn', {
    duration: 1.5,
    y: 100,
    opacity: 0,
    stagger: 0.1,
    ease: 'expo'
  })
  .add(() => {
    $('.img-tn').on('mouseenter', (e) => {
      let current = e.currentTarget;
      gsap.to('.img-tn', { opacity: (i, t) => (t == current ? 1 : 0.5), ease: 'power3' });
    });
    $('.img-tn').on('mouseleave', () => {
      gsap.to('.img-tn', { opacity: 1, ease: 'power2.inOut' });
    });
  }, '-=0.5');

$(window).on('mousedown touchstart', dragStartTn);
$(window).on('mouseup touchend', dragEndTn);

function dragStartTn(e) { 
  if (e.touches) e.clientX = e.touches[0].clientX;
  xPosTn = Math.round(e.clientX);
  gsap.set('.ring-tn', { cursor: 'grabbing' });
  $(window).on('mousemove touchmove', dragTn);
}

function dragTn(e) {
  if (e.touches) e.clientX = e.touches[0].clientX;    

  gsap.to('.ring-tn', {
    rotationY: '-=' + ((Math.round(e.clientX) - xPosTn) % 360),
    onUpdate: () => { gsap.set('.img-tn', { backgroundPosition: (i) => getBgPosTn(i) }); }
  });
  
  xPosTn = Math.round(e.clientX);
}

function dragEndTn() {
  $(window).off('mousemove touchmove', dragTn);
  gsap.set('.ring-tn', { cursor: 'grab' });
}

function getBgPosTn(i) {
  return (100 - gsap.utils.wrap(0, 360, gsap.getProperty('.ring-tn', 'rotationY') - 180 - i * 360 / myImagesTn.length) / 360 * 300) + 'px 0px';
}

// ---------------- Modal TunisiaTouristic ----------------
const modalTn = document.getElementById("carouselModalTn");
const eyeBtnTn = document.querySelector(".project-item-icon-box[data-modal='carouselModalTn']");
const closeBtnTn = document.querySelector(".close-btnTn");

eyeBtnTn.addEventListener("click", (e) => {
  e.preventDefault();
  modalTn.style.display = "block";
});

closeBtnTn.addEventListener("click", () => {
  modalTn.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modalTn) {
    modalTn.style.display = "none";
  }
});
