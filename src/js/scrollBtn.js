let intervalId = 0;
const scrollButton = document.querySelector('.scroll');

const scrollStep = () => {
  if (window.pageYOffset === 0) {
    clearInterval(intervalId);
  }
  window.scroll(0, window.pageYOffset - 50);
};

const scrollToTop = () => {
  intervalId = setInterval(scrollStep, 16.66);
};

scrollButton.addEventListener('click', scrollToTop);
