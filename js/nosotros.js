//Script: header
$(document).ready(function () {
      $('#menu-toggle').click(function (e) {
        e.stopPropagation();
        $('#nav-menu').toggleClass('active');
        $(this).find('i').toggleClass('fa-bars fa-times');
      });
      
      $('#nav-menu a').click(function() {
        $('#nav-menu').removeClass('active');
        $('#menu-toggle i').removeClass('fa-times').addClass('fa-bars');
      });
      
      $(document).click(function() {
        $('#nav-menu').removeClass('active');
        $('#menu-toggle i').removeClass('fa-times').addClass('fa-bars');
      });
      
      $('#nav-menu').click(function(e) {
        e.stopPropagation();
      });
    });


//Slider
$(document).ready(function () {
      $('.interactive-img').css({
        'opacity': '1',
        'transform': 'scale(1)'
      });

      setTimeout(function () {
        $('.overlay').css({
          'opacity': '1',
          'transform': 'translateY(0)'
        });
      }, 300);

      $('.card').each(function (i) {
        $(this).delay(400 + i * 300).animate({
          opacity: 1,
          top: 0
        }, 700);
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
