'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//SCROLLING TO SECTIONS
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1cords = section1.getBoundingClientRect();

  //Scrolling
  // window.scrollTo(
  //   s1cords.left + window.pageXOffset,
  //   s1cords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1cords.left + window.pageXOffset,
  //   top: s1cords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' }); //only in modern browsers
  //console.log(s1cords);
  //console.log(window.pageYOffset);
});

//Page navigation
// document.querySelectorAll('.nav__link').forEach(function (e){
//   e.addEventListener('click', function(el){
//     el.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth'});
//   })
// })

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  const id = e.target.getAttribute('href');
  //Matching strategy
  if (e.target.classList.contains('nav__link')) {
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

const tabs = document.querySelectorAll('.operations__tab');
const operationsTab = document.querySelector('.operations__tab-container');
const operationsContent = document.querySelectorAll('.operations__content');

//MAKING TABBED COMPNENT
operationsTab.addEventListener('click', function (event) {
  const clicked = event.target.closest('.operations__tab');
  let windowNumber = clicked.dataset.tab;
  //Guard clause
  if (!clicked) return;
  //tabs modification
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  //content modifications
  operationsContent.forEach(function (opc) {
    opc.classList.remove('operations__content--active');
    if (opc.classList.contains(`operations__content--${windowNumber}`))
      opc.classList.add('operations__content--active');
  });
});

//MENU FADE ANIMATIONS
const navigation = document.querySelector('.nav');
const changeOpacityfunction = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const clicked = e.target;
    const sibling = clicked.closest('.nav').querySelectorAll('.nav__link');
    const logo = clicked.closest('.nav').querySelector('img');
    sibling.forEach(el => {
      if (el !== clicked) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

navigation.addEventListener('mouseover', changeOpacityfunction.bind(0.5));
navigation.addEventListener('mouseout', changeOpacityfunction.bind(1));

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

const allSections = document.querySelectorAll('.section');
const header = document.querySelector('.header');

//Inserting and creating HTML elements
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close--cookie">Got it!</button>';
// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));
// header.before(message);
// header.after(message);

//delete elements
document
  .querySelector('.btn--close--cookie')
  .addEventListener('click', () => message.remove());

// STICKY NAVIGATION (worst way to do it)
// const initialCoords =  section1.getBoundingClientRect();
// window.addEventListener('scroll', function(){
//   if(window.scrollY > initialCoords.top)navigation.classList.add('sticky');
//   else navigation.classList.remove('sticky');
// })

const navHeight = navigation.getBoundingClientRect().height;

// const header2 = document.querySelector('.header');
const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) navigation.classList.add('sticky');
  else navigation.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  treshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//REVEALING ON SCROLLING
const sections = document.querySelectorAll('.section');

// const secObs = new IntersectionObserver(function(entries, observer){
//   const [entry] = entries;
//   if(!entry.isIntersecting) return;

//   entry.target.classList.remove('section--hidden');
//   observer.unobserve(entry.target);
// },{
//   root: null,
//   treshold: 0.15,
// });

// sections.forEach(function(section){
//   section.classList.add('section--hidden');
//   secObs.observe(section);
// });

//LAZY LOADING IMAGES

const imgTargets = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', () =>
    entry.target.classList.remove('lazy-img')
  );
  observer.unobserve(entry.target);
};
const imgObserver2 = new IntersectionObserver(loadImg, {
  root: null,
  treshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver2.observe(img));

//SLIDER COMPONENT

const goToSlide = function (s) {
  slides.forEach(
    (slide, index) =>
      (slide.style.transform = `translateX(${(index - s) * 100}%)`)
  );
};
const nextSlide = function () {
  if (curslide == maxSlides) curslide = 0;
  else curslide++;
  goToSlide(curslide);
};
const prevSlide = function () {
  if (curslide == 0) curslide = maxSlides;
  else curslide--;
  goToSlide(curslide);
};

const slides = document.querySelectorAll('.slide');
let curslide = 0;
const maxSlides = slides.length - 1;
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');
goToSlide(0);
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
