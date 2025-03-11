document.addEventListener("DOMContentLoaded", function () {
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const carouselContent = document.querySelector(".carousel-content");

  let index = 0;

  prevBtn.addEventListener("click", () => {
    if (index > 0) {
      index--;
      carouselContent.style.transform = `translateX(-${index * 100}%)`;
    }
  });

  nextBtn.addEventListener("click", () => {
    if (index < carouselContent.children.length - 1) {
      index++;
      carouselContent.style.transform = `translateX(-${index * 100}%)`;
    }
  });
});
