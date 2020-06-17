const viewTracker = document.querySelector('.view-tracker');
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
  initial: parseInt(currentPageEl.dataset.view) - 1
});

viewTracker.addEventListener('click', e => {
  if(e.target.tagName.toLowerCase() === 'span') {
    const view = parseInt(e.target.dataset.view);
    slider.moveToSlide(view - 1);
  } else if(e.target.tagName.toLowerCase() === 'h2') {
    const view = parseInt(e.target.parentNode.dataset.view);
    slider.moveToSlide(view - 1);
  }
});

window.addEventListener('popstate', () => {
  const nextPage = viewTracker.querySelector(`span[data-viewname ="${location.pathname}"]`);
  slider.moveToSlide(parseInt(nextPage.dataset.view) - 1);
});