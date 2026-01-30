//---Slider--
$(document).ready(function () {
    const $slides = $(".slide");
    let current = 0;

    function showSlide(index) {
      $slides.removeClass("active").hide();
      $slides.each(function () {
        const video = $(this).find("video")[0];
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
      });

      const $nextSlide = $slides.eq(index);
      $nextSlide.addClass("active").show();
      const video = $nextSlide.find("video")[0];
      if (video) {
        video.play().catch((err) =>
          console.warn("Error al reproducir video:", err)
        );
      }
    }

    showSlide(0);

    setInterval(function () {
      current = (current + 1) % $slides.length;
      showSlide(current);
    }, 4000);
  });


//Brochure----
$(document).ready(function () {
      $('.caja-estetica').hide().fadeIn(1200);
      $('.boton-agendar').hover(function () {
        $(this).css('background-color', '#e63946');
      }, function () {
        $(this).css('background-color', '#c8322e');
      });
    });

//--Seccion: Servicio incluye:---
// Activar ítem
    const items = document.querySelectorAll('.item');
    items.forEach(item => {
      item.addEventListener('click', () => {
        items.forEach(el => el.classList.remove('activo'));
        item.classList.add('activo');
      });
    });

    // Mostrar imagen en modal
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modalImg");
    const closeModal = document.getElementById("closeModal");

    document.querySelectorAll(".item img").forEach(img => {
      img.addEventListener("click", e => {
        modal.style.display = "flex";
        modalImg.src = img.src;
        e.stopPropagation();
      });
    });

    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });

    modal.addEventListener("click", () => {
      modal.style.display = "none";
    });


  //-------
  $(document).ready(function () {
      var player;
      var videoContainer = $('.video-container');
      var youtubePlayerDiv = $('#youtube-player');
      var videoId = youtubePlayerDiv.data('videoid');
      var placeholderThumbnail = 'https://img.youtube.com/vi/' + videoId + '/maxresdefault.jpg';

      $('.play-button').css('background-image', 'url("' + placeholderThumbnail + '")');

      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = function () {
        player = new YT.Player('youtube-player', {
          videoId: videoId,
          playerVars: {
            'autoplay': 0,
            'controls': 1,
            'rel': 0,
            'modestbranding': 1
          },
          events: {
            'onReady': function () {},
            'onStateChange': function (event) {
              if (event.data == YT.PlayerState.PLAYING) {
                videoContainer.addClass('video-playing');
              }
            }
          }
        });
      }

      $('.play-button').on('click', function () {
        if (player) {
          player.playVideo();
          videoContainer.addClass('video-playing');
        }
      });
    });

  //--Cupon
  function cerrarCupon() {
  document.getElementById('cuponOverlay').style.display = 'none';
}

//Script: header
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

  
  