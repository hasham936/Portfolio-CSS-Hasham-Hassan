const pages = document.querySelectorAll('.page');
let currentPage = 0;
let isAnimating = false;

function changePage(direction) {
    if (isAnimating) return;

    const nextPage = currentPage + direction;
    if (nextPage < 0 || nextPage >= pages.length) return;

    isAnimating = true;

    const current = pages[currentPage];
    const next = pages[nextPage];

    current.classList.add('page-exit');

    next.style.display = 'flex';
    next.classList.add('page-enter');

    setTimeout(() => {
        current.style.display = 'none';
        current.classList.remove('page-exit');

        next.classList.remove('page-enter');

        currentPage = nextPage;
        isAnimating = false;
    }, 500);
}

document.addEventListener('DOMContentLoaded', () => {
    pages.forEach((page, i) => {
        page.style.display = i === 0 ? 'flex' : 'none';
    });
});

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", function(e) {
  touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener("touchend", function(e) {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}, false);

function handleSwipe() {
  const threshold = 50; // distance minimale pour considérer un swipe

  if (touchEndX < touchStartX - threshold) {
    // Swipe gauche → Page suivante
    changePage(1);
  } else if (touchEndX > touchStartX + threshold) {
    // Swipe droite → Page précédente
    changePage(-1);
  }
}
