const swiper = new Swiper('.swiper', {
    // Parametro opcionales
    direction: 'horizontal',
    loop: true,
    slidesPerView: 3,        // Mostrar 3 slides a la vez
    spaceBetween: 1,        // Espacio entre diapositivas (opcional)
  
    // // If we need pagination
    // pagination: {
    //   el: '.swiper-pagination',
    // },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    breakpoints: {
        1800: {
            slidesPerView: 3, // Desktop (3 cartas)
          },
        1200: {
          slidesPerView: 2, // (2 cartas)
        },
        0600: {
          slidesPerView: 1, // Móvil (1 carta)
        },
      },

    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });
  