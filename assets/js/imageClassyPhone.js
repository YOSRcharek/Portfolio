// ---------------- classyMobile ----------------
let xPosClassyPhone = 0;
const myImagesClassyPhone = [];
for (let i = 1; i <= 6; i++) {
  myImagesClassyPhone.push(`./assets/images/classyMobile${i}.png`);
}

gsap.timeline()
  .set('.ring-ClassyPhone', { rotationY: 180, cursor: 'grab' })
  .set('.img-ClassyPhone', {
    rotateY: (i) => i * -360 / myImagesClassyPhone.length,
    transformOrigin: '50% 50% 500px',
    z: -500,
    backgroundImage: (i) => `url(${myImagesClassyPhone[i]})`,
    backfaceVisibility: 'hidden'
  })
  .from('.img-ClassyPhone', {
    duration: 1.5,
    y: 100,
    opacity: 0,
    stagger: 0.1,
    ease: 'expo'
  })
  .add(() => {
    $('.img-ClassyPhone').on('mouseenter', (e) => {
      let current = e.currentTarget;
      gsap.to('.img-ClassyPhone', { opacity: (i, t) => (t == current ? 1 : 0.5), ease: 'power3' });
    });
    $('.img-ClassyPhone').on('mouseleave', () => {
      gsap.to('.img-ClassyPhone', { opacity: 1, ease: 'power2.inOut' });
    });
  }, '-=0.5');

$(window).on('mousedown touchstart', dragStartClassyPhone);
$(window).on('mouseup touchend', dragEndClassyPhone);

function dragStartClassyPhone(e) { 
  if (e.touches) e.clientX = e.touches[0].clientX;
  xPosClassyPhone = Math.round(e.clientX);
  gsap.set('.ring-ClassyPhone', { cursor: 'grabbing' });
  $(window).on('mousemove touchmove', dragClassyPhone);
}

function dragClassyPhone(e) {
  if (e.touches) e.clientX = e.touches[0].clientX;    

  gsap.to('.ring-ClassyPhone', {
    rotationY: '-=' + ((Math.round(e.clientX) - xPosClassyPhone) % 360),
    onUpdate: () => { gsap.set('.img-ClassyPhone', { backgroundPosition: (i) => getBgPosClassyPhone(i) }); }
  });
  
  xPosClassyPhone = Math.round(e.clientX);
}

function dragEndClassyPhone() {
  $(window).off('mousemove touchmove', dragClassyPhone);
  gsap.set('.ring-ClassyPhone', { cursor: 'grab' });
}

function getBgPosClassyPhone(i) {
  return (100 - gsap.utils.wrap(0, 360, gsap.getProperty('.ring-ClassyPhone', 'rotationY') - 180 - i * 360 / myImagesClassyPhone.length) / 360 * 300) + 'px 0px';
}

// ---------------- Modal classyMobile ----------------
const modalClassyPhone = document.getElementById("carouselModalClassyPhone");
const eyeBClassyPhoneClassyPhone = document.querySelector(".project-item-icon-box[data-modal='carouselModalClassyPhone']");
const closeBClassyPhoneClassyPhone = document.querySelector(".close-btnClassyPhone");

eyeBClassyPhoneClassyPhone.addEventListener("click", (e) => {
  e.preventDefault();
  modalClassyPhone.style.display = "block";
});

closeBClassyPhoneClassyPhone.addEventListener("click", () => {
  modalClassyPhone.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modalClassyPhone) {
    modalClassyPhone.style.display = "none";
  }
});
