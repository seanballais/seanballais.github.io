$(function() {
    var $contactResponse = $('div#contact-response');
    var $contact = $('div#contact');
    var $contactForm = $('div#contact > form#contact-form');
    $contactForm.submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: '//formspree.io/sean@seanballais.com',
            method: 'POST',
            data: $(this).serialize(),
            dataType: 'json',
            beforeSend: function() {
                $contactResponse.attr('class', 'alert alert-info').text('Sending message').fadeIn('slow');
            },
            success: function(data) {
                $contactResponse.attr('class', 'alert alert-success').text('Message sent!').fadeIn('slow');
                $contact.slideUp('slow');
            },
            error: function(err) {
                $contactResponse.attr('class', 'alert alert-danger').text('Sorry, my bad. Something went wrong. Make sure you have Javascript enabled, and you are connected to the Internet.').fadeIn('slow');
            }
        });
    });
});
