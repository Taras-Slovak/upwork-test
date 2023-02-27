import Glider from 'glider-js';
window.addEventListener('load', function () {
  new Glider(document.querySelector('.glider'), {
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    dots: '.dots',
    responsive: [
      {
        // If Screen Size More than 600px
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          duration: 0.5,
          arrows: {
            prev: '.glider-prev',
            next: '.glider-next',
          },
        },
      },
      {
        // If Screen Size More than 900px
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          duration: 0.5,
          arrows: {
            prev: '.glider-prev',
            next: '.glider-next',
          },
        },
      },
      {
        // If Screen Size More than 1200px
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          duration: 0.5,
          arrows: {
            prev: '.glider-prev',
            next: '.glider-next',
          },
        },
      },
      {
        // If Screen Size More than 1600px
        breakpoint: 1600,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          duration: 0.5,
          arrows: {
            prev: '.glider-prev',
            next: '.glider-next',
          },
        },
      },
    ],
  });
});
