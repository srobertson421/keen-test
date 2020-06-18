const viewTracker = document.querySelector('.view-tracker');
const homeButton = document.querySelector('#home-btn');
const aboutButton = document.querySelector('#about-btn');
const contactButton = document.querySelector('#contact-btn');
let currentPageEl = viewTracker.querySelector(`span[data-viewname ="${location.pathname}"]`) || viewTracker.querySelector(`span[data-viewname="/"]`);

function changePage(slideObj) {
  const currentPage = slideObj.details().relativeSlide;

  history.pushState({}, '', viewTracker.children[currentPage].dataset.viewname);

  for(let node of viewTracker.children) {
    node.classList.remove('active');
  }

  viewTracker.children[currentPage].classList.add('active');
}

const slider = new KeenSlider('#my-keen-slider', {
  slideChanged: changePage,
  duration: 250,
  initial: parseInt(currentPageEl.dataset.view) - 1,
  loop: true
});

homeButton.addEventListener('click', () => {
  slider.moveToSlide(0);
});

aboutButton.addEventListener('click', () => {
  slider.moveToSlide(1);
});

contactButton.addEventListener('click', () => {
  slider.moveToSlide(2);
});

window.addEventListener('popstate', () => {
  const nextPage = viewTracker.querySelector(`span[data-viewname ="${location.pathname}"]`);
  slider.moveToSlide(parseInt(nextPage.dataset.view) - 1);
});

feather.replace();