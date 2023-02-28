import Splide from '@splidejs/splide';

document.addEventListener('DOMContentLoaded', () => {
  new Splide('#splide-footer', {
    perPage: 3,
    arrows: false,
    pagination: false,
    gap: '10rem',

    breakpoints: {
      1300: {
        perPage: 2,
        gap: '50px',
      },

      800: {
        perPage: 1,
        gap: '50px',
      },
    },
  }).mount();

  new Splide('#splide-reviews', {
    perPage: 5,
    arrows: true,
    pagination: false,
    gap: '20px',
    width: '100%',
    breakpoints: {
      1600: {
        perPage: 4,
      },

      1400: {
        perPage: 3,
      },

      1000: {
        perPage: 2,
      },

      700: {
        perPage: 1,
        arrows: false,
        pagination: true,
        gap: '0px',
      },
    },
  }).mount();
});
