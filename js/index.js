$(document).ready(function () {
      $('.menu-toggle').click(function (e) {
        e.stopPropagation();
        $('.nav').toggleClass('active');
        $(this).find('i').toggleClass('fa-bars fa-times');
      });

      $('.nav a').click(function() {
        $('.nav').removeClass('active');
        $('.menu-toggle i').removeClass('fa-times').addClass('fa-bars');
      });

      $(document).click(function() {
        $('.nav').removeClass('active');
        $('.menu-toggle i').removeClass('fa-times').addClass('fa-bars');
      });

      $('.nav').click(function(e) {
        e.stopPropagation();
      });
    });



//-- Script de Testimonios----
  const $track = $('#carousel');
  const $dotsContainer = $('#dots');
  const $leftArrow = $('.arrow.left');
  const $rightArrow = $('.arrow.right');
  let currentSlide = 0;

  function getCardsPerView() {
    const width = $(window).width();
    if (width <= 600) return 1;
    if (width <= 992) return 2;
    return 3;
  }

  function getTotalSlides() {
    const perView = getCardsPerView();
    return Math.ceil($('.testimonio').length / perView);
  }

  function updateSlide() {
    const cardWidth = $('.testimonio').outerWidth(true);
    const perView = getCardsPerView();
    const offset = currentSlide * cardWidth * perView;
    $track.css('transform', `translateX(-${offset}px)`);
    $('.dot').removeClass('active');
    $('.dot').eq(currentSlide).addClass('active');
  }

  function createDots() {
    $dotsContainer.empty();
    const total = getTotalSlides();
    for (let i = 0; i < total; i++) {
      const $dot = $('<span class="dot"></span>');
      if (i === 0) $dot.addClass('active');
      $dot.on('click', () => {
        currentSlide = i;
        updateSlide();
      });
      $dotsContainer.append($dot);
    }
  }

  function nextSlide() {
    const total = getTotalSlides();
    if (currentSlide < total - 1) {
      currentSlide++;
      updateSlide();
    }
  }

  function prevSlide() {
    if (currentSlide > 0) {
      currentSlide--;
      updateSlide();
    }
  }

  $(window).on('resize', () => {
    createDots();
    currentSlide = 0;
    updateSlide();
  });

  $rightArrow.on('click', nextSlide);
  $leftArrow.on('click', prevSlide);

  createDots();
  updateSlide();

  //--Slider--

  const videoSlider = document.getElementById("videoSlider");
  const source = videoSlider.querySelector("source");

  const videoSources = [
    "video/19153380-hd_1920_1080_60fps.mp4",
    "video/6131723-hd_1280_720_25fps.mp4",
    "video/6816876-hd_1280_720_30fps.mp4"
  ];

  let currentIndex = 0;

  function loadAndPlayVideo(index) {
    source.src = videoSources[index];
    videoSlider.load();
    videoSlider.play();
  }

  // Cuando termina el video, cambia al siguiente
  videoSlider.addEventListener("ended", () => {
    currentIndex = (currentIndex + 1) % videoSources.length;
    loadAndPlayVideo(currentIndex);
  });

  // Iniciar el primer video
  loadAndPlayVideo(currentIndex);


  /*---Modal Formulario---*/
  const form = document.getElementById("formCita");
  const modalCitaEl = document.getElementById("modalCita");
  const modalGraciasEl = document.getElementById("modalGracias");
  const modalErrorEl = document.getElementById("modalError");

  const modalCita = new bootstrap.Modal(modalCitaEl);
  const modalGracias = new bootstrap.Modal(modalGraciasEl);
  const modalError = new bootstrap.Modal(modalErrorEl);

  const campos = form.querySelectorAll("input, select, textarea");

  const validarCampo = (field) => {
    const mensaje = field.nextElementSibling;
    if (field.hasAttribute("required") && !field.value.trim()) {
      mensaje?.classList.remove("d-none");
      return false;
    } else {
      mensaje?.classList.add("d-none");
      return true;
    }
  };

  campos.forEach(field => {
    field.addEventListener("blur", () => validarCampo(field));
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let esValido = true;
    campos.forEach(field => {
      if (!validarCampo(field)) esValido = false;
    });

    if (esValido) {
      const instancia = bootstrap.Modal.getInstance(modalCitaEl);
      instancia.hide();

      modalCitaEl.addEventListener('hidden.bs.modal', () => {
        modalGracias.show();
        setTimeout(() => {
          modalGracias.hide();
          document.querySelectorAll('.modal-backdrop').forEach(b => b.remove());
          document.body.classList.remove('modal-open');
          document.body.style.overflow = '';
        }, 3000);

        form.reset();
        campos.forEach(field => {
          const mensaje = field.nextElementSibling;
          mensaje?.classList.add("d-none");
        });
      }, { once: true });

    } else {
      modalError.show();
    }
  }); 

