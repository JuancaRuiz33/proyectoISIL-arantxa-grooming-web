$(document).ready(function() {
            $('#grooming-contact-form').on('submit', function(event) {
                event.preventDefault(); 

                const formData = {
                    firstName: $('#first-name').val(),
                    phone: $('#phone').val(),
                    email: $('#email').val(),
                    message: $('#message').val()
                };

           
                if (!formData.firstName || !formData.phone || !formData.email) {
                    alert('Por favor, rellena todos los campos requeridos (Nombre, Teléfono, Email).');
                    return;
                }

                
                console.log('Simulando envío de email con los siguientes datos:');
                console.log(formData);

             
                alert('¡Mensaje enviado con éxito! Nuestro equipo de Pawsome Grooming se pondrá en contacto contigo pronto.');
                $('#grooming-contact-form')[0].reset(); 
            });
        });


//-preguntas
$(document).ready(function () {
      $('.faq-question').on('click', function () {
        const $item = $(this).closest('.faq-item');
        const $answer = $item.find('.faq-answer');
        const $arrow = $(this).find('.arrow');

        $('.faq-answer').not($answer).removeClass('show');
        $('.faq-question').not(this).removeClass('active');

        $answer.toggleClass('show');
        $(this).toggleClass('active');
      });
    });