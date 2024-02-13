Handlebars.registerHelper('parseYoutubeLink', function(link) {
    return link.replaceAll('watch?v=', 'embed/');
})

$(document).ready(function(){
    
    // Handlebars menampilkan data rumah adat dan provinsi
    let provinces_modal = $('#provinces-modal').html();
    let provinces_func = Handlebars.compile(provinces_modal);
    let provinces_result = provinces_func(provinces_data);
    $('#modal-here').html(provinces_result);

    // Menambah atribut untuk tooltip dan modal
    $('.province').each(function(index) {
        let province = $(this).children('path').attr('id');
        $(this).attr('data-bs-tooltip', 'tooltip');
        $(this).attr('data-bs-title', province.replaceAll('_', ' '));
        $(this).attr('data-bs-placement', 'bottom');
        $(this).attr('data-bs-custom-class', 'custom-tooltip');

        $(this).attr('data-bs-toggle', 'modal');
        $(this).attr('data-bs-target', '#modal-' + index);
    });

    // Tooltip hanya aktif ketika mouse hover
    $('[data-bs-tooltip="tooltip"]').tooltip({ trigger: 'hover' });

    // Provinsi menyala ketika diklik
    $('.province').on('click', function(a) {
        $('.province').removeClass('selected');
        $(this).addClass('selected');
        a.stopPropagation();
    });
    
    // Deselect provinsi ketika klik di tempat lain
    $('body').on('click', function(a) {
        if ($(a.target).is('.province') == false) {
            $('.province').removeClass('selected');
        }
    });

    // Play & stop TTS
    $('.tts').on('click', function() {
        // Play TTS
        if($(this).hasClass('bi-volume-up-fill')) {
            responsiveVoice.cancel();
            stopTTSChangeIcon($('.tts'));

            text = $(this).attr('data-text');
            responsiveVoice.speak(text, 'Indonesian Female', {
                onstart: () => playTTSChangeIcon(this),
                onend: () => stopTTSChangeIcon(this)
            });
        }
        // Stop TTS
        else {
            responsiveVoice.cancel();
            stopTTSChangeIcon(this);
        }
    });

    // Ganti icon volume up -> mute
    function playTTSChangeIcon(a) {
        $(a).removeClass('bi-volume-up-fill');
        $(a).addClass('bi-volume-mute-fill');
    }
    
    // Ganti icon mute -> volume up
    function stopTTSChangeIcon(a) {
        $(a).removeClass('bi-volume-mute-fill');
        $(a).addClass('bi-volume-up-fill');
    }
});
