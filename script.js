const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
const leftButton = document.querySelector(".arrow.left");
const rightButton = document.querySelector(".arrow.right");
const dotsContainer = document.querySelector(".carousel-dots");

let currentIndex = 0;
let slideWidth = slides[0].getBoundingClientRect().width;




// 슬라이드 정렬
const setSlidePosition = () => {
  slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + "px";
  });
};

setSlidePosition();

// 이동 함수
const moveToSlide = (index) => {
  track.style.transform = `translateX(-${slideWidth * index}px)`;
  currentIndex = index;
  updateDots();
};

// 화살표
rightButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slides.length;
  moveToSlide(currentIndex);
});

leftButton.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  moveToSlide(currentIndex);
});

// 인디케이터
slides.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.addEventListener("click", () => moveToSlide(i));
  dotsContainer.appendChild(dot);
});

const updateDots = () => {
  dotsContainer.childNodes.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
};

updateDots();

// 자동 전환
setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  moveToSlide(currentIndex);
}, 5000);

// 스와이프 (모바일)
let startX = 0;

track.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

track.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  const deltaX = endX - startX;

  if (deltaX > 50) {
    leftButton.click();
  } else if (deltaX < -50) {
    rightButton.click();
  }
});
